import PageShell from '../components/PageShell.jsx'
import PilotSummaryBar from '../components/PilotSummaryBar.jsx'
import StepTracker from '../components/StepTracker.jsx'
import { Card, SectionHeading, Field } from '../components/Primitives.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import {
  pilot,
  fourPartyApproval,
  approvalTimeline,
  paymentDetails,
  paymentHistory,
} from '../data/mockData.js'

const PARTY_TONE = { green: 'green', amber: 'amber' }

export default function ApprovalPayment() {
  return (
    <PageShell
      active="/approval-payment"
      title="Milestone Approval & Payment Processing"
      subtitle="Track approval status from all stakeholders and payment processing."
    >
      <PilotSummaryBar pilot={pilot} badge={{ label: pilot.milestoneStatus, tone: 'amber' }} />

      <Card className="mb-6">
        <SectionHeading index={1} title="Four-Party Approval Status" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {fourPartyApproval.map((p) => (
            <div
              key={p.party}
              className="border border-gray-100 rounded-lg p-3.5 flex flex-col gap-2"
            >
              <div className="text-sm font-medium text-gray-700">{p.party}</div>
              <StatusBadge label={p.status} tone={PARTY_TONE[p.state] ?? 'grey'} />
              <div className="text-[11px] text-gray-400">{p.detail}</div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-gray-100">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-5 mt-4">
            Approval Timeline
          </div>
          <StepTracker
            steps={approvalTimeline.map((s) => ({
              label: s.label,
              meta: s.date,
              state: s.state,
            }))}
          />
        </div>
      </Card>

      <Card className="mb-6">
        <SectionHeading index={2} title="Payment Details" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Field label="Approved Amount" value={paymentDetails.approvedAmount} />
          <Field label="Milestone" value={paymentDetails.milestone} />
          <Field label="Payment Type" value={paymentDetails.paymentType} />
          <Field label="Expected Release Date" value={paymentDetails.expectedReleaseDate} />
        </div>
      </Card>

      <Card className="mb-6">
        <SectionHeading index={3} title="Payment History" />
        <div className="divide-y divide-gray-100">
          {paymentHistory.map((h) => (
            <div
              key={h.label}
              className="flex flex-wrap items-center justify-between gap-3 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-status-greenBg text-status-green flex items-center justify-center">
                  <CheckIcon />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{h.label}</div>
                  <div className="text-xs text-gray-400">{h.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-semibold text-gray-900">{h.amount}</div>
                <button className="text-sm text-saffron-dark font-medium border border-saffron/30 rounded-md px-3 py-1.5 hover:bg-saffron-light transition-colors">
                  View Transaction
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <p className="text-xs text-gray-400 max-w-2xl">
        This is a prototype interface. FIIK displays and records the payment-processing
        status provided by the authorized government/finance workflow — it does not connect
        to a real bank or release government funds.
      </p>
    </PageShell>
  )
}

function CheckIcon() {
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
