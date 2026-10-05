const chessHref = 'https://chess420.web.app/endgames/knightAndBishop+#w//7k/8/5K2/6N1/4B3/8/8/8_w_-_-_42_22'
export const slides = [
  { file: 'greatnana.avif', alt: 'Great Nana sits behind Benoit Blanc in a scene from Knives Out.' },
  { file: 'pose.png', alt: 'Morpheus beckoning with one hand in the martial arts training scene from The Matrix.' },
  { file: 'pose_constellation.png', alt: 'The constellation overlaid on Morpheus’s pose.' },
  { file: 'boxes.png', alt: 'The constellation’s five points marked with squares over Morpheus’s pose.' },
  { file: 'infographic.png', alt: 'An illustrated account of Ossip Bernstein and the 1918 chess game said to have saved his life.' },
  { file: 'life_saving_game_screenshot.png', alt: 'The chess position from the life-saving game.' },
  { file: 'overlay_start.png', alt: 'Morpheus and the constellation overlaid on a chessboard.' },
  { file: 'overlay_end.png', alt: 'The constellation as a memory aid for the knight and bishop endgame. Open the endgame to play.', href: chessHref },
]

// Keep the decoded images alive so every slide is ready before the answer transition.
const preloadedImages: HTMLImageElement[] = []
let preloadPromise: Promise<void> | undefined
let ready = false

export function isEpilogueReady(): boolean {
  return ready
}

export function preloadEpilogue(): Promise<void> {
  if (!preloadPromise) {
    preloadPromise = Promise.all(slides.map(slide => {
      const image = new Image()
      preloadedImages.push(image)
      image.src = `/puzzle/${slide.file}`
      // A failed asset must not strand someone on the solved puzzle.
      return image.decode().catch(() => undefined)
    })).then(() => { ready = true })
  }
  return preloadPromise
}
