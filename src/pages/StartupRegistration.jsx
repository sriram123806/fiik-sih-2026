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
import { Field, Input, Select, TextArea, FieldGrid } from '../components/FormField';
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../utils/roleTheme';
import {
  legalEntityTypes,
  indianStates,
  sectors,
  recognitionTypes,
  founderTemplate,
  currentStartup,
} from '../data/mockData';

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
    entityName: currentStartup.name,
    legalEntityType: currentStartup.legalEntityType,
    cin: currentStartup.cin,
    incorporationDate: currentStartup.incorporationDate,
    pan: currentStartup.pan,
    address: currentStartup.address,
    state: currentStartup.state,
    district: currentStartup.district,
    pin: currentStartup.pin,
    website: currentStartup.website,
    industry: currentStartup.industry,
    sector: currentStartup.sector,
  },
  recognition: {
    types: ['dpiit'],
    recognitionNumber: 'DPIIT123456',
    recognitionDate: '2023-04-10',
  },
  representative: {
    name: currentStartup.contactName,
    designation: currentStartup.contactDesignation,
    email: currentStartup.contactEmail,
    phone: currentStartup.contactPhone,
  },
  founders: [founderTemplate()],
  capability: {
    solution: currentStartup.problemStatement,
    technology: 'IoT Smart Bins, Edge AI Sensor Module, Cloud Monitoring Dashboard',
    deployment: 'Proven 3-ward pilot capability in Pune',
    experience: '3 years in municipal waste automation',
    pilotCapability: 'Full execution with field team & telemetry monitoring',
  },
};

