import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sidebarNavByRole } from '../data/mockData';
import { useRoleTheme } from '../utils/roleTheme';

const icons = {
  home: '🏠',
  registration: '📋',
  workorder: '📝',
  governance: '⚖️',
  execution: '🚀',
  evidence: '🗂️',
  evaluation: '🔍',
  payment: '💳',
  prepgeneration: '⚡',
  prep: '🛂',
  profile: '👤',
  support: '💬',
};

export default function Sidebar() {
  const { role } = useAuth();
  const theme = useRoleTheme(role);
  const navItems = sidebarNavByRole[role] || sidebarNavByRole.startup;

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 bg-white border-r border-gray-200/90 min-h-[calc(100vh-96px)] shadow-sm font-sans">
      {/* Role Portal Title */}
      <div
        className="px-5 py-4 border-b border-gray-100"
        style={{ borderLeftWidth: 4, borderLeftColor: theme.accent, borderLeftStyle: 'solid' }}
      >
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
          {theme.portalLabel}
        </span>
        <span className="text-xs font-extrabold mt-0.5 block" style={{ color: theme.accent }}>
          {theme.roleLabel}
        </span>
      </div>

      <nav className="py-2 flex-1">
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.path}
                end={item.key === 'home'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-2.5 text-xs font-bold transition-all border-l-4 ${
                    isActive
                      ? theme.sidebarActive
                      : 'border-transparent text-navy-950 hover:bg-gray-50'
                  }`
                }
              >
                <span aria-hidden="true" className="text-sm shrink-0">
                  {icons[item.key] || '📄'}
                </span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 text-[11px] text-gray-400 bg-gray-50/50">
        <p className="font-bold text-navy-950">FIIK Portal v1.0</p>
        <p className="mt-0.5">Government of India Initiative</p>
      </div>
    </aside>
  );
}
