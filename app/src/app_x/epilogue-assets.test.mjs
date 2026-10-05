import assert from 'node:assert/strict'
import { test } from 'node:test'

async function withImages(name, run) {
  const originalImage = globalThis.Image
  const images = []
  globalThis.Image = class {
    constructor() { images.push(this) }
    decode() {
      return new Promise((resolve, reject) => { this.resolve = resolve; this.reject = reject })
    }
  }
  try {
    await run(await import(`./epilogue-assets.ts?${name}`), images)
  } finally {
    globalThis.Image = originalImage
  }
}

test('preloads every slide once and waits for the last image to decode', async () => {
  await withImages('all', async (assets, images) => {
    assert.equal(assets.isEpilogueReady(), false)
    const pending = assets.preloadEpilogue()
    assert.equal(assets.preloadEpilogue(), pending)
    const files = [...new Set([...assets.slides.flatMap(slide => slide.images.map(image => image.file)), assets.bernsteinPortrait])]
    assert.deepEqual(images.map(image => image.src), files.map(file => `/puzzle/${file}`))
    assert.equal(images.length, 12)
    assert.equal(images.filter(image => image.src === '/puzzle/pose.png').length, 1)
    images.slice(0, -1).forEach(image => image.resolve())
    await Promise.resolve()
    assert.equal(assets.isEpilogueReady(), false)
    images.at(-1).resolve()
    await pending
    assert.equal(assets.isEpilogueReady(), true)
    await assets.preloadEpilogue()
    assert.equal(images.length, 12)
  })
})

test('a failed image does not block the solved puzzle transition forever', async () => {
  await withImages('failure', async (assets, images) => {
    const pending = assets.preloadEpilogue()
    images[0].reject(new Error('Image unavailable'))
    images.slice(1).forEach(image => image.resolve())
    await pending
    assert.equal(assets.isEpilogueReady(), true)
  })
})
