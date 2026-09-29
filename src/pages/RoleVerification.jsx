import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiikPageShell,
  FiikHero,
  FiikDocumentCard,
  FiikRoleNotice,
  FiikStatusBadge,
} from '../components/FiikDesignSystem';
import { Field, Input, FieldGrid } from '../components/FormField';
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../utils/roleTheme';

const ROLE_FORMS = {
  startup: {
    stepLabel: 'STARTUP IDENTITY VERIFICATION',
    title: 'Startup Identity & DPIIT Verification',
    infoText: 'Startups must be DPIIT recognized or registered under MSInS Innovation Scheme to initiate government pilot requests.',
    nextPath: '/registration',
  },
  department: {
    stepLabel: 'GOVERNMENT DEPARTMENT VERIFICATION',
    title: 'Government Department Credentials',
    infoText: 'Department officers must authenticate via an official government email domain (e.g. @gov.in, @maha.gov.in, @nic.in).',
    nextPath: '/work-order',
  },
  evaluator: {
    stepLabel: 'EVALUATOR AUTHORIZATION',
    title: 'Empanelled Evaluator Authorization',
    infoText: 'Only evaluators empanelled under MSInS Expert Panel registry may access technical evaluation workflows.',
    nextPath: '/field-evaluation',
  },
  admin: {
    stepLabel: 'MSINS ADMINISTRATIVE ACCESS',
    title: 'MSInS Nodal Authority Portal Access',
    infoText: 'MSInS Secretariat administrative access requires a valid authorization token issued by the MSInS Director General.',
    nextPath: '/dashboard',
  },
};

export default function RoleVerification() {
  const { role, verifyRole } = useAuth();
  const navigate = useNavigate();
  const theme = useRoleTheme(role);

  // Startup fields
  const [dpiitNumber, setDpiitNumber] = useState('DPIIT-123456-MH');
  const [startupName] = useState('GreenGrid Technologies Pvt. Ltd.');
  const [startupEmail, setStartupEmail] = useState('rahul.deshmukh@greengridtech.in');
  const [startupMobile, setStartupMobile] = useState('9876543210');

  // Department fields
  const [deptName, setDeptName] = useState('Department of Urban Development');
  const [officerName, setOfficerName] = useState('Mr. Rahul Deshmukh');
  const [designation, setDesignation] = useState('Deputy Commissioner (Smart Cities)');
  const [empId, setEmpId] = useState('MAHA-UD-8492');
  const [deptEmail, setDeptEmail] = useState('ud.dept@maha.gov.in');

  // Evaluator fields
  const [evaluatorId, setEvaluatorId] = useState('MSINS-EVAL-2026-08');
  const [expertName, setExpertName] = useState('Dr. Ananya Rao');
  const [org, setOrg] = useState('IIT Bombay - Empanelled CleanTech Specialist');
  const [domain, setDomain] = useState('CleanTech & Waste Management');

  // Admin fields
  const [adminCode, setAdminCode] = useState('MSINS-ADMIN-SECRETARIAT');

  const [verifying, setVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const config = ROLE_FORMS[role] || ROLE_FORMS.startup;

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerifiedSuccess(true);
      verifyRole(role, { dpiitNumber, deptName, officerName, evaluatorId });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }, 1200);
  };

  return (
    <FiikPageShell backTo="/role-selection">
      {/* ── Level 1 Dark Navy Hero ── */}
      <FiikHero
        tag={config.stepLabel}
        verifiedLabel="Digital Gate Authentication"
        title={config.title}
        subtitle={config.infoText}
        pipelineStep={1}
      />

      {/* ── Level 3 Document Card: Verification Form ── */}
      <FiikDocumentCard
        title="Role Identity Credential Input"
        subtitle="Credentials will be verified against state innovation and national registries."
        icon="🛡️"
        index={1}
      >
        <form onSubmit={handleVerifySubmit} className="space-y-6">
          {role === 'startup' && (
            <div className="space-y-5">
              <FieldGrid cols={2}>
                <Field label="DPIIT Certificate / Application Number" required hint="Format: DPIIT-XXXXXX-State">
                  <Input
                    value={dpiitNumber}
                    onChange={(e) => setDpiitNumber(e.target.value)}
                    required
                  />
                </Field>
                <Field label="Registered Startup Legal Entity Name" required>
                  <Input value={startupName} disabled />
                </Field>
              </FieldGrid>

              <FieldGrid cols={2}>
                <Field label="Authorized Official Email" required>
                  <Input
                    type="email"
                    value={startupEmail}
                    onChange={(e) => setStartupEmail(e.target.value)}
                    required
                  />
                </Field>
                <Field label="Registered Mobile Number" required>
                  <Input
                    type="tel"
                    value={startupMobile}
                    onChange={(e) => setStartupMobile(e.target.value)}
                    required
                  />
                </Field>
              </FieldGrid>
            </div>
          )}

          {role === 'department' && (
            <div className="space-y-5">
              <FieldGrid cols={2}>
                <Field label="Government Department / Nodal Agency" required>
                  <Input
                    value={deptName}
                    onChange={(e) => setDeptName(e.target.value)}
                    required
                  />
                </Field>
                <Field label="Officer Full Name" required>
                  <Input
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    required
                  />
                </Field>
              </FieldGrid>

              <FieldGrid cols={3}>
                <Field label="Official Designation" required>
                  <Input
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required
                  />
                </Field>
                <Field label="Officer Employee ID">
                  <Input
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                  />
                </Field>
                <Field label="Official Government Email (@gov.in / @nic.in)" required>
                  <Input
                    type="email"
                    value={deptEmail}
                    onChange={(e) => setDeptEmail(e.target.value)}
                    required
                  />
                </Field>
              </FieldGrid>
            </div>
          )}

          {role === 'evaluator' && (
            <div className="space-y-5">
              <FieldGrid cols={2}>
                <Field label="MSInS Empanelled Evaluator ID" required hint="Issued by Maharashtra State Innovation Society">
                  <Input
                    value={evaluatorId}
                    onChange={(e) => setEvaluatorId(e.target.value)}
                    required
                  />
                </Field>
                <Field label="Expert Full Name" required>
                  <Input
                    value={expertName}
                    onChange={(e) => setExpertName(e.target.value)}
                    required
                  />
                </Field>
              </FieldGrid>

              <FieldGrid cols={2}>
                <Field label="Institutional / Technical Affiliation" required>
                  <Input
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    required
                  />
                </Field>
                <Field label="Technical Evaluation Domain" required>
                  <Input
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    required
                  />
                </Field>
              </FieldGrid>
            </div>
          )}

          {role === 'admin' && (
            <div className="space-y-5">
              <Field label="MSInS Secretariat Authorization Security Token" required hint="Issued by MSInS Director General Secretariat">
                <Input
                  type="password"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  required
                />
              </Field>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => navigate('/role-selection')}
              className="px-5 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              ← Back to Role Selection
            </button>

            <button
              type="submit"
              disabled={verifying}
              className={`px-8 py-3 rounded-xl font-black text-xs text-white shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                verifiedSuccess
                  ? 'bg-emerald-600'
                  : 'bg-[#071A3D] hover:bg-black'
              }`}
            >
              {verifying ? (
                <>
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Verifying Credentials with State Registry...</span>
                </>
              ) : verifiedSuccess ? (
                <span>✓ Verified! Redirecting to Dashboard...</span>
              ) : (
                <>
                  <span>Authenticate &amp; Enter Dashboard</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </form>
      </FiikDocumentCard>
    </FiikPageShell>
  );
}
