import { useState } from 'react'

import StoryPicture from './story-picture'

const steps = [
  { title: 'Arrested!', picture: 'prison', text: 'After the Russian Revolution, chess master and lawyer Ossip Bernstein was arrested by the Bolshevik secret police. He faced a firing squad.' },
  { title: 'Wait. THAT Bernstein?', picture: 'name', text: 'An officer spotted his name. Was this really the famous chess master? There was one way to find out.' },
  { title: 'A game for his life', picture: 'chess', text: 'The officer demanded a game. Bernstein had to prove his chess skill—with his life at stake. He won quickly.' },
  { title: 'He survived!', picture: 'freedom', text: 'According to chess writer Edward Lasker, Bernstein and the other prisoners were sent back to prison and later released.' },
] as const

export default function BernsteinStory() {
  const [revealed, setRevealed] = useState(false)
  return (
    <div className="bernstein-story">
      <header className="bernstein-story-heading">
        <h2 className="epilogue-slide-title">How could this save my life?</h2>
        <p>If you'd like, pause and consider your own response before continuing.</p>
        <button className="hunt-button" aria-expanded={revealed} aria-controls="bernstein-answer" onClick={() => setRevealed(value => !value)}>
          {revealed ? 'Hide answer' : 'Reveal answer'}
        </button>
      </header>
      <div id="bernstein-answer" hidden={!revealed}>
        <article className="history-poster" aria-label="The story of Ossip Bernstein">
          <header className="history-poster-heading">
            <p className="history-poster-kicker">A VERY IMPORTANT HISTORY LESSON</p>
            <h3>CHESS SAVED<br />THIS MAN’S LIFE.</h3>
            <p className="history-poster-subtitle">OSSIP BERNSTEIN · CHESS MASTER · LAWYER</p>
          </header>
          <ol className="history-poster-steps">
            {steps.map((step, index) => (
              <li key={step.picture}>
                <span className="history-poster-number" aria-hidden="true">{index + 1}</span>
                <h4>{step.title}</h4>
                <StoryPicture scene={step.picture} />
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="history-poster-moral"><span aria-hidden="true">★</span> CHESS: POSSIBLY A SURVIVAL SKILL.</p>
          <p className="history-poster-source">As told by Edward Lasker in <cite>Chess Review</cite>, April 1963. <a href="https://en.chessbase.com/newsroom/post/ossip-bernstein-september-20-1882-november-30-1962-the-last-star-of-chess-golden-age" target="_blank" rel="noopener noreferrer">Read the account</a>.</p>
        </article>
        <p className="bernstein-story-teaser"><strong>Why does memorizing this constellation help me in chess?</strong><br />Answer revealed on remaining slides.</p>
      </div>
    </div>
  )
}
