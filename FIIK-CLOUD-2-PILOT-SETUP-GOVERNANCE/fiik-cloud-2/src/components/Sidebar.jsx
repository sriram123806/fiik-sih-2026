import { useLocation, NavLink } from 'react-router-dom';
import {
  Home, Search, FileText, Rocket, ClipboardCheck,
  BadgeCheck, UserCircle2, LifeBuoy
} from 'lucide-react';
import './Sidebar.css';

// Standard Startup Dashboard navigation (shared across the whole FIIK app).
// This module (Cloud 2) only implements Registration, Work Order Builder and
// Four-Party Review, which sit contextually under "My Profile" and
// "My Applications" — those two items light up depending on the active page.
const NAV = [
  { label: 'Home', icon: Home, contexts: [] },
  { label: 'Browse Opportunities', icon: Search, contexts: [] },
  { label: 'My Applications', icon: FileText, contexts: ['/work-order', '/four-party-review'] },
  { label: 'Active Pilots', icon: Rocket, contexts: [] },
  { label: 'Evidence Submission', icon: ClipboardCheck, contexts: [] },
  { label: 'My PREP', icon: BadgeCheck, contexts: [] },
  { label: 'My Profile', icon: UserCircle2, contexts: ['/registration'] },
  { label: 'Support', icon: LifeBuoy, contexts: [] },
];

const MODULE_PAGES = [
  { label: '04 · Startup Registration', to: '/registration' },
  { label: '05 · Requirement & Work Order', to: '/work-order' },
  { label: '06 · Four-Party Review', to: '/four-party-review' },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="fiik-sidebar">
      <div className="sidebar-title">Startup Dashboard</div>
      <nav className="sidebar-nav">
        {NAV.map(({ label, icon: Icon, contexts }) => {
          const isActive = contexts.includes(pathname);
          return (
            <span key={label} className={'nav-item' + (isActive ? ' active' : ' disabled')}>
              <Icon size={17} />
              {label}
            </span>
          );
        })}
      </nav>
      <div className="sidebar-divider" />
      <div className="sidebar-title small">Module preview</div>
      <nav className="sidebar-nav">
        {MODULE_PAGES.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => 'nav-item module' + (isActive ? ' active' : '')}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
