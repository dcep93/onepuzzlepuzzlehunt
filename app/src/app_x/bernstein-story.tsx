export default function BernsteinStory() {
  return (
    <div className="bernstein-story">
      <header className="bernstein-story-heading">
        <h2 className="epilogue-slide-title">How could this save my life?</h2>
        <p className="bernstein-story-setting">Odessa · After the Russian Revolution</p>
        <h3>A game for his life</h3>
        <p>Chess writer Edward Lasker recounted this story about <strong>Ossip Bernstein</strong>, a chess master and lawyer.</p>
      </header>
      <ol className="bernstein-story-steps">
        <li>
          <h4>A name on a list</h4>
          <p>Arrested by the Bolshevik secret police for his work advising bankers and businesses, Bernstein faced a firing squad. An officer noticed his name on the prisoner list.</p>
        </li>
        <li>
          <h4>Prove it at the board</h4>
          <p>Was this really the famous chess master? The officer demanded a game to find out. Bernstein had to demonstrate his skill with his life at stake.</p>
        </li>
        <li>
          <h4>A win. A way out.</h4>
          <p>Bernstein won quickly. According to Lasker, the officer sent him and the other prisoners back to prison, and they were later released.</p>
        </li>
      </ol>
      <p className="bernstein-story-payoff">Sometimes, knowing how to win is more than just a game.</p>
      <p className="bernstein-story-source">As told by Edward Lasker in <cite>Chess Review</cite>, April 1963. <a href="https://en.chessbase.com/newsroom/post/ossip-bernstein-september-20-1882-november-30-1962-the-last-star-of-chess-golden-age" target="_blank" rel="noopener noreferrer">Read the account</a>.</p>
    </div>
  )
}
