import { useCallback, useEffect, useRef, useState } from 'react'

import { isEpilogueReady, preloadEpilogue, slides } from './epilogue-assets'
import { epilogueCopy } from './epilogue-copy'
import BernsteinStory from './bernstein-story'

export default function Epilogue() {
  const [slideIndex, setSlideIndex] = useState(0)
  const [ready, setReady] = useState(isEpilogueReady)
  const [storyRead, setStoryRead] = useState(false)
  const controlsRef = useRef<HTMLElement>(null)
  const unlockStory = useCallback(() => setStoryRead(true), [])
  const nextDisabled = slideIndex === slides.length - 1 || (slides[slideIndex].id === 'infographic' && !storyRead)
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
        setSlideIndex(index => {
          if (direction === 1 && slides[index].id === 'infographic' && !storyRead) return index
          return Math.max(0, Math.min(slides.length - 1, index + direction))
        })
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [ready, storyRead])

  return (
    <section className="epilogue" aria-label="Epilogue Slideshow" style={{ visibility: ready ? 'visible' : 'hidden' }}>
      <div className={`epilogue-stage${slides[slideIndex].id === 'infographic' ? ' epilogue-stage-story' : ''}${slides[slideIndex].id === 'overlay-end' ? ' epilogue-stage-finale' : ''}`}>
        {slides.map((slide, index) => (
          <div className={`epilogue-slide${epilogueCopy[slide.id] || slide.id === 'infographic' ? ' epilogue-slide-narrated' : ''}${slide.images.length === 0 ? ' epilogue-slide-text' : ''}${slide.id === 'infographic' ? ' epilogue-slide-story' : ''}${slide.id === 'overlay-end' ? ' epilogue-slide-finale' : ''}`} key={slide.id} hidden={index !== slideIndex}>
            {slide.id === 'infographic' && <div className="epilogue-narrative"><BernsteinStory active={ready && index === slideIndex} controlsRef={controlsRef} onQuestionSeen={unlockStory} /></div>}
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
      <nav ref={controlsRef} className="epilogue-controls" aria-label="Slideshow controls">
        <button className="hunt-button hunt-button-secondary" disabled={slideIndex === 0} onClick={() => setSlideIndex(index => Math.max(0, index - 1))}>Previous</button>
        <p role="status" aria-live="polite">{slideIndex + 1} / {slides.length}</p>
        <button className="hunt-button" disabled={nextDisabled} onClick={() => setSlideIndex(index => Math.min(slides.length - 1, index + 1))}>{slides[slideIndex].id === 'infographic' ? 'See the connection →' : 'Next'}</button>
      </nav>
    </section>
  )
}
