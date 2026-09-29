import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PilotProgressChart from '../components/PilotProgressChart';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';
import { currentStartup, notificationsByRole } from '../data/mockData';
import { useRoleTheme } from '../utils/roleTheme';

// Distinct imagery per role
import startupTeamImg from '../assets/startup-team.png';
import govtBuildingImg from '../assets/govt-building.png';
import techAiImg from '../assets/tech-ai-interface.jpg';
import procurementLegalImg from '../assets/procurement-legal.jpg';

const ROLE_IMAGES = {
  startup: startupTeamImg,
  department: govtBuildingImg,
  evaluator: techAiImg,
  admin: procurementLegalImg,
};

// Role-specific welcome copy, operational metrics, and quotation overlays matching the visual reference
const ROLE_CONFIGS = {
  startup: {
    portalBadge: 'STARTUP PORTAL',
    welcome: (name) => `Welcome, ${name || 'GreenGrid Technologies Pvt. Ltd.'}`,
    subtitle: 'Turn your innovation into real-world impact through government pilots and procurement opportunities.',
    cta: 'Browse Open Problems & Challenges',
    ctaPath: '/work-order',
    tagline: '“Innovate · Pilot · Prove · Scale”',
    overviewTitle: 'Active Pilot',
    overviewBadge: 'In Progress (Milestone 2/5)',
    cards: [
      { id: '01', icon: '📄', count: '2', label: 'Applications', status: 'Submitted', sub: 'DPIIT Verified →', path: '/registration' },
      { id: '02', icon: '🚀', count: '1', label: 'Active Pilot', status: 'In Progress', sub: 'View Details →', path: '/execution' },
      { id: '03', icon: '🚩', count: '1', label: 'Milestones', status: 'Completed', sub: 'Track Progress →', path: '/execution' },
      { id: '04', icon: '🛂', count: '0', label: 'PREP', status: 'Earned', sub: 'Generate PREP →', path: '/prep-generation' },
    ],
  },
  department: {
    portalBadge: 'GOVERNMENT PORTAL',
    welcome: (name) => `Welcome, ${name || 'Department of Urban Development'}`,
    subtitle: 'Evaluate innovative solutions, monitor pilot execution, and enable faster procurement for proven solutions.',
    cta: 'Review Startup Proposals',
    ctaPath: '/four-party-review',
    tagline: '“Towards Efficient Transparent Procurement”',
    overviewTitle: 'Department Pilots Overview',
    overviewBadge: 'In Progress',
    cards: [
      { id: '01', icon: '📄', count: '5', label: 'Proposals', status: 'Received', sub: 'View Proposals →', path: '/four-party-review' },
      { id: '02', icon: '🔄', count: '2', label: 'Active Department', status: 'Pilots', sub: 'Monitor →', path: '/execution' },
      { id: '03', icon: '⏳', count: '1', label: 'Pending Dept.', status: 'Sign-off', sub: 'Take Action →', path: '/field-evaluation' },
      { id: '04', icon: '📦', count: '3', label: 'Proven Solutions', status: 'for Scale', sub: 'View Reports →', path: '/completed-pilot' },
    ],
  },
  evaluator: {
    portalBadge: 'EVALUATOR PORTAL',
    welcome: (name) => `Welcome, ${name || 'Dr. Ananya Rao'}`,
    subtitle: 'Conduct technical evaluations, validate milestone evidence, and ensure solution performance meets benchmarks.',
    cta: 'View Assigned Pilots',
    ctaPath: '/field-evaluation',
    tagline: '“Evaluate · Validate · Ensure Impact”',
    overviewTitle: 'Assigned Pilots',
    overviewBadge: 'Field Visit Scheduled',
    cards: [
      { id: '01', icon: '🔍', count: '2', label: 'Pending Field', status: 'Audits', sub: 'View Assignments →', path: '/field-evaluation' },
      { id: '02', icon: '📊', count: '4', label: 'Milestones Evaluated', status: 'Avg. Score: 92.4%', sub: 'View Reports →', path: '/field-evaluation' },
      { id: '03', icon: '✅', count: '3', label: 'Validated', status: 'Milestones', sub: 'View Details →', path: '/field-evaluation' },
      { id: '04', icon: '⏳', count: '1', label: 'Awaiting Startup', status: 'Proofs', sub: 'Request Evidence →', path: '/evidence-submission' },
    ],
  },
  admin: {
    portalBadge: 'MSINS PORTAL',
    welcome: (name) => `Welcome, ${name || 'MSInS Nodal Secretariat'}`,
    subtitle: 'Issue standardized pilot work orders, oversee milestone escrow disbursements, and publish verified PREP Passports for scale-up.',
    cta: 'Issue Standardized Work Order',
    ctaPath: '/work-order',
    tagline: '“Standardize · Oversee · Scale · Enable Impact”',
    overviewTitle: 'System-wide Pilot Pipeline',
    overviewBadge: 'In Progress (Milestone 2/5)',
    cards: [
      { id: '01', icon: '📋', count: '5', label: 'State-Wide', status: 'Active Pilots', sub: 'View Pilots →', path: '/execution' },
      { id: '02', icon: '💳', count: '2', label: 'Escrow Payments', status: 'Pending (₹25L)', sub: 'Process →', path: '/approval-payment' },
      { id: '03', icon: '🛂', count: '1', label: 'PREP Passports', status: 'Published', sub: 'View Passports →', path: '/completed-pilot' },
      { id: '04', icon: '⚙️', count: '4', label: 'Work Orders', status: 'Published', sub: 'Manage →', path: '/work-order' },
    ],
  },
};

