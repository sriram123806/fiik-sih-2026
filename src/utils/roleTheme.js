/**
 * FIIK Role Theme System
 * ──────────────────────
 * Each portal has a distinct accent color while sharing the same
 * government-portal foundation (white + dark navy + light neutral).
 *
 * STARTUP    → Blue
 * DEPARTMENT → Orange
 * EVALUATOR  → Green
 * ADMIN      → Purple
 */

export const ROLE_THEMES = {
  startup: {
    // Tailwind-safe inline hex values (no arbitrary class purge issues)
    accent: '#1D70B8',           // UK Govt blue — serious, trustworthy
    accentDark: '#15568f',
    accentLight: '#EBF5FF',      // very light blue surface
    accentBorder: '#BFDBFE',
    accentText: '#1D4ED8',
    // CSS class fragments used in JSX (kept minimal for Tailwind JIT)
    badge: 'bg-blue-50 text-blue-800 border-blue-200',
    pill: 'bg-blue-100 text-blue-900 border-blue-300',
    btn: 'bg-[#1D70B8] hover:bg-[#15568f] text-white',
    btnOutline: 'border-[#1D70B8] text-[#1D70B8] hover:bg-blue-50',
    sidebarActive: 'border-[#1D70B8] bg-[#EBF5FF] text-[#1D70B8]',
    cardHighlight: 'bg-[#EBF5FF] border-[#BFDBFE]',
    stepDone: 'bg-[#1D70B8] text-white',
    stepActive: 'bg-[#1D70B8] text-white ring-4 ring-blue-100',
    stepLine: 'bg-[#1D70B8]',
    headingAccent: 'text-[#1D70B8]',
    bannerBg: 'bg-[#EBF5FF] border-blue-200/80',
    iconBox: 'bg-blue-50 text-blue-700 border border-blue-200',
    // Role identity strings
    portalLabel: 'Startup Portal',
    roleLabel: 'Startup Innovator',
    initial: 'S',
    icon: '🚀',
    welcomeName: 'GreenGrid Technologies',
  },

  department: {
    accent: '#E05625',
    accentDark: '#c6471c',
    accentLight: '#FDF5EC',
    accentBorder: '#FED7AA',
    accentText: '#C2410C',
    badge: 'bg-orange-50 text-orange-800 border-orange-200',
    pill: 'bg-orange-100 text-orange-900 border-orange-300',
    btn: 'bg-[#E05625] hover:bg-[#c6471c] text-white',
    btnOutline: 'border-[#E05625] text-[#E05625] hover:bg-orange-50',
    sidebarActive: 'border-[#E05625] bg-[#FDF5EC] text-[#E05625]',
    cardHighlight: 'bg-[#FDF5EC] border-[#FED7AA]',
    stepDone: 'bg-[#E05625] text-white',
    stepActive: 'bg-[#E05625] text-white ring-4 ring-orange-100',
    stepLine: 'bg-[#E05625]',
    headingAccent: 'text-[#E05625]',
    bannerBg: 'bg-[#FDF5EC] border-orange-200/80',
    iconBox: 'bg-orange-50 text-orange-700 border border-orange-200',
    portalLabel: 'Government Department Portal',
    roleLabel: 'Government Department',
    initial: 'G',
    icon: '🏛️',
    welcomeName: 'Dept. of Urban Development',
  },

  evaluator: {
    accent: '#1E8549',
    accentDark: '#166738',
    accentLight: '#EAF7ED',
    accentBorder: '#A7F3D0',
    accentText: '#15803D',
    badge: 'bg-green-50 text-green-800 border-green-200',
    pill: 'bg-green-100 text-green-900 border-green-300',
    btn: 'bg-[#1E8549] hover:bg-[#166738] text-white',
    btnOutline: 'border-[#1E8549] text-[#1E8549] hover:bg-green-50',
    sidebarActive: 'border-[#1E8549] bg-[#EAF7ED] text-[#1E8549]',
    cardHighlight: 'bg-[#EAF7ED] border-[#A7F3D0]',
    stepDone: 'bg-[#1E8549] text-white',
    stepActive: 'bg-[#1E8549] text-white ring-4 ring-green-100',
    stepLine: 'bg-[#1E8549]',
    headingAccent: 'text-[#1E8549]',
    bannerBg: 'bg-[#EAF7ED] border-green-200/80',
    iconBox: 'bg-green-50 text-green-700 border border-green-200',
    portalLabel: 'Evaluator Portal',
    roleLabel: 'Technical Evaluator',
    initial: 'E',
    icon: '👥',
    welcomeName: 'Evaluation Panel',
  },

  admin: {
    accent: '#7C4DFF',
    accentDark: '#6232d6',
    accentLight: '#F3EBFB',
    accentBorder: '#DDD6FE',
    accentText: '#7C3AED',
    badge: 'bg-purple-50 text-purple-800 border-purple-200',
    pill: 'bg-purple-100 text-purple-900 border-purple-300',
    btn: 'bg-[#7C4DFF] hover:bg-[#6232d6] text-white',
    btnOutline: 'border-[#7C4DFF] text-[#7C4DFF] hover:bg-purple-50',
    sidebarActive: 'border-[#7C4DFF] bg-[#F3EBFB] text-[#7C4DFF]',
    cardHighlight: 'bg-[#F3EBFB] border-[#DDD6FE]',
    stepDone: 'bg-[#7C4DFF] text-white',
    stepActive: 'bg-[#7C4DFF] text-white ring-4 ring-purple-100',
    stepLine: 'bg-[#7C4DFF]',
    headingAccent: 'text-[#7C4DFF]',
    bannerBg: 'bg-[#F3EBFB] border-purple-200/80',
    iconBox: 'bg-purple-50 text-purple-700 border border-purple-200',
    portalLabel: 'MSInS Administration Portal',
    roleLabel: 'MSInS Nodal Authority',
    initial: 'A',
    icon: '🛡️',
    welcomeName: 'MSInS Secretariat',
  },
};

/** Returns the theme object for the given role key (falls back to startup) */
export function useRoleTheme(role) {
  return ROLE_THEMES[role] || ROLE_THEMES.startup;
}
