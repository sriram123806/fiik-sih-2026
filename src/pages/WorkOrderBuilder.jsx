import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiikPageShell,
  FiikHero,
  FiikDocumentCard,
  FiikRoleNotice,
  FiikStatusBadge,
} from '../components/FiikDesignSystem';
import StepProgress from '../components/StepProgress';
import { Field, Input, TextArea, FieldGrid } from '../components/FormField';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';
import { useRoleTheme } from '../utils/roleTheme';
import { currentStartup, workOrderMilestoneTemplate } from '../data/mockData';

const STEPS = [
  'Government Requirement',
  'Proposed Solution',
  'Pilot Baseline',
  'Milestones & Work Plan',
  'Review & Action',
];

const initialState = {
  requirement: {
    department: 'Department of Urban Development',
    problemStatement: currentStartup.problemStatement,
    currentProcess: 'Manual waste collection at ward levels with mixed waste dumping and low source segregation compliance.',
    expectedImprovement: 'Achieve >45% waste collection efficiency improvement and >20% increase in source segregation.',
    location: 'Pune, Maharashtra',
    beneficiaries: 'Municipal Officers & Wards 12, 14, 15 Citizens',
    duration: '6 months',
    contactName: 'Mr. Rahul Deshmukh',
    contactDesignation: 'Deputy Commissioner (UD)',
    contactEmail: 'rahul.deshmukh@maha.gov.in',
    contactPhone: '9876543210',
  },
  solution: {
    summary: 'IoT Smart Bins with edge segregation sensors, automated collection routing, and mobile app for citizen feedback.',
    problemFit: 'Directly addresses landfill reduction by ensuring source-level compliance tracking.',
    approach: 'Deploy 40 smart bin units across 3 wards with real-time fill level and segregation telemetry.',
    outcomes: '45% efficiency boost, 20% segregation increase, 30% cost reduction.',
  },
  baseline: {
    scenario: 'Current manual segregation rates remain under 20% with high operational costs.',
    metrics: [
      { id: 1, name: 'Waste collection efficiency', value: '45%' },
      { id: 2, name: 'Segregation rate', value: '20%' },
      { id: 3, name: 'Operational cost per ton', value: '1500 INR' },
    ],
  },
  milestones: [
    { id: 1, name: 'Deployment and Installation', timeline: '4 weeks', expectedOutput: 'Deployment report with photos', status: 'Completed' },
    { id: 2, name: 'Initial Performance Evaluation', timeline: '8 weeks', expectedOutput: 'Performance data & analytics report', status: 'In Progress' },
    { id: 3, name: 'User Feedback and Impact Assessment', timeline: '12 weeks', expectedOutput: 'Survey results and impact assessment report', status: 'Pending' },
  ],
};