export default function StartupDashboard() {
  const { role, user } = useAuth();
  const { pilot } = usePilot();
  const navigate = useNavigate();
  const theme = useRoleTheme(role);

  const activeRole = role || 'startup';
  const config = ROLE_CONFIGS[activeRole] || ROLE_CONFIGS.startup;
  const bannerImage = ROLE_IMAGES[activeRole] || startupTeamImg;
  const notifications = notificationsByRole[activeRole] || notificationsByRole.startup || [];
  const displayName = user?.name || (activeRole === 'startup' ? currentStartup?.name : null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Header variant="dashboard" />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">

          {/* ── Top Role Banner with Contextual Photography & Quotation ── */}
          <div
            className={`rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border-2 mb-6 ${theme.bannerBg}`}
          >
            <div className="z-10 max-w-xl">
              {/* Portal Identity Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border shadow-xs bg-white"
                  style={{ borderColor: theme.accentBorder, color: theme.accent }}
                >
                  <span>{theme.icon}</span>
                  <span>{config.portalBadge}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight leading-tight">
                {config.welcome(displayName)}
              </h1>
              
              <p className="text-xs sm:text-sm text-gray-700 mt-2 font-medium leading-relaxed">
                {config.subtitle}
              </p>

              <div className="mt-5 flex items-center gap-3">
                <Link
                  to={config.ctaPath}
                  className="text-white text-xs font-black px-6 py-3 rounded-xl shadow-md transition-all focus-ring flex items-center gap-2"
                  style={{ backgroundColor: theme.accent }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.accentDark)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.accent)}
                >
                  <span>{config.cta}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Contextual Role Image Frame with Subtle Quotation */}
            <div className="w-full md:w-80 h-44 sm:h-48 relative rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-white bg-navy-950 group">
              <img
                src={bannerImage}
                alt={`${theme.roleLabel} Visual`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3.5">
                <span className="text-[11px] font-bold text-white tracking-wide italic text-center drop-shadow-sm">
                  {config.tagline}
                </span>
              </div>
            </div>
          </div>

          {/* ── 4 Solid Role-Themed KPI Cards (Matching Reference Screenshot) ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {config.cards.map((card) => (
              <div
                key={card.id}
                onClick={() => navigate(card.path)}
                className="rounded-2xl p-5 shadow-sm text-white flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer select-none group"
                style={{ backgroundColor: theme.accent }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{card.icon}</span>
                    <span className="text-xs font-bold opacity-60 font-mono">{card.id}</span>
                  </div>
                  <div className="mt-3">
                    <span className="text-3xl font-black block tracking-tight leading-none">
                      {card.count}
                    </span>
                    <span className="text-xs font-bold block mt-1.5 leading-tight opacity-95">
                      {card.label}
                    </span>
                    <span className="text-[11px] block opacity-80 font-medium">
                      {card.status}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] font-bold">
                  <span className="group-hover:translate-x-0.5 transition-transform">{card.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Active Pilot Operations Card (PREP Quality Benchmark) ── */}
          <div className="bg-white border-2 border-gray-200/90 rounded-2xl shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 bg-gray-50/70 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span
                  className="h-3 w-3 rounded-full animate-pulse shrink-0"
                  style={{ backgroundColor: theme.accent }}
                />
                <h2 className="font-black text-navy-950 text-base">{config.overviewTitle}</h2>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/execution"
                  className="text-xs font-black px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors border shadow-xs"
                  style={{
                    color: theme.accentText,
                    borderColor: theme.accentBorder,
                    backgroundColor: theme.accentLight,
                  }}
                >
                  <span>View Details</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-black text-navy-950 text-lg">
                      {pilot?.name || 'Smart Waste Segregation System'}
                    </h3>
                    <span
                      className="text-xs font-black px-3 py-0.5 rounded-full border shadow-xs"
                      style={{
                        backgroundColor: theme.accentLight,
                        color: theme.accentText,
                        borderColor: theme.accentBorder,
                      }}
                    >
                      {config.overviewBadge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 font-bold">
                    🏛️ Department of Urban Development · 🚀 GreenGrid Technologies Pvt. Ltd.
                  </p>
                </div>

                <div className="flex items-center gap-6 text-xs text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-200 shadow-xs">
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase">Pilot ID</span>
                    <span className="font-extrabold text-navy-950 font-mono">
                      {pilot?.pilotId || 'FIIK-PILOT-024'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase">Start Date</span>
                    <span className="font-bold text-gray-900">{pilot?.startDate || '12 Aug 2025'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase">Target End</span>
                    <span className="font-bold text-gray-900">{pilot?.endDate || '12 Feb 2026'}</span>
                  </div>
                </div>
              </div>

              {/* 7-Step Sequential Stepper */}
              <div className="mt-8 pt-5 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-navy-950 uppercase tracking-wider">
                    Sequential Pilot Governance Pipeline
                  </span>
                  <span className="text-[11px] font-bold text-gray-500">Stage 5 of 7 Active</span>
                </div>

                <div className="overflow-x-auto pb-3">
                  <div className="flex items-center justify-between min-w-[720px] px-2">
                    {[
                      { step: 1, label: 'Registration', done: true },
                      { step: 2, label: 'Requirement', done: true },
                      { step: 3, label: 'Four-Party Review', done: true },
                      { step: 4, label: 'Work Order', done: true },
                      { step: 5, label: 'Execution', active: true },
                      { step: 6, label: 'Evidence Review', pending: true },
                      { step: 7, label: 'PREP Passport', pending: true },
                    ].map((st, i, arr) => (
                      <React.Fragment key={st.step}>
                        <div className="flex flex-col items-center text-center w-24 shrink-0">
                          <span
                            className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-black shadow-sm transition-all ${
                              st.done
                                ? 'bg-emerald-600 text-white'
                                : st.active
                                ? 'text-white shadow-md scale-110'
                                : 'bg-gray-100 text-gray-400 border border-gray-300'
                            }`}
                            style={
                              st.active
                                ? {
                                    backgroundColor: theme.accent,
                                    boxShadow: `0 0 0 4px ${theme.accentLight}`,
                                  }
                                : {}
                            }
                          >
                            {st.done ? '✓' : st.step}
                          </span>
                          <span
                            className={`text-[11px] mt-2 font-black ${
                              st.done
                                ? 'text-gray-900'
                                : st.active
                                ? 'font-black'
                                : 'text-gray-400'
                            }`}
                            style={st.active ? { color: theme.accent } : {}}
                          >
                            {st.label}
                          </span>
                        </div>
                        {i < arr.length - 1 && (
                          <span
                            className={`h-1 flex-1 mx-1.5 rounded-full ${
                              st.done ? 'bg-emerald-600' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* PREP Explanation Callout */}
                <div className="mt-4 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🛂</span>
                    <p className="font-medium">
                      <strong>PREP (Procurement Readiness Evidence Passport):</strong> Portable credential generated upon final milestone completion for direct GeM scaling.
                    </p>
                  </div>
                  <Link
                    to="/completed-pilot"
                    className="font-bold text-[#D94F0B] hover:underline shrink-0 text-[11px]"
                  >
                    Inspect PREP Passport →
                  </Link>
                </div>
              </div>

              {/* Progress Graph */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <PilotProgressChart />
              </div>
            </div>
          </div>

          {/* ── Operational Notifications ── */}
          <div className="bg-white border-2 border-gray-200/90 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">🔔</span>
                <h2 className="font-black text-navy-950 text-sm">Role Action Notifications</h2>
              </div>
              <span
                className="text-xs font-extrabold cursor-pointer hover:underline"
                style={{ color: theme.accent }}
              >
                View Audit History
              </span>
            </div>
            <ul className="divide-y divide-gray-100">
              {notifications.map((n) => (
                <li
                  key={n.id || n.title}
                  className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-gray-50/70 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="h-2 w-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: theme.accent }} />
                    <div>
                      <p className="text-xs text-navy-950 font-bold">{n.title}</p>
                      <p className="text-xs text-gray-600 mt-0.5 font-medium">{n.context}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-400 whitespace-nowrap font-mono font-bold">
                    {n.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </main>
      </div>
    </div>
  );
}
