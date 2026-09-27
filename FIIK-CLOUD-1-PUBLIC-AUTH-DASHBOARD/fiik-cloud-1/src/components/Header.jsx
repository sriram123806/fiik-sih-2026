import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Shared FIIK header used across all Cloud 1 pages.
 * variant="public"    -> landing / login / role selection (top nav links)
 * variant="dashboard" -> authenticated pages (help, notifications, profile)
 */
export default function Header({ variant = 'public', showHomeLink = false }) {
  return (
    <header className="sticky top-0 z-40">
      <div className="tricolor-bar" />
      <div className="gov-header-top text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-3 opacity-90">
            <span>Government of India</span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline">Ministry of Commerce and Industry</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="hover:underline focus-ring rounded">English</button>
            <span className="text-white/40">A-</span>
            <span className="text-white/40">A</span>
            <span className="text-white/40">A+</span>
          </div>
        </div>
      </div>
      <div className="bg-white border-b border-gray-200 shadow-card">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 min-w-0">
            <span className="text-fiik-orange font-bold text-sm tracking-tight whitespace-nowrap">#startupindia</span>
            <span className="hidden md:inline text-[11px] text-gray-500 whitespace-nowrap">Azadi Ka<br/>Amrit Mahotsav</span>
            <span className="h-8 w-px bg-gray-200 hidden sm:block" />
            <span className="flex items-center gap-2 min-w-0">
              <span className="h-9 w-9 rounded bg-navy-950 text-white flex items-center justify-center font-extrabold text-sm shrink-0">F</span>
              <span className="min-w-0">
                <span className="block font-extrabold text-navy-950 text-lg leading-none">FIIK</span>
                <span className="block text-[11px] text-gray-500 truncate">Pilot Intelligence &amp; Evidence Infrastructure</span>
              </span>
            </span>
          </Link>

          {variant === 'public' && (
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
              <a href="#about" className="hover:text-navy-950 focus-ring rounded">About</a>
              <a href="#how-it-works" className="hover:text-navy-950 focus-ring rounded">How It Works</a>
              <a href="#features" className="hover:text-navy-950 focus-ring rounded">Features</a>
              <a href="#resources" className="hover:text-navy-950 focus-ring rounded">Resources</a>
              <a href="#contact" className="hover:text-navy-950 focus-ring rounded">Contact</a>
            </nav>
          )}

          <div className="flex items-center gap-3">
            {showHomeLink && (
              <Link to="/" className="text-sm font-medium text-gray-600 hover:text-navy-950 focus-ring rounded">
                ← Home
              </Link>
            )}
            {variant === 'public' && !showHomeLink && (
              <Link
                to="/login"
                className="bg-fiik-orange hover:bg-fiik-orangeDark text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors focus-ring"
              >
                Explore Platform →
              </Link>
            )}
            {variant === 'dashboard' && (
              <div className="hidden sm:flex items-center gap-4 text-sm text-gray-600">
                <button className="hover:text-navy-950 focus-ring rounded">Help</button>
                <button className="relative hover:text-navy-950 focus-ring rounded" aria-label="Notifications">
                  🔔
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-fiik-orange" />
                </button>
                <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                  <span className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">SI</span>
                  <span className="text-left leading-tight">
                    <span className="block font-medium text-navy-950 text-sm">Sriram Innovations</span>
                    <span className="block text-[11px] text-gray-500">Startup</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
