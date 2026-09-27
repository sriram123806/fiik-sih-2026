import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatusBadge from '../components/StatusBadge';
import PilotProgressChart from '../components/PilotProgressChart';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';
import { currentStartup, summaryCardsByRole, notificationsByRole } from '../data/mockData';

export default function StartupDashboard() {
  const { role, user } = useAuth();
  const { pilot, stages } = usePilot();
  const navigate = useNavigate();

  const activeRole = role || 'startup';
  const summaryCards = summaryCardsByRole[activeRole] || summaryCardsByRole.startup || [];
  const notifications = notificationsByRole[activeRole] || notificationsByRole.startup || [];
  const safeStages = Array.isArray(stages) ? stages : [];

  const dashboardTitles = {
    startup: `Welcome back, ${user?.contactName || currentStartup?.contactName || 'User'}`,
    department: 'Government Department Pilot Dashboard',
    evaluator: 'Technical Evaluator (MSInS) Dashboard',
    admin: 'MSInS Nodal Admin Oversight Portal',
  };

  const dashboardSubtitles = {
    startup: `${user?.name || currentStartup?.name} · ${user?.sector || currentStartup?.sector}`,
    department: 'Department of Urban Development · State Nodal Office',
    evaluator: 'Technical Evaluation Cell · MSInS Empanelled Panel',
    admin: 'Maharashtra State Innovation Society (MSInS) Headquarters',
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header variant="dashboard" />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 px-6 py-8 max-w-6xl">
          
          {/* Header Banner */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-navy-950">
                {dashboardTitles[activeRole] || dashboardTitles.startup}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {dashboardSubtitles[activeRole] || dashboardSubtitles.startup}
              </p>
            </div>

            {/* Role-Specific Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {activeRole === 'startup' && (
                <>
                  <Link
                    to="/registration"
                    className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold px-3 py-2 rounded-md shadow-sm"
                  >
                    Startup Registration Profile
                  </Link>
                  <Link
                    to="/work-order"
                    className="bg-navy-950 text-white hover:bg-black text-xs font-semibold px-3 py-2 rounded-md shadow-sm"
                  >
                    Propose Pilot Request →
                  </Link>
                </>
              )}

              {activeRole === 'department' && (
                <>
                  <Link
                    to="/work-order"
                    className="bg-fiik-orange text-white hover:bg-fiik-orangeDark text-xs font-semibold px-3 py-2 rounded-md shadow-sm"
                  >
                    Review Startup Proposals →
                  </Link>
                  <Link
                    to="/four-party-review"
                    className="bg-navy-950 text-white hover:bg-black text-xs font-semibold px-3 py-2 rounded-md shadow-sm"
                  >
                    Four-Party Governance
                  </Link>
                </>
              )}

              {activeRole === 'evaluator' && (
                <>
                  <Link
                    to="/field-evaluation"
                    className="bg-fiik-green text-white hover:bg-green-700 text-xs font-semibold px-3 py-2 rounded-md shadow-sm"
                  >
                    Perform Field Visit &amp; Evidence Audit →
                  </Link>
                </>
              )}

              {activeRole === 'admin' && (
                <>
                  <Link
                    to="/registration"
                    className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold px-3 py-2 rounded-md shadow-sm"
                  >
                    Verify Startups
                  </Link>
                  <Link
                    to="/work-order"
                    className="bg-fiik-orange text-white hover:bg-fiik-orangeDark text-xs font-semibold px-3 py-2 rounded-md shadow-sm"
                  >
                    Create &amp; Issue Official Work Order →
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryCards.map((card) => (
              <div key={card.id || card.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-card">
                <p className="text-2xl font-black text-navy-950">{card.value}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Role Permission Banner */}
          <div className="mt-6 bg-gradient-to-r from-navy-950 to-slate-900 text-white rounded-xl p-5 shadow-card flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-400">
                ACTIVE RBAC PERMISSION PROFILE: {activeRole.toUpperCase()}
              </span>
              <p className="text-xs text-gray-200 font-medium mt-1">
                {activeRole === 'startup' && 'You can submit pilot proposals, upload milestone evidence, track approvals, and view your PREP Passport. Work orders must be officially published by MSInS.'}
                {activeRole === 'department' && 'You can review pilot requirements, participate in governance sign-offs, monitor milestones, and validate department payments. Evidence upload is performed by startups.'}
                {activeRole === 'evaluator' && 'You are authorized to review submitted evidence, perform field evaluation visits, and record technical audit results. Work orders are issued by MSInS.'}
                {activeRole === 'admin' && 'You hold official MSInS Nodal Authority permissions to verify startups, finalize & publish official FIIK Work Orders, and compile PREP credentials.'}
              </p>
            </div>
          </div>

          {/* Active Pilot Card */}
          <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">🚀</span>
                <h2 className="font-extrabold text-navy-950 text-base">Active Pilot Mechanism</h2>
              </div>
              <StatusBadge status={pilot?.status || 'IN_EXECUTION'} label={pilot?.statusLabel || 'In Progress'} />
            </div>
            <div className="px-6 py-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-navy-950 text-base">{pilot?.name || 'Smart Waste Segregation System'}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{pilot?.department || 'Department of Urban Development'}</p>
                  <p className="text-[11px] font-semibold text-gray-400 mt-1">Pilot ID: {pilot?.pilotId || pilot?.id || 'FIIK-PILOT-024'}</p>
                </div>
                <div className="text-xs text-gray-500 text-right">
                  <p>Start Date: <span className="text-gray-900 font-bold">{pilot?.startDate || '12 Aug 2025'}</span></p>
                  <p>Expected End: <span className="text-gray-900 font-bold">{pilot?.endDate || pilot?.expectedEndDate || '12 Feb 2026'}</span></p>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="mt-6 overflow-x-auto">
                <div className="flex items-center justify-between min-w-[650px] py-2">
                  {safeStages.map((stage, i) => (
                    <React.Fragment key={stage.key || i}>
                      <div className="flex flex-col items-center text-center w-20 shrink-0">
                        <span
                          className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            stage.state === 'done'
                              ? 'bg-green-600 text-white'
                              : stage.state === 'current'
                              ? 'bg-fiik-orange text-white ring-4 ring-orange-100'
                              : 'bg-gray-100 text-gray-400 border border-gray-200'
                          }`}
                        >
                          {stage.state === 'done' ? '✓' : i + 1}
                        </span>
                        <p
                          className={`text-[11px] mt-2 leading-tight ${
                            stage.state === 'current'
                              ? 'text-fiik-orangeDark font-bold'
                              : stage.state === 'done'
                              ? 'text-gray-800 font-medium'
                              : 'text-gray-400'
                          }`}
                        >
                          {stage.label}
                        </p>
                      </div>
                      {i < safeStages.length - 1 && (
                        <span
                          className={`h-0.5 flex-1 mx-1 ${
                            stage.state === 'done' ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* NEW FEATURE: Graphical Pilot Progress Chart over Time */}
              <PilotProgressChart />

              {/* Action according to Role */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Current Milestone:</span>
                  <strong className="text-navy-950 font-bold">{pilot?.currentMilestoneLabel || 'Initial Performance Evaluation'}</strong>
                </div>

                {activeRole === 'startup' && (
                  <button
                    onClick={() => navigate('/evidence-submission')}
                    className="bg-fiik-orange hover:bg-fiik-orangeDark text-white text-xs font-bold px-5 py-2.5 rounded-md transition-all shadow-sm focus-ring flex items-center gap-1.5"
                  >
                    Submit Milestone Evidence →
                  </button>
                )}

                {activeRole === 'department' && (
                  <button
                    onClick={() => navigate('/four-party-review')}
                    className="bg-navy-950 hover:bg-black text-white text-xs font-bold px-5 py-2.5 rounded-md transition-all shadow-sm focus-ring flex items-center gap-1.5"
                  >
                    Review Governance Approval →
                  </button>
                )}

                {activeRole === 'evaluator' && (
                  <button
                    onClick={() => navigate('/field-evaluation')}
                    className="bg-fiik-green hover:bg-green-700 text-white text-xs font-bold px-5 py-2.5 rounded-md transition-all shadow-sm focus-ring flex items-center gap-1.5"
                  >
                    Perform Field Audit →
                  </button>
                )}

                {activeRole === 'admin' && (
                  <button
                    onClick={() => navigate('/work-order')}
                    className="bg-fiik-orange hover:bg-fiik-orangeDark text-white text-xs font-bold px-5 py-2.5 rounded-md transition-all shadow-sm focus-ring flex items-center gap-1.5"
                  >
                    Publish Official Work Order →
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-card">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-navy-950 text-sm">Role Notifications</h2>
              <span className="text-xs text-fiik-orange font-semibold cursor-pointer hover:underline">View All</span>
            </div>
            <ul className="divide-y divide-gray-100">
              {notifications.map((n) => (
                <li key={n.id || n.title} className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                  <div>
                    <p className="text-xs text-navy-950 font-bold">{n.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{n.context}</p>
                  </div>
                  <span className="text-[11px] text-gray-400 whitespace-nowrap">{n.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
