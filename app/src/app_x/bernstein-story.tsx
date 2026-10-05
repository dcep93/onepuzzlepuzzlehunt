import { useState } from 'react'

import StoryPicture from './story-picture'
import { bernsteinPortrait } from './epilogue-assets'

const steps = [
  { title: 'Arrested!', picture: 'prison', text: 'After the Russian Revolution, chess master and lawyer Ossip Bernstein was arrested by the Bolshevik secret police. He faced a firing squad.' },
  { title: 'Wait. THAT Bernstein?', picture: 'name', text: 'An officer spotted his name. Was this really the famous chess master? There was one way to find out.' },
  { title: 'A game for his life', picture: 'chess', text: 'The officer demanded a game. Bernstein had to prove his chess skill—with his life at stake. He won quickly.' },
] as const

export default function BernsteinStory() {
  const [revealed, setRevealed] = useState(false)
  return (
    <div className="bernstein-story">
      <header className="bernstein-story-heading">
        <h2 className="epilogue-slide-title">How could this save my life?</h2>
        <div className="bernstein-reveal-controls">
          <p>Pause and take a guess, if you like.</p>
          <button className="hunt-button" aria-expanded={revealed} aria-controls="bernstein-answer" onClick={() => setRevealed(value => !value)}>
            {revealed ? 'Hide answer' : 'Reveal answer'}
          </button>
        </div>
      </header>
      <div id="bernstein-answer" hidden={!revealed}>
        <article className="history-poster" aria-label="The story of Ossip Bernstein">
          <header className="history-poster-heading">
            <h3>Ossip Bernstein’s close call</h3>
          </header>
          <ol className="history-poster-steps">
            {steps.map((step, index) => (
              <li key={step.picture}>
                <span className="history-poster-number" aria-hidden="true">{index + 1}</span>
                <h4>{step.title}</h4>
                <div className="history-poster-illustration">{step.picture === 'prison'
                  ? <img className="history-poster-portrait" src={`/puzzle/${bernsteinPortrait}`} width={292} height={371} alt="Ossip Bernstein in 1909" loading="eager" decoding="sync" />
                  : <StoryPicture scene={step.picture} />}</div>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="history-poster-moral">Bernstein’s victory convinced the officer. He spared Bernstein and the other prisoners from the firing squad, sending them back to prison. They were later released. Bernstein had played for his life—and won.</p>
          <p className="history-poster-source">As told by Edward Lasker in <cite>Chess Review</cite>, April 1963. <a href="https://en.chessbase.com/newsroom/post/ossip-bernstein-september-20-1882-november-30-1962-the-last-star-of-chess-golden-age" target="_blank" rel="noopener noreferrer">Read the account</a>. Portrait: <a href="https://commons.wikimedia.org/wiki/File:Ossip_Bernstein.JPG" target="_blank" rel="noopener noreferrer">St. Petersburg, 1909</a> (public domain).</p>
        </article>
        <aside className="bernstein-story-teaser">
          <p className="bernstein-story-continue">There’s more! <span aria-hidden="true">→</span></p>
          <p><strong>Why does memorizing this constellation help me in chess?</strong></p>
          <p>Keep going: the remaining slides reveal the connection. Select <strong>Next</strong> below.</p>
        </aside>
      </div>
    </div>
  )
}
