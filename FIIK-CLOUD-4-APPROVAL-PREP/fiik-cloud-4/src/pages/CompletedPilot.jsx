import { useState } from 'react'
import PageShell from '../components/PageShell.jsx'
import PilotSummaryBar from '../components/PilotSummaryBar.jsx'
import PrepDocument from '../components/PrepDocument.jsx'
import { Card, Field } from '../components/Primitives.jsx'
import {
  pilot,
  prepMeta,
  verifiedOutcomes,
  recommendation,
  milestonesSummary,
  reuseDepartments,
} from '../data/mockData.js'

const TABS = ['PREP Record', 'Summary', 'Impact Metrics', 'Reuse Across Departments']

export default function CompletedPilot() {
  const [tab, setTab] = useState(TABS[0])

  return (
    <PageShell
      active="/completed-pilot"
      title="Completed Pilot — Portable PREP Record"
      subtitle="Your verified pilot performance record, accessible across departments for procurement and scale-up."
    >
      <PilotSummaryBar pilot={pilot} badge={{ label: pilot.completionStatus, tone: 'green' }} />

      <div className="flex flex-wrap gap-1 border-b border-gray-200 mb-6">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t
                ? 'border-saffron text-saffron-dark'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'PREP Record' && <PrepRecordTab />}
      {tab === 'Summary' && <SummaryTab />}
      {tab === 'Impact Metrics' && <ImpactMetricsTab />}
      {tab === 'Reuse Across Departments' && <ReuseTab />}
    </PageShell>
  )
}

function PrepRecordTab() {
  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6">
      <div className="flex flex-col items-center gap-4">
        <PrepDocument pilotId={prepMeta.pilotId} issueDate={prepMeta.issueDate} compact />
        <button className="w-full max-w-[280px] inline-flex items-center justify-center gap-2 bg-saffron hover:bg-saffron-dark text-white text-sm font-medium px-4 py-2.5 rounded-md transition-colors">
          <DownloadIcon />
          Download PREP (PDF)
        </button>
      </div>

      <Card>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Startup Name" value={pilot.startup} />
          <Field label="Department" value={pilot.department} />
          <Field label="Problem Statement" value={pilot.problemStatement} />
          <Field label="Pilot Duration" value={pilot.duration} />
          <Field label="Recommendation" value={recommendation} />
          <Field label="Status" value={prepMeta.status} />
        </div>
      </Card>
    </div>
  )
}

function SummaryTab() {
  return (
    <Card>
      <div className="grid sm:grid-cols-2 gap-5 mb-6">
        <Field label="Pilot ID" value={pilot.pilotId} />
        <Field label="Pilot Objective" value={pilot.pilotObjective} />
        <Field label="Pilot Scope" value={pilot.pilotScope} />
        <Field label="Completion Status" value={pilot.completionStatus} />
      </div>
      <div className="pt-4 border-t border-gray-100">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
          Milestones
        </div>
        <div className="space-y-2.5">
          {milestonesSummary.map((m) => (
            <div key={m.name} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{m.name}</span>
              <span className="inline-flex items-center gap-1.5 text-status-green font-medium">
                <CheckDot />
                {m.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

function ImpactMetricsTab() {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {verifiedOutcomes.map((o) => (
        <Card key={o.label} className="text-center">
          <div
            className={`text-2xl font-bold ${
              o.direction === 'up' ? 'text-status-green' : 'text-status-blue'
            }`}
          >
            {o.delta}
          </div>
          <div className="text-sm text-gray-500 mt-1">{o.label}</div>
        </Card>
      ))}
      <p className="sm:col-span-3 text-xs text-gray-400 mt-1">
        Demonstration values for this prototype pilot record.
      </p>
    </div>
  )
}

function ReuseTab() {
  return (
    <div>
      <Card className="mb-5">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-gray-600">
          <span className="px-2.5 py-1 rounded-full bg-status-greenBg text-status-green">
            One Completed Pilot Record
          </span>
          <Arrow />
          <span className="px-2.5 py-1 rounded-full bg-saffron-light text-saffron-dark">
            Reusable Evidence
          </span>
          <Arrow />
          <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
            Future Procurement / Scale-up Consideration
          </span>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reuseDepartments.map((d) => (
          <Card key={d.department + d.location}>
            <div className="text-sm font-semibold text-gray-900">{d.department}</div>
            <div className="text-xs text-gray-400 mb-2">{d.location}</div>
            <p className="text-sm text-gray-600">{d.note}</p>
          </Card>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-5 max-w-2xl">
        Portable evidence reuse only — this does not grant automatic procurement approval
        or transfer the original work order to another department.
      </p>
    </div>
  )
}

function CheckDot() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
