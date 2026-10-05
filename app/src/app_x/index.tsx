import { lazy, Suspense, useEffect, useRef } from 'react'
import { navigate, useHuntView } from './navigation'
import PuzzlePage from './puzzle-page'
import Constellation from './constellation'
import './styles.css'

const Epilogue = lazy(() => import('./epilogue'))
const headings = {
  home: 'This constellation might save your life',
  puzzle: 'The puzzle',
  epilogue: 'Epilogue',
}

export default function App() {
  const view = useHuntView()
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    const path = view === 'home' ? '/' : `/${view}`
    if (window.location.pathname !== path) window.history.replaceState(null, '', path)
    document.title = view === 'home' ? 'One Puzzle Puzzle Hunt' : `${headings[view]} · One Puzzle Puzzle Hunt`
    window.scrollTo(0, 0)
    headingRef.current?.focus({ preventScroll: true })
  }, [view])

  return (
    <main className={`hunt hunt-${view}`}>
      <div className="hunt-content">
        <header className="hunt-header">
          <p className="hunt-eyebrow"><a href="/">One Puzzle Puzzle Hunt</a></p>
          <h1 ref={headingRef} tabIndex={-1}>{headings[view]}</h1>
          {view === 'home' && <p className="hunt-subtitle">Solve this puzzle to find out why</p>}
        </header>
        {view === 'home' && (
          <div className="hunt-intro">
            <Constellation className="home-constellation" />
            <button className="hunt-button begin-button" onClick={() => navigate('puzzle')}>begin</button>
          </div>
        )}
        {view === 'puzzle' && <PuzzlePage />}
        {view === 'epilogue' && <Suspense fallback={<p role="status">Loading epilogue…</p>}><Epilogue /></Suspense>}
      </div>
    </main>
  )
}
