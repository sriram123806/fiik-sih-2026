import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../utils/roleTheme';
import fiikLogo from '../assets/fiik-logo.png';

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
      <div className="bg-[#071A3D] text-white text-xs py-1.5 px-4 border-b border-navy-900">
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
                  <span className="hidden sm:inline">Helpdesk</span>
                </button>
                <button className="relative hover:text-orange-300 transition-colors cursor-pointer">
                  <span>🔔</span>
                  <span
                    className="absolute -top-1 -right-1 h-2 w-2 rounded-full"
                    style={{ backgroundColor: theme.accent }}
                  />
                </button>
                
                {/* Role Avatar & Pill in Top Bar */}
                <div
                  className="flex items-center gap-2 px-3 py-1 rounded-full border shadow-xs"
                  style={{
                    backgroundColor: theme.accentLight,
                    borderColor: theme.accentBorder,
                  }}
                >
                  <span
                    className="h-5 w-5 rounded-full text-white flex items-center justify-center text-[10px] font-black shadow-xs"
                    style={{ backgroundColor: theme.accent }}
                  >
                    {theme.initial}
                  </span>
                  <span className="font-extrabold text-[11px]" style={{ color: theme.accentText }}>
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
      <div className="bg-white border-b border-gray-200/90 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left Branding with Approved FIIK Logo */}
          <div className="flex items-center gap-4 min-w-0">
            {backTo && (
              <button
                onClick={() => navigate(backTo)}
                className="text-xs font-bold text-navy-950 hover:text-[#F36C21] flex items-center gap-1 mr-2 cursor-pointer"
              >
                ← Back
              </button>
            )}
            <Link to="/" className="flex items-center gap-3.5 min-w-0">
              <span className="text-[#F36C21] font-black text-base tracking-tight whitespace-nowrap">#startupindia</span>
              <span className="hidden md:inline text-[10px] text-gray-500 font-semibold leading-tight">
                75<br />Azadi ka<br />Amrit Mahotsav
              </span>
              <span className="h-9 w-px bg-gray-200 hidden sm:block" />
              
              {/* Approved FIIK Logo Asset */}
              <div className="flex items-center min-w-0">
                <img
                  src={fiikLogo}
                  alt="FIIK - Pilot Intelligence Procurement Mechanism"
                  className="h-10 sm:h-11 w-auto object-contain shrink-0"
                />
              </div>
            </Link>
          </div>

          {/* Right Navigation & Actions */}
          <div className="flex items-center gap-5">
            {/* Top Navigation Links on Landing Page (Clean, NO duplicate "Explore Platform" button) */}
            {variant === 'public' && !showHomeLink && (
              <nav className="hidden lg:flex items-center gap-6 text-xs font-extrabold text-gray-700">
                <a href="#about" className="hover:text-[#F36C21] transition-colors">About</a>
                <a href="#how-it-works" className="hover:text-[#F36C21] transition-colors">How It Works</a>
                <a href="#features" className="hover:text-[#F36C21] transition-colors">Features</a>
                <a href="#contact" className="hover:text-[#F36C21] transition-colors">Contact</a>
                <Link to="/login" className="text-[#071A3D] hover:text-[#F36C21] transition-colors font-black ml-2 border-l border-gray-300 pl-4">
                  Portal Login →
                </Link>
              </nav>
            )}

            {showHomeLink && (
              <Link to="/" className="text-xs font-bold text-[#071A3D] hover:text-[#F36C21] transition-colors flex items-center gap-1">
                ← Homepage
              </Link>
            )}

            {/* Dashboard Mode: Switch Role & Home */}
            {variant === 'dashboard' && (
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-2 border-r border-gray-200 pr-3">
                  <span className="text-gray-400 font-bold text-[11px]">Switch Role:</span>
                  <select
                    value={role}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="text-xs font-bold text-[#071A3D] rounded-lg px-2.5 py-1.5 focus-ring cursor-pointer border shadow-xs"
                    style={{
                      backgroundColor: theme.accentLight,
                      borderColor: theme.accentBorder,
                      color: theme.accentText,
                    }}
                  >
                    <option value="startup">🚀 Startup Innovator</option>
                    <option value="department">🏛️ Government Department</option>
                    <option value="evaluator">👥 Technical Evaluator</option>
                    <option value="admin">🛡️ MSInS Nodal Authority</option>
                  </select>
                </div>
                
                <Link to="/" className="text-xs font-bold text-[#071A3D] hover:text-[#F36C21] transition-colors flex items-center gap-1">
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
