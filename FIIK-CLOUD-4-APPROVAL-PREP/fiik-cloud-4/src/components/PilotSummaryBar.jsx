import StatusBadge from './StatusBadge.jsx'

export default function PilotSummaryBar({ pilot, badge }) {
  return (
    <div className="bg-white border border-gray-200 rounded-card shadow-card p-4 sm:p-5 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center shrink-0">
            <PilotIcon />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{pilot.name}</div>
            <div className="text-sm text-gray-500">{pilot.department}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <SummaryField label="Pilot ID" value={pilot.pilotId} />
          <SummaryField label="Milestone" value={pilot.currentMilestone} />
        </div>

        {badge && <StatusBadge label={badge.label} tone={badge.tone} />}
      </div>
    </div>
  )
}

function SummaryField({ label, value }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-gray-400">{label}</div>
      <div className="font-medium text-gray-800">{value}</div>
    </div>
  )
}

function PilotIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2l3 6 6 .9-4.5 4.3 1 6-5.5-3-5.5 3 1-6L3 8.9 9 8l3-6z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}
