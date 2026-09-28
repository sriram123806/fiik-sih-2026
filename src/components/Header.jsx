import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../utils/roleTheme';

export default function Header({ variant = 'public', showHomeLink = false, backTo }) {
  const { role, chooseRole } = useAuth();
  const navigate = useNavigate();
  const theme = useRoleTheme(role);

  const handleRoleChange = (newRole) => {
    chooseRole(newRole);
    navigate('/dashboard');
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm font-sans">

      {/* ── Top Dark Navy Government Bar ── */}
      <div className="bg-[#0B192C] text-white text-xs py-1.5 px-4 border-b border-navy-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 font-semibold text-[11px] opacity-95">
            <span>GOVERNMENT OF INDIA</span>
            <span className="text-white/40">|</span>
            <span className="hidden sm:inline text-white/90">MINISTRY OF COMMERCE AND INDUSTRY</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-semibold">
            {variant === 'dashboard' ? (
              <>
                <button className="flex items-center gap-1 hover:text-orange-300 transition-colors cursor-pointer">
                  <span>❓</span>
                  <span className="hidden sm:inline">Help</span>
                </button>
                <button className="relative hover:text-orange-300 transition-colors cursor-pointer">
                  <span>🔔</span>
                  <span
                    className="absolute -top-1 -right-1 h-2 w-2 rounded-full"
                    style={{ backgroundColor: theme.accent }}
                  />
                </button>
                {/* Role pill — accent-colored to reinforce portal identity */}
                <div
                  className="flex items-center gap-2 px-2.5 py-1 rounded-full border"
                  style={{
                    backgroundColor: theme.accentLight,
                    borderColor: theme.accentBorder,
                  }}
                >
                  <span
                    className="h-5 w-5 rounded-full text-white flex items-center justify-center text-[10px] font-black"
                    style={{ backgroundColor: theme.accent }}
                  >
                    {theme.initial}
                  </span>
                  <span className="font-bold text-[11px]" style={{ color: theme.accentText }}>
                    {theme.roleLabel}
                  </span>
                </div>
              </>
            ) : (
              <>
                <button className="hover:underline text-white/90 cursor-pointer">English ▾</button>
                <span className="text-white/40">|</span>
                <span className="text-white/70">A-</span>
                <span className="text-white font-bold">A</span>
                <span className="text-white/70">A+</span>
                <button aria-label="Search" className="ml-1 text-white/80 hover:text-white cursor-pointer">🔍</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Tricolor Ribbon ── */}
      <div className="tricolor-bar" />

      {/* ── Main White Branding Header ── */}
      <div className="bg-white border-b border-gray-200/90 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            {backTo && (
              <button
                onClick={() => navigate(backTo)}
                className="text-xs font-bold text-navy-950 hover:text-fiik-orange flex items-center gap-1 mr-2 cursor-pointer"
              >
                ← Back
              </button>
            )}
            <Link to="/" className="flex items-center gap-3.5 min-w-0">
              <span className="text-fiik-orange font-black text-base tracking-tight whitespace-nowrap">#startupindia</span>
              <span className="hidden md:inline text-[10px] text-gray-500 font-semibold leading-tight">
                75<br />Azadi ka<br />Amrit Mahotsav
              </span>
              <span className="h-9 w-px bg-gray-200 hidden sm:block" />
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="h-9 w-9 rounded-md bg-navy-950 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                  F
                </span>
                <div className="min-w-0">
                  <span className="block font-black text-navy-950 text-xl leading-none tracking-tight">FIIK</span>
                  <span className="block text-[10px] font-bold text-gray-500 tracking-wide truncate">
                    Pilot Intelligence Procurement Mechanism
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {variant === 'public' && !showHomeLink && (
              <nav className="hidden lg:flex items-center gap-6 text-xs font-extrabold text-gray-700">
                <a href="#about" className="hover:text-fiik-orange transition-colors">About</a>
                <a href="#how-it-works" className="hover:text-fiik-orange transition-colors">How It Works</a>
                <a href="#features" className="hover:text-fiik-orange transition-colors">Features</a>
              </nav>
            )}

            {showHomeLink && (
              <Link to="/" className="text-xs font-bold text-navy-950 hover:text-fiik-orange transition-colors flex items-center gap-1">
                ← Home
              </Link>
            )}
            {variant === 'public' && !showHomeLink && (
              <Link
                to="/login"
                className="bg-fiik-orange hover:bg-fiik-orangeDark text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all shadow-sm focus-ring flex items-center gap-1.5"
              >
                <span>Explore Platform</span>
                <span>→</span>
              </Link>
            )}

            {variant === 'dashboard' && (
              <div className="flex items-center gap-3 text-xs">
                {/* Demo: role switcher */}
                <div className="flex items-center gap-2 border-r border-gray-200 pr-3">
                  <span className="text-gray-400 font-bold text-[11px]">Switch Role:</span>
                  <select
                    value={role}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="text-xs font-bold text-navy-950 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1 focus-ring cursor-pointer"
                  >
                    <option value="startup">🚀 Startup</option>
                    <option value="department">🏛️ Govt Dept</option>
                    <option value="evaluator">👥 Evaluator</option>
                    <option value="admin">🛡️ MSInS</option>
                  </select>
                </div>
                <Link to="/" className="text-xs font-bold text-navy-950 hover:text-fiik-orange transition-colors flex items-center gap-1">
                  ← Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
