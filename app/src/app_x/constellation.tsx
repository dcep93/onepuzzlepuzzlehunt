export default function Constellation({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="273 295 1229 761"
      width={1229}
      height={761}
      role="img"
      aria-label="Five tan stars and a blue arrow pointing diagonally upward to the left."
    >
      {/* Visible PNG bounds plus a 32-pixel margin, without resampling the artwork. */}
      <image href="/puzzle/constellation.png" width={1591} height={1145} />
    </svg>
  )
}
