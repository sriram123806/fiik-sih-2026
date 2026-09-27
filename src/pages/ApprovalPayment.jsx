import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PilotSummaryBar from '../components/PilotSummaryBar';
import StepTracker from '../components/StepTracker';
import { Card, SectionHeading, Field } from '../components/Primitives';
import StatusBadge from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';
import { paymentDetails, paymentHistory } from '../data/mockData';

export default function ApprovalPayment() {
  const { role } = useAuth();
  const { pilot, fourPartyReview, completeAllMilestones } = usePilot();
  const navigate = useNavigate();

  const isStartup = role === 'startup';
  const isDept = role === 'department';
  const isEvaluator = role === 'evaluator';
  const isAdmin = role === 'admin';

  const handleCompleteAndProceed = () => {
    completeAllMilestones();
    navigate('/prep-generation');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header variant="dashboard" backTo="/execution" />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 max-w-5xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-navy-950">
                Milestone Approval &amp; Payment Processing
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Track approval status from all stakeholders and finance grant disbursement.
              </p>
            </div>
            <StatusBadge status="PAYMENT_PROCESSING" label="Payment Processing" />
          </div>

          <PilotSummaryBar pilot={pilot} badge={{ label: 'Milestone 2 Approved', tone: 'green' }} />

          {/* Role Governance Banner */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6 text-xs text-gray-600">
            <span className="font-bold text-navy-950 block uppercase tracking-wider">PAYMENT ROLE PERMISSION: {(role || 'N/A').toUpperCase()}</span>
            <p className="mt-0.5">
              {isStartup && 'Startup Action: Track milestone 2 approval and submit invoice/payment release request.'}
              {isDept && 'Government Dept Action: Confirm department milestone approval for finance disbursement.'}
              {isEvaluator && 'Evaluator View: Technical recommendation sign-off recorded for Milestone 2.'}
              {isAdmin && 'MSInS / Finance Authority Action: Process grant disbursement and release payment to generate PREP.'}
            </p>
          </div>

          {/* Four-Party Approval Status */}
          <Card className="mb-6">
            <SectionHeading index={1} title="Four-Party Approval Status" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {fourPartyReview.map((p) => (
                <div key={p.party} className="border border-gray-200 rounded-lg p-3.5 flex flex-col gap-1.5 bg-gray-50/50">
                  <span className="text-xs font-bold text-navy-950">{p.party}</span>
                  <StatusBadge status={p.status} tone={p.state} />
                  <span className="text-[10px] text-gray-400 mt-1">{p.date || p.detail}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide block mb-3">
                Approval &amp; Payment Timeline
              </span>
              <StepTracker
                steps={[
                  { label: 'Evidence Submitted', meta: '08 Oct 2025', state: 'done' },
                  { label: 'Evaluator Review', meta: '09 Oct 2025', state: 'done' },
                  { label: 'Department Approval', meta: '10 Oct 2025', state: 'done' },
                  { label: 'Finance Processing', meta: 'In Progress', state: 'current' },
                  { label: 'Payment Release', meta: 'Pending', state: 'pending' },
                ]}
              />
            </div>
          </Card>

          {/* Payment Details */}
          <Card className="mb-6">
            <SectionHeading index={2} title="Payment &amp; Grant Details" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <Field label="Approved Amount" value={paymentDetails?.approvedAmount || 'N/A'} />
              <Field label="Milestone" value="Milestone 2 of 5" />
              <Field label="Disbursement Type" value={paymentDetails?.paymentType || 'N/A'} />
              <Field label="Expected Release Date" value={paymentDetails?.expectedReleaseDate || 'N/A'} />
            </div>
          </Card>

          {/* Payment History */}
          <Card className="mb-6">
            <SectionHeading index={3} title="Payment History" />
            <div className="divide-y divide-gray-100">
              {paymentHistory.map((h) => (
                <div key={h.label} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="h-7 w-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                      ✓
                    </span>
                    <div>
                      <p className="font-bold text-navy-950">{h.label}</p>
                      <p className="text-[11px] text-gray-400">{h.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-navy-950 text-sm">{h.amount}</span>
                    <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                      Released
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Disclaimer & Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-[11px] text-gray-400 max-w-lg leading-tight">
              Prototype simulation: FIIK records and displays payment approval status from authorized finance workflows. Real government funds release occurs through PFMS/State Treasury integrations.
            </p>

            {isAdmin && (
              <button
                onClick={handleCompleteAndProceed}
                className="btn btn-primary text-xs bg-purple-800 hover:bg-purple-900"
              >
                Release Payment &amp; Generate PREP Passport →
              </button>
            )}

            {isDept && (
              <button
                onClick={handleCompleteAndProceed}
                className="btn btn-primary text-xs bg-fiik-orange hover:bg-fiik-orangeDark"
              >
                Confirm Department Payment Authorization →
              </button>
            )}

            {isStartup && (
              <button
                onClick={handleCompleteAndProceed}
                className="btn btn-primary text-xs bg-fiik-orange hover:bg-fiik-orangeDark"
              >
                Submit Payment Request &amp; Track PREP →
              </button>
            )}

            {isEvaluator && (
              <button
                onClick={() => navigate('/completed-pilot')}
                className="btn btn-secondary text-xs"
              >
                View PREP Record Registry →
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
