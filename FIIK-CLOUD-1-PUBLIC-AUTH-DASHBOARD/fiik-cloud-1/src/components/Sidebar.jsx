import React from 'react'
import { NavLink } from 'react-router-dom'
import { sidebarNav } from '../data/mockData'

const icons = {
  home: '🏠',
  browse: '🔎',
  applications: '📄',
  pilots: '🚀',
  evidence: '🗂️',
  prep: '🛂',
  profile: '👤',
  support: '💬'
}

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 bg-white border-r border-gray-200 min-h-[calc(100vh-96px)]">
      <nav className="py-4">
        <ul>
          {sidebarNav.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.path}
                end={item.key === 'home'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-2.5 text-sm font-medium border-l-[3px] focus-ring transition-colors ${
                    isActive
                      ? 'border-fiik-orange bg-orange-50 text-fiik-orangeDark'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-navy-950'
                  }`
                }
              >
                <span aria-hidden="true">{icons[item.key]}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
