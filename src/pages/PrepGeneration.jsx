import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiikPageShell,
  FiikHero,
  FiikDocumentCard,
  FiikDarkPanel,
  FiikRoleNotice,
  FiikStatusBadge,
} from '../components/FiikDesignSystem';
import StepTracker from '../components/StepTracker';
import PrepDocument from '../components/PrepDocument';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';
import { useRoleTheme } from '../utils/roleTheme';
import { prepDataSources, prepContentIncludes, prepMeta } from '../data/mockData';

export default function PrepGeneration() {
  const { role } = useAuth();
  const theme = useRoleTheme(role);
  const { pilot } = usePilot();
  const navigate = useNavigate();

  const isAdmin = role === 'admin';

  return (
    <FiikPageShell backTo="/approval-payment">
      {/* ── Level 1 Hero Banner ── */}
      <FiikHero
        tag="AUTOMATED CREDENTIAL SYNTHESIS"
        verifiedLabel="Digital Signature &amp; Hash Verified"
        title="PREP Generation &amp; Passport Issuance Engine"
        subtitle="Procurement Readiness Evidence Passport (PREP) automatically aggregates verified telemetry, evaluator field audits, and department approvals into an immutable credential."
        pipelineStep={5}
        rightSlot={
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
              GENERATION STATUS
            </span>
            <span className="text-xl font-black text-emerald-300 block mt-0.5">
              Synthesis 100%
            </span>
            <span className="text-[10px] text-gray-300 font-bold block mt-0.5">
              Ready for Official Registry
            </span>
          </div>
        }
      />

      {/* ── Role Governance Notice ── */}
      <FiikRoleNotice
        title={`CREDENTIAL ISSUANCE ROLE · ${theme.roleLabel.toUpperCase()}`}
      >
        {isAdmin
          ? 'MSInS Nodal Authority: Finalize immutable cryptographic hash, sign with official state credentials, and publish into state procurement repository.'
          : 'Inspect the automatically compiled PREP credential summary before official publication.'}
      </FiikRoleNotice>

      {/* ── Level 3 Document Card: Synthesis Stepper ── */}
      <FiikDocumentCard
        title="PREP Pipeline Synthesis Tracker"
        subtitle="Automated ledger validation and compliance verification."
        index={1}
      >
        <StepTracker
          numbered
          steps={[
            { label: 'Data Compilation', meta: 'Verified', state: 'done' },
            { label: 'Evaluation Summary', meta: '94.8% Score', state: 'done' },
            { label: 'PREP Generation', meta: 'Ready', state: 'current' },
            { label: 'Review & Publish', meta: 'Pending Sign-Off', state: 'pending' },
          ]}
        />
      </FiikDocumentCard>

      {/* ── Data Sources & Content Inclusions ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FiikDocumentCard
          title="Verified Data Sources"
          subtitle="Direct inputs compiled from multi-party execution."
          index={2}
          icon="🔗"
        >
          <ul className="space-y-3 text-xs text-gray-700">
            {prepDataSources.map((source) => (
              <li key={source} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="h-6 w-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs shrink-0">
                  ✓
                </span>
                <span className="font-bold text-[#071A3D]">{source}</span>
              </li>
            ))}
          </ul>
        </FiikDocumentCard>

        <FiikDocumentCard
          title="PREP Credential Inclusions"
          subtitle="Artifacts embedded in the portable passport."
          index={3}
          icon="📦"
        >
          <ul className="space-y-3 text-xs text-gray-700">
            {prepContentIncludes.map((item) => (
              <li key={item} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="h-6 w-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs shrink-0">
                  ✓
                </span>
                <span className="font-bold text-[#071A3D]">{item}</span>
              </li>
            ))}
          </ul>
        </FiikDocumentCard>
      </div>

      {/* ── Level 3 Document Card: Live Passport Preview ── */}
      <FiikDocumentCard
        title="Official PREP Passport Document Preview"
        subtitle="Full immutable passport rendered with digital seal, QR validation code, and municipal outcome ledger."
        index={4}
        icon="🛂"
      >
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="shrink-0 w-full lg:w-auto">
            <PrepDocument pilotId={prepMeta.pilotId} issueDate={prepMeta.issueDate} />
          </div>

          <div className="flex-1 text-xs text-gray-600 leading-relaxed space-y-4">
            <div className="p-5 bg-navy-50/40 rounded-2xl border-2 border-navy-100">
              <h4 className="font-black text-sm text-[#071A3D] mb-1">
                About the Portable Procurement Passport
              </h4>
              <p className="font-medium text-gray-700">
                PREP (Procurement Readiness Evidence Passport) is an evidence-backed pilot credential that carries the pilot&rsquo;s identity, scope, verified milestones, evaluator sign-offs, and empirical impact metrics into future government procurement and scale-up workflows without duplicate trial requirements.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-black text-[#071A3D]">
              <span className="px-3 py-1.5 rounded-xl bg-gray-100 border border-gray-300">
                1. Pilot Execution
              </span>
              <span>→</span>
              <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
                2. PREP Passport
              </span>
              <span>→</span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300">
                3. Direct GeM Scaling
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-5 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => navigate('/completed-pilot')}
            className={`px-8 py-3 rounded-xl font-black text-xs text-white shadow-md transition-all flex items-center gap-2 cursor-pointer ${
              isAdmin ? 'bg-purple-800 hover:bg-purple-900' : 'bg-[#071A3D] hover:bg-black'
            }`}
          >
            <span>{isAdmin ? 'Publish & Issue Official PREP Passport' : 'Inspect Official PREP Record'}</span>
            <span>→</span>
          </button>
        </div>
      </FiikDocumentCard>
    </FiikPageShell>
  );
}
