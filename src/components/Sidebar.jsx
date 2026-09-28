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
    <aside
      className="hidden md:flex md:flex-col w-64 shrink-0 min-h-[calc(100vh-96px)] shadow-xl font-sans text-white border-r transition-colors duration-300 select-none"
      style={{
        backgroundColor: theme.sidebarBg,
        borderColor: theme.sidebarBorder,
      }}
    >
      {/* ── Top Role Portal Identity Header ── */}
      <div
        className="p-4 border-b flex items-center gap-3 transition-colors"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <div
          className="h-10 w-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-md font-bold text-white border border-white/20"
          style={{ backgroundColor: theme.accent }}
        >
          {theme.icon}
        </div>
        <div className="min-w-0">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 block">
            {theme.portalLabel}
          </span>
          <h2
            className="text-xs font-black truncate block mt-0.5"
            style={{ color: theme.accentLight }}
          >
            {theme.roleLabel}
          </h2>
        </div>
      </div>

      {/* ── Section Label ── */}
      <div className="px-5 pt-4 pb-2">
        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
          WORKFLOW NAVIGATION
        </span>
      </div>

      {/* ── Navigation Links List ── */}
      <nav className="flex-1 px-2 py-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            end={item.key === 'home'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                isActive
                  ? 'text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    backgroundColor: theme.accent,
                    boxShadow: `0 4px 12px ${theme.accent}40`,
                  }
                : {}
            }
          >
            {({ isActive }) => (
              <>
                <span
                  aria-hidden="true"
                  className={`text-base shrink-0 transition-transform ${
                    isActive ? 'scale-110' : 'opacity-80'
                  }`}
                >
                  {icons[item.key] || '📄'}
                </span>
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <span className="ml-auto text-[9px] font-black px-1.5 py-0.5 rounded bg-white/20 text-white">
                    ACTIVE
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Role Verification Badge & Footer ── */}
      <div
        className="p-4 border-t border-white/10 text-xs"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-300">
            {theme.roleLabel} Verified
          </span>
        </div>
        <p className="text-[11px] font-bold text-white">FIIK Portal v1.0</p>
        <p className="text-[10px] text-gray-400 mt-0.5">Government of India Innovation Initiative</p>
      </div>
    </aside>
  );
}
