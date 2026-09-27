import { useState } from 'react';
import { Check, Clock, FileText, History, RotateCcw } from 'lucide-react';
import Layout from '../components/Layout';
import StatusBadge from '../components/StatusBadge';
import { fourPartyStages, reviewTimeline, currentStartup } from '../data/mockData';

export default function FourPartyReview() {
  const [showHistory, setShowHistory] = useState(false);

  const currentStageIdx = fourPartyStages.findIndex((s) => s.status !== 'submitted' && s.status !== 'approved');
  const current = fourPartyStages[currentStageIdx] ?? fourPartyStages[0];
  const nextStage = fourPartyStages[currentStageIdx + 1];

  return (
    <Layout>
      <div className="page-head">
        <div>
          <h1>Four-Party Review</h1>
          <p>Track the review status of your pilot proposal across all stakeholders.</p>
        </div>
        <StatusBadge status={current.status} />
      </div>

      <div className="card" style={{ padding: '22px 26px', marginBottom: 20 }}>
        <div className="proposal-strip">
          <FileText size={18} color="var(--navy)" />
          <div>
            <strong>{currentStartup.problemStatement}</strong>
            <div className="field-hint" style={{ marginTop: 2 }}>{currentStartup.department} · Proposal REQ-2026-0417</div>
          </div>
        </div>
      </div>

      <div className="fp-sequence">
        {fourPartyStages.map((s, i) => (
          <div className="fp-card" key={s.key}>
            <div className={'fp-card-badge ' + s.key}>{i + 1}</div>
            <div className="fp-card-body">
              <div className="fp-card-title">{s.label}</div>
              <StatusBadge status={s.status} />
              <div className="fp-card-reviewer">{s.reviewer}</div>
            </div>
            {i < fourPartyStages.length - 1 && <div className={'fp-connector' + (s.status === 'submitted' || s.status === 'approved' ? ' done' : '')} />}
          </div>
        ))}
      </div>

      <div className="fp-grid">
        <div className="card fp-status-card">
          <h3 className="section-h">Current Status</h3>
          <div className="fp-status-row">
            <span>Current Reviewer</span>
            <strong>{current.reviewer}</strong>
          </div>
          <div className="fp-status-row">
            <span>Next Stage</span>
            <strong>{nextStage ? nextStage.label : 'Work Order Issuance'}</strong>
          </div>
          <div className="fp-status-row">
            <span>Expected Review Window</span>
            <strong><Clock size={13} style={{ verticalAlign: -2, marginRight: 4 }} />3–5 business days</strong>
          </div>
          <p className="section-note" style={{ marginTop: 14 }}>{current.note}</p>

          <div className="step-actions" style={{ borderTop: 'none', paddingTop: 0, marginTop: 18, justifyContent: 'flex-start', gap: 10 }}>
            <a className="btn btn-secondary" href="/work-order"><FileText size={14} /> View Submitted Proposal</a>
            <button className="btn btn-secondary" onClick={() => setShowHistory((v) => !v)}><History size={14} /> View Review History</button>
            <button className="btn btn-primary"><RotateCcw size={14} /> Respond / Revise</button>
          </div>

          {showHistory && (
            <div className="history-panel">
              {reviewTimeline.map((t) => (
                <div className="history-row" key={t.label}>
                  <span className={'history-dot' + (t.done ? ' done' : t.active ? ' active' : '')}>
                    {t.done ? <Check size={11} /> : null}
                  </span>
                  <div>
                    <div className="history-label">{t.label}</div>
                    <div className="field-hint">{t.date}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card" style={{ padding: '22px 24px' }}>
          <h3 className="section-h">Timeline</h3>
          <ol className="timeline-list">
            {reviewTimeline.map((t) => (
              <li key={t.label} className={t.done ? 'done' : t.active ? 'active' : ''}>
                <span className="timeline-dot" />
                <div>
                  <div className="history-label">{t.label}</div>
                  <div className="field-hint">{t.date}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Layout>
  );
}
