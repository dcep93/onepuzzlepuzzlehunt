import { useEffect, useState } from 'react'

const chessHref = 'https://chess420.web.app/endgames/knightAndBishop+#w//7k/8/5K2/6N1/4B3/8/8/8_w_-_-_42_22'
const slides = [
  { file: 'greatnana.avif', alt: 'Great Nana sits behind Benoit Blanc in a scene from Knives Out.' },
  { file: 'pose.png', alt: 'Morpheus beckoning with one hand in the martial arts training scene from The Matrix.' },
  { file: 'pose_constellation.png', alt: 'The constellation overlaid on Morpheus’s pose.' },
  { file: 'boxes.png', alt: 'The constellation’s five points marked with squares over Morpheus’s pose.' },
  { file: 'infographic.png', alt: 'An illustrated account of Ossip Bernstein and the 1918 chess game said to have saved his life.' },
  { file: 'life_saving_game_screenshot.png', alt: 'The chess position from the life-saving game.' },
  { file: 'overlay_start.png', alt: 'Morpheus and the constellation overlaid on a chessboard.' },
  { file: 'overlay_end.png', alt: 'The constellation as a memory aid for the knight and bishop endgame. Open the endgame to play.', href: chessHref },
]

export default function Epilogue() {
  const [slideIndex, setSlideIndex] = useState(0)
  useEffect(() => {
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
  }, [])

  const slide = slides[slideIndex]
  const picture = <img key={slide.file} src={`/puzzle/${slide.file}`} alt={slide.alt} />
  return (
    <section className="epilogue" aria-label="Epilogue slideshow">
      <div className="epilogue-stage">
        {slide.href ? <a href={slide.href} target="_blank" rel="noopener noreferrer">{picture}</a> : picture}
      </div>
      <nav className="epilogue-controls" aria-label="Slideshow controls">
        <button className="hunt-button hunt-button-secondary" disabled={slideIndex === 0} onClick={() => setSlideIndex(index => Math.max(0, index - 1))}>Previous</button>
        <p role="status" aria-live="polite">{slideIndex + 1} / {slides.length}</p>
        <button className="hunt-button" disabled={slideIndex === slides.length - 1} onClick={() => setSlideIndex(index => Math.min(slides.length - 1, index + 1))}>Next</button>
      </nav>
    </section>
  )
}
