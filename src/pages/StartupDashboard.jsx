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

// Role-specific welcome copy and operational metrics
const ROLE_COPY = {
  startup: {
    portalTitle: 'Your Pilot Journey & Milestone Execution',
    welcome: (name) => `Welcome, ${name}`,
    subtitle: 'Track your active pilot milestones, submit sensor telemetry evidence, and progress toward portable PREP certification.',
    cta: 'Browse Open Problems & Challenges',
    ctaPath: '/work-order',
    cards: [
      { icon: '📄', label: 'Applications Submitted', value: 2, sub: 'DPIIT Verified' },
      { icon: '🚀', label: 'Active Pilot in Progress', value: 1, sub: 'Pune MC Ward 12 & 14' },
      { icon: '🚩', label: 'Milestones Completed', value: 1, sub: 'Grant Released' },
      { icon: '🛂', label: 'PREP Passports Earned', value: 0, sub: 'Pending Milestone 3-5' },
    ],
  },
  department: {
    portalTitle: 'Government Pilot Oversight & Department Console',
    welcome: (name) => `Welcome, ${name}`,
    subtitle: 'Review incoming startup pilot proposals, inspect independent evaluator audit reports, and authorize milestone sign-offs.',
    cta: 'Review 4-Party Pilot Proposals',
    ctaPath: '/four-party-review',
    cards: [
      { icon: '📋', label: 'Pending Pilot Requests', value: 3, sub: 'Needs Department Review' },
      { icon: '🔄', label: 'Active Field Pilots', value: 2, sub: 'IoT Telemetry Live' },
      { icon: '✅', label: 'Approved Work Orders', value: 1, sub: 'Escrow Funded' },
      { icon: '📦', label: 'PREP Reusable Solutions', value: 1, sub: 'Direct GeM Scale' },
    ],
  },
  evaluator: {
    portalTitle: 'Technical Evaluation & Telemetry Audit Console',
    welcome: (name) => `Welcome, ${name}`,
    subtitle: 'Perform on-site inspections, validate sensor data feeds against baseline benchmarks, and submit independent audit scorecards.',
    cta: 'Conduct Milestone Field Evaluation',
    ctaPath: '/field-evaluation',
    cards: [
      { icon: '🔍', label: 'Pending Field Audits', value: 2, sub: 'Milestone 2 Inspection' },
      { icon: '📊', label: 'Milestones Evaluated', value: 4, sub: 'Average Score: 92.4%' },
      { icon: '✅', label: 'Validated Milestones', value: 3, sub: 'SLA Compliant' },
      { icon: '⏳', label: 'Awaiting Startup Proofs', value: 1, sub: 'Sensor Telemetry' },
    ],
  },
  admin: {
    portalTitle: 'MSInS Nodal Authority & Pilot Secretariat',
    welcome: (name) => `Welcome, ${name}`,
    subtitle: 'Issue standardized pilot work orders, oversee milestone escrow disbursements, and publish verified PREP Passports.',
    cta: 'Issue Standardized Work Order',
    ctaPath: '/work-order',
    cards: [
      { icon: '📋', label: 'State-Wide Active Pilots', value: 5, sub: 'Across 4 Departments' },
      { icon: '💳', label: 'Escrow Payments Pending', value: 2, sub: '₹25,00,000 Total' },
      { icon: '🛂', label: 'PREP Passports Published', value: 1, sub: 'GeM Registered' },
      { icon: '⚙️', label: 'Work Orders Published', value: 4, sub: 'Binding 4-Party SLAs' },
    ],
  },
};

export default function StartupDashboard() {
  const { role, user } = useAuth();
  const { pilot, stages } = usePilot();
  const navigate = useNavigate();
  const theme = useRoleTheme(role);

  const activeRole = role || 'startup';
  const copy = ROLE_COPY[activeRole] || ROLE_COPY.startup;
  const bannerImage = ROLE_IMAGES[activeRole] || startupTeamImg;
  const notifications = notificationsByRole[activeRole] || notificationsByRole.startup || [];
  const displayName = user?.name || currentStartup?.name || theme.welcomeName;

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col font-sans">
      <Header variant="dashboard" />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">

          {/* ── Top Role Banner with Contextual Photography ── */}
          <div
            className="rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border-2"
            style={{ backgroundColor: theme.accentLight, borderColor: theme.accentBorder }}
          >
            <div className="z-10 max-w-xl">
              {/* Portal Identity Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border shadow-sm"
                  style={{ backgroundColor: 'white', borderColor: theme.accentBorder, color: theme.accent }}
                >
                  <span>{theme.icon}</span>
                  <span>{theme.portalLabel}</span>
                </span>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  {copy.portalTitle}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
                {copy.welcome(displayName)}
              </h1>
              
              <p className="text-xs sm:text-sm text-gray-700 mt-2.5 font-medium leading-relaxed">
                {copy.subtitle}
              </p>

              <div className="mt-5 flex items-center gap-3">
                <Link
                  to={copy.ctaPath}
                  className="text-white text-xs font-black px-6 py-3 rounded-xl shadow-md transition-all focus-ring flex items-center gap-2"
                  style={{ backgroundColor: theme.accent }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.accentDark)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.accent)}
                >
                  <span>{copy.cta}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Contextual Role Image Frame */}
            <div className="w-full md:w-80 h-40 sm:h-48 relative rounded-2xl overflow-hidden shrink-0 shadow-lg border-2 border-white bg-navy-950">
              <img
                src={bannerImage}
                alt={`${theme.roleLabel} Visual`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                  {theme.roleLabel} Verified Console
                </span>
              </div>
            </div>
          </div>

          {/* ── 4 Strategic Metric Cards ── */}
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {copy.cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-400 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="h-11 w-11 rounded-xl flex items-center justify-center text-xl shrink-0 border shadow-xs"
                    style={{
                      backgroundColor: theme.accentLight,
                      borderColor: theme.accentBorder,
                      color: theme.accent,
                    }}
                  >
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 font-mono">0{idx + 1}</span>
                </div>
                <div className="mt-3">
                  <p className="text-2xl sm:text-3xl font-black text-navy-950">{card.value}</p>
                  <p className="text-xs text-gray-800 font-extrabold leading-tight mt-0.5">{card.label}</p>
                  <p className="text-[10px] text-gray-500 font-medium mt-1">{card.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Active Pilot Operations Card ── */}
          <div className="mt-6 bg-white border-2 border-navy-950/20 rounded-2xl shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="font-black text-navy-950 text-base">Active Government Pilot</h2>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/execution"
                  className="text-xs font-extrabold border px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                  style={{
                    color: theme.accent,
                    borderColor: theme.accentBorder,
                    backgroundColor: theme.accentLight,
                  }}
                >
                  <span>Open Pilot Console</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
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
                      In Progress (Milestone 2/5)
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 font-bold">
                    🏛️ {pilot?.department || 'Department of Urban Development, Maharashtra'}
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
                    <span className="block text-[10px] text-gray-400 font-bold uppercase">Deployment Start</span>
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
                    Sequential Pilot Progress Pipeline
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
                      <strong>PREP (Procurement Readiness Evidence Passport):</strong> Unlocks upon final milestone audit sign-off, enabling direct GeM scale-up.
                    </p>
                  </div>
                  <Link
                    to="/completed-pilot"
                    className="font-bold text-[#D94F0B] hover:underline shrink-0 text-[11px]"
                  >
                    Inspect PREP Format →
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
          <div className="mt-8 bg-white border border-gray-200 rounded-2xl shadow-card overflow-hidden">
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
