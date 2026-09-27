import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PilotSummaryBar from '../components/PilotSummaryBar';
import PrepDocument from '../components/PrepDocument';
import { Card, Field } from '../components/Primitives';
import StatusBadge from '../components/StatusBadge';
import { usePilot } from '../context/PilotContext';
import {
  prepMeta,
  verifiedOutcomes,
  recommendation,
  milestonesSummary,
  reuseDepartments,
} from '../data/mockData';

const TABS = ['PREP Record', 'Summary', 'Impact Metrics', 'Reuse Across Departments'];

export default function CompletedPilot() {
  const [tab, setTab] = useState(TABS[0]);
  const { pilot } = usePilot();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header variant="dashboard" backTo="/prep-generation" />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 max-w-5xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-navy-950">
                Completed Pilot — Portable PREP Record
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Your verified pilot performance record, accessible across departments for procurement and scale-up.
              </p>
            </div>
            <StatusBadge status="COMPLETED" label="Completed & PREP Verified" />
          </div>

          <PilotSummaryBar pilot={pilot} badge={{ label: 'PREP Verified', tone: 'green' }} />

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 mb-6 gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors ${
                  tab === t
                    ? 'border-fiik-orange text-fiik-orangeDark'
                    : 'border-transparent text-gray-500 hover:text-navy-950'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab 1: PREP Record */}
          {tab === 'PREP Record' && (
            <div className="grid lg:grid-cols-[300px_1fr] gap-6">
              <div className="flex flex-col items-center gap-4">
                <PrepDocument pilotId={prepMeta?.pilotId || 'N/A'} issueDate={prepMeta?.issueDate || 'N/A'} compact />
                <button
                  onClick={() => alert('Simulated PDF Download: FIIK-PILOT-024-PREP.pdf generated!')}
                  className="w-full bg-fiik-orange hover:bg-fiik-orangeDark text-white text-xs font-bold py-2.5 rounded-md transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  📥 Download PREP Record (PDF)
                </button>
              </div>

              <Card>
                <h3 className="text-sm font-bold text-navy-950 mb-4 pb-2 border-b border-gray-100">
                  Passport Summary &amp; Key Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <Field label="Startup Name" value={pilot?.startup || 'N/A'} />
                  <Field label="Department" value={pilot?.department || 'N/A'} />
                  <Field label="Problem Statement" value={pilot?.problemStatement || 'N/A'} />
                  <Field label="Pilot Duration" value={pilot.duration || pilot.startDate} />
                  <Field label="Procurement Recommendation" value={recommendation} />
                  <Field label="Passport Status" value={prepMeta?.status || 'N/A'} />
                </div>
              </Card>
            </div>
          )}

          {/* Tab 2: Summary */}
          {tab === 'Summary' && (
            <Card>
              <div className="grid sm:grid-cols-2 gap-4 mb-6 text-xs">
                <Field label="Pilot ID" value={pilot?.pilotId || pilot?.id || 'N/A'} />
                <Field label="Pilot Objective" value={pilot?.pilotObjective || 'N/A'} />
                <Field label="Pilot Scope" value={pilot?.pilotScope || 'N/A'} />
                <Field label="Completion Status" value="Completed & Validated" />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
                  Milestones Execution Ledger
                </h4>
                <div className="space-y-2 text-xs">
                  {milestonesSummary.map((m) => (
                    <div key={m.name} className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="font-semibold text-gray-800">{m.name}</span>
                      <span className="text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-200">
                        ✓ {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Tab 3: Impact Metrics */}
          {tab === 'Impact Metrics' && (
            <Card>
              <h3 className="text-sm font-bold text-navy-950 mb-4 pb-2 border-b border-gray-100">
                Verified Outcome Metrics
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {verifiedOutcomes.map((m) => (
                  <div key={m.label} className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center">
                    <span className="text-2xl font-black text-green-700 block">{m.delta}</span>
                    <span className="text-xs font-bold text-navy-950 block mt-1">{m.label}</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">Validated during field evaluation</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Tab 4: Reuse Across Departments */}
          {tab === 'Reuse Across Departments' && (
            <Card>
              <h3 className="text-sm font-bold text-navy-950 mb-4 pb-2 border-b border-gray-100">
                Reuse &amp; Scale-Up Records Across Departments
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Because PREP provides a portable, evidence-backed record, other government departments can inspect this verified performance profile and initiate direct scale-up or procurement tracks.
              </p>
              <div className="space-y-3 text-xs">
                {reuseDepartments.map((d, i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                    <p className="font-bold text-navy-950 text-sm">{d.department}</p>
                    <p className="text-gray-500">{d.location}</p>
                    <p className="text-gray-700 mt-1 italic">&ldquo;{d.note}&rdquo;</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
