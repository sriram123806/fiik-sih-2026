import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'

export default function PageShell({ active, title, subtitle, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F8]">
      <Header />
      <div className="flex flex-1">
        <Sidebar active={active} />
        <main className="flex-1 min-w-0">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-gray-500 mt-1 max-w-2xl">{subtitle}</p>
                )}
              </div>
              <button className="hidden sm:inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors shrink-0">
                <BackArrow />
                Back to Dashboard
              </button>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

function BackArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19 12H5M5 12l6-6M5 12l6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
