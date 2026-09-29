import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiikPageShell,
  FiikHero,
  FiikDocumentCard,
  FiikDarkPanel,
  FiikRoleNotice,
  FiikStatusBadge,
} from '../components/FiikDesignSystem';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';
import { useRoleTheme } from '../utils/roleTheme';
import { reviewTimeline, currentStartup } from '../data/mockData';

const PARTY_ROLES = [
  { key: 'startup', label: 'Startup Innovator', icon: '🚀', accent: '#1D70B8' },
  { key: 'department', label: 'Government Department', icon: '🏛️', accent: '#E05625' },
  { key: 'evaluator', label: 'Technical Evaluator', icon: '👥', accent: '#1E8549' },
  { key: 'admin', label: 'MSInS Nodal Authority', icon: '🛡️', accent: '#7C4DFF' },
];

export default function FourPartyReview() {
  const { role } = useAuth();
  const theme = useRoleTheme(role);
  const [showHistory, setShowHistory] = useState(false);
  const { fourPartyReview, setPilot } = usePilot();
  const navigate = useNavigate();

  const isStartup = role === 'startup';
  const isDept = role === 'department';
  const isEvaluator = role === 'evaluator';
  const isAdmin = role === 'admin';

  const handleApproveAction = () => {
    if (isAdmin) {
      setPilot((prev) => ({
        ...prev,
        status: 'WORK_ORDER_ISSUED',
        statusLabel: 'Work Order Issued & Published',
      }));
      navigate('/execution');
    } else {
      navigate('/execution');
    }
  };

  return (
    <FiikPageShell backTo="/dashboard">
      {/* ── Level 1 Hero Banner ── */}
      <FiikHero
        tag="MULTI-STAKEHOLDER GOVERNANCE GATEWAY"
        verifiedLabel="4-Party Digital Sign-Off"
        title="Four-Party Governance &amp; Pilot Authorization"
        subtitle="Coordinated multi-stakeholder governance: Startup Proposal → Department Validation → Technical Feasibility Audit → MSInS Work Order Issuance."
        pipelineStep={2}
        rightSlot={
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
              SIGN-OFF PROGRESS
            </span>
            <span className="text-xl font-black text-emerald-300 block mt-0.5">
              3 of 4 Signatures
            </span>
            <span className="text-[10px] text-gray-300 font-bold block mt-0.5">
              Awaiting Final MSInS Order
            </span>
          </div>
        }
      />

      {/* ── Role Governance Notice ── */}
      <FiikRoleNotice
        title={`GOVERNANCE RESPONSIBILITY · ${theme.roleLabel.toUpperCase()}`}
      >
        {isStartup && 'Your pilot proposal is actively being reviewed across municipal, technical, and state authorities.'}
        {isDept && 'Government Department Review: Verify alignment with municipal requirements, location readiness, and sign off.'}
        {isEvaluator && 'Technical Evaluator Review: Assess technical feasibility, baseline accuracy, and milestone criteria.'}
        {isAdmin && 'MSInS Nodal Authority: Issue and publish the official legal FIIK Work Order following all 4 party sign-offs.'}
      </FiikRoleNotice>

      {/* ── Level 3 Document Card: Proposal Summary ── */}
      <FiikDocumentCard
        title="Active Pilot Proposal Under Review"
        subtitle="Referenced under Proposal ID REQ-2026-0417"
        icon="📄"
        action={
          <button
            onClick={() => navigate('/work-order')}
            className="px-4 py-2 rounded-xl text-xs font-black border-2 border-gray-300 text-[#071A3D] hover:bg-gray-50 transition-colors"
          >
            Inspect Full Work Order Proposal →
          </button>
        }
      >
        <div className="grid sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
              PILOT CHALLENGE
            </span>
            <p className="text-sm font-black text-[#071A3D] mt-1">
              {currentStartup.problemStatement}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
              NODAL DEPARTMENT
            </span>
            <p className="text-sm font-black text-[#071A3D] mt-1">
              {currentStartup.department}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
              PROPOSING STARTUP
            </span>
            <p className="text-sm font-black text-[#071A3D] mt-1">
              {currentStartup.name}
            </p>
          </div>
        </div>
      </FiikDocumentCard>

      {/* ── Four Party Stakeholder Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {fourPartyReview.map((party, i) => {
          const roleConfig = PARTY_ROLES[i] || PARTY_ROLES[0];
          return (
            <div
              key={party.party}
              className="bg-white border-2 border-gray-200/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-gray-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="h-8 w-8 rounded-xl text-white font-black text-xs flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: roleConfig.accent }}
                  >
                    0{i + 1}
                  </span>
                  <FiikStatusBadge status={party.status} tone={party.state} />
                </div>

                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg">{roleConfig.icon}</span>
                  <h3 className="font-black text-sm text-[#071A3D]">
                    {party.party}
                  </h3>
                </div>

                <p className="text-xs text-gray-600 mt-1 font-medium leading-relaxed">
                  {party.date || party.detail}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-500">
                <span>Sign-off Recorded</span>
                <span className="text-emerald-600">✓ Digital Hash</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Level 3 Document Card: Governance Actions & Audit Trail ── */}
      <FiikDocumentCard
        title="Multi-Stakeholder Governance Actions"
        subtitle="Execute sign-offs, inspect technical audit logs, and trigger pilot execution."
        index={4}
      >
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => navigate('/work-order')}
            className="px-5 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-50 transition-colors"
          >
            📄 View Proposal &amp; Baseline Metrics
          </button>

          <button
            onClick={() => setShowHistory((v) => !v)}
            className="px-5 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-50 transition-colors"
          >
            📜 {showHistory ? 'Hide Review Audit Log' : 'View Review Audit Log'}
          </button>

          {isDept && (
            <button
              onClick={handleApproveAction}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-orange-600 hover:bg-orange-700 shadow-md transition-all ml-auto"
            >
              ✓ Approve Department Requirement
            </button>
          )}

          {isEvaluator && (
            <button
              onClick={handleApproveAction}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all ml-auto"
            >
              ✓ Recommend Technical Feasibility
            </button>
          )}

          {isAdmin && (
            <button
              onClick={handleApproveAction}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-purple-800 hover:bg-purple-900 shadow-md transition-all ml-auto"
            >
              📜 Finalize &amp; Issue Official Work Order →
            </button>
          )}

          {isStartup && (
            <button
              onClick={handleApproveAction}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-[#071A3D] hover:bg-black shadow-md transition-all ml-auto"
            >
              View Pilot Execution Dashboard →
            </button>
          )}
        </div>

        {showHistory && (
          <div className="mt-6 p-6 bg-gray-50 rounded-2xl border-2 border-gray-200 space-y-3">
            <h4 className="font-black text-xs uppercase tracking-wider text-[#071A3D] mb-3">
              Immutable Governance Audit Trail
            </h4>
            {reviewTimeline.map((t, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs">
                <span className={`h-2.5 w-2.5 rounded-full ${t.done ? 'bg-emerald-600' : t.active ? 'bg-amber-500' : 'bg-gray-300'}`} />
                <span className="font-bold text-gray-900">{t.label}</span>
                <span className="text-gray-500 font-mono">({t.date})</span>
              </div>
            ))}
          </div>
        )}
      </FiikDocumentCard>
    </FiikPageShell>
  );
}
