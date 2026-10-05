import { useEffect, useState } from 'react'

import { isEpilogueReady, preloadEpilogue, slides } from './epilogue-assets'
import { epilogueCopy } from './epilogue-copy'

export default function Epilogue() {
  const [slideIndex, setSlideIndex] = useState(0)
  const [ready, setReady] = useState(isEpilogueReady)
  useEffect(() => { window.scrollTo(0, 0) }, [slideIndex])
  useEffect(() => {
    let active = true
    void preloadEpilogue().then(() => { if (active) setReady(true) })
    return () => { active = false }
  }, [])
  useEffect(() => {
    if (!ready) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, [contenteditable="true"]')) return
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault()
        const direction = event.key === 'ArrowLeft' ? -1 : 1
        setSlideIndex(index => Math.max(0, Math.min(slides.length - 1, index + direction)))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [ready])

  return (
    <section className="epilogue" aria-label="Epilogue Slideshow" style={{ visibility: ready ? 'visible' : 'hidden' }}>
      <div className={`epilogue-stage${slides[slideIndex].id === 'infographic' ? ' epilogue-stage-story' : ''}`}>
        {slides.map((slide, index) => (
          <div className={`epilogue-slide${epilogueCopy[slide.id] ? ' epilogue-slide-narrated' : ''}${slide.images.length === 0 ? ' epilogue-slide-text' : ''}${slide.id === 'infographic' ? ' epilogue-slide-story' : ''}`} key={slide.id} hidden={index !== slideIndex}>
            {epilogueCopy[slide.id] && <div className="epilogue-narrative">{epilogueCopy[slide.id]}</div>}
            {slide.images.length > 0 && <div className={`epilogue-images${slide.images.length === 3 ? ' epilogue-images-trio' : slide.images.length === 2 ? ' epilogue-images-pair' : ''}`}>
              {slide.images.map(image => (
                <figure key={image.file}>
                  <img src={`/puzzle/${image.file}`} alt={image.alt} loading="eager" decoding="sync" />
                </figure>
              ))}
            </div>}
          </div>
        ))}
      </div>
      <nav className="epilogue-controls" aria-label="Slideshow controls">
        <button className="hunt-button hunt-button-secondary" disabled={slideIndex === 0} onClick={() => setSlideIndex(index => Math.max(0, index - 1))}>Previous</button>
        <p role="status" aria-live="polite">{slideIndex + 1} / {slides.length}</p>
        <button className="hunt-button" disabled={slideIndex === slides.length - 1} onClick={() => setSlideIndex(index => Math.min(slides.length - 1, index + 1))}>Next</button>
      </nav>
    </section>
  )
}