export default function WorkOrderBuilder() {
  const { role } = useAuth();
  const theme = useRoleTheme(role);
  const { setPilot } = usePilot();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [publishedByMSInS, setPublishedByMSInS] = useState(false);
  const navigate = useNavigate();

  const isStartup = role === 'startup';
  const isDept = role === 'department';
  const isEvaluator = role === 'evaluator';
  const isAdmin = role === 'admin';

  const set = (section, key, value) => {
    if (!isStartup && !isAdmin) return;
    setData((d) => ({ ...d, [section]: { ...d[section], [key]: value } }));
  };

  const updateMilestone = (id, key, value) => {
    if (!isStartup && !isAdmin) return;
    setData((d) => ({
      ...d,
      milestones: d.milestones.map((m) => (m.id === id ? { ...m, [key]: value } : m)),
    }));
  };

  const addMilestone = () =>
    (isStartup || isAdmin) && setData((d) => ({ ...d, milestones: [...d.milestones, workOrderMilestoneTemplate()] }));

  const removeMilestone = (id) =>
    (isStartup || isAdmin) && setData((d) => ({ ...d, milestones: d.milestones.filter((m) => m.id !== id) }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handlePublishWorkOrder = () => {
    setPublishedByMSInS(true);
    setPilot((prev) => ({
      ...prev,
      status: 'WORK_ORDER_ISSUED',
      statusLabel: 'Work Order Issued & Published',
    }));
    setTimeout(() => {
      navigate('/execution');
    }, 1200);
  };

  return (
    <FiikPageShell backTo="/dashboard">
      {/* ── Level 1 Hero Banner ── */}
      <FiikHero
        tag="STANDARDIZED WORK ORDER SPECIFICATION"
        verifiedLabel="Multi-Party Legal Framework"
        title={
          isAdmin
            ? 'MSInS Work Order Generation & Official Publication'
            : isDept
            ? 'Department Review of Proposed Pilot Request'
            : isEvaluator
            ? 'Evaluator Technical Audit of Proposed Work Order'
            : 'Propose FIIK Pilot Request & Baseline Plan'
        }
        subtitle="Standardized pilot work order defining municipal challenges, solution scope, baseline telemetry metrics, and phased milestone deliverables."
        pipelineStep={2}
        rightSlot={
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
              WORK ORDER REF
            </span>
            <span className="text-xl font-black text-white block mt-0.5">
              WO-2026-UD-0417
            </span>
            <span className="text-[10px] text-amber-300 font-bold block mt-0.5">
              4-Party Sign-off Gated
            </span>
          </div>
        }
      />

      {/* ── Role Governance Notice ── */}
      <FiikRoleNotice
        title={`ROLE ACTION · ${theme.roleLabel.toUpperCase()}`}
        action={
          isAdmin && (
            <button
              onClick={handlePublishWorkOrder}
              className={`px-5 py-2.5 rounded-xl font-black text-xs text-white shadow-md transition-all ${
                publishedByMSInS ? 'bg-emerald-600' : 'bg-purple-700 hover:bg-purple-800'
              }`}
            >
              {publishedByMSInS ? '✓ Work Order Published!' : '📜 Issue & Publish Official Work Order →'}
            </button>
          )
        }
      >
        {isStartup && 'You are drafting the pilot scope and deliverables for department approval. Formal work order issuance is executed by MSInS upon 4-party sign-off.'}
        {isDept && 'Government Department Review: Verify alignment with municipal requirements, location readiness, and baseline improvements.'}
        {isEvaluator && 'Technical Evaluator Audit: Inspect feasibility, sensor telemetry telemetry benchmarks, and milestone output criteria.'}
        {isAdmin && 'MSInS Nodal Authority: Finalize legal work order specifications, verify multi-party sign-offs, and publish official FIIK Work Order.'}
      </FiikRoleNotice>

      {/* ── Level 3 Document Card: Multi-Step Work Order Form ── */}
      <FiikDocumentCard
        title={`Step ${step + 1}: ${STEPS[step]}`}
        subtitle="Define government requirement, technological parameters, baseline metrics, and phased milestones."
        index={step + 1}
        badge={
          <span className="text-xs font-black text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
            Step {step + 1} of {STEPS.length}
          </span>
        }
      >
        <div className="mb-8">
          <StepProgress steps={STEPS} currentIndex={step} />
        </div>

        {step === 0 && (
          <section className="space-y-6">
            <div className="pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-[#071A3D]">1. Government Department Requirement</h3>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Department context, operational pain points, and target pilot duration.</p>
            </div>

            <FieldGrid cols={2}>
              <Field label="Government Department" required>
                <Input
                  value={data.requirement.department}
                  onChange={(e) => set('requirement', 'department', e.target.value)}
                  disabled={!isStartup && !isAdmin}
                />
              </Field>
              <Field label="Pilot Duration" required>
                <Input
                  value={data.requirement.duration}
                  onChange={(e) => set('requirement', 'duration', e.target.value)}
                  disabled={!isStartup && !isAdmin}
                />
              </Field>
            </FieldGrid>

            <Field label="Municipal Problem Statement" required>
              <TextArea
                value={data.requirement.problemStatement}
                onChange={(e) => set('requirement', 'problemStatement', e.target.value)}
                rows={3}
                disabled={!isStartup && !isAdmin}
              />
            </Field>

            <FieldGrid cols={2}>
              <Field label="Target Deployment Location">
                <Input
                  value={data.requirement.location}
                  onChange={(e) => set('requirement', 'location', e.target.value)}
                  disabled={!isStartup && !isAdmin}
                />
              </Field>
              <Field label="Primary Beneficiaries">
                <Input
                  value={data.requirement.beneficiaries}
                  onChange={(e) => set('requirement', 'beneficiaries', e.target.value)}
                  disabled={!isStartup && !isAdmin}
                />
              </Field>
            </FieldGrid>
          </section>
        )}

        {step === 1 && (
          <section className="space-y-6">
            <div className="pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-[#071A3D]">2. Proposed Startup Solution &amp; Scope</h3>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Detailed breakdown of the technological approach, hardware, and field architecture.</p>
            </div>

            <Field label="Solution Executive Summary" required>
              <TextArea
                value={data.solution.summary}
                onChange={(e) => set('solution', 'summary', e.target.value)}
                rows={3}
                disabled={!isStartup && !isAdmin}
              />
            </Field>

            <Field label="Implementation Approach &amp; Deployment Scope" required>
              <TextArea
                value={data.solution.approach}
                onChange={(e) => set('solution', 'approach', e.target.value)}
                rows={3}
                disabled={!isStartup && !isAdmin}
              />
            </Field>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-6">
            <div className="pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-[#071A3D]">3. Pilot Baseline &amp; Success Benchmarks</h3>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Pre-pilot municipal performance metrics against which outcomes will be measured.</p>
            </div>

            <Field label="Current Baseline Scenario &amp; Inefficiencies" required>
              <TextArea
                value={data.baseline.scenario}
                onChange={(e) => set('baseline', 'scenario', e.target.value)}
                rows={3}
                disabled={!isStartup && !isAdmin}
              />
            </Field>

            <div>
              <span className="block text-xs font-black text-[#071A3D] uppercase tracking-wider mb-2">
                Quantitative Baseline KPI Benchmarks
              </span>
              <div className="space-y-3">
                {data.baseline.metrics.map((metric) => (
                  <div key={metric.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <div>
                      <span className="text-[10px] font-black uppercase text-gray-400">KPI NAME</span>
                      <Input value={metric.name} disabled={!isStartup && !isAdmin} className="mt-1" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-gray-400">TARGET BENCHMARK VALUE</span>
                      <Input value={metric.value} disabled={!isStartup && !isAdmin} className="mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-black text-[#071A3D]">4. Milestones &amp; Work Plan Deliverables</h3>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">Phased deliverables tied directly to escrow fund releases and PREP generation.</p>
              </div>
              {(isStartup || isAdmin) && (
                <button
                  type="button"
                  onClick={addMilestone}
                  className="px-3.5 py-1.5 rounded-lg border-2 border-[#071A3D] text-xs font-black text-[#071A3D] hover:bg-navy-50 transition-colors"
                >
                  + Add Milestone
                </button>
              )}
            </div>

            {data.milestones.map((m, idx) => (
              <div key={m.id} className="p-5 border-2 border-gray-200/90 rounded-2xl bg-gray-50/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#071A3D] uppercase tracking-wider flex items-center gap-2">
                    <span className="h-5 w-5 rounded-md bg-[#071A3D] text-white flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    Milestone {idx + 1}
                  </span>
                  {(isStartup || isAdmin) && data.milestones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMilestone(m.id)}
                      className="text-xs font-bold text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <FieldGrid cols={2}>
                  <Field label="Milestone Title" required>
                    <Input
                      value={m.name}
                      onChange={(e) => updateMilestone(m.id, 'name', e.target.value)}
                      disabled={!isStartup && !isAdmin}
                    />
                  </Field>
                  <Field label="Timeline / Duration" required>
                    <Input
                      value={m.timeline}
                      onChange={(e) => updateMilestone(m.id, 'timeline', e.target.value)}
                      disabled={!isStartup && !isAdmin}
                    />
                  </Field>
                </FieldGrid>

                <Field label="Expected Deliverable &amp; Evidence Output" required>
                  <Input
                    value={m.expectedOutput}
                    onChange={(e) => updateMilestone(m.id, 'expectedOutput', e.target.value)}
                    disabled={!isStartup && !isAdmin}
                  />
                </Field>
              </div>
            ))}
          </section>
        )}

        {step === 4 && (
          <section className="space-y-6">
            <div className="pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-[#071A3D]">5. Review &amp; Governance Action</h3>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Verify pilot parameters before committing to multi-party review.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2 text-xs">
                <span className="font-black text-gray-400 uppercase text-[10px] block">MUNICIPAL REQUIREMENT</span>
                <p className="text-sm font-black text-[#071A3D]">{data.requirement.problemStatement}</p>
                <p className="text-gray-600 font-medium">{data.requirement.department} · {data.requirement.duration}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2 text-xs">
                <span className="font-black text-gray-400 uppercase text-[10px] block">PROPOSED SOLUTION</span>
                <p className="text-sm font-black text-[#071A3D]">{data.solution.summary}</p>
                <p className="text-gray-600 font-medium">{data.milestones.length} Phased Milestones Planned</p>
              </div>
            </div>
          </section>
        )}

        {/* ── Footer Navigation Buttons ── */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={prev}
            disabled={step === 0}
            className="px-5 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-40 cursor-pointer"
          >
            ← Previous Step
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white shadow-md transition-all cursor-pointer"
              style={{ backgroundColor: theme.accent }}
            >
              Next Step →
            </button>
          ) : isStartup ? (
            <button
              type="button"
              onClick={() => navigate('/four-party-review')}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white shadow-md transition-all cursor-pointer"
              style={{ backgroundColor: theme.accent }}
            >
              Submit Proposal for 4-Party Review →
            </button>
          ) : isDept ? (
            <button
              type="button"
              onClick={() => navigate('/four-party-review')}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-orange-600 hover:bg-orange-700 shadow-md transition-all cursor-pointer"
            >
              Approve Department Requirement &amp; Sign-off →
            </button>
          ) : isEvaluator ? (
            <button
              type="button"
              onClick={() => navigate('/four-party-review')}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all cursor-pointer"
            >
              Recommend Technical Feasibility →
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublishWorkOrder}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-purple-800 hover:bg-purple-900 shadow-md transition-all cursor-pointer"
            >
              Publish Official FIIK Work Order ✓
            </button>
          )}
        </div>
      </FiikDocumentCard>
    </FiikPageShell>
  );
}
