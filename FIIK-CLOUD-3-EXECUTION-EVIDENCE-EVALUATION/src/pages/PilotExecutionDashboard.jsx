import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ProgressTracker from '../components/ProgressTracker';
import StatusBadge from '../components/StatusBadge';
import { pilot, pilotStages, milestones } from '../data/mockData';

function MilestoneAction({ milestone }) {
  if (milestone.status === 'Completed') {
    return (
      <button className="btn btn-outline btn-sm" type="button">
        View Details
      </button>
    );
  }
  if (milestone.status === 'In Progress') {
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-ghost btn-sm" type="button">
          Update Progress
        </button>
        <Link className="btn btn-primary btn-sm" to="/evidence-submission">
          Submit Evidence
        </Link>
      </div>
    );
  }
  return (
    <button className="btn btn-outline btn-sm" type="button" disabled>
      Not Yet Started
    </button>
  );
}

// Dev-only shortcut so the evaluator-facing page is reachable while this
// module runs standalone; the real platform will route evaluators here
// directly from their own dashboard.
function EvaluatorPreviewLink() {
  return (
    <Link
      to="/field-evaluation"
      style={{ fontSize: 12, color: 'var(--fiik-ink-soft)', textDecoration: 'underline' }}
    >
      Preview evaluator view →
    </Link>
  );
}

export default function PilotExecutionDashboard() {
  return (
    <div className="app-shell">
      <Header role="Startup" />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          <div className="module-note">
            FIIK Cloud 3 module — Pilot &amp; Milestone Execution, Evidence Submission and Field
            Evaluation. Registration, Requirement and Four-Party Review are handled upstream.
          </div>
          <div className="page">
            <div className="page-header">
              <div>
                <h1 className="page-title">Pilot Execution Dashboard</h1>
                <p className="page-subtitle">
                  Track milestone progress and manage evidence for your active pilot.
                </p>
              </div>
              <EvaluatorPreviewLink />
            </div>

            <div className="card">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 12,
                  marginBottom: 18,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--fiik-ink)' }}>
                      {pilot.name}
                    </h2>
                    <StatusBadge status={pilot.status} />
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--fiik-ink-soft)' }}>
                    {pilot.department}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 24, fontSize: 12.5, color: 'var(--fiik-ink-soft)' }}>
                  <div>
                    <div>Pilot ID</div>
                    <strong style={{ color: 'var(--fiik-ink)' }}>{pilot.id}</strong>
                  </div>
                  <div>
                    <div>Start Date</div>
                    <strong style={{ color: 'var(--fiik-ink)' }}>{pilot.startDate}</strong>
                  </div>
                  <div>
                    <div>Expected End Date</div>
                    <strong style={{ color: 'var(--fiik-ink)' }}>{pilot.expectedEndDate}</strong>
                  </div>
                </div>
              </div>
              <ProgressTracker stages={pilotStages} />
            </div>

            <div className="card section-gap">
              <h3 className="card-title">Milestones &amp; Work Plan</h3>
              {milestones.map((m) => (
                <div className="milestone-row" key={m.id}>
                  <div className="milestone-num">{m.id}</div>
                  <div>
                    <p className="milestone-name">{m.name}</p>
                    <p className="milestone-desc">{m.description}</p>
                    <div className="milestone-meta">
                      <span>
                        Timeline: <strong>{m.timeline}</strong>
                      </span>
                      <span>
                        Expected output: <strong>{m.expectedOutput}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="milestone-actions">
                    <StatusBadge status={m.status} />
                    <MilestoneAction milestone={m} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
