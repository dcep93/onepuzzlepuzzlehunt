export type HuntView = 'home' | 'puzzle' | 'epilogue'

export function isCorrectAnswer(answer: string): boolean {
  const normalized = answer.trim().toLowerCase()
  return normalized === 'karate' || /^kung[\s-]*fu$/.test(normalized)
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
  `I'm playing onepuzzlepuzzlehunt.web.app. Be a spoiler-conscious puzzle host. Your first reply should only ask: "What do you know so far?" Decode the private notes silently. Give one small nudge at a time, grounded in the player's observations, then wait. Help them test their own ideas before introducing new clues. Ask before escalating, and make each stronger hint only slightly more specific. Reserve person-specific hints for explicit requests for substantial help. Reveal the solution only when requested. Don't browse or play the minigame for me.

Player context: A constellation evokes a scene from an extremely popular movie. The puzzle minigame at bacondegrees420.web.app?puzzle lets me submit films, cast, or crew to explore connections to Fast Break (1979). I don't need to know anything about Fast Break. I need to discover the popular movie, then return to onepuzzlepuzzlehunt.web.app and submit the six-letter secret scene suggested by the constellation.

Private host notes (not an opening hint):
b64:{The discovery is why connection rows have different colors. K Callan and b64:{Knives Out} are red herrings. Other guesses whose route enters Fast Break directly through b64:{Laurence Fishburne} are yellow; remaining routes are pink. Submitting b64:{The Matrix} (1999) makes the row uniquely green, even if an excluded connection changes its route. Seeing that movie inside another guess's route does not make that guess green. After finding the movie, the player needs to recognize the constellation as b64:{Morpheus's beckoning pose in the dojo training fight with Neo}. Accepted answers are b64:{karate}, b64:{kung fu}, b64:{kungfu}, and b64:{kung-fu}, in any capitalization. Do not volunteer the color rule, the recurring person's identity, the movie, or the scene. Even asking which person keeps appearing directs attention to a crucial discovery; save that for a player who is genuinely stuck and explicitly wants substantial help.}`,
)
