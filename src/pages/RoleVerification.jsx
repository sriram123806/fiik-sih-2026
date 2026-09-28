import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { roles } from '../data/mockData';

export default function RoleVerification() {
  const { role, verifyRole } = useAuth();
  const navigate = useNavigate();

  const [dpiitNumber, setDpiitNumber] = useState('DPIIT-123456-MH');
  const [deptName, setDeptName] = useState('Department of Urban Development');
  const [officerName, setOfficerName] = useState('Mr. Rahul Deshmukh');
  const [designation, setDesignation] = useState('Deputy Commissioner (Smart Cities)');
  const [email, setEmail] = useState('ud.dept@maha.gov.in');
  const [evaluatorId, setEvaluatorId] = useState('MSINS-EVAL-2026-08');
  const [expertName, setExpertName] = useState('Dr. Ananya Rao');
  const [domain, setDomain] = useState('CleanTech & Waste Management');
  const [adminCode, setAdminCode] = useState('MSINS-ADMIN-SECRETARIAT');

  const [verifying, setVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const currentRoleObj = roles.find((r) => r.key === role) || roles[0];

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerifiedSuccess(true);
      verifyRole(role, { dpiitNumber, deptName, officerName, evaluatorId });
      setTimeout(() => {
        if (role === 'startup') {
          navigate('/registration');
        } else if (role === 'department') {
          navigate('/work-order');
        } else if (role === 'evaluator') {
          navigate('/field-evaluation');
        } else {
          navigate('/dashboard');
        }
      }, 1000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header variant="public" showHomeLink />
      <main className="flex-1 max-w-xl mx-auto px-4 py-12 w-full">
        <div className="bg-white border-2 border-navy-950 rounded-2xl shadow-card p-8">
          
          {/* Header Banner */}
          <div className="text-center mb-6">
            <span className="text-xs font-black uppercase tracking-widest text-fiik-orange bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
              STEP 1: ROLE VERIFICATION GATE
            </span>
            <h1 className="text-xl font-black text-navy-950 mt-3">
              {role === 'startup' && 'Startup Identity & DPIIT Verification'}
              {role === 'department' && 'Government Department Credentials Verification'}
              {role === 'evaluator' && 'Empanelled Evaluator Authorization'}
              {role === 'admin' && 'MSInS Nodal Authority Portal Verification'}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              FIIK establishes verified role identity before granting workflow permissions.
            </p>
          </div>

          {verifiedSuccess ? (
            <div className="bg-green-50 border-2 border-green-300 text-green-900 rounded-xl p-6 text-center animate-in fade-in duration-300">
              <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3 shadow">
                ✓
              </div>
              <h3 className="font-extrabold text-sm text-green-950">Role Verification Successful</h3>
              <p className="text-xs text-green-700 mt-1 font-medium">
                Verified: <strong className="font-bold">{currentRoleObj.label}</strong> credentials validated in FIIK registry.
              </p>
              <p className="text-[11px] text-green-600 mt-3 animate-pulse font-bold">
                Redirecting to sequential workflow workspace...
              </p>
            </div>
          ) : (
            <form onSubmit={handleVerifySubmit} className="space-y-4 text-xs">
              
              {role === 'startup' && (
                <>
                  <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 text-blue-900 leading-relaxed text-[11px]">
                    ℹ️ Startups must be DPIIT recognized or registered under MSInS Innovation Scheme to initiate government pilot requests.
                  </div>
                  <div>
                    <label className="block font-bold text-navy-950 mb-1">DPIIT / MSInS Recognition Number</label>
                    <input
                      type="text"
                      value={dpiitNumber}
                      onChange={(e) => setDpiitNumber(e.target.value)}
                      required
                      placeholder="e.g. DPIIT123456 / MSINS-2026"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus-ring bg-white font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-navy-950 mb-1">Startup Entity Name</label>
                    <input
                      type="text"
                      defaultValue="GreenGrid Technologies Pvt. Ltd."
                      disabled
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-xs bg-gray-100 text-gray-700 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-navy-950 mb-1">Authorized Contact Email</label>
                    <input
                      type="email"
                      defaultValue="rahul.deshmukh@greengridtech.in"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus-ring bg-white"
                    />
                  </div>
                </>
              )}

              {role === 'department' && (
                <>
                  <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-amber-900 leading-relaxed text-[11px]">
                    🏛️ Department officers must authenticate via official government domain (@gov.in / @maha.gov.in).
                  </div>
                  <div>
                    <label className="block font-bold text-navy-950 mb-1">Government Department Name</label>
                    <input
                      type="text"
                      value={deptName}
                      onChange={(e) => setDeptName(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus-ring bg-white font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-navy-950 mb-1">Nodal Officer Name &amp; Designation</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={officerName}
                        onChange={(e) => setOfficerName(e.target.value)}
                        required
                        className="border border-gray-300 rounded-md px-3 py-2 text-xs focus-ring bg-white"
                      />
                      <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        required
                        className="border border-gray-300 rounded-md px-3 py-2 text-xs focus-ring bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-navy-950 mb-1">Official Government Email ID</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus-ring bg-white"
                    />
                  </div>
                </>
              )}

              {role === 'evaluator' && (
                <>
                  <div className="bg-green-50/70 border border-green-200 rounded-lg p-3 text-green-900 leading-relaxed text-[11px]">
                    👥 Empanelled Technical Evaluator credentials are bound to MSInS Expert Panel registry.
                  </div>
                  <div>
                    <label className="block font-bold text-navy-950 mb-1">MSInS Evaluator Panel ID</label>
                    <input
                      type="text"
                      value={evaluatorId}
                      onChange={(e) => setEvaluatorId(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus-ring bg-white font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-navy-950 mb-1">Evaluator Full Name &amp; Domain</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={expertName}
                        onChange={(e) => setExpertName(e.target.value)}
                        required
                        className="border border-gray-300 rounded-md px-3 py-2 text-xs focus-ring bg-white"
                      />
                      <input
                        type="text"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        required
                        className="border border-gray-300 rounded-md px-3 py-2 text-xs focus-ring bg-white"
                      />
                    </div>
                  </div>
                </>
              )}

              {role === 'admin' && (
                <>
                  <div className="bg-purple-50/70 border border-purple-200 rounded-lg p-3 text-purple-900 leading-relaxed text-[11px]">
                    ⚖️ MSInS Nodal Authority Secretarial Access — Verify administrative authorization credentials.
                  </div>
                  <div>
                    <label className="block font-bold text-navy-950 mb-1">Secretariat Access Token / Authorization Key</label>
                    <input
                      type="password"
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus-ring bg-white font-mono"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={verifying}
                className="w-full bg-navy-950 hover:bg-black text-white font-bold py-3 rounded-lg transition-all shadow-md focus-ring flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                {verifying ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Role Credentials...</span>
                  </>
                ) : (
                  <span>Verify Credentials &amp; Proceed →</span>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/role-selection')}
                  className="text-gray-500 hover:text-navy-950 text-[11px] font-semibold underline"
                >
                  ← Change Role Selection
                </button>
              </div>

            </form>
          )}

        </div>
      </main>
    </div>
  );
}
