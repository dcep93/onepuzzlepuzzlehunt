export type HuntView = 'home' | 'puzzle' | 'epilogue'

export function isCorrectAnswer(answer: string): boolean {
  const normalized = answer.trim().toLowerCase()
  return normalized === 'karate' || normalized === 'kung fu'
}

export function resolveView(pathname: string, solved: boolean): HuntView {
  const path = pathname.replace(/\/+$/, '')
  if (path === '/epilogue') return solved ? 'epilogue' : 'puzzle'
  return path === '/puzzle' ? 'puzzle' : 'home'
}

function encodeUtf8(text: string): string {
  const bytes = new TextEncoder().encode(text)
  return btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join(''))
}

/** Encode innermost brace-delimited content before its containing block. */
export function encodeBraces(source: string): string {
  let position = 0
  function parse(nested: boolean): string {
    let result = ''
    while (position < source.length) {
      const character = source[position++]
      if (character === '{') {
        result += encodeUtf8(parse(true))
      } else if (character === '}') {
        if (!nested) throw new Error('Unmatched closing brace in hint narrative')
        return result
      } else {
        result += character
      }
    }
    if (nested) throw new Error('Unmatched opening brace in hint narrative')
    return result
  }
  return parse(false)
}

export const hintNarrative = encodeBraces(
  "Point me in the right direction. I'm trying to solve onepuzzlepuzzlehunt.web.app - but I need a hint. Decrypt for yourself when necessary without spoiling the puzzle. To solve the puzzle, I need to navigate to bacondegrees420.web.app?puzzle and submit guesses in the connection box until I notice a pattern. b64:{K Callan and b64:{Knives Out} are red herrings. I should look for the reason for the coloring of the connection path. Eventually, I need to discover that b64:{Laurence Fishburne} is the main exit node from the obscure movie, Fast Break, and that their connections are colored differently. If I submit their most famous movie, b64:{The Matrix}, the connection path will be gold, signaling that I've found the popular movie, and now I need to pick the 6 letter secret scene. The answer to the puzzle is b64:{karate}, one of the famous scenes from that movie.}",
)
