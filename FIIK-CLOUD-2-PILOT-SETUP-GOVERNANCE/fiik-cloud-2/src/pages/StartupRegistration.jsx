import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, UploadCloud } from 'lucide-react';
import Layout from '../components/Layout';
import StepProgress from '../components/StepProgress';
import { Field, Input, Select, TextArea, FieldGrid } from '../components/FormField';
import { legalEntityTypes, indianStates, sectors, recognitionTypes, founderTemplate } from '../data/mockData';

const STEPS = [
  'Organization Identity',
  'Government Recognition',
  'Authorized Representative',
  'Founders / Directors',
  'Startup Capability',
  'Review & Submit',
];

const initialState = {
  org: {
    entityName: '', legalEntityType: '', cin: '', incorporationDate: '', pan: '',
    address: '', state: '', district: '', pin: '', website: '', industry: '', sector: '',
  },
  recognition: {
    types: [], recognitionNumber: '', recognitionDate: '',
  },
  representative: { name: '', designation: '', email: '', phone: '' },
  founders: [founderTemplate()],
  capability: {
    solution: '', technology: '', deployment: '', experience: '', pilotCapability: '',
  },
};

export default function StartupRegistration() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const set = (section, key, value) =>
    setData((d) => ({ ...d, [section]: { ...d[section], [key]: value } }));

  const toggleRecognitionType = (type) => {
    setData((d) => {
      const has = d.recognition.types.includes(type);
      return {
        ...d,
        recognition: {
          ...d.recognition,
          types: has ? d.recognition.types.filter((t) => t !== type) : [...d.recognition.types, type],
        },
      };
    });
  };

  const updateFounder = (id, key, value) => {
    setData((d) => ({
      ...d,
      founders: d.founders.map((f) => (f.id === id ? { ...f, [key]: value } : f)),
    }));
  };
  const addFounder = () => setData((d) => ({ ...d, founders: [...d.founders, founderTemplate()] }));
  const removeFounder = (id) =>
    setData((d) => ({ ...d, founders: d.founders.filter((f) => f.id !== id) }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  if (submitted) {
    return (
      <Layout>
        <div className="card" style={{ padding: '48px 32px', textAlign: 'center', maxWidth: 520, margin: '40px auto' }}>
          <CheckCircle2 size={44} color="var(--green)" />
          <h2 style={{ marginTop: 16, color: 'var(--navy)' }}>Registration submitted</h2>
          <p style={{ color: 'var(--gray-500)', marginTop: 8, fontSize: 14 }}>
            {data.org.entityName || 'Your organization'} has been submitted to FIIK for verification.
            You'll be notified once your profile is reviewed.
          </p>
          <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => { setSubmitted(false); setStep(0); }}>
            Back to registration
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-head">
        <div>
          <h1>Register Your Startup with FIIK</h1>
          <p>Complete your organization profile to participate in pilot execution.</p>
        </div>
      </div>

      <div className="card" style={{ padding: '28px 32px' }}>
        <StepProgress steps={STEPS} currentIndex={step} />

        {step === 0 && (
          <section>
            <h3 className="section-h">1. Organization Identity</h3>
            <FieldGrid>
              <Field label="Entity Name" required>
                <Input value={data.org.entityName} onChange={(v) => set('org', 'entityName', v)} placeholder="e.g., GreenCycle Technologies Pvt. Ltd." />
              </Field>
              <Field label="Legal Entity Type" required>
                <Select value={data.org.legalEntityType} onChange={(v) => set('org', 'legalEntityType', v)} options={legalEntityTypes} />
              </Field>
              <Field label="CIN">
                <Input value={data.org.cin} onChange={(v) => set('org', 'cin', v)} placeholder="Corporate Identification Number" />
              </Field>
              <Field label="Date of Incorporation" required>
                <Input type="date" value={data.org.incorporationDate} onChange={(v) => set('org', 'incorporationDate', v)} />
              </Field>
              <Field label="PAN" required>
                <Input value={data.org.pan} onChange={(v) => set('org', 'pan', v)} placeholder="AAAAA0000A" />
              </Field>
              <Field label="Website">
                <Input value={data.org.website} onChange={(v) => set('org', 'website', v)} placeholder="https://" />
              </Field>
            </FieldGrid>
            <Field label="Registered Address" required>
              <TextArea rows={2} value={data.org.address} onChange={(v) => set('org', 'address', v)} placeholder="Registered office address" />
            </Field>
            <FieldGrid cols={3}>
              <Field label="State" required>
                <Select value={data.org.state} onChange={(v) => set('org', 'state', v)} options={indianStates} />
              </Field>
              <Field label="District" required>
                <Input value={data.org.district} onChange={(v) => set('org', 'district', v)} />
              </Field>
              <Field label="PIN Code" required>
                <Input value={data.org.pin} onChange={(v) => set('org', 'pin', v)} placeholder="6-digit PIN" />
              </Field>
            </FieldGrid>
            <FieldGrid>
              <Field label="Industry" required>
                <Input value={data.org.industry} onChange={(v) => set('org', 'industry', v)} placeholder="e.g., Urban Infrastructure" />
              </Field>
              <Field label="Sector" required>
                <Select value={data.org.sector} onChange={(v) => set('org', 'sector', v)} options={sectors} />
              </Field>
            </FieldGrid>
          </section>
        )}

        {step === 1 && (
          <section>
            <h3 className="section-h">2. Government Recognition</h3>
            <p className="section-note">
              FIIK does not itself grant recognition — record any recognition your startup already
              holds so departments and MSInS can verify it.
            </p>
            <Field label="Applicable Recognitions" required>
              <div className="checkbox-list">
                {recognitionTypes.map((type) => (
                  <label key={type} className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={data.recognition.types.includes(type)}
                      onChange={() => toggleRecognitionType(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </Field>
            <FieldGrid>
              <Field label="Recognition Number">
                <Input value={data.recognition.recognitionNumber} onChange={(v) => set('recognition', 'recognitionNumber', v)} />
              </Field>
              <Field label="Recognition Date">
                <Input type="date" value={data.recognition.recognitionDate} onChange={(v) => set('recognition', 'recognitionDate', v)} />
              </Field>
            </FieldGrid>
          </section>
        )}

        {step === 2 && (
          <section>
            <h3 className="section-h">3. Authorized Representative</h3>
            <FieldGrid>
              <Field label="Name" required>
                <Input value={data.representative.name} onChange={(v) => set('representative', 'name', v)} />
              </Field>
              <Field label="Designation" required>
                <Input value={data.representative.designation} onChange={(v) => set('representative', 'designation', v)} placeholder="e.g., Co-founder & CEO" />
              </Field>
              <Field label="Email" required>
                <Input type="email" value={data.representative.email} onChange={(v) => set('representative', 'email', v)} />
              </Field>
              <Field label="Phone" required>
                <Input value={data.representative.phone} onChange={(v) => set('representative', 'phone', v)} placeholder="+91" />
              </Field>
            </FieldGrid>
          </section>
        )}

        {step === 3 && (
          <section>
            <h3 className="section-h">4. Founders / Directors</h3>
            {data.founders.map((f, idx) => (
              <div key={f.id} className="repeat-card">
                <div className="repeat-card-head">
                  <span>Founder / Director {idx + 1}</span>
                  {data.founders.length > 1 && (
                    <button className="icon-btn-light" onClick={() => removeFounder(f.id)}><Trash2 size={14} /></button>
                  )}
                </div>
                <FieldGrid cols={3}>
                  <Field label="Name" required>
                    <Input value={f.name} onChange={(v) => updateFounder(f.id, 'name', v)} />
                  </Field>
                  <Field label="Designation" required>
                    <Input value={f.designation} onChange={(v) => updateFounder(f.id, 'designation', v)} />
                  </Field>
                  <Field label="Basic Details">
                    <Input value={f.details} onChange={(v) => updateFounder(f.id, 'details', v)} placeholder="Background, prior ventures" />
                  </Field>
                </FieldGrid>
              </div>
            ))}
            <button className="btn btn-secondary" onClick={addFounder}><Plus size={14} /> Add Founder / Director</button>
          </section>
        )}

        {step === 4 && (
          <section>
            <h3 className="section-h">5. Startup Capability</h3>
            <Field label="Product / Solution" required>
              <TextArea value={data.capability.solution} onChange={(v) => set('capability', 'solution', v)} placeholder="What does your product / solution do?" />
            </Field>
            <Field label="Technology" required>
              <TextArea rows={3} value={data.capability.technology} onChange={(v) => set('capability', 'technology', v)} placeholder="Core technology stack / IP" />
            </Field>
            <FieldGrid>
              <Field label="Deployment Capability">
                <TextArea rows={3} value={data.capability.deployment} onChange={(v) => set('capability', 'deployment', v)} placeholder="Sites, states, scale you can deploy to" />
              </Field>
              <Field label="Relevant Experience">
                <TextArea rows={3} value={data.capability.experience} onChange={(v) => set('capability', 'experience', v)} placeholder="Prior deployments, clients, awards" />
              </Field>
            </FieldGrid>
            <Field label="Pilot Capability" hint="Team size, timelines and resources you can commit to a government pilot.">
              <TextArea rows={3} value={data.capability.pilotCapability} onChange={(v) => set('capability', 'pilotCapability', v)} />
            </Field>
          </section>
        )}

        {step === 5 && (
          <section>
            <h3 className="section-h">6. Review &amp; Submit</h3>
            <ReviewBlock title="Organization Identity" rows={[
              ['Entity Name', data.org.entityName], ['Legal Entity Type', data.org.legalEntityType],
              ['PAN', data.org.pan], ['State / District', `${data.org.state || '—'} / ${data.org.district || '—'}`],
              ['Sector', data.org.sector],
            ]} />
            <ReviewBlock title="Government Recognition" rows={[
              ['Recognitions', data.recognition.types.join(', ') || '—'],
              ['Recognition Number', data.recognition.recognitionNumber || '—'],
            ]} />
            <ReviewBlock title="Authorized Representative" rows={[
              ['Name', data.representative.name], ['Designation', data.representative.designation],
              ['Email', data.representative.email], ['Phone', data.representative.phone],
            ]} />
            <ReviewBlock title="Founders / Directors" rows={data.founders.map((f, i) => [`Founder ${i + 1}`, `${f.name || '—'} · ${f.designation || '—'}`])} />
            <div className="upload-box">
              <UploadCloud size={20} />
              <div>
                <strong>Drag and drop supporting documents</strong>
                <div className="field-hint">Incorporation certificate, recognition proof, PAN card (Max 10 MB each)</div>
              </div>
            </div>
          </section>
        )}

        <div className="step-actions">
          <button className="btn btn-secondary" onClick={prev} disabled={step === 0}>Previous</button>
          {step < STEPS.length - 1 ? (
            <button className="btn btn-primary" onClick={next}>Save &amp; Next</button>
          ) : (
            <button className="btn btn-primary" onClick={() => setSubmitted(true)}>Submit Registration</button>
          )}
        </div>
      </div>
    </Layout>
  );
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
