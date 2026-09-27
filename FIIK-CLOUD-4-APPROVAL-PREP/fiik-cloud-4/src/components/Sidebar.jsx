import { NavLink } from 'react-router-dom'

// Shared startup-dashboard sidebar. Order matches the foundation doc
// exactly. Only "Active Pilots" is a real destination in this
// module (it fans out to Approval/PREP); the rest are placeholders
// owned by other Cloud modules.
const NAV_ITEMS = [
  { label: 'Home', to: '#', enabled: false },
  { label: 'Browse Opportunities', to: '#', enabled: false },
  { label: 'My Applications', to: '#', enabled: false },
  { label: 'Active Pilots', to: '/approval-payment', enabled: true, match: ['/approval-payment'] },
  { label: 'Evidence Submission', to: '#', enabled: false },
  { label: 'My PREP', to: '/prep-generation', enabled: true, match: ['/prep-generation', '/'] },
  { label: 'My Profile', to: '#', enabled: false },
  { label: 'Support', to: '#', enabled: false },
]

export default function Sidebar({ active }) {
  return (
    <aside className="w-56 shrink-0 bg-white border-r border-gray-200 hidden lg:flex lg:flex-col">
      <div className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
        Startup Dashboard
      </div>
      <nav className="flex-1 px-2 pb-4 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = item.match ? item.match.includes(active) : false
          const base =
            'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors'
          if (!item.enabled) {
            return (
              <span
                key={item.label}
                className={`${base} text-gray-300 cursor-not-allowed select-none`}
                title="Part of another FIIK module"
              >
                <NavDot />
                {item.label}
              </span>
            )
          }
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={`${base} ${
                isActive
                  ? 'bg-saffron-light text-saffron-dark font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <NavDot active={isActive} />
              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

function NavDot({ active }) {
  return (
    <span
      className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-saffron' : 'bg-gray-300'}`}
      aria-hidden="true"
    />
  )
}
