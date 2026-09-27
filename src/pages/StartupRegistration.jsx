import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StepProgress from '../components/StepProgress';
import { Field, Input, Select, TextArea, FieldGrid } from '../components/FormField';
import { useAuth } from '../context/AuthContext';
import { legalEntityTypes, indianStates, sectors, recognitionTypes, founderTemplate, currentStartup } from '../data/mockData';

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
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header variant="dashboard" backTo="/dashboard" />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-card max-w-xl mx-auto my-10">
              <div className="h-16 w-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-green-200">
                ✓
              </div>
              <h2 className="text-xl font-bold text-navy-950">Registration Submitted for Verification</h2>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                {data.org.entityName || 'Your organization'} has been successfully registered on FIIK. MSInS Admin will verify your DPIIT &amp; eligibility credentials.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button className="btn btn-secondary text-xs" onClick={() => { setSubmitted(false); setStep(0); }}>
                  Review Registration
                </button>
                <button className="btn btn-primary text-xs" onClick={() => navigate('/work-order')}>
                  Propose Pilot Request →
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header variant="dashboard" backTo="/dashboard" />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 max-w-5xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-navy-950">
                {role === 'admin' ? 'Verify Startup Eligibility & Profile' : role === 'startup' ? 'Register Your Startup with FIIK' : 'Startup Profile View'}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {role === 'admin' ? 'MSInS Admin verification of startup DPIIT recognition and capability' : 'Complete your organization profile to participate in government pilot execution.'}
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs font-semibold text-gray-500 hover:text-navy-950"
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Role Status Banner */}
          {role === 'admin' && (
            <div className="bg-purple-50 border border-purple-200 text-purple-900 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs">
                <span className="font-bold block uppercase tracking-wider text-purple-700">MSInS Nodal Verification Authority</span>
                <p className="text-gray-600 mt-0.5">Inspect DPIIT recognition number, CIN, incorporation details, and founder background.</p>
              </div>
              <button
                onClick={() => setVerifiedByAdmin(true)}
                className={`btn btn-primary text-xs ${verifiedByAdmin ? 'bg-green-600' : 'bg-purple-700 hover:bg-purple-800'}`}
              >
                {verifiedByAdmin ? '✓ Startup Verified by MSInS' : 'Verify & Approve Startup Eligibility'}
              </button>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-card">
            <StepProgress steps={STEPS} currentIndex={step} />

            {step === 0 && (
              <section className="mt-6">
                <h3 className="text-sm font-bold text-navy-950 mb-4 pb-2 border-b border-gray-100">
                  1. Organization Identity
                </h3>
                <FieldGrid>
                  <Field label="Entity Name" required>
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

                <FieldGrid>
                  <Field label="CIN / LLPIN">
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

                <FieldGrid>
                  <Field label="PAN" required>
                    <Input
                      value={data.org.pan}
                      onChange={(e) => set('org', 'pan', e.target.value)}
                      placeholder="AAECG1234F"
                      disabled={isReadOnly}
                    />
                  </Field>
                  <Field label="State" required>
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
              <section className="mt-6">
                <h3 className="text-sm font-bold text-navy-950 mb-4 pb-2 border-b border-gray-100">
                  2. Government Recognition
                </h3>
                <Field label="Recognition Types">
                  <div className="space-y-2 mt-2">
                    {recognitionTypes.map((rec) => (
                      <label key={rec.id} className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={data.recognition.types.includes(rec.id)}
                          onChange={() => toggleRecognitionType(rec.id)}
                          disabled={isReadOnly}
                          className="rounded text-fiik-orange focus:ring-fiik-orange"
                        />
                        {rec.label}
                      </label>
                    ))}
                  </div>
                </Field>
                <FieldGrid>
                  <Field label="Recognition Number">
                    <Input
                      value={data.recognition.recognitionNumber}
                      onChange={(e) => set('recognition', 'recognitionNumber', e.target.value)}
                      placeholder="DPIIT123456"
                      disabled={isReadOnly}
                    />
                  </Field>
                  <Field label="Recognition Date">
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
              <section className="mt-6">
                <h3 className="text-sm font-bold text-navy-950 mb-4 pb-2 border-b border-gray-100">
                  3. Authorized Representative
                </h3>
                <FieldGrid>
                  <Field label="Representative Name" required>
                    <Input
                      value={data.representative.name}
                      onChange={(e) => set('representative', 'name', e.target.value)}
                      placeholder="Rahul Deshmukh"
                      disabled={isReadOnly}
                    />
                  </Field>
                  <Field label="Designation" required>
                    <Input
                      value={data.representative.designation}
                      onChange={(e) => set('representative', 'designation', e.target.value)}
                      placeholder="Founder & CEO"
                      disabled={isReadOnly}
                    />
                  </Field>
                </FieldGrid>
                <FieldGrid>
                  <Field label="Email Address" required>
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
              <section className="mt-6">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-navy-950">4. Founders &amp; Directors</h3>
                  {!isReadOnly && (
                    <button
                      type="button"
                      onClick={addFounder}
                      className="text-xs font-semibold text-fiik-orange hover:underline"
                    >
                      + Add Founder
                    </button>
                  )}
                </div>
                {data.founders.map((founder, index) => (
                  <div key={founder.id} className="p-4 border border-gray-200 rounded-lg mb-4 bg-gray-50/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-700">Founder {index + 1}</span>
                      {!isReadOnly && data.founders.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFounder(founder.id)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <FieldGrid>
                      <Field label="Full Name">
                        <Input
                          value={founder.name}
                          onChange={(e) => updateFounder(founder.id, 'name', e.target.value)}
                          placeholder="Rahul Deshmukh"
                          disabled={isReadOnly}
                        />
                      </Field>
                      <Field label="DIN / DPIN">
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
              <section className="mt-6">
                <h3 className="text-sm font-bold text-navy-950 mb-4 pb-2 border-b border-gray-100">
                  5. Startup Capability
                </h3>
                <Field label="Core Solution Description" required>
                  <TextArea
                    value={data.capability.solution}
                    onChange={(e) => set('capability', 'solution', e.target.value)}
                    disabled={isReadOnly}
                  />
                </Field>
                <Field label="Technology Stack &amp; Hardware Components">
                  <TextArea
                    value={data.capability.technology}
                    onChange={(e) => set('capability', 'technology', e.target.value)}
                    disabled={isReadOnly}
                  />
                </Field>
              </section>
            )}

            {step === 5 && (
              <section className="mt-6">
                <h3 className="text-sm font-bold text-navy-950 mb-4 pb-2 border-b border-gray-100">
                  6. Review Registration
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 space-y-4 text-xs">
                  <div>
                    <span className="font-bold text-gray-700 uppercase">Entity:</span>
                    <p className="text-navy-950 font-bold text-sm">{data.org.entityName}</p>
                    <p className="text-gray-500">{data.org.legalEntityType} · {data.org.state}</p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700 uppercase">Authorized Representative:</span>
                    <p className="text-navy-950 font-semibold">{data.representative.name} ({data.representative.designation})</p>
                  </div>
                </div>
              </section>
            )}

            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={prev}
                disabled={step === 0}
                className="btn btn-secondary text-xs disabled:opacity-50"
              >
                ← Previous
              </button>
              {step < STEPS.length - 1 ? (
                <button type="button" onClick={next} className="btn btn-primary text-xs">
                  Next →
                </button>
              ) : role === 'startup' ? (
                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="btn btn-primary text-xs bg-fiik-green hover:bg-green-700"
                >
                  Submit Registration ✓
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/work-order')}
                  className="btn btn-primary text-xs bg-navy-950 hover:bg-black"
                >
                  Proceed to Work Order Review →
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
