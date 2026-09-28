/**
 * FIIK Role Theme System
 * ──────────────────────
 * Unified role-based color & visual token system across FIIK.
 *
 * STARTUP    → Blue (#1D70B8)
 * DEPARTMENT → Orange (#E05625)
 * EVALUATOR  → Green (#1E8549)
 * MSInS      → Purple (#7C4DFF)
 */

export const ROLE_THEMES = {
  startup: {
    accent: '#1D70B8',
    accentDark: '#15568f',
    accentLight: '#EBF5FF',
    accentBorder: '#93C5FD',
    accentText: '#1D4ED8',
    
    // Sidebar tokens (Dark Navy + Role Accents)
    sidebarBg: '#07152B',
    sidebarHeaderBg: '#1D70B8',
    sidebarActiveBg: '#1D70B8',
    sidebarHoverBg: 'rgba(29, 112, 184, 0.18)',
    sidebarBorder: '#1E3A8A',
    
    // UI Classes
    badge: 'bg-blue-50 text-blue-900 border-blue-300',
    pill: 'bg-blue-600 text-white',
    btn: 'bg-[#1D70B8] hover:bg-[#15568f] text-white',
    btnOutline: 'border-2 border-[#1D70B8] text-[#1D70B8] hover:bg-blue-50',
    cardHighlight: 'bg-[#EBF5FF] border-blue-300',
    stepDone: 'bg-emerald-600 text-white',
    stepActive: 'bg-[#1D70B8] text-white ring-4 ring-blue-200',
    stepLine: 'bg-[#1D70B8]',
    headingAccent: 'text-[#1D70B8]',
    bannerBg: 'bg-[#EBF5FF] border-blue-300',
    iconBox: 'bg-blue-100 text-[#1D70B8] border border-blue-300',
    
    // Identity strings
    portalLabel: 'Startup Portal',
    roleLabel: 'Startup Innovator',
    initial: 'S',
    icon: '🚀',
    welcomeName: 'GreenGrid Technologies',
    themeName: 'Blue Theme',
  },

  department: {
    accent: '#E05625',
    accentDark: '#c6471c',
    accentLight: '#FDF5EC',
    accentBorder: '#FDBA74',
    accentText: '#C2410C',
    
    sidebarBg: '#1C0D05',
    sidebarHeaderBg: '#E05625',
    sidebarActiveBg: '#E05625',
    sidebarHoverBg: 'rgba(224, 86, 37, 0.18)',
    sidebarBorder: '#9A3412',
    
    badge: 'bg-orange-50 text-orange-900 border-orange-300',
    pill: 'bg-orange-600 text-white',
    btn: 'bg-[#E05625] hover:bg-[#c6471c] text-white',
    btnOutline: 'border-2 border-[#E05625] text-[#E05625] hover:bg-orange-50',
    cardHighlight: 'bg-[#FDF5EC] border-orange-300',
    stepDone: 'bg-emerald-600 text-white',
    stepActive: 'bg-[#E05625] text-white ring-4 ring-orange-200',
    stepLine: 'bg-[#E05625]',
    headingAccent: 'text-[#E05625]',
    bannerBg: 'bg-[#FDF5EC] border-orange-300',
    iconBox: 'bg-orange-100 text-[#E05625] border border-orange-300',
    
    portalLabel: 'Government Department Portal',
    roleLabel: 'Government Department',
    initial: 'G',
    icon: '🏛️',
    welcomeName: 'Dept. of Urban Development',
    themeName: 'Orange Theme',
  },

  evaluator: {
    accent: '#1E8549',
    accentDark: '#166738',
    accentLight: '#EAF7ED',
    accentBorder: '#86EFAC',
    accentText: '#15803D',
    
    sidebarBg: '#05180E',
    sidebarHeaderBg: '#1E8549',
    sidebarActiveBg: '#1E8549',
    sidebarHoverBg: 'rgba(30, 133, 73, 0.18)',
    sidebarBorder: '#166534',
    
    badge: 'bg-green-50 text-green-900 border-green-300',
    pill: 'bg-green-600 text-white',
    btn: 'bg-[#1E8549] hover:bg-[#166738] text-white',
    btnOutline: 'border-2 border-[#1E8549] text-[#1E8549] hover:bg-green-50',
    cardHighlight: 'bg-[#EAF7ED] border-green-300',
    stepDone: 'bg-emerald-600 text-white',
    stepActive: 'bg-[#1E8549] text-white ring-4 ring-green-200',
    stepLine: 'bg-[#1E8549]',
    headingAccent: 'text-[#1E8549]',
    bannerBg: 'bg-[#EAF7ED] border-green-300',
    iconBox: 'bg-green-100 text-[#1E8549] border border-green-300',
    
    portalLabel: 'Evaluator Portal',
    roleLabel: 'Technical Evaluator',
    initial: 'E',
    icon: '👥',
    welcomeName: 'Dr. Ananya Rao (MSInS Panel)',
    themeName: 'Green Theme',
  },

  admin: {
    accent: '#7C4DFF',
    accentDark: '#6232d6',
    accentLight: '#F3EBFB',
    accentBorder: '#C4B5FD',
    accentText: '#6D28D9',
    
    sidebarBg: '#120721',
    sidebarHeaderBg: '#7C4DFF',
    sidebarActiveBg: '#7C4DFF',
    sidebarHoverBg: 'rgba(124, 77, 255, 0.18)',
    sidebarBorder: '#5B21B6',
    
    badge: 'bg-purple-50 text-purple-900 border-purple-300',
    pill: 'bg-purple-600 text-white',
    btn: 'bg-[#7C4DFF] hover:bg-[#6232d6] text-white',
    btnOutline: 'border-2 border-[#7C4DFF] text-[#7C4DFF] hover:bg-purple-50',
    cardHighlight: 'bg-[#F3EBFB] border-purple-300',
    stepDone: 'bg-emerald-600 text-white',
    stepActive: 'bg-[#7C4DFF] text-white ring-4 ring-purple-200',
    stepLine: 'bg-[#7C4DFF]',
    headingAccent: 'text-[#7C4DFF]',
    bannerBg: 'bg-[#F3EBFB] border-purple-300',
    iconBox: 'bg-purple-100 text-[#7C4DFF] border border-purple-300',
    
    portalLabel: 'MSInS Administration Portal',
    roleLabel: 'MSInS Nodal Authority',
    initial: 'A',
    icon: '🛡️',
    welcomeName: 'MSInS Secretariat',
    themeName: 'Purple Theme',
  },
};

/** Returns the theme object for the given role key (falls back to startup) */
export function useRoleTheme(role) {
  return ROLE_THEMES[role] || ROLE_THEMES.startup;
}
