import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiikPageShell,
  FiikHero,
  FiikDocumentCard,
  FiikDarkPanel,
  FiikRoleNotice,
  FiikStatusBadge,
} from '../components/FiikDesignSystem';
import PilotSummaryBar from '../components/PilotSummaryBar';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';
import { useRoleTheme } from '../utils/roleTheme';

export default function PilotExecutionDashboard() {
  const { role } = useAuth();
  const theme = useRoleTheme(role);
  const { pilot, stages, milestones } = usePilot();
  const navigate = useNavigate();

  const isStartup = role === 'startup';
  const isDept = role === 'department';
  const isEvaluator = role === 'evaluator';
  const isAdmin = role === 'admin';

  return (
    <FiikPageShell backTo="/dashboard">
      {/* ── Level 1 Hero Banner ── */}
      <FiikHero
        tag="PILOT EXECUTION &amp; TELEMETRY CONTROL"
        verifiedLabel="Live Telemetry Monitoring Active"
        title="Pilot Execution &amp; Milestone Work Plan"
        subtitle={
          isStartup
            ? 'Execute assigned deployment milestones, monitor IoT edge sensors, and submit verifiable evidence for technical audit.'
            : 'Operational monitoring of active municipal pilot execution, milestone deliverables, and evaluator field audits.'
        }
        pipelineStep={3}
        rightSlot={
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
              EXECUTION STATUS
            </span>
            <span className="text-xl font-black text-amber-300 block mt-0.5">
              Milestone 2 of 5
            </span>
            <span className="text-[10px] text-gray-300 font-bold block mt-0.5">
              Target Completion: 15 Feb 2026
            </span>
          </div>
        }
      />

      {/* ── Role Governance Notice ── */}
      <FiikRoleNotice
        title={`EXECUTION ROLE PERMISSION · ${theme.roleLabel.toUpperCase()}`}
        action={
          (isEvaluator || isDept || isAdmin) && (
            <Link
              to="/field-evaluation"
              className="px-4 py-2 rounded-xl text-xs font-black text-white shadow-xs"
              style={{ backgroundColor: theme.accent }}
            >
              Open Technical Field Audit Interface →
            </Link>
          )
        }
      >
        {isStartup && 'You are authorized to deploy field units, upload evidentiary reports, and log live telemetry for evaluator review.'}
        {isDept && 'Department Officer View: Monitor milestone deliverable completion and municipal performance metrics in real time.'}
        {isEvaluator && 'Technical Evaluator Mode: Audit submitted sensor data, verify field deployments, and conduct on-site inspections.'}
        {isAdmin && 'MSInS Oversight Mode: State-level tracking of active pilot milestones and escrow disbursement triggers.'}
      </FiikRoleNotice>

      {/* ── Level 3 Document Card: Active Milestones Ledger ── */}
      <FiikDocumentCard
        title="Phased Milestone Execution Ledger"
        subtitle="Verifiable deliverables required for technical evaluation sign-off and grant release."
        index={1}
        icon="🚀"
      >
        <div className="space-y-4">
          {milestones.map((m, idx) => (
            <div
              key={m.id}
              className={`p-5 rounded-2xl border-2 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                m.status === 'In Progress'
                  ? 'border-amber-400 bg-amber-50/40 shadow-xs ring-2 ring-amber-400/20'
                  : m.status === 'Completed'
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-gray-200 bg-gray-50/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`h-10 w-10 rounded-2xl flex items-center justify-center text-sm font-black shrink-0 shadow-xs ${
                    m.status === 'Completed'
                      ? 'bg-emerald-600 text-white'
                      : m.status === 'In Progress'
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  0{idx + 1}
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-black text-base text-[#071A3D]">{m.name}</h3>
                    <FiikStatusBadge status={m.status} />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 font-medium leading-relaxed">
                    {m.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-2 font-medium">
                    <span>Timeline: <strong className="text-[#071A3D]">{m.timeline}</strong></span>
                    <span>·</span>
                    <span>Deliverable: <strong className="text-[#071A3D]">{m.expectedOutput}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                {m.status === 'In Progress' && isStartup && (
                  <button
                    onClick={() => navigate('/evidence-submission')}
                    className="px-5 py-2.5 rounded-xl font-black text-xs text-white shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    style={{ backgroundColor: theme.accent }}
                  >
                    <span>Submit Evidence</span>
                    <span>→</span>
                  </button>
                )}

                {m.status === 'In Progress' && (isEvaluator || isDept || isAdmin) && (
                  <button
                    onClick={() => navigate('/field-evaluation')}
                    className="px-5 py-2.5 rounded-xl font-black text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Audit Evidence</span>
                    <span>→</span>
                  </button>
                )}

                {m.status === 'Completed' && (
                  <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-xl border border-emerald-300">
                    ✓ Verified &amp; Signed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </FiikDocumentCard>
    </FiikPageShell>
  );
}
