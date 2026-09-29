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
import { evaluationChecklist, fileTypeIcons } from '../data/mockData';

const TABS = ['Submitted Evidence', 'Evaluation Report & Checklist', 'Field Inspection Log'];

export default function FieldEvaluation() {
  const { role } = useAuth();
  const theme = useRoleTheme(role);
  const [tab, setTab] = useState(TABS[0]);
  const [checklist, setChecklist] = useState(evaluationChecklist);
  const [techEvaluation, setTechEvaluation] = useState(
    'System installed as per plan. Performance metrics indicate 45% collection efficiency gain and 20% segregation compliance in wards 12 & 14.'
  );
  const [fieldNotes, setFieldNotes] = useState(
    'On-site inspection completed on 08 Oct 2025. Smart bin sensors working with live cloud telemetry.'
  );
  const { pilot, evidence, approveMilestone } = usePilot();
  const navigate = useNavigate();

  const isEvaluator = role === 'evaluator';
  const isDept = role === 'department';
  const isAdmin = role === 'admin';
  const isStartup = role === 'startup';

  function toggleItem(id) {
    if (!isEvaluator) return;
    setChecklist(checklist.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c)));
  }

  function handleApprove() {
    approveMilestone(2);
    navigate('/approval-payment');
  }

  return (
    <FiikPageShell backTo="/execution">
      {/* ── Level 1 Hero Banner ── */}
      <FiikHero
        tag="TECHNICAL AUDIT &amp; FIELD VERIFICATION"
        verifiedLabel="Empanelled Expert Audit Mode"
        title={
          isEvaluator
            ? 'Field Evaluation & Technical Audit'
            : isDept
            ? 'Department Review of Technical Evaluation'
            : isAdmin
            ? 'MSInS Technical Audit & Evidence Oversight'
            : 'Milestone 02 Field Evaluation & Audit Status'
        }
        subtitle="Independent technical verification of submitted milestone evidence, on-site device telemetry, and empirical performance metrics."
        pipelineStep={4}
        rightSlot={
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
              AUDIT STATUS
            </span>
            <span className="text-xl font-black text-emerald-300 block mt-0.5">
              92.4% Score
            </span>
            <span className="text-[10px] text-gray-300 font-bold block mt-0.5">
              ✓ Field Verification Passed
            </span>
          </div>
        }
      />

      {/* ── Role Governance Notice ── */}
      <FiikRoleNotice
        title={`EVALUATION ROLE PERMISSION · ${theme.roleLabel.toUpperCase()}`}
      >
        {isEvaluator && 'You are authorized to audit technical telemetry, record field inspection findings, complete checklist items, and recommend milestone completion.'}
        {isDept && 'Department Officer View: Review the technical expert evaluation before authorizing escrow grant disbursement.'}
        {isAdmin && 'MSInS Admin View: Oversight of technical evaluation accuracy and evidence checklist verification.'}
        {isStartup && 'Startup View: Read-only inspection of evaluator checklist and field audit status for Milestone 2.'}
      </FiikRoleNotice>

      {/* ── Pilot Info Summary Banner ── */}
      <div className="bg-white border-2 border-gray-200/90 rounded-2xl p-6 shadow-sm mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-gray-400 block font-black uppercase text-[10px]">PILOT NAME</span>
          <strong className="text-[#071A3D] font-extrabold text-sm block mt-0.5">{pilot.name}</strong>
        </div>
        <div>
          <span className="text-gray-400 block font-black uppercase text-[10px]">NODAL DEPARTMENT</span>
          <strong className="text-[#071A3D] font-extrabold text-sm block mt-0.5">{pilot.department}</strong>
        </div>
        <div>
          <span className="text-gray-400 block font-black uppercase text-[10px]">PILOT ID</span>
          <strong className="text-[#071A3D] font-extrabold text-sm block mt-0.5">{pilot.pilotId || pilot.id}</strong>
        </div>
        <div>
          <span className="text-gray-400 block font-black uppercase text-[10px]">AUDITED MILESTONE</span>
          <strong className="text-amber-700 font-extrabold text-sm block mt-0.5">Milestone 2 (In Progress)</strong>
        </div>
      </div>

      {/* ── Level 3 Document Card: Evaluation Interface & Tabs ── */}
      <FiikDocumentCard
        title="Technical Audit Workspace"
        subtitle="Examine submitted telemetry deliverables, complete structured checklist, and log inspection notes."
        index={1}
      >
        {/* Tab Navigation */}
        <div className="flex border-b-2 border-gray-200 mb-6 gap-3">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 px-4 text-xs font-black border-b-2 transition-all cursor-pointer ${
                tab === t
                  ? 'border-[#071A3D] text-[#071A3D]'
                  : 'border-transparent text-gray-500 hover:text-[#071A3D]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab 1: Submitted Evidence */}
        {tab === 'Submitted Evidence' && (
          <div className="space-y-3">
            {evidence.map((f) => (
              <div
                key={f.id}
                className="p-4 rounded-xl border-2 border-gray-200/90 bg-gray-50/50 flex flex-wrap items-center justify-between gap-4 hover:border-gray-300 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl p-2 rounded-xl bg-white border border-gray-200 shadow-2xs">
                    {fileTypeIcons[f.type] || '📄'}
                  </span>
                  <div>
                    <p className="font-black text-sm text-[#071A3D]">{f.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5 font-medium">
                      {f.type} · {f.size} · Uploaded <strong className="text-gray-700">{f.uploaded}</strong>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiikStatusBadge status="Uploaded" tone="blue" />
                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-lg border-2 border-[#071A3D] text-xs font-black text-[#071A3D] hover:bg-navy-50 transition-colors"
                  >
                    View File ↗
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Evaluation Report & Checklist */}
        {tab === 'Evaluation Report & Checklist' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-black text-[#071A3D] uppercase tracking-wider mb-2">
                  Technical Evaluation Summary
                </label>
                <textarea
                  value={techEvaluation}
                  onChange={(e) => setTechEvaluation(e.target.value)}
                  disabled={!isEvaluator}
                  rows={4}
                  className="w-full border-2 border-gray-300 rounded-xl p-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#071A3D] focus:ring-2 focus:ring-[#071A3D]/20 bg-white disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-[#071A3D] uppercase tracking-wider mb-2">
                  Field Verification Notes
                </label>
                <textarea
                  value={fieldNotes}
                  onChange={(e) => setFieldNotes(e.target.value)}
                  disabled={!isEvaluator}
                  rows={4}
                  className="w-full border-2 border-gray-300 rounded-xl p-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#071A3D] focus:ring-2 focus:ring-[#071A3D]/20 bg-white disabled:bg-gray-100"
                />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black text-[#071A3D] mb-3 uppercase tracking-wider">
                Evaluation Verification Checklist
              </h4>
              <div className="space-y-3 bg-gray-50/70 p-5 border-2 border-gray-200/90 rounded-2xl">
                {checklist.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white transition-colors cursor-pointer text-xs font-bold text-gray-800"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleItem(item.id)}
                      disabled={!isEvaluator}
                      className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-600 disabled:opacity-75"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Field Inspection Log */}
        {tab === 'Field Inspection Log' && (
          <div className="p-6 bg-gray-50/80 border-2 border-gray-200/90 rounded-2xl space-y-3 text-xs">
            <p className="font-medium text-gray-700">
              <strong className="text-[#071A3D] font-black">Field Inspection Date:</strong> 08 Oct 2025
            </p>
            <p className="font-medium text-gray-700">
              <strong className="text-[#071A3D] font-black">Empanelled Technical Expert:</strong> Dr. Ananya Rao (IIT Bombay Empanelled)
            </p>
            <p className="font-medium text-gray-700">
              <strong className="text-[#071A3D] font-black">Location Inspected:</strong> Pune Municipal Corporation Wards 12, 14, 15
            </p>
            <p className="font-medium text-gray-700">
              <strong className="text-[#071A3D] font-black">Verification Result:</strong> All 40 smart bin sensors verified active with geo-tagged photographic evidence attached.
            </p>
          </div>
        )}

        {/* Action Footer Bar */}
        <div className="mt-8 pt-5 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4">
          <button
            onClick={() => navigate('/execution')}
            className="px-5 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Return to Execution
          </button>

          {isEvaluator && (
            <button
              onClick={handleApprove}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all ml-auto"
            >
              Approve Milestone Evidence &amp; Proceed to Payment →
            </button>
          )}

          {isDept && (
            <button
              onClick={() => navigate('/approval-payment')}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-orange-600 hover:bg-orange-700 shadow-md transition-all ml-auto"
            >
              Confirm Department Milestone Sign-Off →
            </button>
          )}

          {isAdmin && (
            <button
              onClick={() => navigate('/approval-payment')}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-purple-800 hover:bg-purple-900 shadow-md transition-all ml-auto"
            >
              Proceed to Grant &amp; Finance Release →
            </button>
          )}

          {isStartup && (
            <button
              onClick={() => navigate('/approval-payment')}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-[#071A3D] hover:bg-black shadow-md transition-all ml-auto"
            >
              Track Payment Status →
            </button>
          )}
        </div>
      </FiikDocumentCard>
    </FiikPageShell>
  );
}
