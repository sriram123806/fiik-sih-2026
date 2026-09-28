import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatusBadge from '../components/StatusBadge';
import PilotProgressChart from '../components/PilotProgressChart';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';
import { currentStartup, summaryCardsByRole, notificationsByRole } from '../data/mockData';
import heroImg from '../assets/india-govt-hero.png';

export default function StartupDashboard() {
  const { role, user } = useAuth();
  const { pilot, stages } = usePilot();
  const navigate = useNavigate();

  const activeRole = role || 'startup';
  const notifications = notificationsByRole[activeRole] || notificationsByRole.startup || [];

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <Header variant="dashboard" />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 px-6 py-8 max-w-6xl">
          
          {/* Welcome Banner Card (Image 4 reference: Peach bg + India Gate vector artwork right) */}
          <div className="bg-[#FDF5EC] border-2 border-orange-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="z-10 max-w-xl">
              <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
                Welcome, {user?.name || currentStartup?.name || 'GreenGrid Technologies'}
              </h1>
              <p className="text-xs sm:text-sm text-gray-700 mt-2 font-medium leading-relaxed">
                Track your pilots, submit evidence, and build your path to procurement.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <Link
                  to="/work-order"
                  className="bg-[#E05625] hover:bg-[#c6471c] text-white text-xs font-extrabold px-5 py-3 rounded-xl shadow-md transition-all focus-ring flex items-center gap-2"
                >
                  <span>Browse Open Problems</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right Side India Gate Artwork Illustration (Image 4 reference) */}
            <div className="w-full md:w-80 h-36 sm:h-44 relative rounded-xl overflow-hidden shrink-0 shadow-md border-2 border-white">
              <img
                src={heroImg}
                alt="Government Architecture Artwork"
                className="w-full h-full object-cover transform scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* 4 Summary Metric Cards (Image 4 reference) */}
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-card flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center text-xl shrink-0">
                📄
              </div>
              <div>
                <p className="text-2xl font-black text-navy-950">2</p>
                <p className="text-xs text-gray-500 font-semibold leading-tight mt-0.5">Applications Submitted</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-card flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-green-50 text-green-700 border border-green-200 flex items-center justify-center text-xl shrink-0">
                🚀
              </div>
              <div>
                <p className="text-2xl font-black text-navy-950">1</p>
                <p className="text-xs text-gray-500 font-semibold leading-tight mt-0.5">Active Pilot</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-card flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center text-xl shrink-0">
                🚩
              </div>
              <div>
                <p className="text-2xl font-black text-navy-950">1</p>
                <p className="text-xs text-gray-500 font-semibold leading-tight mt-0.5">Milestones Completed</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-card flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center text-xl shrink-0">
                🛡️
              </div>
              <div>
                <p className="text-2xl font-black text-navy-950">0</p>
                <p className="text-xs text-gray-500 font-semibold leading-tight mt-0.5">PREP Generated</p>
              </div>
            </div>
          </div>

          {/* Active Pilot Card (Image 4 reference) */}
          <div className="mt-6 bg-white border border-gray-200/90 rounded-2xl shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-extrabold text-navy-950 text-base">Active Pilot</h2>
              <Link
                to="/execution"
                className="text-xs font-bold text-fiik-orange hover:text-fiik-orangeDark border border-orange-200 bg-orange-50 px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
              >
                <span>View Details</span>
                <span>→</span>
              </Link>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-extrabold text-navy-950 text-lg">{pilot?.name || 'Smart Waste Segregation System'}</h3>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-0.5 rounded-full">
                      In Progress
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-semibold">{pilot?.department || 'Department of Urban Development'}</p>
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

              {/* Connected Stepper (Image 4 reference: 1 Registration -> 2 Requirement -> 3 Four-Party Review -> 4 Work Order -> 5 Execution [Orange] -> 6 Evidence Review -> 7 PREP) */}
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
                                ? 'bg-[#E05625] text-white ring-4 ring-orange-100'
                                : 'bg-gray-100 text-gray-400 border border-gray-300'
                            }`}
                          >
                            {st.done ? '✓' : st.step}
                          </span>
                          <span
                            className={`text-[11px] mt-2 font-bold ${
                              st.active
                                ? 'text-[#E05625]'
                                : st.done
                                ? 'text-gray-800'
                                : 'text-gray-400'
                            }`}
                          >
                            {st.label}
                          </span>
                        </div>
                        {i < arr.length - 1 && (
                          <span
                            className={`h-0.5 flex-1 mx-1 ${
                              st.done ? 'bg-green-600' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 mt-4 leading-relaxed font-medium bg-gray-50 p-3 rounded-lg border border-gray-200">
                  PREP stands for <strong className="font-bold text-navy-950">Procurement Readiness Evidence Passport</strong> &mdash; available only after all milestones, approvals and payments are complete.
                </p>
              </div>

              {/* Graphical Progress Chart */}
              <div className="mt-6">
                <PilotProgressChart />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="mt-8 bg-white border border-gray-200/90 rounded-2xl shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-extrabold text-navy-950 text-sm">Role Notifications</h2>
              <span className="text-xs text-fiik-orange font-bold cursor-pointer hover:underline">View All</span>
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
