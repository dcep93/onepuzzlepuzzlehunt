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
  assert.ok(hintNarrative.startsWith("I'm playing onepuzzlepuzzlehunt.web.app. Be a spoiler-conscious puzzle host."))
  assert.ok(hintNarrative.includes('Your first reply should only ask: "What do you know so far?"'))
  assert.ok(!hintNarrative.includes('{'))
  for (const spoiler of ['K Callan', 'Knives Out', 'Laurence Fishburne', 'The Matrix', 'Morpheus', 'Neo', 'karate', 'kung fu', 'kungfu', 'kung-fu']) {
    assert.ok(!hintNarrative.includes(spoiler), spoiler)
  }
  const blocks = [...hintNarrative.matchAll(/b64:([A-Za-z0-9+/=]+)/g)].map(match => decode(match[1]))
  assert.equal(blocks[0], "the recurring person's identity")
  assert.equal(blocks[1], 'which person keeps appearing')
  const outer = blocks[2]
  assert.ok(outer.includes('makes the row uniquely green'))
  assert.ok(outer.includes('are yellow; remaining routes are pink'))
  assert.ok(outer.startsWith('If the user asks to decrypt, offer to recurse, but do not do so by default.'))
  assert.ok(!outer.includes('K Callan'))
  assert.ok(!outer.includes('1999'))
  assert.ok(outer.includes('b64:SyBDYWxsYW4= and b64:S25pdmVzIE91dA== are red herrings.'))
  const clues = [...outer.matchAll(/b64:([A-Za-z0-9+/=]+)/g)].map(match => decode(match[1]))
  assert.deepEqual(clues, [
    'K Callan', 'Knives Out', 'Laurence Fishburne', 'The Matrix', '1999',
    "Morpheus's beckoning pose in the dojo training fight with Neo",
    'karate', 'kung fu', 'kungfu', 'kung-fu',
  ])
})

test('epilogue requires a solved answer, while home and puzzle remain accessible', () => {
  assert.equal(resolveView('/', false), 'home')
  assert.equal(resolveView('/puzzle', false), 'puzzle')
  assert.equal(resolveView('/puzzle/', true), 'puzzle')
  assert.equal(resolveView('/epilogue', false), 'puzzle')
  assert.equal(resolveView('/epilogue', true), 'epilogue')
  assert.equal(resolveView('/unknown', true), 'home')
})
