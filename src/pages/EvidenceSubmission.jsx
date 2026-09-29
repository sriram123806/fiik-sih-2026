import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiikPageShell,
  FiikHero,
  FiikDarkPanel,
  FiikDocumentCard,
  FiikRoleNotice,
  FiikStatusBadge,
} from '../components/FiikDesignSystem';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';
import { useRoleTheme } from '../utils/roleTheme';
import { fileTypeIcons } from '../data/mockData';

const SUPPORTED_TYPES = ['PDF', 'DOC', 'XLS/XLSX', 'JPG', 'PNG', 'MP4', 'ZIP'];

export default function EvidenceSubmission() {
  const { role } = useAuth();
  const theme = useRoleTheme(role);
  const { evidence, addEvidence, milestones } = usePilot();
  const [remarks, setRemarks] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const isStartup = role === 'startup';
  const safeMilestones = Array.isArray(milestones) && milestones.length > 0 ? milestones : [
    { id: 2, name: 'Initial Performance Evaluation', description: 'Assess system performance in real conditions.', timeline: '13 Sep – 10 Oct 2025', dueDate: '10 Oct 2025', status: 'In Progress', completed: false }
  ];
  const activeMilestone = safeMilestones.find((m) => m.status === 'In Progress') || safeMilestones[1] || safeMilestones[0];

  function handleMockUpload() {
    if (!isStartup) return;
    const safeEvidence = Array.isArray(evidence) ? evidence : [];
    const nextId = safeEvidence.length > 0 ? Math.max(...safeEvidence.map((f) => f.id || 0)) + 1 : 1;
    addEvidence({
      name: `Performance_Telemetry_Report_M2_${nextId}.pdf`,
      type: 'PDF',
      size: '2.8 MB',
      uploaded: 'Just now',
      status: 'Uploaded',
    });
  }

  function handleSubmitEvidence() {
    if (!isStartup) return;
    setSubmitted(true);
    setTimeout(() => {
      navigate('/field-evaluation');
    }, 1200);
  }

  return (
    <FiikPageShell backTo="/execution">
      {/* ── Level 1 Hero Banner ── */}
      <FiikHero
        tag="IMMUTABLE EVIDENCE REPOSITORY"
        verifiedLabel="Cryptographic Timestamp Protocol Active"
        title={`Evidence Submission — Milestone 0${activeMilestone?.id || '2'}`}
        subtitle={`${activeMilestone?.name || 'Initial Performance Evaluation'}: Upload verifiable telemetry logs, geotagged deployment photos, and sensor datasets for evaluator audit.`}
        pipelineStep={3}
        rightSlot={
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
              DUE DATE
            </span>
            <span className="text-xl font-black text-white block mt-0.5">
              {activeMilestone?.dueDate || '10 Oct 2025'}
            </span>
            <span className="text-[10px] text-emerald-300 font-bold block mt-0.5">
              ✓ On-Track Execution
            </span>
          </div>
        }
      />

      {/* ── Level 2: Dark Operational Cryptographic Ledger Status ── */}
      <FiikDarkPanel
        title="Evidence Ledger &amp; Integrity Validation"
        subtitle="SHA-256 cryptographic hashing ensures file immutability upon upload into the state pilot repository"
        badge={
          <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
            Hash Protocol: SHA-256 Verified
          </span>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-gray-400 font-bold block text-[11px]">UPLOADED ARTIFACTS</span>
            <span className="text-xl font-black text-white block mt-1">{evidence.length} Files Recorded</span>
            <span className="text-[10px] text-emerald-400 mt-0.5 block">Zero Corrupt Records</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-gray-400 font-bold block text-[11px]">AUDIT STATUS</span>
            <span className="text-xl font-black text-amber-300 block mt-1">Pending Field Inspection</span>
            <span className="text-[10px] text-gray-300 mt-0.5 block">Scheduled for 10 Oct 2025</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-gray-400 font-bold block text-[11px]">ASSIGNED AUDITOR</span>
            <span className="text-xl font-black text-white block mt-1">Dr. Ananya Rao</span>
            <span className="text-[10px] text-emerald-400 mt-0.5 block">Empanelled Technical Expert</span>
          </div>
        </div>
      </FiikDarkPanel>

      {/* ── Level 3 Document Card: Upload Zone (For Startup) ── */}
      {isStartup && (
        <FiikDocumentCard
          title="Upload Milestone Evidentiary Deliverables"
          subtitle="Support documents must include verifiable device telemetry, field logs, or department verification receipts."
          icon="📤"
          index={1}
        >
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 sm:p-10 text-center bg-gray-50/60 hover:bg-gray-50 hover:border-navy-900 transition-all">
            <span className="text-4xl block mb-2">📁</span>
            <p className="text-sm font-black text-[#071A3D]">
              Drag &amp; drop evidence files here, or choose from your computer
            </p>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Upload PDF reports, raw sensor CSV/XLS, geotagged photos (JPG/PNG), or field demo videos
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {SUPPORTED_TYPES.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-black uppercase tracking-wider bg-white border border-gray-300 text-gray-700 px-2.5 py-1 rounded-lg shadow-2xs"
                >
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={handleMockUpload}
              type="button"
              className="mt-6 px-6 py-2.5 rounded-xl font-black text-xs text-white shadow-md transition-all cursor-pointer"
              style={{ backgroundColor: theme.accent }}
            >
              + Select Files to Upload
            </button>
          </div>
        </FiikDocumentCard>
      )}

      {/* ── Level 3 Document Card: Submitted Evidence Ledger ── */}
      <FiikDocumentCard
        title={`Submitted Milestone Evidence Files (${evidence.length})`}
        subtitle="Cryptographically verified file ledger ready for Technical Evaluator examination."
        icon="🗂️"
        index={2}
      >
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
                <FiikStatusBadge status={f.status || 'Uploaded'} tone="blue" />
                <button
                  type="button"
                  className="text-xs font-bold text-[#071A3D] hover:underline px-2 py-1"
                >
                  Preview File ↗
                </button>
              </div>
            </div>
          ))}
        </div>

        {isStartup && (
          <div className="mt-6 pt-5 border-t border-gray-100">
            <label className="block text-xs font-black text-[#071A3D] uppercase tracking-wider mb-2">
              Startup Submission Notes &amp; Methodology Remarks
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Provide context regarding hardware calibration, ward sampling methodology, or telemetry server logs..."
              rows={3}
              className="w-full border-2 border-gray-300 rounded-xl p-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#071A3D] focus:ring-2 focus:ring-[#071A3D]/20 bg-white"
            />
          </div>
        )}

        {/* Action Buttons */}
        {isStartup && (
          <div className="mt-8 pt-5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => navigate('/execution')}
              className="px-5 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Save Draft
            </button>
            <button
              onClick={handleSubmitEvidence}
              className={`px-6 py-2.5 rounded-xl font-black text-xs text-white shadow-md transition-all cursor-pointer ${
                submitted ? 'bg-emerald-600' : 'bg-[#071A3D] hover:bg-black'
              }`}
            >
              {submitted ? '✓ Evidence Submitted! Redirecting...' : 'Submit Evidence for Evaluator Audit →'}
            </button>
          </div>
        )}
      </FiikDocumentCard>
    </FiikPageShell>
  );
}
