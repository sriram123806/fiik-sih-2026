import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiikPageShell,
  FiikHero,
  FiikDarkPanel,
  FiikDocumentCard,
  FiikRoleNotice,
  FiikStatusBadge,
} from '../components/FiikDesignSystem';
import StepTracker from '../components/StepTracker';
import { Field } from '../components/Primitives';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';
import { useRoleTheme } from '../utils/roleTheme';
import { paymentDetails, paymentHistory } from '../data/mockData';

export default function ApprovalPayment() {
  const { role } = useAuth();
  const theme = useRoleTheme(role);
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
    <FiikPageShell backTo="/execution">
      {/* ── Level 1 Hero Banner ── */}
      <FiikHero
        tag="ESCROW DISBURSEMENT &amp; TREASURY INTEGRATION"
        verifiedLabel="Simulated PFMS Escrow Protocol"
        title="Milestone Approval &amp; Escrow Payment Processing"
        subtitle="Multi-party milestone sign-offs trigger automated escrow fund release and authorize transition into PREP Passport issuance."
        pipelineStep={4}
        rightSlot={
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
              DISBURSEMENT AMOUNT
            </span>
            <span className="text-2xl font-black text-emerald-300 block mt-0.5">
              ₹ 5,00,000
            </span>
            <span className="text-[10px] text-gray-300 font-bold block mt-0.5">
              Milestone 02 Grant Escrow
            </span>
          </div>
        }
      />

      {/* ── Level 2: Dark Operational Escrow Treasury Stream ── */}
      <FiikDarkPanel
        title="Escrow Account Liquidity &amp; Simulated PFMS Treasury Telemetry"
        subtitle="Dedicated public procurement escrow account governed under State Innovation Society guidelines (Prototype Simulation)"
        badge={
          <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
            Escrow Status: Liquid &amp; Ready (Demo)
          </span>
        }
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-gray-400 font-bold block text-[11px]">TOTAL PILOT GRANT</span>
            <span className="text-xl font-black text-white block mt-1">₹ 25.0 Lakhs</span>
            <span className="text-[10px] text-emerald-400 mt-0.5 block">100% Locked in Escrow</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-gray-400 font-bold block text-[11px]">PREVIOUSLY RELEASED</span>
            <span className="text-xl font-black text-emerald-300 block mt-1">₹ 5.0 Lakhs</span>
            <span className="text-[10px] text-gray-300 mt-0.5 block">Milestone 1 Completed</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-gray-400 font-bold block text-[11px]">PENDING RELEASE</span>
            <span className="text-xl font-black text-amber-300 block mt-1">₹ 5.0 Lakhs</span>
            <span className="text-[10px] text-amber-300 mt-0.5 block">Milestone 2 Approval</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-gray-400 font-bold block text-[11px]">TREASURY GATEWAY</span>
            <span className="text-xl font-black text-white block mt-1">PFMS (Simulated)</span>
            <span className="text-[10px] text-emerald-400 mt-0.5 block">Validated Protocol</span>
          </div>
        </div>
      </FiikDarkPanel>

      {/* ── Level 3 Document Card: Four-Party Sign-off Matrix ── */}
      <FiikDocumentCard
        title="Four-Party Milestone Sign-off Matrix"
        subtitle="All stakeholders must validate deliverables before milestone payment release."
        index={1}
        icon="⚖️"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {fourPartyReview.map((p) => (
            <div
              key={p.party}
              className="border-2 border-gray-200/90 rounded-2xl p-4 bg-gray-50/50 flex flex-col justify-between gap-2"
            >
              <div>
                <span className="text-xs font-black text-[#071A3D] block">{p.party}</span>
                <span className="text-[10px] text-gray-400 mt-0.5 block font-medium">{p.date || p.detail}</span>
              </div>
              <FiikStatusBadge status={p.status} tone={p.state} />
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-100">
          <span className="text-xs font-black text-[#071A3D] uppercase tracking-wider block mb-4">
            Approval &amp; Payment Processing Pipeline
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
      </FiikDocumentCard>

      {/* ── Level 3 Document Card: Payment Details ── */}
      <FiikDocumentCard
        title="Grant Disbursement Parameters"
        subtitle="Escrow transaction metadata and PFMS treasury reference."
        index={2}
        icon="💳"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <Field label="Approved Amount" value={paymentDetails?.approvedAmount || '₹ 5,00,000'} />
          <Field label="Active Milestone" value="Milestone 2 of 5" />
          <Field label="Disbursement Mode" value={paymentDetails?.paymentType || 'PFMS / State Escrow (Simulated)'} />
          <Field label="Expected Release Date" value={paymentDetails?.expectedReleaseDate || '12 Oct 2025'} />
        </div>
      </FiikDocumentCard>

      {/* ── Level 3 Document Card: Payment History Ledger ── */}
      <FiikDocumentCard
        title="Escrow Disbursement History Ledger"
        subtitle="Audited financial transactions logged to state registry."
        index={3}
        icon="📜"
      >
        <div className="space-y-3">
          {paymentHistory.map((h) => (
            <div
              key={h.label}
              className="p-4 rounded-xl border-2 border-gray-200/90 bg-gray-50/50 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <span className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
                  ✓
                </span>
                <div>
                  <p className="font-black text-sm text-[#071A3D]">{h.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">{h.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-black text-sm text-emerald-700">{h.amount}</span>
                <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  Released ✓
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-gray-500 max-w-lg leading-relaxed font-medium">
            FIIK records milestone approval status from authorized finance workflows. Real funds release occurs through state PFMS integrations.
          </p>

          {isAdmin && (
            <button
              onClick={handleCompleteAndProceed}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-purple-800 hover:bg-purple-900 shadow-md transition-all ml-auto cursor-pointer"
            >
              Release Payment &amp; Generate PREP Passport →
            </button>
          )}

          {isDept && (
            <button
              onClick={handleCompleteAndProceed}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-orange-600 hover:bg-orange-700 shadow-md transition-all ml-auto cursor-pointer"
            >
              Confirm Department Payment Authorization →
            </button>
          )}

          {isStartup && (
            <button
              onClick={handleCompleteAndProceed}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white shadow-md transition-all ml-auto cursor-pointer"
              style={{ backgroundColor: theme.accent }}
            >
              Submit Payment Request &amp; Track PREP →
            </button>
          )}

          {isEvaluator && (
            <button
              onClick={() => navigate('/completed-pilot')}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all ml-auto cursor-pointer"
            >
              View PREP Record Registry →
            </button>
          )}
        </div>
      </FiikDocumentCard>
    </FiikPageShell>
  );
}
