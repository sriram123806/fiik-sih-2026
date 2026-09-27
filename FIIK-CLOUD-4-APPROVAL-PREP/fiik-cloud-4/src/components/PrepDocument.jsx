import { QrPlaceholder } from './Primitives.jsx'

// The signature "digital passport" visual for PREP. Deliberately
// distinct from an ordinary dashboard card: a portrait credential
// with a tricolour base band, a wave motif, and a QR reference —
// FIIK's own identity, not an Aadhaar-style layout.
export default function PrepDocument({ pilotId, issueDate, compact = false }) {
  return (
    <div
      className={`relative overflow-hidden rounded-card shadow-card border border-navy/10 bg-gradient-to-b from-navy to-navy-dark text-white ${
        compact ? 'w-full max-w-[280px]' : 'w-full max-w-sm'
      }`}
    >
      {/* wave motif */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-90"
        viewBox="0 0 400 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,60 C100,20 300,90 400,40 L400,90 L0,90 Z" fill="#F26A21" opacity="0.9" />
        <path d="M0,70 C120,40 280,95 400,55 L400,90 L0,90 Z" fill="#1B8A4A" opacity="0.55" />
      </svg>

      <div className="relative p-5 flex flex-col gap-6 min-h-[220px]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-saffron flex items-center justify-center text-[11px] font-extrabold">
            F
          </div>
          <span className="font-bold tracking-tight">FIIK</span>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-white/70">
            Procurement Readiness Evidence Passport
          </div>
          <div className="text-lg font-semibold leading-snug mt-1">
            Pilot Performance Record (PREP)
          </div>
          <div className="text-[11px] text-white/70 mt-1">
            A verified path from pilot to procurement
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div className="text-[11px] leading-tight">
            <div className="font-semibold">{pilotId}</div>
            <div className="text-white/70">Issued on: {issueDate}</div>
          </div>
          <div className="bg-white rounded p-1">
            <QrPlaceholder size={48} />
          </div>
        </div>
      </div>
    </div>
  )
}
