import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import StatusBadge from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';
import { evaluationChecklist, fileTypeIcons } from '../data/mockData';

const TABS = ['Submitted Evidence', 'Evaluation Report', 'Field Visit Details'];

export default function FieldEvaluation() {
  const { role } = useAuth();
  const [tab, setTab] = useState(TABS[0]);
  const [checklist, setChecklist] = useState(evaluationChecklist);
  const [techEvaluation, setTechEvaluation] = useState(
    'System installed as per plan. Performance metrics indicate 45% collection efficiency gain and 20% segregation compliance in wards 12 & 14.'
  );
  const [fieldNotes, setFieldNotes] = useState('On-site inspection completed on 08 Oct 2025. Smart bin sensors working with live cloud telemetry.');
  const { pilot, evidence, approveMilestone } = usePilot();
  const navigate = useNavigate();

  const isEvaluator = role === 'evaluator';
  const isDept = role === 'department';
  const isAdmin = role === 'admin';
  const isStartup = role === 'startup';

  function toggleItem(id) {
    if (!isEvaluator) return;
    setChecklist(checklist.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c)));
  }

  function handleApprove() {
    approveMilestone(2);
    navigate('/approval-payment');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header variant="dashboard" backTo="/execution" />
      <div className="max-w-6xl mx-auto px-6 py-8 w-full">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-navy-950">
              {isEvaluator
                ? 'Field Evaluation & Audit by Evaluator (MSInS)'
                : isDept
                ? 'Department Review of Technical Evaluation'
                : isAdmin
                ? 'MSInS Technical Audit Inspection'
                : 'Milestone 2 Field Evaluation Status'}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Evaluation of submitted milestone evidence and field verification results.
            </p>
          </div>
          <StatusBadge status="UNDER_EVALUATION" label="Under Evaluation" />
        </div>

        {/* Role Banner */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6 text-xs text-gray-600">
          <span className="font-bold text-navy-950 block uppercase tracking-wider">EVALUATION ROLE PERMISSION: {role.toUpperCase()}</span>
          <p className="mt-0.5">
            {isEvaluator && 'You are authorized to fill in technical audit summary, field visit notes, checklist items, and approve/recommend milestone completion.'}
            {isDept && 'Department Officer View: Inspect evaluator technical checklist and field verification report before milestone sign-off.'}
            {isAdmin && 'MSInS Admin View: Oversight of technical evaluation accuracy and evidence checklist verification.'}
            {isStartup && 'Startup View: Read-only view of evaluator checklist and field audit status for Milestone 2.'}
          </p>
        </div>

        {/* Pilot Info Summary Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-card mb-6">
          <div className="grid sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-gray-400 block font-medium">Pilot:</span>
              <strong className="text-navy-950 font-bold">{pilot.name}</strong>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Department:</span>
              <strong className="text-navy-950 font-bold">{pilot.department}</strong>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Pilot ID:</span>
              <strong className="text-navy-950 font-bold">{pilot.pilotId || pilot.id}</strong>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Milestone:</span>
              <strong className="text-navy-950 font-bold">Milestone 2 — Initial Performance Evaluation</strong>
            </div>
          </div>
        </div>

        {/* Tabs & Content */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-card mb-6">
          <div className="flex border-b border-gray-200 mb-6 gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors ${
                  tab === t
                    ? 'border-fiik-orange text-fiik-orangeDark'
                    : 'border-transparent text-gray-500 hover:text-navy-950'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'Submitted Evidence' && (
            <div className="space-y-3">
              {evidence.map((f) => (
                <div key={f.id} className="p-3 border border-gray-200 rounded-lg flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{fileTypeIcons[f.type] || '📄'}</span>
                    <div>
                      <p className="font-bold text-navy-950">{f.name}</p>
                      <p className="text-[11px] text-gray-400">{f.type} · {f.size} · Uploaded {f.uploaded}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status="Uploaded" color="blue" />
                    <button className="btn btn-outline text-xs py-1 px-3">View File</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'Evaluation Report' && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-950 mb-1">Technical Evaluation Summary</label>
                  <textarea
                    value={techEvaluation}
                    onChange={(e) => setTechEvaluation(e.target.value)}
                    disabled={!isEvaluator}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md p-3 text-xs focus-ring bg-white disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy-950 mb-1">Field Verification Notes</label>
                  <textarea
                    value={fieldNotes}
                    onChange={(e) => setFieldNotes(e.target.value)}
                    disabled={!isEvaluator}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md p-3 text-xs focus-ring bg-white disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-navy-950 mb-3 uppercase tracking-wide">Evaluation Checklist</h4>
                <div className="space-y-2 bg-gray-50 p-4 border border-gray-200 rounded-lg">
                  {checklist.map((item) => (
                    <label key={item.id} className="flex items-center gap-2 text-xs text-gray-800 cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(item.id)}
                        disabled={!isEvaluator}
                        className="rounded text-green-600 focus:ring-green-600 disabled:opacity-75"
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'Field Visit Details' && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-2 text-xs">
              <p><strong>Field Visit Date:</strong> 08 Oct 2025</p>
              <p><strong>Evaluator Name:</strong> Dr. Ananya Rao (Empanelled Technical Expert)</p>
              <p><strong>Location Inspected:</strong> Pune Municipal Wards 12, 14, 15</p>
              <p><strong>Verification Result:</strong> All 40 smart bin sensors verified active with geo-tagged photographic evidence attached.</p>
            </div>
          )}

          {/* Action Bar */}
          <div className="mt-8 pt-4 border-t border-gray-100 flex flex-wrap justify-between items-center gap-3">
            <button onClick={() => navigate('/execution')} className="btn btn-secondary text-xs">
              ← Return to Execution
            </button>

            {isEvaluator && (
              <button onClick={handleApprove} className="btn btn-primary text-xs bg-fiik-green hover:bg-green-700">
                Approve Milestone Evidence &amp; Proceed to Payment →
              </button>
            )}

            {isDept && (
              <button onClick={() => navigate('/approval-payment')} className="btn btn-primary text-xs bg-fiik-orange hover:bg-fiik-orangeDark">
                Confirm Department Milestone Sign-Off →
              </button>
            )}

            {isAdmin && (
              <button onClick={() => navigate('/approval-payment')} className="btn btn-primary text-xs bg-purple-800 hover:bg-purple-900">
                Proceed to Grant &amp; Finance Release →
              </button>
            )}

            {isStartup && (
              <button onClick={() => navigate('/approval-payment')} className="btn btn-primary text-xs bg-navy-950 hover:bg-black">
                Track Payment Status →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
