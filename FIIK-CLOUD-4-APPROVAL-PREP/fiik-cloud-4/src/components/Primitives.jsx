export function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-card shadow-card p-4 sm:p-5 ${className}`}
    >
      {children}
    </div>
  )
}

export function SectionHeading({ index, title, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-[15px] font-semibold text-gray-900">
        {index && <span className="text-gray-400 font-normal mr-1.5">{index}.</span>}
        {title}
      </h2>
      {action}
    </div>
  )
}

export function Field({ label, value }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-gray-400">{label}</div>
      <div className="font-medium text-gray-800 text-sm mt-0.5">{value}</div>
    </div>
  )
}

// Prototype-only QR placeholder — a static pattern, not a real code.
// Never wire this to a live lookup; the foundation doc requires the
// QR to read as illustrative only.
export function QrPlaceholder({ size = 64 }) {
  const cells = []
  let seed = 42
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648
    return seed / 2147483648
  }
  const grid = 7
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      const corner =
        (x < 2 && y < 2) || (x > grid - 3 && y < 2) || (x < 2 && y > grid - 3)
      cells.push(corner ? y % 2 === 0 : rand() > 0.5)
    }
  }
  const cell = size / grid
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="Reference QR code (prototype)">
      <rect width={size} height={size} fill="white" />
      {cells.map((on, i) => {
        if (!on) return null
        const x = (i % grid) * cell
        const y = Math.floor(i / grid) * cell
        return <rect key={i} x={x} y={y} width={cell} height={cell} fill="#0B1F3A" />
      })}
    </svg>
  )
}
