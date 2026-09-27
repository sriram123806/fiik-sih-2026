import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatusBadge from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';
import { reviewTimeline, currentStartup } from '../data/mockData';

export default function FourPartyReview() {
  const { role } = useAuth();
  const [showHistory, setShowHistory] = useState(false);
  const { fourPartyReview, setPilot } = usePilot();
  const navigate = useNavigate();

  const isStartup = role === 'startup';
  const isDept = role === 'department';
  const isEvaluator = role === 'evaluator';
  const isAdmin = role === 'admin';

  const handleApproveAction = () => {
    if (isAdmin) {
      setPilot((prev) => ({
        ...prev,
        status: 'WORK_ORDER_ISSUED',
        statusLabel: 'Work Order Issued & Published',
      }));
      navigate('/execution');
    } else {
      navigate('/execution');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header variant="dashboard" backTo="/dashboard" />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 max-w-5xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-navy-950">Four-Party Governance &amp; Review</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Multi-stakeholder review workflow: Startup Request → Govt Dept → Evaluator → MSInS Work Order Issuance.
              </p>
            </div>
            <StatusBadge status="under_review" label="Under Governance Review" />
          </div>

          {/* Role Governance Banner */}
          <div className="p-4 rounded-xl border mb-6 text-xs bg-white border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-bold text-navy-950 block">ROLE RESPONSIBILITY: {role.toUpperCase()}</span>
              <p className="text-gray-500 mt-0.5">
                {isStartup && 'Your proposal has been submitted. Government department, technical evaluator, and MSInS are reviewing.'}
                {isDept && 'Government Department Review: Verify alignment with municipal requirements and location readiness.'}
                {isEvaluator && 'Technical Evaluator Review: Assess feasibility, baseline metrics, and expected milestone outputs.'}
                {isAdmin && 'MSInS Nodal Authority: Issue and publish the official FIIK Work Order after 4-party sign-offs.'}
              </p>
            </div>
          </div>

          {/* Proposal Summary Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-card mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📄</span>
              <div>
                <h3 className="font-extrabold text-navy-950 text-sm">{currentStartup.problemStatement}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{currentStartup.department} · Proposal REQ-2026-0417</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/work-order')}
              className="text-xs font-semibold text-fiik-orange hover:underline border border-orange-200 bg-orange-50 px-3 py-1.5 rounded-md"
            >
              View Work Order Proposal
            </button>
          </div>

          {/* Four-Party Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {fourPartyReview.map((s, i) => (
              <div key={s.party} className="bg-white border border-gray-200 rounded-xl p-4 shadow-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="h-6 w-6 rounded-full bg-navy-950 text-white font-bold text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    <StatusBadge status={s.status} tone={s.state} />
                  </div>
                  <h4 className="font-extrabold text-navy-950 text-xs mb-1">{s.party}</h4>
                  <p className="text-[11px] text-gray-500 leading-tight">{s.date || s.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Status Details & Actions */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-card mb-6">
            <h3 className="text-sm font-bold text-navy-950 mb-4 pb-2 border-b border-gray-100">Governance Review Actions</h3>

            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={() => navigate('/work-order')} className="btn btn-secondary text-xs">
                📄 View Proposal &amp; Baseline
              </button>

              <button onClick={() => setShowHistory((v) => !v)} className="btn btn-secondary text-xs">
                📜 {showHistory ? 'Hide History' : 'View Review Audit Log'}
              </button>

              {isDept && (
                <button onClick={handleApproveAction} className="btn btn-primary text-xs bg-fiik-orange hover:bg-fiik-orangeDark">
                  ✓ Approve Department Requirement
                </button>
              )}

              {isEvaluator && (
                <button onClick={handleApproveAction} className="btn btn-primary text-xs bg-fiik-green hover:bg-green-700">
                  ✓ Recommend Technical Feasibility
                </button>
              )}

              {isAdmin && (
                <button onClick={handleApproveAction} className="btn btn-primary text-xs bg-purple-800 hover:bg-purple-900">
                  📜 Finalize &amp; Issue Official Work Order →
                </button>
              )}

              {isStartup && (
                <button onClick={handleApproveAction} className="btn btn-primary text-xs bg-navy-950 hover:bg-black">
                  View Pilot Execution Dashboard →
                </button>
              )}
            </div>

            {showHistory && (
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs space-y-3">
                <h4 className="font-bold text-navy-950">Audit &amp; Review History</h4>
                {reviewTimeline.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className={`h-2 w-2 rounded-full ${t.done ? 'bg-green-600' : t.active ? 'bg-fiik-orange' : 'bg-gray-300'}`} />
                    <span className="font-semibold text-gray-800">{t.label}</span>
                    <span className="text-gray-400">({t.date})</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
