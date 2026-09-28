import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PilotProgressChart from '../components/PilotProgressChart';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';
import { currentStartup, notificationsByRole } from '../data/mockData';
import { useRoleTheme } from '../utils/roleTheme';
import heroImg from '../assets/india-govt-hero.png';

// Role-specific welcome copy
const ROLE_COPY = {
  startup: {
    welcome: (name) => `Welcome, ${name}`,
    subtitle: 'Track your pilots, submit evidence, and build your path to procurement.',
    cta: 'Browse Open Problems',
    ctaPath: '/work-order',
    cards: [
      { icon: '📄', label: 'Applications Submitted', value: 2, colorBox: '' },
      { icon: '🚀', label: 'Active Pilot', value: 1, colorBox: '' },
      { icon: '🚩', label: 'Milestones Completed', value: 1, colorBox: '' },
      { icon: '🛡️', label: 'PREP Generated', value: 0, colorBox: '' },
    ],
  },
  department: {
    welcome: (name) => `Welcome, ${name}`,
    subtitle: 'Review pilot applications, track startup progress, and enable procurement.',
    cta: 'Review Pilot Requests',
    ctaPath: '/four-party-review',
    cards: [
      { icon: '📋', label: 'Pending Pilot Requests', value: 3, colorBox: '' },
      { icon: '🔄', label: 'Active Pilots', value: 2, colorBox: '' },
      { icon: '✅', label: 'Approved Work Orders', value: 1, colorBox: '' },
      { icon: '📦', label: 'PREP Ready', value: 0, colorBox: '' },
    ],
  },
  evaluator: {
    welcome: (name) => `Welcome, ${name}`,
    subtitle: 'Review submitted evidence, evaluate milestones, and validate pilot outcomes.',
    cta: 'View Pending Evaluations',
    ctaPath: '/field-evaluation',
    cards: [
      { icon: '🔍', label: 'Pending Evaluations', value: 2, colorBox: '' },
      { icon: '📊', label: 'Milestones Reviewed', value: 4, colorBox: '' },
      { icon: '✅', label: 'Approved Milestones', value: 3, colorBox: '' },
      { icon: '⏳', label: 'Awaiting Evidence', value: 1, colorBox: '' },
    ],
  },
  admin: {
    welcome: (name) => `Welcome, ${name}`,
    subtitle: 'Issue work orders, approve payments, and oversee the pilot-to-procurement pipeline.',
    cta: 'Issue Work Order',
    ctaPath: '/work-order',
    cards: [
      { icon: '📋', label: 'Active Pilots', value: 5, colorBox: '' },
      { icon: '💳', label: 'Pending Payments', value: 2, colorBox: '' },
      { icon: '✅', label: 'PREP Generated', value: 1, colorBox: '' },
      { icon: '⚙️', label: 'Work Orders Issued', value: 4, colorBox: '' },
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
  const notifications = notificationsByRole[activeRole] || notificationsByRole.startup || [];
  const displayName = user?.name || currentStartup?.name || theme.welcomeName;

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <Header variant="dashboard" />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 px-6 py-8 max-w-5xl">

          {/* ── Welcome Banner ── */}
          <div
            className={`rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border-2`}
            style={{ backgroundColor: theme.accentLight, borderColor: theme.accentBorder }}
          >
            <div className="z-10 max-w-xl">
              {/* Portal identity badge */}
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border mb-3"
                style={{ backgroundColor: 'white', borderColor: theme.accentBorder, color: theme.accent }}
              >
                <span>{theme.icon}</span>
                <span>{theme.portalLabel}</span>
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
                {copy.welcome(displayName)}
              </h1>
              <p className="text-xs sm:text-sm text-gray-700 mt-2 font-medium leading-relaxed">
                {copy.subtitle}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <Link
                  to={copy.ctaPath}
                  className="text-white text-xs font-extrabold px-5 py-3 rounded-xl shadow-md transition-all focus-ring flex items-center gap-2"
                  style={{ backgroundColor: theme.accent }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = theme.accentDark)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = theme.accent)}
                >
                  <span>{copy.cta}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right illustration */}
            <div className="w-full md:w-72 h-36 sm:h-44 relative rounded-xl overflow-hidden shrink-0 shadow-sm border border-white/60">
              <img src={heroImg} alt="Government Architecture Artwork" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* ── 4 Summary Metric Cards ── */}
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {copy.cards.map((card, idx) => (
              <div key={idx} className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-card flex items-center gap-4">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center text-xl shrink-0 border"
                  style={{ backgroundColor: theme.accentLight, borderColor: theme.accentBorder, color: theme.accent }}
                >
                  {card.icon}
                </div>
                <div>
                  <p className="text-2xl font-black text-navy-950">{card.value}</p>
                  <p className="text-xs text-gray-500 font-semibold leading-tight mt-0.5">{card.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Active Pilot Card ── */}
          <div className="mt-6 bg-white border border-gray-200/90 rounded-2xl shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-extrabold text-navy-950 text-base">Active Pilot</h2>
              <Link
                to="/execution"
                className="text-xs font-bold border px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                style={{ color: theme.accent, borderColor: theme.accentBorder, backgroundColor: theme.accentLight }}
              >
                <span>View Details</span>
                <span>→</span>
              </Link>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-extrabold text-navy-950 text-lg">
                      {pilot?.name || 'Smart Waste Segregation System'}
                    </h3>
                    <span
                      className="text-xs font-bold px-3 py-0.5 rounded-full border"
                      style={{ backgroundColor: theme.accentLight, color: theme.accentText, borderColor: theme.accentBorder }}
                    >
                      In Progress
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-semibold">
                    {pilot?.department || 'Department of Urban Development'}
                  </p>
                </div>
                <div className="flex items-center gap-6 text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase">Pilot ID</span>
                    <span className="font-extrabold text-navy-950">{pilot?.pilotId || 'FIIK-PILOT-024'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase">Start Date</span>
                    <span className="font-bold text-gray-800">{pilot?.startDate || '12 Aug 2025'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase">Expected End Date</span>
                    <span className="font-bold text-gray-800">{pilot?.endDate || '12 Feb 2026'}</span>
                  </div>
                </div>
              </div>

              {/* Connected Stepper — role-colored */}
              <div className="mt-8 pt-4 border-t border-gray-100">
                <div className="overflow-x-auto pb-2">
                  <div className="flex items-center justify-between min-w-[700px] px-2">
                    {[
                      { step: 1, label: 'Registration', done: true },
                      { step: 2, label: 'Requirement', done: true },
                      { step: 3, label: 'Four-Party Review', done: true },
                      { step: 4, label: 'Work Order', done: true },
                      { step: 5, label: 'Execution', active: true },
                      { step: 6, label: 'Evidence Review', pending: true },
                      { step: 7, label: 'PREP', pending: true },
                    ].map((st, i, arr) => (
                      <React.Fragment key={st.step}>
                        <div className="flex flex-col items-center text-center w-24 shrink-0">
                          <span
                            className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-black shadow-sm ${
                              st.done
                                ? 'bg-green-600 text-white'
                                : st.active
                                ? 'text-white ring-4 ring-opacity-20'
                                : 'bg-gray-100 text-gray-400 border border-gray-300'
                            }`}
                            style={
                              st.active
                                ? { backgroundColor: theme.accent, boxShadow: `0 0 0 4px ${theme.accentLight}` }
                                : {}
                            }
                          >
                            {st.done ? '✓' : st.step}
                          </span>
                          <span
                            className={`text-[11px] mt-2 font-bold ${
                              st.done ? 'text-gray-800' : st.pending ? 'text-gray-400' : ''
                            }`}
                            style={st.active ? { color: theme.accent } : {}}
                          >
                            {st.label}
                          </span>
                        </div>
                        {i < arr.length - 1 && (
                          <span
                            className={`h-0.5 flex-1 mx-1 ${st.done ? '' : 'bg-gray-200'}`}
                            style={st.done ? { backgroundColor: '#16a34a' } : {}}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 mt-4 leading-relaxed font-medium bg-gray-50 p-3 rounded-lg border border-gray-200">
                  PREP stands for <strong className="font-bold text-navy-950">Procurement Readiness Evidence Passport</strong> — available only after all milestones, approvals and payments are complete.
                </p>
              </div>

              {/* Graphical Progress Chart */}
              <div className="mt-6">
                <PilotProgressChart />
              </div>
            </div>
          </div>

          {/* ── Notifications ── */}
          <div className="mt-8 bg-white border border-gray-200/90 rounded-2xl shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-extrabold text-navy-950 text-sm">Notifications</h2>
              <span
                className="text-xs font-bold cursor-pointer hover:underline"
                style={{ color: theme.accent }}
              >
                View All
              </span>
            </div>
            <ul className="divide-y divide-gray-100">
              {notifications.map((n) => (
                <li key={n.id || n.title} className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                  <div>
                    <p className="text-xs text-navy-950 font-bold">{n.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 font-medium">{n.context}</p>
                  </div>
                  <span className="text-[11px] text-gray-400 whitespace-nowrap font-semibold">{n.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
