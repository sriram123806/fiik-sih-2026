import { Link } from 'react-router-dom'

// Shared header used across all authenticated FIIK pages. Kept
// identical across pages per the shared-foundation rule — do not
// redesign this per page.
export default function Header() {
  return (
    <header className="bg-navy text-white">
      {/* Top identity strip */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2 border-b border-white/10">
        <div className="flex items-center gap-3 text-[11px] sm:text-xs text-white/80">
          <div className="flex items-center gap-2">
            <EmblemIcon />
            <span className="leading-tight">
              Government of India
              <br className="hidden sm:block" />
              <span className="hidden sm:inline"> · </span>
              Ministry of Commerce and Industry
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[11px] sm:text-xs text-white/80">
          <span className="hidden md:inline">#startupindia</span>
          <span className="hidden md:inline">आज़ादी का अमृत महोत्सव</span>
        </div>
      </div>

      {/* Product row */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-saffron flex items-center justify-center font-extrabold text-white text-sm">
            F
          </div>
          <div className="leading-tight">
            <div className="font-bold text-lg tracking-tight">FIIK</div>
            <div className="text-[11px] text-white/70">
              Pilot Intelligence &amp; Evidence Infrastructure
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-4 sm:gap-5 text-sm">
          <button className="hidden sm:inline text-white/80 hover:text-white transition-colors">
            Help
          </button>
          <button
            className="relative text-white/80 hover:text-white transition-colors"
            aria-label="Notifications"
          >
            <BellIcon />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-saffron" />
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-white/15">
            <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-xs font-semibold">
              S
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-medium">Startup X</div>
              <div className="text-[11px] text-white/60">Startup</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function EmblemIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4" opacity="0.8" />
      <path d="M12 6v12M7 9l5-3 5 3" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.73 21a2 2 0 01-3.46 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
