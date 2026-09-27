import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatusBadge from '../components/StatusBadge';
import { activeMilestone, uploadedEvidence, fileTypeIcons } from '../data/mockData';

const SUPPORTED_TYPES = ['PDF', 'DOC', 'XLS/XLSX', 'JPG', 'PNG', 'MP4', 'ZIP'];

export default function EvidenceSubmission() {
  const [files, setFiles] = useState(uploadedEvidence);
  const [remarks, setRemarks] = useState('');

  function handleMockUpload() {
    const nextId = files.length ? Math.max(...files.map((f) => f.id)) + 1 : 1;
    setFiles([
      ...files,
      {
        id: nextId,
        name: `Additional_Evidence_${nextId}.pdf`,
        type: 'PDF',
        size: '1.2 MB',
        uploaded: 'Just now',
        status: 'Uploaded',
      },
    ]);
  }

  function handleRemove(id) {
    setFiles(files.filter((f) => f.id !== id));
  }

  return (
    <div className="app-shell">
      <Header role="Startup" backTo="/execution" />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          <div className="module-note">
            Evidence submission is performed by the startup. FIIK captures and organizes the
            evidence — the department and evaluator carry out the actual review.
          </div>
          <div className="page">
            <div className="page-header">
              <div>
                <h1 className="page-title">
                  Submit Evidence — Milestone {activeMilestone.id}
                </h1>
                <p className="page-subtitle">{activeMilestone.name}</p>
              </div>
            </div>

            <div className="card">
              <div className="info-row">
                <span className="k">Milestone</span>
                <span className="v">{activeMilestone.name}</span>
              </div>
              <div className="info-row">
                <span className="k">Description</span>
                <span className="v">{activeMilestone.description}</span>
              </div>
              <div className="info-row">
                <span className="k">Due Date</span>
                <span className="v">{activeMilestone.dueDate}</span>
              </div>
              <div className="info-row">
                <span className="k">Current Status</span>
                <StatusBadge status={activeMilestone.status} />
              </div>
            </div>

            <div className="card section-gap">
              <h3 className="card-title">Upload Evidence Files</h3>
              <div className="upload-zone">
                <div className="icon">📤</div>
                <div style={{ fontWeight: 600, color: 'var(--fiik-ink)', marginBottom: 4 }}>
                  Drag and drop files here, or click to browse
                </div>
                <div>Multiple files can be uploaded</div>
                <div className="file-types">
                  {SUPPORTED_TYPES.map((t) => (
                    <span className="file-type-chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: 16 }}>
                  <button className="btn btn-primary btn-sm" type="button" onClick={handleMockUpload}>
                    Choose Files
                  </button>
                </div>
              </div>

              <ul className="guidance-list" style={{ marginTop: 16 }}>
                <li>Upload clear and verifiable documents.</li>
                <li>Include geo-tagged photo or video evidence where applicable.</li>
                <li>Share performance data and analytics.</li>
                <li>Provide relevant approval or reference documents.</li>
              </ul>
            </div>

            <div className="card section-gap">
              <h3 className="card-title">Uploaded Evidence ({files.length})</h3>
              {files.length === 0 && (
                <p style={{ fontSize: 13, color: 'var(--fiik-ink-soft)' }}>
                  No evidence uploaded yet.
                </p>
              )}
              {files.map((f) => (
                <div className="evidence-file-row" key={f.id}>
                  <div className="file-icon">{fileTypeIcons[f.type] || '📄'}</div>
                  <div>
                    <div className="file-name">{f.name}</div>
                    <div className="file-meta">
                      {f.type} · {f.size} · Uploaded {f.uploaded}
                    </div>
                  </div>
                  <StatusBadge status={f.status} />
                  <button className="btn btn-ghost btn-sm" type="button" onClick={() => handleRemove(f.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="card section-gap">
              <h3 className="card-title">Add Remarks</h3>
              <textarea
                rows={4}
                placeholder="Add any notes for the department or evaluator reviewing this submission…"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>

            <div className="action-bar">
              <button className="btn btn-outline" type="button">
                Save as Draft
              </button>
              <button className="btn btn-primary" type="button">
                Submit Evidence
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
