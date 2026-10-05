import type { ReactNode } from 'react'
import BernsteinStory from './bernstein-story'

export const epilogueCopy: Record<string, ReactNode> = {
  congratulations: <ul>
    <li>Congratulations, you finished the puzzle hunt!</li>
    <li>Fast Break's most notable connection is Laurence Fishburne, hinting towards The Matrix, which is that popular movie I was looking for.</li>
    <li>Specifically The Matrix's connection row is uniquely colored green. Other connections through Laurence Fishburne are colored yellow, and the remaining connections are colored pink.</li>
  </ul>,
  'red-herring': <p>Perhaps, you considered thematically exploring one of the Rian Johnson mystery films, but that would've connected you to Fast Break via K Callan, a red herring! In case you don't remember her character by name, she played Greatnana Wanetta in Knives Out.</p>,
  'dojo-answer': <p>Once you lock in on The Matrix, you need to find the scene associated with the constellation. Of course, I'm talking about the scene Neo and Morpheus fight in the dojo! Either "karate" or "kung fu" were acceptable answers.</p>,
  infographic: <BernsteinStory />,
  'life-saving-game': <ul>
    <li>A few months ago, I was white in this position, with about a minute on the clock, but the game ended in a draw.</li>
    <li>To test myself, I promoted to a bishop, but in the end, I couldn't convert to checkmate in such a small time limit.</li>
  </ul>,
  'overlay-start': <p>If we place the constellation over the chessboard, you can see <a href="https://www.youtube.com/watch?v=oRK7XLhGz_c" target="_blank" rel="noopener noreferrer">Naroditsky's W Maneuver</a>, which I think is the best way to learn the bishop + knight checkmate.</p>,
  'overlay-end': <ul>
    <li>Thanks for playing!</li>
    <li>From here, all that's left to do is to practice the checkmate, in case you find yourself in the Russian Revolution, or similar.</li>
    <li>I made another tool, <a href="https://lottaendgames.web.app/mate/bishop-knight/train#live=7k/8/5K2/6N1/4B3/8/8/8" target="_blank" rel="noopener noreferrer">lottaendgames.web.app</a> where you can practice different checkmating patterns.</li>
    <li>Unfortunately, due to the complexity, the "best move" for knight + bishop isn't very human-learnable, but it can still help if you get stuck, and offers a timer.</li>
    <li>A lifelong challenge: can you consistently bishop + knight checkmate in one minute? How about 15 seconds?</li>
  </ul>,
}
