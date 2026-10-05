type SlideImage = { file: string; alt: string }
type EpilogueSlide = { id: string; images: SlideImage[] }

const morpheus = { file: 'pose.png', alt: 'Morpheus beckoning with one hand in the martial arts training scene from The Matrix.' }
export const slides: EpilogueSlide[] = [
  {
    id: 'congratulations',
    images: [
      { file: 'fast_break.jpg', alt: 'Fast Break (1979) film poster' },
      { file: 'laurence-fishburne.png', alt: 'Portrait of Laurence Fishburne' },
      { file: 'the-matrix.png', alt: 'The Matrix film poster' },
    ],
  },
  {
    id: 'red-herring',
    images: [{ file: 'greatnana.avif', alt: 'K Callan as Greatnana Wanetta sits behind Daniel Craig as Benoit Blanc in Knives Out.' }],
  },
  {
    id: 'dojo-answer',
    images: [morpheus, { file: 'constellation.png?v=2', alt: 'Five tan stars and a blue arrow pointing diagonally upward to the left.' }],
  },
  { id: 'infographic', images: [] },
  { id: 'life-saving-game', images: [{ file: 'life_saving_game_screenshot.png', alt: 'The chess position from the life-saving game.' }] },
  { id: 'morpheus', images: [morpheus] },
  { id: 'morpheus-constellation', images: [{ file: 'pose_constellation.png', alt: 'The constellation overlaid on Morpheus’s pose.' }] },
  { id: 'boxes', images: [{ file: 'boxes.png', alt: 'The constellation’s five points marked with squares over Morpheus’s pose.' }] },
  { id: 'overlay-start', images: [{ file: 'overlay_start.png', alt: 'Morpheus and the constellation overlaid on a chessboard.' }] },
  { id: 'overlay-end', images: [{ file: 'overlay_end.png', alt: 'The constellation as a memory aid for the knight and bishop endgame.' }] },
]

export const slideImageFiles = [...new Set(slides.flatMap(slide => slide.images.map(image => image.file)))]

// Keep the decoded images alive so every slide is ready before the answer transition.
const preloadedImages: HTMLImageElement[] = []
let preloadPromise: Promise<void> | undefined
let ready = false

export function isEpilogueReady(): boolean {
  return ready
}

export function preloadEpilogue(): Promise<void> {
  if (!preloadPromise) {
    preloadPromise = Promise.all(slideImageFiles.map(file => {
      const image = new Image()
      preloadedImages.push(image)
      image.src = `/puzzle/${file}`
      // A failed asset must not strand someone on the solved puzzle.
      return image.decode().catch(() => undefined)
    })).then(() => { ready = true })
  }
  return preloadPromise
}
