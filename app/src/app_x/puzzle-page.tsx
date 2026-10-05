import { useState, type FormEvent } from 'react'
import { hintNarrative, isCorrectAnswer } from './puzzle'
import { navigate, rememberSolved } from './navigation'
import Constellation from './constellation'

export default function PuzzlePage() {
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')

  function submitAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isCorrectAnswer(answer)) {
      setFeedback(answer.trim() ? 'Not quite. Keep exploring.' : 'Enter your six-letter scene.')
      return
    }
    rememberSolved()
    navigate('epilogue')
  }

  return (
    <div className="puzzle-content">
      <p className="puzzle-introduction">This puzzle is centered around an obscure film from 1979 called &quot;Fast Break&quot;.</p>
      <div className="puzzle-images">
        <Constellation className="puzzle-constellation" />
        <img className="puzzle-poster" src="/puzzle/fast_break.jpg" alt="Fast Break (1979) film poster" />
      </div>
      <ul className="puzzle-narrative">
        <li>This constellation might save your life! It evokes in my mind a particular scene from an extremely popular movie, different from Fast Break, which is of course not popular.</li>
        <li>Don't cheat, look things up, or use tools beyond the specific puzzle minigame linked below. You don't need to know anything at all about Fast Break.</li>
        <li>I made a tool, bacondegrees420, which is a fun way to find the shortest path connection between any two items: films, cast or crew.</li>
        <li>Visit <a href="https://bacondegrees420.web.app/?puzzle" target="_blank" rel="noopener noreferrer">bacondegrees420.web.app?puzzle</a> - then, type in the box and submit to explore connections to Fast Break. Be sure to use this and not the normal bacondegrees420 app, since that would spoil the puzzle.</li>
        <li>You will use this minigame to discover my 6 letter secret scene, which will help you memorize the constellation.</li>
      </ul>
      <form className="answer-form" onSubmit={submitAnswer}>
        <label htmlFor="scene-answer">The six-letter secret scene</label>
        <div className="answer-controls">
          <input autoCapitalize="none" autoComplete="off" autoCorrect="off" id="scene-answer" name="answer"
            onChange={event => { setAnswer(event.target.value); setFeedback('') }}
            spellCheck={false} type="text" value={answer} aria-describedby="answer-feedback" />
          <button className="hunt-button" type="submit">Submit</button>
        </div>
        <p className="answer-feedback" id="answer-feedback" role="status">{feedback}</p>
      </form>
      <section className="hint-section" aria-labelledby="hint-heading">
        <h2 id="hint-heading">Need a nudge?</h2>
        <p>If you get stuck, ask your clanker for a hint by pasting the puzzle narrative below.</p>
        <label className="visually-hidden" htmlFor="hint-narrative">Puzzle narrative to copy for a hint</label>
        <textarea id="hint-narrative" readOnly rows={9} spellCheck={false} value={hintNarrative} />
      </section>
    </div>
  )
}
