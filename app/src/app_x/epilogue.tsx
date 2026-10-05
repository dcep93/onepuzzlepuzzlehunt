import { useEffect, useState } from 'react'

import { isEpilogueReady, preloadEpilogue, slides } from './epilogue-assets'

export default function Epilogue() {
  const [slideIndex, setSlideIndex] = useState(0)
  const [ready, setReady] = useState(isEpilogueReady)
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
    <section className="epilogue" aria-label="Epilogue slideshow" style={{ visibility: ready ? 'visible' : 'hidden' }}>
      <div className="epilogue-stage">
        {slides.map((slide, index) => {
          const picture = <img src={`/puzzle/${slide.file}`} alt={slide.alt} loading="eager" decoding="sync" />
          return (
            <div className="epilogue-slide" key={slide.file} hidden={index !== slideIndex}>
              {slide.href ? <a href={slide.href} target="_blank" rel="noopener noreferrer">{picture}</a> : picture}
            </div>
          )
        })}
      </div>
      <nav className="epilogue-controls" aria-label="Slideshow controls">
        <button className="hunt-button hunt-button-secondary" disabled={slideIndex === 0} onClick={() => setSlideIndex(index => Math.max(0, index - 1))}>Previous</button>
        <p role="status" aria-live="polite">{slideIndex + 1} / {slides.length}</p>
        <button className="hunt-button" disabled={slideIndex === slides.length - 1} onClick={() => setSlideIndex(index => Math.min(slides.length - 1, index + 1))}>Next</button>
      </nav>
    </section>
  )
}
