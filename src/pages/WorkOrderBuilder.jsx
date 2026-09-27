import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StepProgress from '../components/StepProgress';
import { Field, Input, TextArea, FieldGrid } from '../components/FormField';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header variant="dashboard" backTo="/dashboard" />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 max-w-5xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-navy-950">
                {isAdmin
                  ? 'MSInS Work Order Generation & Official Publication'
                  : isDept
                  ? 'Government Department Review of Proposed Pilot Request'
                  : isEvaluator
                  ? 'Evaluator Technical Audit of Proposed Work Order'
                  : 'Propose FIIK Pilot Request & Baseline Plan'}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {isAdmin
                  ? 'Only MSInS can finalize, issue and publish the official FIIK Work Order.'
                  : 'Define department requirement, startup solution, baseline metrics, and milestones.'}
              </p>
            </div>
            <button onClick={() => navigate('/dashboard')} className="text-xs font-semibold text-gray-500 hover:text-navy-950">
              ← Back to Dashboard
            </button>
          </div>

          {/* Role Action Banner */}
          <div className={`p-4 rounded-xl border mb-6 text-xs ${
            isAdmin
              ? 'bg-purple-50 border-purple-200 text-purple-900'
              : isDept
              ? 'bg-orange-50 border-orange-200 text-orange-900'
              : isEvaluator
              ? 'bg-green-50 border-green-200 text-green-900'
              : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <strong className="block uppercase tracking-wider">
                  ROLE PERMISSION: {role.toUpperCase()}
                </strong>
                <p className="mt-0.5">
                  {isStartup && 'You are proposing a pilot request to the department. You cannot publish the official work order yourself.'}
                  {isDept && 'Review startup problem fit, expected improvements, and location readiness. Forward sign-off to Evaluator & MSInS.'}
                  {isEvaluator && 'Inspect technical feasibility, baseline metrics, and milestone timeline output expectations.'}
                  {isAdmin && 'Official Nodal Authority: Finalize template, verify 4-party sign-offs, and publish official FIIK Work Order.'}
                </p>
              </div>

              {isAdmin && (
                <button
                  onClick={handlePublishWorkOrder}
                  className={`btn btn-primary text-xs ${publishedByMSInS ? 'bg-green-600' : 'bg-fiik-orange hover:bg-fiik-orangeDark'}`}
                >
                  {publishedByMSInS ? '✓ Work Order Published!' : '📜 Issue & Publish Official Work Order →'}
                </button>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-card">
            <StepProgress steps={STEPS} currentIndex={step} />

            {step === 0 && (
              <section className="mt-6">
                <h3 className="text-sm font-bold text-navy-950 mb-4 pb-2 border-b border-gray-100">
                  1. Government Requirement
                </h3>
                <FieldGrid>
                  <Field label="Department" required>
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
                <Field label="Problem Statement" required>
                  <TextArea
                    value={data.requirement.problemStatement}
                    onChange={(e) => set('requirement', 'problemStatement', e.target.value)}
                    disabled={!isStartup && !isAdmin}
                  />
                </Field>
              </section>
            )}

            {step === 1 && (
              <section className="mt-6">
                <h3 className="text-sm font-bold text-navy-950 mb-4 pb-2 border-b border-gray-100">
                  2. Proposed Solution
                </h3>
                <Field label="Solution Executive Summary" required>
                  <TextArea
                    value={data.solution.summary}
                    onChange={(e) => set('solution', 'summary', e.target.value)}
                    disabled={!isStartup && !isAdmin}
                  />
                </Field>
                <Field label="Implementation Approach &amp; Scope">
                  <TextArea
                    value={data.solution.approach}
                    onChange={(e) => set('solution', 'approach', e.target.value)}
                    disabled={!isStartup && !isAdmin}
                  />
                </Field>
              </section>
            )}

            {step === 2 && (
              <section className="mt-6">
                <h3 className="text-sm font-bold text-navy-950 mb-4 pb-2 border-b border-gray-100">
                  3. Pilot Baseline Details
                </h3>
                <Field label="Current Baseline Scenario">
                  <TextArea
                    value={data.baseline.scenario}
                    onChange={(e) => set('baseline', 'scenario', e.target.value)}
                    disabled={!isStartup && !isAdmin}
                  />
                </Field>
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mt-4 mb-2">
                  Baseline Metrics
                </h4>
                <div className="space-y-3">
                  {data.baseline.metrics.map((metric) => (
                    <div key={metric.id} className="flex gap-4">
                      <Input value={metric.name} disabled={!isStartup && !isAdmin} />
                      <Input value={metric.value} disabled={!isStartup && !isAdmin} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {step === 3 && (
              <section className="mt-6">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-navy-950">4. Milestones &amp; Work Plan</h3>
                  {(isStartup || isAdmin) && (
                    <button type="button" onClick={addMilestone} className="text-xs font-semibold text-fiik-orange hover:underline">
                      + Add Milestone
                    </button>
                  )}
                </div>
                {data.milestones.map((m, idx) => (
                  <div key={m.id} className="p-4 border border-gray-200 rounded-lg mb-4 bg-gray-50/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-navy-950">Milestone {idx + 1}</span>
                      {(isStartup || isAdmin) && data.milestones.length > 1 && (
                        <button type="button" onClick={() => removeMilestone(m.id)} className="text-xs text-red-600 hover:underline">
                          Remove
                        </button>
                      )}
                    </div>
                    <FieldGrid>
                      <Field label="Milestone Title">
                        <Input value={m.name} onChange={(e) => updateMilestone(m.id, 'name', e.target.value)} disabled={!isStartup && !isAdmin} />
                      </Field>
                      <Field label="Timeline">
                        <Input value={m.timeline} onChange={(e) => updateMilestone(m.id, 'timeline', e.target.value)} disabled={!isStartup && !isAdmin} />
                      </Field>
                    </FieldGrid>
                    <Field label="Expected Deliverable / Output">
                      <Input value={m.expectedOutput} onChange={(e) => updateMilestone(m.id, 'expectedOutput', e.target.value)} disabled={!isStartup && !isAdmin} />
                    </Field>
                  </div>
                ))}
              </section>
            )}

            {step === 4 && (
              <section className="mt-6">
                <h3 className="text-sm font-bold text-navy-950 mb-4 pb-2 border-b border-gray-100">
                  5. Review &amp; Governance Action
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-gray-500 uppercase">Requirement:</span>
                    <p className="font-bold text-navy-950 text-sm mt-0.5">{data.requirement.problemStatement}</p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-500 uppercase">Startup Solution:</span>
                    <p className="text-gray-700 mt-0.5">{data.solution.summary}</p>
                  </div>
                </div>
              </section>
            )}

            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
              <button type="button" onClick={prev} disabled={step === 0} className="btn btn-secondary text-xs disabled:opacity-50">
                ← Previous
              </button>

              {step < STEPS.length - 1 ? (
                <button type="button" onClick={next} className="btn btn-primary text-xs">
                  Next →
                </button>
              ) : isStartup ? (
                <button type="button" onClick={() => navigate('/four-party-review')} className="btn btn-primary text-xs">
                  Submit Proposal for Department &amp; MSInS Review →
                </button>
              ) : isDept ? (
                <button type="button" onClick={() => navigate('/four-party-review')} className="btn btn-primary text-xs bg-fiik-orange hover:bg-fiik-orangeDark">
                  Approve Department Requirement &amp; Sign-off →
                </button>
              ) : isEvaluator ? (
                <button type="button" onClick={() => navigate('/four-party-review')} className="btn btn-primary text-xs bg-fiik-green hover:bg-green-700">
                  Recommend Technical Feasibility →
                </button>
              ) : (
                <button type="button" onClick={handlePublishWorkOrder} className="btn btn-primary text-xs bg-purple-800 hover:bg-purple-900">
                  Publish Official FIIK Work Order ✓
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
