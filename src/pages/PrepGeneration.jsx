import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PilotSummaryBar from '../components/PilotSummaryBar';
import StepTracker from '../components/StepTracker';
import PrepDocument from '../components/PrepDocument';
import { Card, SectionHeading } from '../components/Primitives';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';
import { prepDataSources, prepContentIncludes, prepMeta } from '../data/mockData';

export default function PrepGeneration() {
  const { role } = useAuth();
  const { pilot } = usePilot();
  const navigate = useNavigate();

  const isAdmin = role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header variant="dashboard" backTo="/approval-payment" />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 max-w-5xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-navy-950">PREP Generation &amp; Passport Issuance</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Procurement Readiness Evidence Passport — a standardized, verified, and portable pilot performance record.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Generating PREP
            </span>
          </div>

          <PilotSummaryBar pilot={pilot} badge={{ label: 'PREP In Progress', tone: 'blue' }} />

          {/* Stepper */}
          <Card className="mb-6">
            <StepTracker
              numbered
              steps={[
                { label: 'Data Compilation', state: 'done' },
                { label: 'Evaluation Summary', state: 'done' },
                { label: 'PREP Generation', state: 'current' },
                { label: 'Review & Publish', state: 'pending' },
              ]}
            />
          </Card>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <SectionHeading index={1} title="Verified Data Sources" />
              <ul className="space-y-2.5 text-xs text-gray-700">
                {prepDataSources.map((source) => (
                  <li key={source} className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-[10px]">
                      ✓
                    </span>
                    {source}
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <SectionHeading title="PREP Content Includes" />
              <ul className="space-y-2.5 text-xs text-gray-700">
                {prepContentIncludes.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-[10px]">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* PREP Preview */}
          <Card className="mb-6">
            <SectionHeading index={2} title="PREP Passport Preview" />
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <PrepDocument pilotId={prepMeta.pilotId} issueDate={prepMeta.issueDate} />
              <div className="flex-1 text-xs text-gray-600 leading-relaxed">
                <p className="font-medium">
                  PREP (Procurement Readiness Evidence Passport) is an evidence-backed pilot credential that carries the pilot&rsquo;s identity, scope, verified milestones, evaluator sign-offs, and impact metrics into future government procurement and scale-up workflows.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-bold text-gray-700">
                  <span className="px-2.5 py-1 rounded bg-gray-100 border border-gray-200">Completed Pilot</span>
                  <span>→</span>
                  <span className="px-2.5 py-1 rounded bg-orange-100 text-fiik-orangeDark border border-orange-200">
                    PREP Passport
                  </span>
                  <span>→</span>
                  <span className="px-2.5 py-1 rounded bg-green-100 text-green-800 border border-green-200">
                    GeM / Direct Procurement
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <button
              onClick={() => navigate('/completed-pilot')}
              className={`btn btn-primary text-xs flex items-center gap-2 ${
                isAdmin ? 'bg-purple-800 hover:bg-purple-900' : 'bg-fiik-orange hover:bg-fiik-orangeDark'
              }`}
            >
              {isAdmin ? 'Publish & Issue Official PREP Passport →' : 'View Portable PREP Record →'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
