import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, UploadCloud } from 'lucide-react';
import Layout from '../components/Layout';
import StepProgress from '../components/StepProgress';
import { Field, Input, TextArea, FieldGrid } from '../components/FormField';
import { currentStartup, workOrderMilestoneTemplate } from '../data/mockData';

const STEPS = [
  'Government Requirement',
  'Proposed Solution',
  'Pilot Baseline',
  'Milestones & Work Plan',
  'Review & Submit',
];

const initialState = {
  requirement: {
    department: currentStartup.department, problemStatement: currentStartup.problemStatement,
    currentProcess: '', expectedImprovement: '', location: '', beneficiaries: '',
    duration: '', contactName: '', contactDesignation: '', contactEmail: '', contactPhone: '',
  },
  solution: {
    summary: '', problemFit: '', approach: '', outcomes: '', dependencies: '', resources: '',
  },
  baseline: {
    scenario: '', metrics: [{ id: 1, name: 'Metric 1', value: '' }],
  },
  milestones: [
    { ...workOrderMilestoneTemplate(), name: 'Deployment and Installation', timeline: '4 weeks', expectedOutput: 'Deployment report with photos' },
  ],
};

export default function WorkOrderBuilder() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const set = (section, key, value) =>
    setData((d) => ({ ...d, [section]: { ...d[section], [key]: value } }));

  const updateMilestone = (id, key, value) =>
    setData((d) => ({ ...d, milestones: d.milestones.map((m) => (m.id === id ? { ...m, [key]: value } : m)) }));
  const addMilestone = () =>
    setData((d) => ({ ...d, milestones: [...d.milestones, workOrderMilestoneTemplate()] }));
  const removeMilestone = (id) =>
    setData((d) => ({ ...d, milestones: d.milestones.filter((m) => m.id !== id) }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  if (submitted) {
    return (
      <Layout>
        <div className="card" style={{ padding: '48px 32px', textAlign: 'center', maxWidth: 560, margin: '40px auto' }}>
          <CheckCircle2 size={44} color="var(--green)" />
          <h2 style={{ marginTop: 16, color: 'var(--navy)' }}>Requirement &amp; work order submitted</h2>
          <p style={{ color: 'var(--gray-500)', marginTop: 8, fontSize: 14 }}>
            Your proposal for <strong>{data.requirement.problemStatement}</strong> has moved into
            Four-Party Review.
          </p>
          <a className="btn btn-primary" style={{ marginTop: 24 }} href="/four-party-review">
            Go to Four-Party Review
          </a>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-head">
        <div>
          <h1>FIIK Pilot Requirement &amp; Work Order Builder</h1>
          <p>Define the department requirement, proposed startup solution, pilot baseline and milestone plan.</p>
        </div>
      </div>

      <div className="card" style={{ padding: '28px 32px' }}>
        <StepProgress steps={STEPS} currentIndex={step} />

        {step === 0 && (
          <section>
            <h3 className="section-h">1. Government Requirement</h3>
            <FieldGrid>
              <Field label="Department" required>
                <Input value={data.requirement.department} onChange={(v) => set('requirement', 'department', v)} />
              </Field>
              <Field label="Pilot Location(s)" required>
                <Input value={data.requirement.location} onChange={(v) => set('requirement', 'location', v)} placeholder="e.g., Indore, Madhya Pradesh" />
              </Field>
            </FieldGrid>
            <Field label="Problem Statement" required>
              <TextArea rows={2} value={data.requirement.problemStatement} onChange={(v) => set('requirement', 'problemStatement', v)} />
            </Field>
            <FieldGrid>
              <Field label="Current Process / Challenge" required>
                <TextArea rows={3} value={data.requirement.currentProcess} onChange={(v) => set('requirement', 'currentProcess', v)} />
              </Field>
              <Field label="Expected Improvement" required>
                <TextArea rows={3} value={data.requirement.expectedImprovement} onChange={(v) => set('requirement', 'expectedImprovement', v)} />
              </Field>
            </FieldGrid>
            <FieldGrid>
              <Field label="Target Beneficiaries" required>
                <Input value={data.requirement.beneficiaries} onChange={(v) => set('requirement', 'beneficiaries', v)} placeholder="e.g., 10,000 households" />
              </Field>
              <Field label="Estimated Pilot Duration" required>
                <Input value={data.requirement.duration} onChange={(v) => set('requirement', 'duration', v)} placeholder="e.g., 6 months" />
              </Field>
            </FieldGrid>
            <h4 className="subsection-h">Department Contact Person</h4>
            <FieldGrid>
              <Field label="Name" required><Input value={data.requirement.contactName} onChange={(v) => set('requirement', 'contactName', v)} /></Field>
              <Field label="Designation" required><Input value={data.requirement.contactDesignation} onChange={(v) => set('requirement', 'contactDesignation', v)} /></Field>
              <Field label="Email" required><Input type="email" value={data.requirement.contactEmail} onChange={(v) => set('requirement', 'contactEmail', v)} /></Field>
              <Field label="Phone" required><Input value={data.requirement.contactPhone} onChange={(v) => set('requirement', 'contactPhone', v)} /></Field>
            </FieldGrid>
          </section>
        )}

        {step === 1 && (
          <section>
            <h3 className="section-h">2. Proposed Solution</h3>
            <Field label="Startup Solution" required>
              <TextArea value={data.solution.summary} onChange={(v) => set('solution', 'summary', v)} placeholder="Describe the proposed solution" />
            </Field>
            <Field label="Problem Fit" required>
              <TextArea rows={3} value={data.solution.problemFit} onChange={(v) => set('solution', 'problemFit', v)} placeholder="How the solution addresses the department's problem statement" />
            </Field>
            <Field label="Technical Approach" required>
              <TextArea rows={3} value={data.solution.approach} onChange={(v) => set('solution', 'approach', v)} />
            </Field>
            <FieldGrid>
              <Field label="Expected Outcomes" required>
                <TextArea rows={3} value={data.solution.outcomes} onChange={(v) => set('solution', 'outcomes', v)} />
              </Field>
              <Field label="Dependencies">
                <TextArea rows={3} value={data.solution.dependencies} onChange={(v) => set('solution', 'dependencies', v)} placeholder="Data access, site access, approvals" />
              </Field>
            </FieldGrid>
            <Field label="Resources Required">
              <TextArea rows={3} value={data.solution.resources} onChange={(v) => set('solution', 'resources', v)} placeholder="Team, hardware, department support" />
            </Field>
          </section>
        )}

        {step === 2 && (
          <section>
            <h3 className="section-h">3. Pilot Baseline</h3>
            <Field label="Current Scenario" required>
              <TextArea value={data.baseline.scenario} onChange={(v) => set('baseline', 'scenario', v)} placeholder="Describe the current process, infrastructure and challenges" />
            </Field>
            <Field label="Baseline Metrics" required>
              {data.baseline.metrics.map((m) => (
                <div key={m.id} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <Input value={m.name} onChange={(v) => {
                    const metrics = data.baseline.metrics.map((x) => x.id === m.id ? { ...x, name: v } : x);
                    set('baseline', 'metrics', metrics);
                  }} placeholder="Metric name" />
                  <Input value={m.value} onChange={(v) => {
                    const metrics = data.baseline.metrics.map((x) => x.id === m.id ? { ...x, value: v } : x);
                    set('baseline', 'metrics', metrics);
                  }} placeholder="Value" />
                </div>
              ))}
              <button className="btn btn-secondary" onClick={() =>
                set('baseline', 'metrics', [...data.baseline.metrics, { id: Date.now(), name: '', value: '' }])
              }><Plus size={14} /> Add Another Metric</button>
            </Field>
            <div className="upload-box">
              <UploadCloud size={20} />
              <div>
                <strong>Supporting Documents</strong>
                <div className="field-hint">Baseline reports, surveys, or early assessment data (Max 10 MB each)</div>
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <div className="section-h-row">
              <h3 className="section-h" style={{ margin: 0 }}>4. Milestones &amp; Work Plan</h3>
              <button className="btn btn-secondary" onClick={addMilestone}><Plus size={14} /> Add Milestone</button>
            </div>
            <p className="section-note">
              FIIK provides this Work Order Template — the pilot-specific content can be adapted
              during Four-Party Review.
            </p>
            {data.milestones.map((m, i) => (
              <div key={m.id} className="milestone-card">
                <div className="milestone-head">
                  <span className="milestone-num">{i + 1}</span>
                  <Input value={m.name} onChange={(v) => updateMilestone(m.id, 'name', v)} placeholder="Milestone name" />
                  {data.milestones.length > 1 && (
                    <button className="icon-btn-light" onClick={() => removeMilestone(m.id)}><Trash2 size={14} /></button>
                  )}
                </div>
                <Field label="Description">
                  <TextArea rows={2} value={m.description} onChange={(v) => updateMilestone(m.id, 'description', v)} />
                </Field>
                <FieldGrid cols={3}>
                  <Field label="Timeline"><Input value={m.timeline} onChange={(v) => updateMilestone(m.id, 'timeline', v)} placeholder="e.g., 4 weeks" /></Field>
                  <Field label="Expected Output"><Input value={m.expectedOutput} onChange={(v) => updateMilestone(m.id, 'expectedOutput', v)} /></Field>
                  <Field label="Evidence Required"><Input value={m.evidenceRequired} onChange={(v) => updateMilestone(m.id, 'evidenceRequired', v)} /></Field>
                </FieldGrid>
                <Field label="Payment / Tranche Reference">
                  <Input value={m.trancheReference} onChange={(v) => updateMilestone(m.id, 'trancheReference', v)} placeholder="e.g., Tranche 1 — 25%" />
                </Field>
              </div>
            ))}
          </section>
        )}

        {step === 4 && (
          <section>
            <h3 className="section-h">5. Review &amp; Submit</h3>
            <ReviewBlock title="Government Requirement" rows={[
              ['Department', data.requirement.department], ['Location', data.requirement.location],
              ['Duration', data.requirement.duration], ['Beneficiaries', data.requirement.beneficiaries],
            ]} />
            <ReviewBlock title="Proposed Solution" rows={[
              ['Solution', truncate(data.solution.summary)], ['Problem Fit', truncate(data.solution.problemFit)],
            ]} />
            <ReviewBlock title="Milestones" rows={data.milestones.map((m, i) => [`Milestone ${i + 1}`, `${m.name || '—'} · ${m.timeline || '—'}`])} />
            <p className="section-note">
              Submitting sends this proposal into Four-Party Review (Startup → Department →
              Technical Evaluator → MSInS).
            </p>
          </section>
        )}

        <div className="step-actions">
          <button className="btn btn-secondary" onClick={prev} disabled={step === 0}>Previous</button>
          {step < STEPS.length - 1 ? (
            <button className="btn btn-primary" onClick={next}>Save &amp; Next</button>
          ) : (
            <button className="btn btn-primary" onClick={() => setSubmitted(true)}>Submit for Four-Party Review</button>
          )}
        </div>
      </div>
    </Layout>
  );
}

function truncate(s, n = 90) {
  if (!s) return '—';
  return s.length > n ? s.slice(0, n) + '…' : s;
}

function ReviewBlock({ title, rows }) {
  return (
    <div className="review-block">
      <div className="review-block-title">{title}</div>
      <div className="review-block-rows">
        {rows.map(([label, value]) => (
          <div className="review-row" key={label}>
            <span>{label}</span>
            <strong>{value || '—'}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
