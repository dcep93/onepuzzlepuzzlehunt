type Scene = 'name' | 'chess' | 'freedom'

// Deliberately simple classroom-poster illustrations; the adjacent text tells the story.
export default function StoryPicture({ scene }: { scene: Scene }) {
  return (
    <svg className="history-poster-picture" viewBox="0 0 200 135" aria-hidden="true" focusable="false">
      {scene === 'name' && <>
        <rect x="34" y="8" width="132" height="119" rx="3" fill="#fffdf4" stroke="currentColor" strokeWidth="4" transform="rotate(-5 100 68)" />
        <path d="M55 32h75M55 44h87M55 92h76M55 104h60" stroke="#aaa78f" strokeWidth="4" />
        <rect x="43" y="56" width="115" height="23" fill="#ead86a" transform="rotate(-5 100 68)" />
        <text x="100" y="73" textAnchor="middle" fontSize="15" fontWeight="900" fill="currentColor">BERNSTEIN</text>
        <path d="m159 32 15-15m-11 27 24-3" stroke="#a54b31" strokeWidth="5" />
      </>}
      {scene === 'chess' && <>
        <path d="M25 110h150l18 18H7z" fill="#aaa78f" stroke="currentColor" strokeWidth="3" />
        <path d="M45 110v18m35-18v18m35-18v18m35-18v18M17 120h166" stroke="currentColor" strokeWidth="2" />
        <text x="26" y="106" fontSize="99" fill="currentColor">♚</text>
        <text x="118" y="101" fontSize="75" fill="#a54b31" transform="rotate(24 149 81)">♔</text>
        <path d="m133 18 6 19m17-20-5 20m25-8-15 16" stroke="#a54b31" strokeWidth="4" />
      </>}
      {scene === 'freedom' && <>
        <circle cx="137" cy="37" r="27" fill="#ead86a" />
        <path d="M50 128 85 70h30l40 58" fill="#d6d0b8" />
        <path d="M15 126V20l42-12v104M185 126V20L143 8v104M29 20v100M43 16v99M157 16v99M171 20v100" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="100" cy="57" r="11" fill="currentColor" />
        <path d="M87 89V76a13 13 0 0 1 26 0v13l-5 25h-7l-1-23-1 23h-7z" fill="currentColor" />
      </>}
    </svg>
  )
}