export default function StartupRegistration() {
  const { role } = useAuth();
  const theme = useRoleTheme(role);
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [verifiedByAdmin, setVerifiedByAdmin] = useState(false);
  const navigate = useNavigate();

  const isReadOnly = role !== 'startup';

  const set = (section, key, value) => {
    if (isReadOnly) return;
    setData((d) => ({ ...d, [section]: { ...d[section], [key]: value } }));
  };

  const toggleRecognitionType = (typeId) => {
    if (isReadOnly) return;
    setData((d) => {
      const has = d.recognition.types.includes(typeId);
      return {
        ...d,
        recognition: {
          ...d.recognition,
          types: has ? d.recognition.types.filter((t) => t !== typeId) : [...d.recognition.types, typeId],
        },
      };
    });
  };

  const updateFounder = (id, key, value) => {
    if (isReadOnly) return;
    setData((d) => ({
      ...d,
      founders: d.founders.map((f) => (f.id === id ? { ...f, [key]: value } : f)),
    }));
  };
  const addFounder = () => !isReadOnly && setData((d) => ({ ...d, founders: [...d.founders, founderTemplate()] }));
  const removeFounder = (id) =>
    !isReadOnly && setData((d) => ({ ...d, founders: d.founders.filter((f) => f.id !== id) }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  if (submitted) {
    return (
      <FiikPageShell backTo="/dashboard">
        <FiikHero
          tag="REGISTRATION SUBMITTED"
          verifiedLabel="State Registry Verification Pending"
          title="Startup Profile Submitted for Verification"
          subtitle="Your enterprise credentials and DPIIT recognition have been logged to the FIIK portal."
          pipelineStep={1}
        />

        <FiikDocumentCard className="max-w-2xl mx-auto text-center">
          <div className="h-20 w-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-5 border-2 border-emerald-300 shadow-sm">
            ✓
          </div>
          <h2 className="text-2xl font-black text-[#071A3D]">
            Registration Successfully Submitted
          </h2>
          <p className="text-sm text-gray-600 mt-2.5 leading-relaxed font-medium">
            <strong className="text-[#071A3D]">{data.org.entityName || 'GreenGrid Technologies'}</strong> has been registered on the FIIK Pilot Procurement Gateway. The MSInS Nodal Authority will verify eligibility.
          </p>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => { setSubmitted(false); setStep(0); }}
              className="px-6 py-3 rounded-xl border-2 border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Review Registration Data
            </button>
            <button
              onClick={() => navigate('/work-order')}
              className="px-6 py-3 rounded-xl font-black text-xs text-white shadow-md transition-all flex items-center gap-2"
              style={{ backgroundColor: theme.accent }}
            >
              <span>Proceed to Work Order Builder</span>
              <span>→</span>
            </button>
          </div>
        </FiikDocumentCard>
      </FiikPageShell>
    );
  }

  return (
    <FiikPageShell backTo="/dashboard">
      {/* ── Level 1 Hero Banner ── */}
      <FiikHero
        tag="DPIIT &amp; MSInS ELIGIBILITY GATEWAY"
        verifiedLabel="DPIIT Recognized Startup"
        title={
          role === 'admin'
            ? 'Startup Eligibility & Profile Verification'
            : role === 'startup'
            ? 'Startup Registration & Capability Profile'
            : 'Startup Organization Profile'
        }
        subtitle="Complete verified organization credentials to participate in government pilot execution and earn official PREP credentials."
        pipelineStep={1}
        rightSlot={
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
              DPIIT STATUS
            </span>
            <span className="text-xl font-black text-white block mt-0.5">
              DPIIT123456
            </span>
            <span className="text-[10px] text-emerald-300 font-bold block mt-0.5">
              ✓ Validated in MCA Registry
            </span>
          </div>
        }
      />

      {/* ── Role Governance Notice ── */}
      {role === 'admin' ? (
        <FiikRoleNotice
          title="MSInS NODAL VERIFICATION AUTHORITY"
          action={
            <button
              onClick={() => setVerifiedByAdmin(true)}
              className={`px-5 py-2.5 rounded-xl font-black text-xs text-white shadow-md transition-all ${
                verifiedByAdmin ? 'bg-emerald-600' : 'bg-purple-700 hover:bg-purple-800'
              }`}
            >
              {verifiedByAdmin ? '✓ Startup Verified by MSInS' : 'Verify & Approve Startup Eligibility'}
            </button>
          }
        >
          Inspect DPIIT recognition number, CIN, incorporation details, and founder backgrounds for public procurement eligibility.
        </FiikRoleNotice>
      ) : (
        <FiikRoleNotice>
          {isReadOnly
            ? 'Read-only profile inspection mode for government stakeholders.'
            : 'Authorized startup representative: ensure all organization and solution details match official regulatory filings.'}
        </FiikRoleNotice>
      )}

      {/* ── Level 3 Document Card: Multi-Step Registration Form ── */}
      <FiikDocumentCard
        title={`Step ${step + 1}: ${STEPS[step]}`}
        subtitle="Ensure all regulatory, technical, and authorized contact information is accurate."
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
              <h3 className="text-base font-black text-[#071A3D]">1. Organization Identity</h3>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Corporate entity details as registered under Ministry of Corporate Affairs (MCA).</p>
            </div>

            <FieldGrid cols={2}>
              <Field label="Entity Legal Name" required>
                <Input
                  value={data.org.entityName}
                  onChange={(e) => set('org', 'entityName', e.target.value)}
                  placeholder="GreenGrid Technologies Pvt. Ltd."
                  disabled={isReadOnly}
                />
              </Field>
              <Field label="Legal Entity Type" required>
                <Select
                  value={data.org.legalEntityType}
                  onChange={(e) => set('org', 'legalEntityType', e.target.value)}
                  options={legalEntityTypes}
                  disabled={isReadOnly}
                />
              </Field>
            </FieldGrid>

            <FieldGrid cols={2}>
              <Field label="Corporate Identity Number (CIN / LLPIN)">
                <Input
                  value={data.org.cin}
                  onChange={(e) => set('org', 'cin', e.target.value)}
                  placeholder="U74999MH2023PTC123456"
                  disabled={isReadOnly}
                />
              </Field>
              <Field label="Date of Incorporation" required>
                <Input
                  type="date"
                  value={data.org.incorporationDate}
                  onChange={(e) => set('org', 'incorporationDate', e.target.value)}
                  disabled={isReadOnly}
                />
              </Field>
            </FieldGrid>

            <FieldGrid cols={2}>
              <Field label="Permanent Account Number (PAN)" required>
                <Input
                  value={data.org.pan}
                  onChange={(e) => set('org', 'pan', e.target.value)}
                  placeholder="AAECG1234F"
                  disabled={isReadOnly}
                />
              </Field>
              <Field label="State / UT" required>
                <Select
                  value={data.org.state}
                  onChange={(e) => set('org', 'state', e.target.value)}
                  options={indianStates}
                  disabled={isReadOnly}
                />
              </Field>
            </FieldGrid>
          </section>
        )}

        {step === 1 && (
          <section className="space-y-6">
            <div className="pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-[#071A3D]">2. Government Recognition &amp; Certifications</h3>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Verify official startup recognition numbers to unlock pilot procurement pathways.</p>
            </div>

            <Field label="Recognition Schemes &amp; Registrations">
              <div className="grid sm:grid-cols-2 gap-3 mt-2">
                {recognitionTypes.map((rec) => (
                  <label
                    key={rec.id}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      data.recognition.types.includes(rec.id)
                        ? 'border-[#071A3D] bg-navy-50/20 font-black text-[#071A3D]'
                        : 'border-gray-200 bg-gray-50 font-bold text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={data.recognition.types.includes(rec.id)}
                      onChange={() => toggleRecognitionType(rec.id)}
                      disabled={isReadOnly}
                      className="h-4 w-4 rounded text-[#071A3D] focus:ring-[#071A3D]"
                    />
                    <span className="text-xs">{rec.label}</span>
                  </label>
                ))}
              </div>
            </Field>

            <FieldGrid cols={2}>
              <Field label="DPIIT Certificate Number" required>
                <Input
                  value={data.recognition.recognitionNumber}
                  onChange={(e) => set('recognition', 'recognitionNumber', e.target.value)}
                  placeholder="DPIIT123456"
                  disabled={isReadOnly}
                />
              </Field>
              <Field label="Recognition Date" required>
                <Input
                  type="date"
                  value={data.recognition.recognitionDate}
                  onChange={(e) => set('recognition', 'recognitionDate', e.target.value)}
                  disabled={isReadOnly}
                />
              </Field>
            </FieldGrid>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-6">
            <div className="pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-[#071A3D]">3. Authorized Representative Contact</h3>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Primary nodal point of contact for four-party governance and pilot coordination.</p>
            </div>

            <FieldGrid cols={2}>
              <Field label="Representative Full Name" required>
                <Input
                  value={data.representative.name}
                  onChange={(e) => set('representative', 'name', e.target.value)}
                  placeholder="Rahul Deshmukh"
                  disabled={isReadOnly}
                />
              </Field>
              <Field label="Official Designation" required>
                <Input
                  value={data.representative.designation}
                  onChange={(e) => set('representative', 'designation', e.target.value)}
                  placeholder="Founder &amp; CEO"
                  disabled={isReadOnly}
                />
              </Field>
            </FieldGrid>

            <FieldGrid cols={2}>
              <Field label="Official Email Address" required>
                <Input
                  type="email"
                  value={data.representative.email}
                  onChange={(e) => set('representative', 'email', e.target.value)}
                  placeholder="rahul.deshmukh@greengridtech.in"
                  disabled={isReadOnly}
                />
              </Field>
              <Field label="Mobile Number" required>
                <Input
                  value={data.representative.phone}
                  onChange={(e) => set('representative', 'phone', e.target.value)}
                  placeholder="9876543210"
                  disabled={isReadOnly}
                />
              </Field>
            </FieldGrid>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-black text-[#071A3D]">4. Founders &amp; Board of Directors</h3>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">Key executive personnel responsible for execution governance.</p>
              </div>
              {!isReadOnly && (
                <button
                  type="button"
                  onClick={addFounder}
                  className="px-3.5 py-1.5 rounded-lg border-2 border-[#071A3D] text-xs font-black text-[#071A3D] hover:bg-navy-50 transition-colors"
                >
                  + Add Founder
                </button>
              )}
            </div>

            {data.founders.map((founder, index) => (
              <div key={founder.id} className="p-5 border-2 border-gray-200/90 rounded-2xl bg-gray-50/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#071A3D] uppercase tracking-wider">
                    Executive {index + 1}
                  </span>
                  {!isReadOnly && data.founders.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFounder(founder.id)}
                      className="text-xs font-bold text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <FieldGrid cols={2}>
                  <Field label="Full Legal Name" required>
                    <Input
                      value={founder.name}
                      onChange={(e) => updateFounder(founder.id, 'name', e.target.value)}
                      placeholder="Rahul Deshmukh"
                      disabled={isReadOnly}
                    />
                  </Field>
                  <Field label="Director Identification Number (DIN / DPIN)">
                    <Input
                      value={founder.din}
                      onChange={(e) => updateFounder(founder.id, 'din', e.target.value)}
                      placeholder="09876543"
                      disabled={isReadOnly}
                    />
                  </Field>
                </FieldGrid>
              </div>
            ))}
          </section>
        )}

        {step === 4 && (
          <section className="space-y-6">
            <div className="pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-[#071A3D]">5. Technical Capability &amp; Deployment Readiness</h3>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Demonstrated capabilities, hardware modules, and sensor telemetry architecture.</p>
            </div>

            <Field label="Core Innovation &amp; Solution Summary" required>
              <TextArea
                value={data.capability.solution}
                onChange={(e) => set('capability', 'solution', e.target.value)}
                rows={3}
                disabled={isReadOnly}
              />
            </Field>

            <Field label="Technology Stack &amp; Hardware Components" required>
              <TextArea
                value={data.capability.technology}
                onChange={(e) => set('capability', 'technology', e.target.value)}
                rows={3}
                disabled={isReadOnly}
              />
            </Field>
          </section>
        )}

        {step === 5 && (
          <section className="space-y-6">
            <div className="pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-[#071A3D]">6. Review Registration Information</h3>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Verify all recorded information before final submission into the FIIK portal.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2 text-xs">
                <span className="font-black text-gray-400 uppercase text-[10px] block">ENTITY IDENTITY</span>
                <p className="text-sm font-black text-[#071A3D]">{data.org.entityName}</p>
                <p className="text-gray-600 font-medium">{data.org.legalEntityType} · {data.org.state}</p>
                <p className="text-gray-500 font-mono text-[11px]">CIN: {data.org.cin} | PAN: {data.org.pan}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2 text-xs">
                <span className="font-black text-gray-400 uppercase text-[10px] block">RECOGNITION &amp; CONTACT</span>
                <p className="text-sm font-black text-[#071A3D]">{data.representative.name}</p>
                <p className="text-gray-600 font-medium">{data.representative.designation} · {data.representative.phone}</p>
                <p className="text-emerald-700 font-bold text-[11px]">DPIIT Number: {data.recognition.recognitionNumber}</p>
              </div>
            </div>
          </section>
        )}

        {/* ── Form Footer Navigation Buttons ── */}
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
          ) : role === 'startup' ? (
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all cursor-pointer"
            >
              Submit Registration ✓
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/work-order')}
              className="px-6 py-2.5 rounded-xl font-black text-xs text-white bg-[#071A3D] hover:bg-black shadow-md transition-all cursor-pointer"
            >
              Proceed to Work Order Review →
            </button>
          )}
        </div>
      </FiikDocumentCard>
    </FiikPageShell>
  );
}
