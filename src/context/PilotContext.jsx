import React, { createContext, useContext, useState } from 'react';

const PilotContext = createContext(null);

export const CANONICAL_PILOT = {
  id: 'FIIK-PILOT-024',
  pilotId: 'FIIK-PILOT-024',
  name: 'Smart Waste Segregation System',
  title: 'Smart Waste Segregation System',
  startup: 'GreenGrid Technologies Pvt. Ltd.',
  department: 'Department of Urban Development',
  location: 'Pune, Maharashtra',
  startDate: '12 Aug 2025',
  endDate: '12 Feb 2026',
  expectedEndDate: '12 Feb 2026',
  duration: '12 Aug 2025 – 12 Feb 2026',
  status: 'IN_EXECUTION',
  statusLabel: 'In Progress',
  problemStatement: 'Smart waste segregation and collection solution for urban wards with low compliance in source segregation.',
  pilotObjective: 'Validate an IoT-enabled segregation and collection workflow that improves source segregation rates and reduces operational cost across three municipal wards.',
  pilotScope: 'Deployment across 3 wards, 40 smart bins, citizen engagement toolkit, and a department-facing monitoring dashboard.',
  currentMilestone: 'Milestone 2 of 5',
  currentMilestoneLabel: 'Initial Performance Evaluation',
  milestoneStatus: 'Milestone Recommended',
  completionStatus: 'In Progress',
};

export const INITIAL_STAGES = [
  { key: 'registration', label: 'Registration', state: 'done' },
  { key: 'requirement', label: 'Requirement', state: 'done' },
  { key: 'review', label: 'Four-Party Review', state: 'done' },
  { key: 'workorder', label: 'Work Order', state: 'done' },
  { key: 'execution', label: 'Execution', state: 'current' },
  { key: 'evidence', label: 'Evidence Review', state: 'upcoming' },
  { key: 'approval', label: 'Milestone Approval', state: 'upcoming' },
  { key: 'prep', label: 'PREP', state: 'upcoming' },
];

export const INITIAL_MILESTONES = [
  {
    id: 1,
    name: 'Deployment and Installation',
    description: 'Installation of smart bins and system setup at pilot location.',
    timeline: '12 Aug – 12 Sep 2025',
    expectedOutput: 'Deployment report with photos',
    status: 'Completed',
    completed: true,
  },
  {
    id: 2,
    name: 'Initial Performance Evaluation',
    description: 'Assess system performance in real conditions across all deployed pilot sites.',
    timeline: '13 Sep – 10 Oct 2025',
    dueDate: '10 Oct 2025',
    expectedOutput: 'Performance report with segregation accuracy data',
    status: 'In Progress',
    completed: false,
  },
  {
    id: 3,
    name: 'User Feedback and Impact Assessment',
    description: 'Collect feedback from citizens and local authorities.',
    timeline: '11 Oct – 08 Nov 2025',
    expectedOutput: 'Citizen feedback summary and impact metrics',
    status: 'Pending',
    completed: false,
  },
  {
    id: 4,
    name: 'Scale-Readiness Review',
    description: 'Technical audit and infrastructure scalability review with department IT cell.',
    timeline: '09 Nov – 15 Dec 2025',
    expectedOutput: 'Scalability report & architecture sign-off',
    status: 'Pending',
    completed: false,
  },
  {
    id: 5,
    name: 'Final Handover & PREP Compilation',
    description: 'Final evaluation summary, cost-benefit analysis and PREP passport generation.',
    timeline: '16 Dec 2025 – 12 Feb 2026',
    expectedOutput: 'Portable PREP record & scale-up recommendations',
    status: 'Pending',
    completed: false,
  },
];

export const INITIAL_EVIDENCE = [
  {
    id: 1,
    name: 'Site_Deployment_Photos.zip',
    type: 'ZIP',
    size: '18.4 MB',
    uploaded: '24 Sep 2025, 4:12 PM',
    status: 'Uploaded',
  },
  {
    id: 2,
    name: 'Segregation_Accuracy_Report.xlsx',
    type: 'XLSX',
    size: '2.1 MB',
    uploaded: '24 Sep 2025, 4:15 PM',
    status: 'Uploaded',
  },
  {
    id: 3,
    name: 'Ward_Inspection_Video.mp4',
    type: 'MP4',
    size: '64.7 MB',
    uploaded: '25 Sep 2025, 10:02 AM',
    status: 'Uploaded',
  },
  {
    id: 4,
    name: 'Municipal_Officer_Approval.pdf',
    type: 'PDF',
    size: '640 KB',
    uploaded: '25 Sep 2025, 10:05 AM',
    status: 'Uploaded',
  },
];

export function PilotProvider({ children }) {
  const [pilot, setPilot] = useState(CANONICAL_PILOT);
  const [stages, setStages] = useState(INITIAL_STAGES);
  const [milestones, setMilestones] = useState(INITIAL_MILESTONES);
  const [evidence, setEvidence] = useState(INITIAL_EVIDENCE);
  const [activeMilestoneId, setActiveMilestoneId] = useState(2);

  const [fourPartyReview, setFourPartyReview] = useState([
    { party: 'Startup Request', status: 'Submitted', date: '08 Oct 2025, 10:15 AM', state: 'green' },
    { party: 'Government Department', status: 'Approved', date: '10 Oct 2025, 02:30 PM', state: 'green' },
    { party: 'Technical Evaluator', status: 'Recommended', date: '09 Oct 2025, 04:45 PM', state: 'green' },
    { party: 'MSInS / Admin', status: 'Work Order Published', date: '12 Oct 2025, 05:00 PM', state: 'green' },
  ]);

  const addEvidence = (newFile) => {
    if (!newFile) return;
    setEvidence((prev) => [...(prev || []), { ...newFile, id: (prev || []).length + 1 }]);
  };

  const approveMilestone = (milestoneId) => {
    setMilestones((prev) =>
      (prev || []).map((m) =>
        m.id === milestoneId ? { ...m, status: 'Completed', completed: true } : m
      )
    );
    setPilot((prev) => ({
      ...prev,
      milestoneStatus: 'Milestone Approved',
      status: 'MILESTONE_APPROVED',
    }));
  };

  const completeAllMilestones = () => {
    setMilestones((prev) => (prev || []).map((m) => ({ ...m, status: 'Completed', completed: true })));
    setPilot((prev) => ({
      ...prev,
      completionStatus: 'Completed',
      status: 'COMPLETED',
    }));
  };

  return (
    <PilotContext.Provider
      value={{
        pilot: pilot || CANONICAL_PILOT,
        setPilot,
        stages: stages || INITIAL_STAGES,
        setStages,
        milestones: milestones || INITIAL_MILESTONES,
        setMilestones,
        evidence: evidence || INITIAL_EVIDENCE,
        addEvidence,
        activeMilestoneId,
        setActiveMilestoneId,
        fourPartyReview: fourPartyReview || [],
        setFourPartyReview,
        approveMilestone,
        completeAllMilestones,
      }}
    >
      {children}
    </PilotContext.Provider>
  );
}

export function usePilot() {
  const context = useContext(PilotContext);
  if (!context) {
    throw new Error('usePilot must be used within a PilotProvider');
  }
  return context;
}
