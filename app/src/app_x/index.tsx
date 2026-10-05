import './styles.css'

export default function App() {
  return (
    <main className="hunt">
      <div className="hunt-content">
        <header className="hunt-header">
          <p className="hunt-eyebrow">one puzzle. a whole hunt.</p>
          <h1>
            One Puzzle
            <br />
            Puzzle Hunt
          </h1>
        </header>
        <section className="coming-soon" aria-labelledby="coming-soon-title">
          <span className="mystery-tile" aria-hidden="true">?</span>
          <h2 id="coming-soon-title">Coming soon</h2>
          <p>A little mystery is taking shape.</p>
        </section>
      </div>
    </main>
  )
}
