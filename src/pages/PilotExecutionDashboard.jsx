import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatusBadge from '../components/StatusBadge';
import PilotSummaryBar from '../components/PilotSummaryBar';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';

export default function PilotExecutionDashboard() {
  const { role } = useAuth();
  const { pilot, stages, milestones } = usePilot();
  const navigate = useNavigate();

  const isStartup = role === 'startup';
  const isDept = role === 'department';
  const isEvaluator = role === 'evaluator';
  const isAdmin = role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header variant="dashboard" backTo="/dashboard" />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 max-w-5xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-navy-950">Pilot &amp; Milestone Execution</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {isStartup ? 'Track milestone progress and submit evidence for evaluator review.' : 'Monitor active pilot execution and milestone deliverables.'}
              </p>
            </div>
            {(isEvaluator || isDept || isAdmin) && (
              <Link to="/field-evaluation" className="text-xs font-semibold text-fiik-blue hover:underline">
                View Evaluator &amp; Field Audit Interface →
              </Link>
            )}
          </div>

          <PilotSummaryBar pilot={pilot} badge={{ label: pilot.statusLabel || 'In Execution', tone: 'amber' }} />

          {/* Role Permission Notice */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6 text-xs text-gray-600">
            <span className="font-bold text-navy-950 block uppercase tracking-wider">EXECUTION ROLE PERMISSION: {role.toUpperCase()}</span>
            <p className="mt-0.5">
              {isStartup && 'You are authorized to execute assigned milestones and upload evidence files for evaluator review.'}
              {isDept && 'Read-only monitoring mode. Department officers can inspect milestone deliverables and progress updates.'}
              {isEvaluator && 'Technical Evaluator mode. You can inspect deliverables and conduct on-site field evaluations.'}
              {isAdmin && 'MSInS Oversight mode. System-level tracking of active pilot execution milestones.'}
            </p>
          </div>

          {/* Milestones List */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-card">
            <h3 className="text-sm font-bold text-navy-950 mb-4 pb-2 border-b border-gray-100">
              Milestones &amp; Work Plan
            </h3>
            <div className="divide-y divide-gray-100">
              {milestones.map((m) => (
                <div key={m.id} className="py-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        m.status === 'Completed'
                          ? 'bg-green-100 text-green-700 border border-green-300'
                          : m.status === 'In Progress'
                          ? 'bg-orange-100 text-orange-700 border border-orange-300'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {m.id}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-navy-950 text-sm">{m.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{m.description}</p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Timeline: <strong className="text-gray-700">{m.timeline}</strong> | Deliverable: <strong className="text-gray-700">{m.expectedOutput}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <StatusBadge status={m.status} />

                    {m.status === 'In Progress' && isStartup && (
                      <button
                        onClick={() => navigate('/evidence-submission')}
                        className="btn btn-primary text-xs"
                      >
                        Submit Evidence →
                      </button>
                    )}

                    {m.status === 'In Progress' && (isEvaluator || isDept || isAdmin) && (
                      <button
                        onClick={() => navigate('/field-evaluation')}
                        className="btn btn-secondary text-xs"
                      >
                        Audit Evidence →
                      </button>
                    )}

                    {m.status === 'Completed' && (
                      <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded border border-green-200">
                        ✓ Verified
                      </span>
                    )}
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
