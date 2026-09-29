import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PilotProgressChart from '../components/PilotProgressChart';
import { FiikHero, FiikMetricCard, FiikDocumentCard, FiikDarkPanel, FiikStatusBadge } from '../components/FiikDesignSystem';
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
    portalBadge: 'STARTUP INNOVATOR PORTAL',
    welcome: (name) => `Welcome, ${name || 'GreenGrid Technologies Pvt. Ltd.'}`,
    subtitle: 'Turn your innovation into real-world impact through government pilots and procurement opportunities.',
    cta: 'Browse Open Problems & Challenges',
    ctaPath: '/work-order',
    tagline: '“Innovate · Pilot · Prove · Scale”',
    overviewTitle: 'Active Pilot Operations',
    overviewBadge: 'In Progress (Milestone 2/5)',
    cards: [
      { id: '01', icon: '📄', count: '2', label: 'Proposals Submitted', status: 'DPIIT Verified', sub: 'View Applications', path: '/registration' },
      { id: '02', icon: '🚀', count: '1', label: 'Active Pilot In Progress', status: 'Ward 12 & 14 Telemetry', sub: 'Control Center', path: '/execution' },
      { id: '03', icon: '🚩', count: '1', label: 'Milestones Completed', status: 'Phase 1 Signed Off', sub: 'Track Deliverables', path: '/execution' },
      { id: '04', icon: '🛂', count: '0', label: 'PREP Passports', status: 'Ready at Milestone 5', sub: 'Generate PREP', path: '/prep-generation' },
    ],
  },
  department: {
    portalBadge: 'GOVERNMENT DEPARTMENT PORTAL',
    welcome: (name) => `Welcome, ${name || 'Department of Urban Development'}`,
    subtitle: 'Evaluate innovative solutions, monitor pilot execution, and enable faster procurement for proven solutions.',
    cta: 'Review Startup Proposals',
    ctaPath: '/four-party-review',
    tagline: '“Towards Efficient Transparent Procurement”',
    overviewTitle: 'Department Pilots Oversight',
    overviewBadge: 'In Execution',
    cards: [
      { id: '01', icon: '📄', count: '5', label: 'Proposals Received', status: 'Municipal Smart Waste', sub: 'Review Proposals', path: '/four-party-review' },
      { id: '02', icon: '🔄', count: '2', label: 'Active Department Pilots', status: 'On Track', sub: 'Monitor Execution', path: '/execution' },
      { id: '03', icon: '⏳', count: '1', label: 'Pending Dept. Sign-off', status: 'Milestone 2 Ready', sub: 'Review Sign-off', path: '/field-evaluation' },
      { id: '04', icon: '📦', count: '3', label: 'Proven Solutions for Scale', status: 'GeM Procurement Ready', sub: 'View Passports', path: '/completed-pilot' },
    ],
  },
  evaluator: {
    portalBadge: 'TECHNICAL EVALUATOR PORTAL',
    welcome: (name) => `Welcome, ${name || 'Dr. Ananya Rao'}`,
    subtitle: 'Conduct technical evaluations, validate milestone evidence, and ensure solution performance meets benchmarks.',
    cta: 'View Assigned Pilots',
    ctaPath: '/field-evaluation',
    tagline: '“Evaluate · Validate · Ensure Impact”',
    overviewTitle: 'Assigned Pilot Audits',
    overviewBadge: 'Field Visit Scheduled',
    cards: [
      { id: '01', icon: '🔍', count: '2', label: 'Pending Field Audits', status: 'Pune Smart Bin Pilot', sub: 'Open Assignments', path: '/field-evaluation' },
      { id: '02', icon: '📊', count: '4', label: 'Milestones Evaluated', status: 'Avg. Score: 92.4%', sub: 'Audit Reports', path: '/field-evaluation' },
      { id: '03', icon: '✅', count: '3', label: 'Validated Milestones', status: 'Telemetry Verified', sub: 'Verified Log', path: '/field-evaluation' },
      { id: '04', icon: '⏳', count: '1', label: 'Awaiting Startup Proofs', status: 'M2 Sensor Telemetry', sub: 'Inspect Uploads', path: '/evidence-submission' },
    ],
  },
  admin: {
    portalBadge: 'MSINS NODAL AUTHORITY PORTAL',
    welcome: (name) => `Welcome, ${name || 'MSInS Nodal Secretariat'}`,
    subtitle: 'Issue standardized pilot work orders, oversee milestone escrow disbursements, and publish verified PREP Passports for scale-up.',
    cta: 'Issue Standardized Work Order',
    ctaPath: '/work-order',
    tagline: '“Standardize · Oversee · Scale · Enable Impact”',
    overviewTitle: 'State-Wide Pilot Pipeline',
    overviewBadge: 'Active Operations',
    cards: [
      { id: '01', icon: '📋', count: '5', label: 'State-Wide Active Pilots', status: 'Across 4 Municipalities', sub: 'Pipeline Overview', path: '/execution' },
      { id: '02', icon: '💳', count: '2', label: 'Escrow Disbursements', status: '₹ 25.0 Lakhs Pending', sub: 'Process Escrow', path: '/approval-payment' },
      { id: '03', icon: '🛂', count: '1', label: 'PREP Passports Issued', status: 'State Registry Live', sub: 'Inspect Registry', path: '/completed-pilot' },
      { id: '04', icon: '⚙️', count: '4', label: 'Work Orders Published', status: 'Multi-Party Executed', sub: 'Manage Orders', path: '/work-order' },
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
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col font-sans text-gray-900 antialiased">
      <Header variant="dashboard" />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">

          {/* ── Top PREP-Benchmark Level 1 Hero Banner ── */}
          <div className="bg-[#071A3D] text-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-amber-400/80 mb-8 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-20"
              style={{
                background: `radial-gradient(circle, ${theme.accent} 0%, transparent 70%)`,
                marginRight: '-4rem',
                marginTop: '-4rem',
              }}
            />
            <div className="absolute top-0 left-0 w-64 h-64 bg-amber-400/10 rounded-full -ml-20 -mt-20 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl min-w-0">
                <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                  <span className="text-[11px] font-black uppercase tracking-widest text-amber-300 bg-amber-500/20 border border-amber-400/40 px-3 py-1 rounded-full">
                    {theme.icon} {config.portalBadge}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/40 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    State Registry Verified
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  {config.welcome(displayName)}
                </h1>

                <p className="text-xs sm:text-sm text-gray-300 mt-2.5 font-medium leading-relaxed max-w-xl">
                  {config.subtitle}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    to={config.ctaPath}
                    className="text-white text-xs font-black px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 border border-white/20"
                    style={{ backgroundColor: theme.accent }}
                  >
                    <span>{config.cta}</span>
                    <span>→</span>
                  </Link>
                  <Link
                    to="/completed-pilot"
                    className="text-xs font-bold text-gray-200 hover:text-white bg-white/10 hover:bg-white/15 px-4 py-3 rounded-xl border border-white/10 transition-colors"
                  >
                    View Official PREP Passport 🛂
                  </Link>
                </div>
              </div>

              {/* Contextual Photography Card with Gold Trim & Quotation */}
              <div className="w-full lg:w-80 h-44 sm:h-48 relative rounded-2xl overflow-hidden shrink-0 shadow-lg border-2 border-amber-400/60 bg-navy-950 group">
                <img
                  src={bannerImage}
                  alt={`${theme.roleLabel} Operational View`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
                  <span className="text-xs font-bold text-amber-200 tracking-wide italic text-center drop-shadow-sm">
                    {config.tagline}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── 4 Solid Enterprise Metric Modules ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {config.cards.map((card) => (
              <div
                key={card.id}
                onClick={() => navigate(card.path)}
                className="rounded-2xl p-6 text-white shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer border border-white/20 hover:-translate-y-1 hover:shadow-xl group select-none"
                style={{ backgroundColor: theme.accent }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-2xl p-2 rounded-xl bg-white/20 backdrop-blur-xs border border-white/20 shrink-0">
                      {card.icon}
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/25 text-white border border-white/20 font-mono">
                      {card.id}
                    </span>
                  </div>

                  <div className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-white mb-2">
                    {card.count}
                  </div>

                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white mb-1">
                    {card.label}
                  </h3>

                  <p className="text-xs font-semibold text-white/85 leading-snug">
                    {card.status}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/20 flex items-center justify-between text-xs font-bold text-white/95">
                  <span className="group-hover:translate-x-1 transition-transform">{card.sub}</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Level 3 Document Card: Active Pilot Operations ── */}
          <div className="bg-white border-2 border-gray-200/90 rounded-2xl shadow-sm overflow-hidden mb-8">
            {/* Dark Navy Card Header Bar */}
            <div className="px-6 sm:px-8 py-5 bg-[#071A3D] text-white flex flex-wrap items-center justify-between gap-4 border-b border-navy-800">
              <div className="flex items-center gap-3">
                <span
                  className="h-3.5 w-3.5 rounded-full animate-pulse shrink-0"
                  style={{ backgroundColor: theme.accent }}
                />
                <div>
                  <h2 className="font-black text-white text-lg sm:text-xl tracking-tight">
                    {config.overviewTitle}
                  </h2>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Municipal IoT Pilot Telemetry &amp; Multi-Party Governance Tracking
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
                  {config.overviewBadge}
                </span>
                <Link
                  to="/execution"
                  className="text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all text-white shadow-xs"
                  style={{ backgroundColor: theme.accent }}
                >
                  <span>Open Control Center</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Main Pilot Information Body */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-6 pb-6 border-b border-gray-100">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-black text-[#071A3D] text-xl sm:text-2xl">
                      {pilot?.name || 'Smart Waste Segregation System'}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1.5 font-bold flex items-center gap-2">
                    <span>🏛️ Department of Urban Development</span>
                    <span>·</span>
                    <span>🚀 GreenGrid Technologies Pvt. Ltd.</span>
                    <span>·</span>
                    <span className="text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      ID: {pilot?.id || 'PLT-2026-0417'}
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-xs">
                  <div>
                    <span className="text-gray-400 block font-black uppercase text-[10px]">PILOT TIMELINE</span>
                    <strong className="text-[#071A3D] font-extrabold text-xs">15 Aug 2025 – 15 Feb 2026</strong>
                  </div>
                  <div className="h-7 w-px bg-gray-200" />
                  <div>
                    <span className="text-gray-400 block font-black uppercase text-[10px]">APPROVED GRANT</span>
                    <strong className="text-emerald-700 font-extrabold text-xs">₹ 25.0 Lakhs</strong>
                  </div>
                  <div className="h-7 w-px bg-gray-200" />
                  <div>
                    <span className="text-gray-400 block font-black uppercase text-[10px]">CURRENT STAGE</span>
                    <strong className="text-amber-700 font-extrabold text-xs">Milestone 2 (In Progress)</strong>
                  </div>
                </div>
              </div>

              {/* Pilot Progress Charts & Milestones */}
              <div className="mt-6">
                <PilotProgressChart />
              </div>
            </div>
          </div>

          {/* ── Notifications & Quick Workflow Gating ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions Panel */}
            <div className="lg:col-span-1 bg-white border-2 border-gray-200/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-gray-100">
                  <span className="text-xl">⚡</span>
                  <h3 className="font-black text-[#071A3D] text-base">Quick Workflow Gating</h3>
                </div>
                
                <div className="space-y-2.5">
                  <Link
                    to="/registration"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white hover:border-blue-300 hover:shadow-xs transition-all text-xs font-bold text-[#071A3D]"
                  >
                    <span className="flex items-center gap-2">
                      <span>📋</span>
                      <span>Startup Identity &amp; DPIIT</span>
                    </span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-black">
                      Verified ✓
                    </span>
                  </Link>

                  <Link
                    to="/work-order"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white hover:border-blue-300 hover:shadow-xs transition-all text-xs font-bold text-[#071A3D]"
                  >
                    <span className="flex items-center gap-2">
                      <span>📝</span>
                      <span>Work Order &amp; Milestones</span>
                    </span>
                    <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[10px] font-black">
                      Issued ✓
                    </span>
                  </Link>

                  <Link
                    to="/four-party-review"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white hover:border-blue-300 hover:shadow-xs transition-all text-xs font-bold text-[#071A3D]"
                  >
                    <span className="flex items-center gap-2">
                      <span>⚖️</span>
                      <span>Four-Party Governance</span>
                    </span>
                    <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[10px] font-black">
                      Signed Off ✓
                    </span>
                  </Link>

                  <Link
                    to="/completed-pilot"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-amber-300 bg-amber-50/50 hover:bg-amber-50 hover:shadow-xs transition-all text-xs font-black text-amber-900"
                  >
                    <span className="flex items-center gap-2">
                      <span>🛂</span>
                      <span>PREP Passport Credential</span>
                    </span>
                    <span className="text-amber-800 bg-amber-200 px-2 py-0.5 rounded text-[10px] font-black">
                      Official A+
                    </span>
                  </Link>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 text-center">
                <span className="text-[11px] font-bold text-gray-500">
                  Government Procurement Mechanism v1.0
                </span>
              </div>
            </div>

            {/* Role Notifications & Audits */}
            <div className="lg:col-span-2 bg-white border-2 border-gray-200/90 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🔔</span>
                  <h3 className="font-black text-[#071A3D] text-base">
                    Platform Notifications &amp; Governance Alerts
                  </h3>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Live Stream
                </span>
              </div>

              <div className="space-y-3">
                {notifications.slice(0, 3).map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 hover:bg-white hover:border-gray-300 transition-all flex items-start gap-3.5"
                  >
                    <span className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-extrabold text-xs text-[#071A3D]">{item.title}</span>
                        <span className="text-[10px] font-bold text-gray-400 shrink-0">{item.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 font-medium leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
