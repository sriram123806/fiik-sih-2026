import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ variant = 'public', showHomeLink = false, backTo }) {
  const { role, chooseRole, user } = useAuth();
  const navigate = useNavigate();

  const roleLabels = {
    startup: 'Startup (GreenGrid)',
    department: 'Dept. of Urban Development',
    evaluator: 'Evaluator (MSInS)',
    admin: 'MSInS Admin Authority',
  };

  const handleRoleChange = (newRole) => {
    chooseRole(newRole);
    navigate('/dashboard');
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="tricolor-bar" />
      
      {/* Top Government Bar */}
      <div className="gov-header-top text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-3 opacity-90">
            <span>GOVERNMENT OF INDIA</span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline">MINISTRY OF COMMERCE AND INDUSTRY</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <button className="hover:underline focus-ring rounded">English</button>
            <span className="text-white/40">|</span>
            <span className="text-white/70">A-</span>
            <span className="text-white/70 font-semibold">A</span>
            <span className="text-white/70">A+</span>
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            {backTo && (
              <button
                onClick={() => navigate(backTo)}
                className="text-xs font-semibold text-gray-600 hover:text-navy-950 flex items-center gap-1 mr-2 focus-ring rounded"
              >
                ← Back
              </button>
            )}
            <Link to="/" className="flex items-center gap-3 min-w-0">
              <span className="text-fiik-orange font-bold text-sm tracking-tight whitespace-nowrap">#startupindia</span>
              <span className="hidden md:inline text-[11px] text-gray-400 whitespace-nowrap">Azadi Ka<br/>Amrit Mahotsav</span>
              <span className="h-8 w-px bg-gray-200 hidden sm:block" />
              <div className="flex items-center gap-2 min-w-0">
                <span className="h-9 w-9 rounded-md bg-navy-950 text-white flex items-center justify-center font-black text-base shrink-0 shadow-sm">
                  F
                </span>
                <div className="min-w-0">
                  <span className="block font-black text-navy-950 text-lg leading-none tracking-tight">FIIK</span>
                  <span className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider truncate">
                    Pilot Intelligence Procurement Mechanism
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {variant === 'public' && (
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-600">
              <a href="#about" className="hover:text-fiik-orange transition-colors">About</a>
              <a href="#how-it-works" className="hover:text-fiik-orange transition-colors">How It Works</a>
              <a href="#features" className="hover:text-fiik-orange transition-colors">Features</a>
              <a href="#resources" className="hover:text-fiik-orange transition-colors">Resources</a>
              <a href="#contact" className="hover:text-fiik-orange transition-colors">Contact</a>
            </nav>
          )}

          <div className="flex items-center gap-3">
            {showHomeLink && (
              <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-navy-950 transition-colors">
                ← Home
              </Link>
            )}
            {variant === 'public' && !showHomeLink && (
              <Link
                to="/login"
                className="bg-fiik-orange hover:bg-fiik-orangeDark text-white text-sm font-semibold px-4 py-2 rounded-md transition-all shadow-sm"
              >
                Explore Platform →
              </Link>
            )}
            {variant === 'dashboard' && (
              <div className="flex items-center gap-3 text-xs text-gray-600">
                {/* Dynamic RBAC Role Selector Dropdown */}
                <div className="hidden sm:flex items-center gap-2 border-r border-gray-200 pr-3">
                  <span className="text-gray-400 font-bold">Active Role:</span>
                  <select
                    value={role}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="text-xs font-bold text-navy-950 bg-orange-50/70 border border-orange-200 rounded px-2.5 py-1 focus-ring cursor-pointer"
                  >
                    <option value="startup">🚀 Startup Innovator</option>
                    <option value="department">🏛️ Government Department</option>
                    <option value="evaluator">👥 Technical Evaluator (MSInS)</option>
                    <option value="admin">⚖️ MSInS Nodal Admin</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pl-1">
                  <span className="h-8 w-8 rounded-full bg-orange-100 text-fiik-orangeDark flex items-center justify-center font-bold text-xs border border-orange-200 shadow-sm">
                    {role === 'startup' ? 'ST' : role === 'department' ? 'GD' : role === 'evaluator' ? 'EV' : 'AD'}
                  </span>
                  <div className="hidden md:block text-left leading-tight">
                    <span className="block font-bold text-navy-950 text-xs">
                      {roleLabels[role] || 'User'}
                    </span>
                    <span className="block text-[10px] text-gray-400 font-semibold">{user.roleTitle || 'Authenticated Session'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
