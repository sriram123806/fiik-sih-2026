import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell.jsx'
import PilotSummaryBar from '../components/PilotSummaryBar.jsx'
import StepTracker from '../components/StepTracker.jsx'
import PrepDocument from '../components/PrepDocument.jsx'
import { Card, SectionHeading } from '../components/Primitives.jsx'
import {
  pilot,
  prepProgress,
  prepDataSources,
  prepContentIncludes,
  prepMeta,
} from '../data/mockData.js'

export default function PrepGeneration() {
  const navigate = useNavigate()

  return (
    <PageShell
      active="/prep-generation"
      title="PREP Generation"
      subtitle="Procurement Readiness Evidence Passport — a standardized, verified and portable pilot performance record."
    >
      <PilotSummaryBar pilot={pilot} badge={{ label: 'Generating PREP', tone: 'blue' }} />

      <Card className="mb-6">
        <div className="pt-1 pb-2">
          <StepTracker numbered steps={prepProgress.map((s) => ({ label: s.step, state: s.state }))} />
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <SectionHeading index={1} title="Data Sources" />
          <ul className="space-y-3">
            {prepDataSources.map((source) => (
              <li key={source} className="flex items-center gap-2.5 text-sm text-gray-700">
                <CheckDot />
                {source}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <SectionHeading title="PREP Content Includes" />
          <ul className="space-y-3">
            {prepContentIncludes.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                <CheckDot />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mb-6">
        <SectionHeading index={2} title="PREP Preview" />
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <PrepDocument pilotId={prepMeta.pilotId} issueDate={prepMeta.issueDate} />
          <div className="flex-1 text-sm text-gray-500 leading-relaxed">
            <p>
              PREP is not merely a report — it is a portable, evidence-backed pilot
              credential that carries the pilot&rsquo;s identity, scope, milestones,
              evidence, evaluation and outcomes into future procurement and scale-up
              workflows.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs font-medium text-gray-600">
              <span className="px-2.5 py-1 rounded-full bg-gray-100">Completed Pilot</span>
              <Arrow />
              <span className="px-2.5 py-1 rounded-full bg-saffron-light text-saffron-dark">
                PREP
              </span>
              <Arrow />
              <span className="px-2.5 py-1 rounded-full bg-gray-100">
                Procurement / Scale-up
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <button
          onClick={() => navigate('/completed-pilot')}
          className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron-dark text-white font-medium px-5 py-2.5 rounded-md transition-colors"
        >
          Preview PREP
          <Arrow light />
        </button>
      </div>
    </PageShell>
  )
}

function CheckDot() {
  return (
    <span className="w-4 h-4 rounded-full bg-status-greenBg text-status-green flex items-center justify-center shrink-0">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function Arrow({ light }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className={light ? 'text-white' : 'text-gray-400'}
      aria-hidden="true"
    >
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
