import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../utils/roleTheme';

/* ── Reusable form-field component ─────────────────────────────── */
function FormField({ label, required, helper, children }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-bold text-navy-950">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {helper && (
        <p className="text-[11px] text-gray-500 font-medium leading-snug">{helper}</p>
      )}
    </div>
  );
}

const inputCls = 'w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-xs focus-ring bg-white font-medium placeholder:text-gray-400';
const disabledCls = 'w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs bg-gray-100 text-gray-600 font-semibold cursor-not-allowed';

/* ── Per-role verification form configs ────────────────────────── */
const ROLE_FORMS = {
  startup: {
    stepLabel: 'STARTUP IDENTITY VERIFICATION',
    title: 'Startup Identity & DPIIT Verification',
    infoText: 'Startups must be DPIIT recognized or registered under MSInS Innovation Scheme to initiate government pilot requests.',
    infoColor: 'bg-blue-50 border-blue-200 text-blue-900',
    nextPath: '/registration',
    fields: null, // rendered inline below
  },
  department: {
    stepLabel: 'GOVERNMENT DEPARTMENT VERIFICATION',
    title: 'Government Department Credentials',
    infoText: 'Department officers must authenticate via an official government email domain (e.g. @gov.in, @maha.gov.in, @nic.in).',
    infoColor: 'bg-orange-50 border-orange-200 text-orange-900',
    nextPath: '/work-order',
    fields: null,
  },
  evaluator: {
    stepLabel: 'EVALUATOR AUTHORIZATION',
    title: 'Empanelled Evaluator Authorization',
    infoText: 'Only evaluators empanelled under MSInS Expert Panel registry may access evaluation workflows.',
    infoColor: 'bg-green-50 border-green-200 text-green-900',
    nextPath: '/field-evaluation',
    fields: null,
  },
  admin: {
    stepLabel: 'MSInS ADMINISTRATIVE ACCESS',
    title: 'MSInS Nodal Authority Portal Access',
    infoText: 'MSInS Secretariat administrative access requires a valid authorization token issued by the MSInS Director General.',
    infoColor: 'bg-purple-50 border-purple-200 text-purple-900',
    nextPath: '/dashboard',
    fields: null,
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
  const [startupMobile, setStartupMobile] = useState('');

  // Department fields
  const [deptName, setDeptName] = useState('Department of Urban Development');
  const [officerName, setOfficerName] = useState('Mr. Rahul Deshmukh');
  const [designation, setDesignation] = useState('Deputy Commissioner (Smart Cities)');
  const [empId, setEmpId] = useState('');
  const [deptEmail, setDeptEmail] = useState('ud.dept@maha.gov.in');

  // Evaluator fields
  const [evaluatorId, setEvaluatorId] = useState('MSINS-EVAL-2026-08');
  const [expertName, setExpertName] = useState('Dr. Ananya Rao');
  const [org, setOrg] = useState('');
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
      setTimeout(() => navigate(config.nextPath), 1000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <Header variant="public" showHomeLink />

      <main className="flex-1 max-w-xl mx-auto px-4 py-12 w-full">
        {/* Portal identity bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl border mb-6 shadow-sm"
          style={{ backgroundColor: theme.accentLight, borderColor: theme.accentBorder }}
        >
          <span className="text-xl">{theme.icon}</span>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.accent }}>
              {config.stepLabel}
            </p>
            <p className="text-xs font-bold text-navy-950">{theme.portalLabel}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-card p-8">

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-xl font-black text-navy-950">{config.title}</h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              FIIK establishes verified role identity before granting workflow access.
            </p>
          </div>

          {verifiedSuccess ? (
            <div className="bg-green-50 border-2 border-green-300 text-green-900 rounded-xl p-6 text-center">
              <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3 shadow">
                ✓
              </div>
              <h3 className="font-extrabold text-sm text-green-950">Verification Successful</h3>
              <p className="text-xs text-green-700 mt-1 font-medium">
                {theme.roleLabel} credentials validated in FIIK registry.
              </p>
              <p className="text-[11px] text-green-600 mt-3 animate-pulse font-bold">
                Redirecting to your portal...
              </p>
            </div>
          ) : (
            <form onSubmit={handleVerifySubmit} className="space-y-5 text-xs">

              {/* Info banner */}
              <div className={`rounded-lg p-3 text-[11px] border leading-relaxed flex gap-2 ${config.infoColor}`}>
                <span className="shrink-0 mt-0.5">ℹ️</span>
                <span>{config.infoText}</span>
              </div>

              {/* ── STARTUP FIELDS ── */}
              {role === 'startup' && (
                <>
                  <FormField
                    label="DPIIT / MSInS Recognition Number"
                    required
                    helper="Your official DPIIT-recognized startup identification number, e.g. DPIIT123456 or MSINS-2026-XXXX."
                  >
                    <input
                      type="text"
                      value={dpiitNumber}
                      onChange={(e) => setDpiitNumber(e.target.value)}
                      required
                      placeholder="Enter DPIIT Recognition Number (e.g., DPIIT12345)"
                      className={inputCls}
                    />
                  </FormField>

                  <FormField
                    label="Registered Startup Name"
                    helper="Pre-filled from your DPIIT registration. Contact your nodal officer if incorrect."
                  >
                    <input type="text" value={startupName} disabled className={disabledCls} />
                  </FormField>

                  <FormField
                    label="Official Startup Email"
                    required
                    helper="Use the email registered with DPIIT / MSInS. Must match registry records."
                  >
                    <input
                      type="email"
                      value={startupEmail}
                      onChange={(e) => setStartupEmail(e.target.value)}
                      required
                      placeholder="Enter official startup email (e.g., ceo@startup.in)"
                      className={inputCls}
                    />
                  </FormField>

                  <FormField
                    label="Authorized Contact Mobile Number"
                    helper="10-digit mobile number of the authorized point of contact."
                  >
                    <input
                      type="tel"
                      value={startupMobile}
                      onChange={(e) => setStartupMobile(e.target.value)}
                      placeholder="Enter 10-digit mobile number (e.g., 9876543210)"
                      maxLength={10}
                      className={inputCls}
                    />
                  </FormField>
                </>
              )}

              {/* ── DEPARTMENT FIELDS ── */}
              {role === 'department' && (
                <>
                  <FormField
                    label="Government Department Name"
                    required
                    helper="Full official name of your ministry or department (e.g., Department of Urban Development, Maharashtra)."
                  >
                    <input
                      type="text"
                      value={deptName}
                      onChange={(e) => setDeptName(e.target.value)}
                      required
                      placeholder="Enter full government department name"
                      className={inputCls}
                    />
                  </FormField>

                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      label="Nodal Officer Full Name"
                      required
                      helper="Name as per official records."
                    >
                      <input
                        type="text"
                        value={officerName}
                        onChange={(e) => setOfficerName(e.target.value)}
                        required
                        placeholder="Enter full name"
                        className={inputCls}
                      />
                    </FormField>

                    <FormField
                      label="Official Designation"
                      required
                      helper="Your post / designation."
                    >
                      <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        required
                        placeholder="Enter official designation"
                        className={inputCls}
                      />
                    </FormField>
                  </div>

                  <FormField
                    label="Department / Employee ID"
                    helper="Your official department-issued employee or officer ID number."
                  >
                    <input
                      type="text"
                      value={empId}
                      onChange={(e) => setEmpId(e.target.value)}
                      placeholder="Enter department or employee ID"
                      className={inputCls}
                    />
                  </FormField>

                  <FormField
                    label="Official Government Email ID"
                    required
                    helper="Must be a valid government domain address (e.g., name@gov.in, name@nic.in, name@maha.gov.in)."
                  >
                    <input
                      type="email"
                      value={deptEmail}
                      onChange={(e) => setDeptEmail(e.target.value)}
                      required
                      placeholder="Enter government email address (e.g., officer@maha.gov.in)"
                      className={inputCls}
                    />
                  </FormField>
                </>
              )}

              {/* ── EVALUATOR FIELDS ── */}
              {role === 'evaluator' && (
                <>
                  <FormField
                    label="MSInS Evaluator Panel ID"
                    required
                    helper="Your unique evaluator ID assigned by MSInS Expert Panel registry (e.g., MSINS-EVAL-2026-08)."
                  >
                    <input
                      type="text"
                      value={evaluatorId}
                      onChange={(e) => setEvaluatorId(e.target.value)}
                      required
                      placeholder="Enter assigned evaluator ID (e.g., MSINS-EVAL-2026-08)"
                      className={inputCls}
                    />
                  </FormField>

                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      label="Evaluator Full Name"
                      required
                      helper="As registered in MSInS panel."
                    >
                      <input
                        type="text"
                        value={expertName}
                        onChange={(e) => setExpertName(e.target.value)}
                        required
                        placeholder="Enter evaluator name"
                        className={inputCls}
                      />
                    </FormField>

                    <FormField
                      label="Technical Domain / Expertise"
                      required
                      helper="Your primary area of technical expertise."
                    >
                      <input
                        type="text"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        required
                        placeholder="Enter technical domain (e.g., CleanTech, FinTech)"
                        className={inputCls}
                      />
                    </FormField>
                  </div>

                  <FormField
                    label="Organization / Evaluation Panel"
                    helper="Name of the institution or panel you represent as an empanelled evaluator."
                  >
                    <input
                      type="text"
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      placeholder="Enter organization or evaluation panel name"
                      className={inputCls}
                    />
                  </FormField>
                </>
              )}

              {/* ── ADMIN FIELDS ── */}
              {role === 'admin' && (
                <>
                  <FormField
                    label="MSInS Secretariat Authorization Token"
                    required
                    helper="The administrative access key issued by the MSInS Director General's office. Keep this confidential."
                  >
                    <input
                      type="password"
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                      required
                      placeholder="Enter MSInS administrative authorization key"
                      className={`${inputCls} font-mono`}
                    />
                  </FormField>

                  <FormField
                    label="MSInS Officer Designation"
                    helper="Your position within the MSInS Secretariat."
                  >
                    <select className={inputCls}>
                      <option value="">Select designation</option>
                      <option>Director General</option>
                      <option>Joint Director</option>
                      <option>Deputy Director</option>
                      <option>Programme Officer</option>
                      <option>Nodal Officer</option>
                    </select>
                  </FormField>
                </>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={verifying}
                className="w-full text-white font-bold py-3 rounded-lg transition-all shadow-md focus-ring flex items-center justify-center gap-2 mt-2 cursor-pointer text-xs"
                style={{ backgroundColor: theme.accent, opacity: verifying ? 0.7 : 1 }}
              >
                {verifying ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <span>Verify & Proceed to {theme.portalLabel} →</span>
                )}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => navigate('/role-selection')}
                  className="text-gray-500 hover:text-navy-950 text-[11px] font-semibold underline"
                >
                  ← Change Role
                </button>
              </div>

            </form>
          )}
        </div>
      </main>
    </div>
  );
}
