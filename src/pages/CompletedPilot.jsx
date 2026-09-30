import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PilotSummaryBar from '../components/PilotSummaryBar';
import PrepDocument from '../components/PrepDocument';
import StatusBadge from '../components/StatusBadge';
import { usePilot } from '../context/PilotContext';
import { useRoleTheme } from '../utils/roleTheme';
import { useAuth } from '../context/AuthContext';
import {
  prepMeta,
  verifiedOutcomes,
  recommendation,
  milestonesSummary,
  reuseDepartments,
} from '../data/mockData';

import prepScalingImg from '../assets/prep-scaling.png';
import procurementLegalImg from '../assets/procurement-legal.jpg';

const TABS = [
  '🛂 Official PREP Passport',
  '📂 Evidence & Milestone Ledger',
  '📊 Verified Outcome Metrics',
  '🔄 Cross-Department GeM Scaling',
];

export default function CompletedPilot() {
  const [tab, setTab] = useState(TABS[0]);
  const { pilot } = usePilot();
  const { role } = useAuth();
  const theme = useRoleTheme(role);

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col font-sans">
      <Header variant="dashboard" backTo="/prep-generation" />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
          
          {/* ── Top PREP Hero Banner (High-Contrast Navy & Gold Accent) ── */}
          <div className="bg-[#071A3D] text-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-amber-400/80 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full -mr-20 -mt-20 pointer-events-none" />
            
            <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-300 bg-amber-500/20 border border-amber-400/40 px-3 py-1 rounded-full">
                    🛂 DIGITAL CREDENTIAL · PORTABLE EVIDENCE PROTOCOL (PROTOTYPE)
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/40">
                    ✓ Recorded in FIIK Pilot Registry (Prototype)
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  Procurement Readiness Evidence Passport (PREP)
                </h1>
                <p className="text-xs sm:text-sm text-gray-300 mt-2 font-medium leading-relaxed">
                  The verified digital passport framework proving real-world innovation performance. Designed to enable evidence-backed procurement scaling across government departments and reduce redundant trial requirements.
                </p>
              </div>

              {/* Verified Grade Seal */}
              <div className="bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border-2 border-amber-400 text-white px-5 py-4 rounded-2xl text-center shadow-lg shrink-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                  OVERALL GRADE
                </span>
                <span className="text-2xl font-black text-emerald-300 block mt-0.5">
                  94.8% A+
                </span>
                <span className="text-[10px] text-gray-300 block mt-0.5">
                  Field Proven &amp; Verified
                </span>
              </div>
            </div>

            {/* Portable Pipeline Breadcrumb */}
            <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-bold">
              <div className="p-2 bg-white/10 rounded-lg border border-white/10 text-emerald-300">
                <span>1. Problem</span>
                <span className="block text-[10px] text-gray-300 font-normal">Challenge Defined</span>
              </div>
              <div className="p-2 bg-white/10 rounded-lg border border-white/10 text-emerald-300">
                <span>2. Execution</span>
                <span className="block text-[10px] text-gray-300 font-normal">IoT Telemetry Live</span>
              </div>
              <div className="p-2 bg-white/10 rounded-lg border border-white/10 text-emerald-300">
                <span>3. Evaluation</span>
                <span className="block text-[10px] text-gray-300 font-normal">Field Audit Approved</span>
              </div>
              <div className="p-2 bg-amber-500/30 rounded-lg border border-amber-400 text-amber-200 shadow-xs">
                <span>4. PREP Passport</span>
                <span className="block text-[10px] text-amber-100 font-normal">★ Passport Generated</span>
              </div>
              <div className="p-2 bg-emerald-600/30 rounded-lg border border-emerald-400 text-emerald-200">
                <span>5. Procurement</span>
                <span className="block text-[10px] text-emerald-100 font-normal">GeM Scale-Up (Simulated)</span>
              </div>
            </div>
          </div>

          <PilotSummaryBar pilot={pilot} badge={{ label: 'PREP Verified', tone: 'green' }} />

          {/* ── Navigation Tabs ── */}
          <div className="flex flex-wrap border-b-2 border-gray-200 mb-6 gap-2 mt-6">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 px-4 text-xs font-black transition-all cursor-pointer border-b-2 -mb-[2px] ${
                  tab === t
                    ? 'border-[#071A3D] text-[#071A3D] bg-white rounded-t-xl shadow-xs'
                    : 'border-transparent text-gray-500 hover:text-navy-950'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* ── TAB 1: Official PREP Passport Credential ── */}
          {tab === TABS[0] && (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Passport Visual Component */}
              <div className="lg:col-span-6 flex flex-col items-center gap-4">
                <PrepDocument
                  pilotId={prepMeta?.pilotId || 'FIIK-PILOT-024'}
                  issueDate={prepMeta?.issueDate || '20 Feb 2026'}
                  startup={pilot?.startup || 'GreenGrid Technologies Pvt. Ltd.'}
                  department={pilot?.department || 'Department of Urban Development'}
                  score="94.8% A+ (Field Proven)"
                />

                <div className="w-full flex gap-3">
                  <button
                    onClick={() => alert('Simulated PDF Download: FIIK-PILOT-024-PREP.pdf generated with digital signature!')}
                    className="flex-1 bg-[#F36C21] hover:bg-[#D94F0B] text-white text-xs font-black py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>📥 Download Verified PREP (PDF)</span>
                  </button>
                  <button
                    onClick={() => alert('PREP Verification Link copied: https://fiik.gov.in/verify/PREP-MH-2026-FIIK-024')}
                    className="bg-white border-2 border-gray-300 hover:border-navy-950 text-navy-950 text-xs font-bold px-4 py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>🔗 Share Hash</span>
                  </button>
                </div>
              </div>

              {/* Passport Key Insights & Metadata */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* Visual Banner */}
                <div className="bg-[#071A3D] text-white p-5 rounded-2xl border border-navy-900 shadow-md flex items-center gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-white/20 bg-navy-950">
                    <img src={prepScalingImg} alt="PREP Scaling" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider">
                      PORTABLE PROCUREMENT CREDENTIAL
                    </span>
                    <h3 className="text-base font-black text-white mt-1">
                      Scale-Up Procurement via GeM Pilot Mechanism (Simulated)
                    </h3>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                      Completed pilot evidence removes technical ambiguity for procurement officers nationwide.
                    </p>
                  </div>
                </div>

                {/* Structured Metadata Card */}
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm space-y-4 text-xs">
                  <h3 className="font-black text-navy-950 text-sm pb-2 border-b border-gray-100 flex items-center justify-between">
                    <span>Passport Particulars &amp; Recommendation</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ Verified for Scale-Up
                    </span>
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[10px] font-bold text-gray-400 uppercase">Registered Startup</span>
                      <p className="font-black text-navy-950 mt-0.5">{pilot?.startup || 'GreenGrid Technologies Pvt. Ltd.'}</p>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-gray-400 uppercase">Nodal Department</span>
                      <p className="font-black text-navy-950 mt-0.5">{pilot?.department || 'Dept. of Urban Development'}</p>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-gray-400 uppercase">Tested Problem Scope</span>
                      <p className="font-bold text-gray-800 mt-0.5">{pilot?.problemStatement || 'Municipal Solid Waste Automated Segregation'}</p>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-gray-400 uppercase">Pilot Duration</span>
                      <p className="font-bold text-gray-800 mt-0.5">12 Aug 2025 – 12 Feb 2026 (6 Months)</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                      Technical Evaluator Final Recommendation
                    </span>
                    <p className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-950 font-medium leading-relaxed italic">
                      &ldquo;{recommendation}&rdquo;
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ── TAB 2: Evidence & Milestone Ledger ── */}
          {tab === TABS[1] && (
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-black text-navy-950">
                    Immutable Evidence Ledger (5/5 Milestones Verified)
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">
                    Every milestone has satisfied SLA thresholds, telemetry audits, and multi-party sign-offs.
                  </p>
                </div>
                <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full font-black text-xs">
                  100% Milestones Approved
                </span>
              </div>

              <div className="space-y-3">
                {milestonesSummary.map((m, idx) => (
                  <div
                    key={m.name}
                    className="p-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl flex flex-wrap items-center justify-between gap-4 hover:border-gray-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-8 w-8 rounded-lg bg-[#071A3D] text-white flex items-center justify-center font-black text-xs">
                        0{idx + 1}
                      </span>
                      <div>
                        <h4 className="font-black text-navy-950 text-sm">{m.name}</h4>
                        <p className="text-[11px] text-gray-500 font-medium">
                          Verified by Dr. Ananya Rao · Cryptographic Hash: 0x8f4b...3e1a
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-gray-500 font-mono font-bold">Grant Released: 100%</span>
                      <span className="text-emerald-700 font-black bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-300">
                        ✓ {m.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 3: Verified Outcome Metrics ── */}
          {tab === TABS[2] && (
            <div className="space-y-6 text-xs">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                <h3 className="text-base font-black text-navy-950 mb-2">
                  Field-Verified Performance Outcomes
                </h3>
                <p className="text-xs text-gray-500 mb-6 font-medium">
                  Direct empirical measurements comparing baseline municipal metrics against pilot performance.
                </p>

                <div className="grid sm:grid-cols-3 gap-6">
                  {verifiedOutcomes.map((m) => (
                    <div
                      key={m.label}
                      className="p-6 bg-emerald-50/60 border-2 border-emerald-300 rounded-2xl text-center shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-3xl sm:text-4xl font-black text-emerald-700 block">
                          {m.delta}
                        </span>
                        <h4 className="text-sm font-black text-navy-950 mt-2">{m.label}</h4>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-3 font-medium bg-white/80 p-2 rounded-lg border border-emerald-200">
                        Verified during independent municipal field audit
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 4: Cross-Department GeM Scaling ── */}
          {tab === TABS[3] && (
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 text-xs">
              <div>
                <span className="text-xs font-black uppercase text-[#D94F0B] tracking-wider">
                  PORTABLE EVIDENCE IN ACTION
                </span>
                <h3 className="text-base font-black text-navy-950 mt-1">
                  Reuse &amp; Direct Procurement Inquiries Across Departments
                </h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed font-medium">
                  Because PREP provides a portable, evidence-backed record, other government departments can inspect this verified performance profile and initiate direct scale-up or procurement tracks without re-running trials.
                </p>
              </div>

              <div className="space-y-4">
                {reuseDepartments.map((d, i) => (
                  <div
                    key={i}
                    className="p-5 border-2 border-gray-200 rounded-xl bg-gray-50/70 hover:border-[#071A3D] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-black text-navy-950 text-sm">🏛️ {d.department}</h4>
                      <span className="text-[10px] font-black uppercase bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded border border-blue-200">
                        {d.location}
                      </span>
                    </div>
                    <p className="text-gray-700 italic font-medium leading-relaxed bg-white p-3 rounded-lg border border-gray-200">
                      &ldquo;{d.note}&rdquo;
                    </p>
                    <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-gray-500">
                      <span>Status: PREP Record Inspected</span>
                      <span className="text-emerald-700">✓ Direct Procurement Eligible (Simulated)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
