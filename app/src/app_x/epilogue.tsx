import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { isEpilogueReady, preloadEpilogue, slides } from './epilogue-assets'
import { epilogueCopy } from './epilogue-copy'
import BernsteinStory from './bernstein-story'

export default function Epilogue() {
  const [{ slideIndex, storyStage }, setProgress] = useState({ slideIndex: 0, storyStage: 'hidden' })
  const viewportRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(isEpilogueReady)
  const nextDisabled = slideIndex === slides.length - 1 || (slides[slideIndex].id === 'infographic' && storyStage !== 'unlocked')
  const changeSlide = useCallback((direction: number) => {
    setProgress(current => {
      if (direction > 0 && slides[current.slideIndex].id === 'infographic' && current.storyStage !== 'unlocked') return current
      const nextIndex = Math.max(0, Math.min(slides.length - 1, current.slideIndex + direction))
      return nextIndex === current.slideIndex ? current : { slideIndex: nextIndex, storyStage: current.storyStage === 'unlocked' ? 'unlocked' : 'hidden' }
    })
  }, [])
  const revealStory = () => setProgress(current => ({ ...current, storyStage: 'revealed' }))
  const unlockStory = () => setProgress(current => current.storyStage === 'revealed' ? { ...current, storyStage: 'unlocked' } : current)
  useLayoutEffect(() => {
    viewportRef.current?.scrollTo({ top: 0, behavior: 'instant' })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slideIndex])
  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    let scrollsInsideSlide = getComputedStyle(viewport).overflowY === 'auto'
    const observer = new ResizeObserver(() => {
      const nextScrollsInsideSlide = getComputedStyle(viewport).overflowY === 'auto'
      // Reset only when the scroll container changes, not as mobile browser bars resize.
      if (nextScrollsInsideSlide !== scrollsInsideSlide) {
        viewport.scrollTo({ top: 0, behavior: 'instant' })
        window.scrollTo({ top: 0, behavior: 'instant' })
        scrollsInsideSlide = nextScrollsInsideSlide
      }
    })
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])
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
        changeSlide(direction)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [ready, changeSlide])

  return (
    <section className="epilogue" aria-label="Epilogue Slideshow" style={{ visibility: ready ? 'visible' : 'hidden' }}>
      <div className="epilogue-viewport" ref={viewportRef} tabIndex={0} role="region" aria-label="Slide content">
        <div className={`epilogue-stage${slides[slideIndex].id === 'infographic' ? ' epilogue-stage-story' : ''}${slides[slideIndex].id === 'overlay-end' ? ' epilogue-stage-finale' : ''}`}>
          {slides.map((slide, index) => (
            <div className={`epilogue-slide${epilogueCopy[slide.id] || slide.id === 'infographic' ? ' epilogue-slide-narrated' : ''}${slide.images.length === 0 ? ' epilogue-slide-text' : ''}${slide.id === 'infographic' ? ' epilogue-slide-story' : ''}${slide.id === 'overlay-end' ? ' epilogue-slide-finale' : ''}`} key={slide.id} hidden={index !== slideIndex}>
              {slide.id === 'infographic' && <div className="epilogue-narrative"><BernsteinStory revealed={storyStage !== 'hidden'} unlocked={storyStage === 'unlocked'} onReveal={revealStory} onUnlock={unlockStory} /></div>}
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
      </div>
      <nav className="epilogue-controls" aria-label="Slideshow controls">
        <button className="hunt-button hunt-button-secondary" disabled={slideIndex === 0} onClick={() => changeSlide(-1)}>Previous</button>
        <p role="status" aria-live="polite">{slideIndex + 1} / {slides.length}</p>
        <button className="hunt-button" disabled={nextDisabled} onClick={() => changeSlide(1)}>{slides[slideIndex].id === 'infographic' ? 'See the connection →' : 'Next'}</button>
      </nav>
    </section>
  )
}
