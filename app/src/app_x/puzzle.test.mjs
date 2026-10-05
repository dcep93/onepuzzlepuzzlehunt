import assert from 'node:assert/strict'
import test from 'node:test'
import { encodeBraces, hintNarrative, isCorrectAnswer, resolveView } from './puzzle.ts'

function decode(value) {
  return new TextDecoder().decode(Uint8Array.from(atob(value), character => character.charCodeAt(0)))
}

test('accepts karate and kung fu, including compact and hyphenated spellings', () => {
  for (const answer of ['karate', 'KARATE', 'KaRaTe', ' karate\n', 'kung fu', 'KUNG FU', 'KuNg Fu', ' kung fu\n', 'kungfu', 'KUNGFU', 'kung-fu', 'Kung-Fu', 'kung  fu']) {
    assert.equal(isCorrectAnswer(answer), true)
  }
  for (const answer of ['', 'karate!', 'kar ate', 'kung fu!', 'The Matrix']) {
    assert.equal(isCorrectAnswer(answer), false)
  }
})

test('encodes nested braces from the inside out and preserves b64 labels', () => {
  const encoded = encodeBraces('Before b64:{outside b64:{inside}} after')
  const outer = encoded.slice('Before b64:'.length, -' after'.length)
  const decoded = decode(outer)
  assert.equal(decoded, 'outside b64:aW5zaWRl')
  assert.equal(decode(decoded.split('b64:')[1]), 'inside')
})

test('preserves UTF-8, plain text, sibling blocks, and empty blocks', () => {
  assert.equal(decode(encodeBraces('{café 🌟}')), 'café 🌟')
  assert.equal(encodeBraces('plain text'), 'plain text')
  assert.equal(encodeBraces('b64:{a} b64:{b} {}'), 'b64:YQ== b64:Yg== ')
})

test('rejects malformed braces instead of publishing a partly decoded spoiler', () => {
  assert.throws(() => encodeBraces('b64:{unclosed'), /Unmatched/)
  assert.throws(() => encodeBraces('extra}'), /Unmatched/)
})

test('the published hint contains the intended nested clues only after decoding', () => {
  assert.ok(hintNarrative.startsWith("Point me in the right direction. I'm trying to solve onepuzzlepuzzlehunt.web.app"))
  assert.ok(!hintNarrative.includes('{'))
  for (const spoiler of ['K Callan', 'Knives Out', 'Laurence Fishburne', 'The Matrix', 'karate']) {
    assert.ok(!hintNarrative.includes(spoiler), spoiler)
  }
  const outer = decode(hintNarrative.split('b64:')[1])
  assert.ok(outer.includes('the connection path will be green,'))
  assert.ok(outer.startsWith('K Callan and b64:S25pdmVzIE91dA== are red herrings.'))
  const clues = [...outer.matchAll(/b64:([A-Za-z0-9+/=]+)/g)].map(match => decode(match[1]))
  assert.deepEqual(clues, ['Knives Out', 'Laurence Fishburne', 'The Matrix', 'karate'])
})

test('epilogue requires a solved answer, while home and puzzle remain accessible', () => {
  assert.equal(resolveView('/', false), 'home')
  assert.equal(resolveView('/puzzle', false), 'puzzle')
  assert.equal(resolveView('/puzzle/', true), 'puzzle')
  assert.equal(resolveView('/epilogue', false), 'puzzle')
  assert.equal(resolveView('/epilogue', true), 'epilogue')
  assert.equal(resolveView('/unknown', true), 'home')
})
