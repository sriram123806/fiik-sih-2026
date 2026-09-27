import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { icon: '🏠', label: 'Home', to: '#', disabled: true },
  { icon: '🔍', label: 'Browse Opportunities', to: '#', disabled: true },
  { icon: '📋', label: 'My Applications', to: '#', disabled: true },
  { icon: '⚙️', label: 'Active Pilots', to: '/execution' },
  { icon: '📤', label: 'Evidence Submission', to: '/evidence-submission' },
  { icon: '🪪', label: 'My PREP', to: '#', disabled: true },
  { icon: '👤', label: 'My Profile', to: '#', disabled: true },
];

export default function Sidebar() {
  return (
    <aside className="fiik-sidebar">
      <div className="fiik-sidebar-title">Startup Dashboard</div>
      {NAV_ITEMS.map((item) =>
        item.disabled ? (
          <span
            key={item.label}
            className="fiik-nav-item"
            style={{ opacity: 0.45, cursor: 'default' }}
            title="Not part of this module"
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </span>
        ) : (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) => 'fiik-nav-item' + (isActive ? ' active' : '')}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </NavLink>
        )
      )}
      <div className="fiik-nav-divider" />
      <span className="fiik-nav-item" style={{ opacity: 0.45, cursor: 'default' }}>
        <span className="icon">🎧</span>
        Support
      </span>
    </aside>
  );
}
