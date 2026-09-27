import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatusBadge from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';
import { fileTypeIcons } from '../data/mockData';

const SUPPORTED_TYPES = ['PDF', 'DOC', 'XLS/XLSX', 'JPG', 'PNG', 'MP4', 'ZIP'];

export default function EvidenceSubmission() {
  const { role } = useAuth();
  const { evidence, addEvidence, milestones } = usePilot();
  const [remarks, setRemarks] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const isStartup = role === 'startup';
  const safeMilestones = Array.isArray(milestones) && milestones.length > 0 ? milestones : [
    { id: 2, name: 'Initial Performance Evaluation', description: 'Assess system performance in real conditions.', timeline: '13 Sep – 10 Oct 2025', dueDate: '10 Oct 2025', status: 'In Progress', completed: false }
  ];
  const activeMilestone = safeMilestones.find((m) => m.status === 'In Progress') || safeMilestones[1] || safeMilestones[0];

  function handleMockUpload() {
    if (!isStartup) return;
    const safeEvidence = Array.isArray(evidence) ? evidence : [];
    const nextId = safeEvidence.length > 0 ? Math.max(...safeEvidence.map((f) => f.id || 0)) + 1 : 1;
    addEvidence({
      name: `Performance_Report_M2_Addon_${nextId}.pdf`,
      type: 'PDF',
      size: '2.4 MB',
      uploaded: 'Just now',
      status: 'Uploaded',
    });
  }

  function handleSubmitEvidence() {
    if (!isStartup) return;
    setSubmitted(true);
    setTimeout(() => {
      navigate('/field-evaluation');
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header variant="dashboard" backTo="/execution" />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 max-w-5xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-navy-950">
                Submit Evidence — Milestone {activeMilestone?.id || 'N/A'}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">{activeMilestone?.name || 'N/A'}</p>
            </div>
            <StatusBadge status={activeMilestone?.status || 'N/A'} />
          </div>

          {/* RBAC Restriction Notice if not startup */}
          {!isStartup && (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 mb-6 text-xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <strong className="block uppercase tracking-wider text-amber-800">ROLE NOTICE: EVIDENCE UPLOAD IS RESTRICTED TO STARTUPS</strong>
                <p className="text-gray-600 mt-0.5">As a {(role || 'N/A').toUpperCase()}, you are viewing submitted evidence in read-only mode. Use Field Evaluation to audit evidence.</p>
              </div>
              <button
                onClick={() => navigate('/field-evaluation')}
                className="btn btn-primary text-xs bg-fiik-orange hover:bg-fiik-orangeDark"
              >
                Go to Field Evaluation →
              </button>
            </div>
          )}

          {/* Milestone Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-card mb-6 space-y-2 text-xs">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Milestone:</span>
              <strong className="text-navy-950">{activeMilestone?.name || 'N/A'}</strong>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Description:</span>
              <span className="text-gray-700">{activeMilestone?.description || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Due Date:</span>
              <strong className="text-navy-950">{activeMilestone.dueDate || '10 Oct 2025'}</strong>
            </div>
          </div>

          {/* Upload Zone (Enabled ONLY for Startup) */}
          {isStartup && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-card mb-6">
              <h3 className="text-sm font-bold text-navy-950 mb-4 pb-2 border-b border-gray-100">
                Upload Evidence Files (Startup Action)
              </h3>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50/50">
                <span className="text-3xl block mb-2">📤</span>
                <p className="text-xs font-bold text-navy-950">Drag &amp; drop files here, or click to browse</p>
                <p className="text-[11px] text-gray-400 mt-1">Upload clear, verifiable photos, videos, reports or datasets</p>

                <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                  {SUPPORTED_TYPES.map((t) => (
                    <span key={t} className="text-[10px] font-semibold bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                <button onClick={handleMockUpload} type="button" className="btn btn-primary text-xs mt-4">
                  Choose Files to Upload
                </button>
              </div>
            </div>
          )}

          {/* Uploaded Evidence Files List */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-card mb-6">
            <h3 className="text-sm font-bold text-navy-950 mb-4 pb-2 border-b border-gray-100">
              Submitted Milestone Evidence Files ({evidence.length})
            </h3>
            <div className="divide-y divide-gray-100">
              {evidence.map((f) => (
                <div key={f.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{fileTypeIcons[f.type] || '📄'}</span>
                    <div>
                      <p className="font-bold text-navy-950">{f.name}</p>
                      <p className="text-[11px] text-gray-400">
                        {f.type} · {f.size} · Uploaded {f.uploaded}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={f.status || 'Uploaded'} color="blue" />
                </div>
              ))}
            </div>

            {isStartup && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <label className="block text-xs font-bold text-navy-950 mb-1">Startup Submission Remarks</label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Add context or notes for the department/evaluator..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-md p-3 text-xs focus-ring"
                />
              </div>
            )}
          </div>

          {/* Action Bar */}
          {isStartup && (
            <div className="flex items-center justify-between">
              <button onClick={() => navigate('/execution')} className="btn btn-secondary text-xs">
                Save Draft
              </button>
              <button
                onClick={handleSubmitEvidence}
                className={`btn btn-primary text-xs ${submitted ? 'bg-green-600' : ''}`}
              >
                {submitted ? 'Evidence Submitted! Redirecting to Evaluation...' : 'Submit Evidence for Evaluator Audit →'}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
