import { useState } from 'react';
import Header from '../components/Header';
import StatusBadge from '../components/StatusBadge';
import { evaluation, evaluationChecklist, uploadedEvidence, fileTypeIcons } from '../data/mockData';

const TABS = ['Submitted Evidence', 'Evaluation Report', 'Field Visit Details'];

export default function FieldEvaluation() {
  const [tab, setTab] = useState(TABS[0]);
  const [checklist, setChecklist] = useState(evaluationChecklist);
  const [remarks, setRemarks] = useState('');

  function toggleItem(id) {
    setChecklist(checklist.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c)));
  }

  return (
    <div className="app-shell">
      <Header role="Evaluator (MSInS)" backTo="/execution" />
      <div className="app-body">
        <main className="app-main" style={{ width: '100%' }}>
          <div className="module-note">
            FIIK stores and organizes the submitted evidence. The evaluator or department performs
            the actual review, validation and, where required, the field visit.
          </div>
          <div className="page">
            <div className="page-header">
              <div>
                <h1 className="page-title">Field Evaluation by Evaluator (MSInS)</h1>
                <p className="page-subtitle">{evaluation.milestone}</p>
              </div>
              <StatusBadge status={evaluation.status} />
            </div>

            <div className="card">
              <div className="info-row">
                <span className="k">Pilot</span>
                <span className="v">{evaluation.pilot}</span>
              </div>
              <div className="info-row">
                <span className="k">Department</span>
                <span className="v">{evaluation.department}</span>
              </div>
              <div className="info-row">
                <span className="k">Pilot ID</span>
                <span className="v">{evaluation.pilotId}</span>
              </div>
              <div className="info-row">
                <span className="k">Submission Date</span>
                <span className="v">{evaluation.submissionDate}</span>
              </div>
            </div>

            <div className="card section-gap">
              <div className="tab-bar">
                {TABS.map((t) => (
                  <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>
                    {t}
                  </button>
                ))}
              </div>

              {tab === 'Submitted Evidence' && (
                <div>
                  {uploadedEvidence.map((f) => (
                    <div className="evidence-file-row" key={f.id}>
                      <div className="file-icon">{fileTypeIcons[f.type] || '📄'}</div>
                      <div>
                        <div className="file-name">{f.name}</div>
                        <div className="file-meta">
                          {f.type} · {f.size} · Uploaded {f.uploaded}
                        </div>
                      </div>
                      <StatusBadge status={f.status} color="blue" />
                      <button className="btn btn-outline btn-sm" type="button">
                        View
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'Evaluation Report' && (
                <div>
                  <div className="two-col">
                    <div>
                      <label className="field-label">Technical Evaluation</label>
                      <textarea
                        rows={3}
                        placeholder="Summarize the technical assessment of the submitted evidence…"
                      />
                    </div>
                    <div>
                      <label className="field-label">Field Verification (if applicable)</label>
                      <textarea rows={3} placeholder="Notes from field verification, if conducted…" />
                    </div>
                  </div>

                  <div style={{ marginTop: 18 }}>
                    <label className="field-label">Evaluation Checklist</label>
                    {checklist.map((item) => (
                      <label className="checklist-item" key={item.id}>
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleItem(item.id)}
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>

                  <div style={{ marginTop: 18 }}>
                    <label className="field-label">Remarks</label>
                    <textarea
                      rows={3}
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="Add remarks for the startup or department…"
                    />
                  </div>
                </div>
              )}

              {tab === 'Field Visit Details' && (
                <div className="two-col">
                  <div>
                    <div className="info-row">
                      <span className="k">Field visit required</span>
                      <span className="v">Yes</span>
                    </div>
                    <div className="info-row">
                      <span className="k">Scheduled date</span>
                      <span className="v">30 Sep 2025</span>
                    </div>
                    <div className="info-row">
                      <span className="k">Site</span>
                      <span className="v">Ward 7 Collection Point, Pune</span>
                    </div>
                    <div className="info-row">
                      <span className="k">Visit status</span>
                      <StatusBadge status="Pending" />
                    </div>
                  </div>
                  <div>
                    <label className="field-label">Field Visit Notes</label>
                    <textarea rows={5} placeholder="Observations recorded during the field visit…" />
                  </div>
                </div>
              )}
            </div>

            <div className="action-bar">
              <button className="btn btn-outline" type="button">
                Request Clarification
              </button>
              <button className="btn btn-primary" type="button">
                Approve Milestone
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
