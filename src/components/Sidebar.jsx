import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sidebarNavByRole } from '../data/mockData';

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
  prep: 'Passport',
  profile: '👤',
  support: '💬',
};

const roleBadgeLabels = {
  startup: 'Startup View',
  department: 'Govt Dept View',
  evaluator: 'Evaluator View',
  admin: 'MSInS Admin View',
};

export default function Sidebar() {
  const { role } = useAuth();
  const navItems = sidebarNavByRole[role] || sidebarNavByRole.startup;

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 bg-white border-r border-gray-200 min-h-[calc(100vh-96px)] shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
          Role Navigation
        </span>
        <span className="text-[10px] font-extrabold text-fiik-orange bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
          {roleBadgeLabels[role] || 'Authenticated'}
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
                  `flex items-center gap-3 px-5 py-2.5 text-xs font-medium border-l-[3px] transition-all ${
                    isActive
                      ? 'border-fiik-orange bg-orange-50 text-fiik-orangeDark font-bold'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-navy-950'
                  }`
                }
              >
                <span aria-hidden="true" className="text-base leading-none">
                  {icons[item.key] || '📄'}
                </span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-100 text-[11px] text-gray-400 bg-gray-50/50">
        <p className="font-bold text-navy-950">FIIK Mechanism v1.0 (RBAC)</p>
        <p className="mt-0.5">Pilot ID: FIIK-PILOT-024</p>
      </div>
    </aside>
  );
}
