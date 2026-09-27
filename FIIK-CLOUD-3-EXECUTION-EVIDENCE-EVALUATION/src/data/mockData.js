// Mock data for the FIIK Cloud 3 module (Pilot Execution + Evidence + Evaluation).
// This module has no backend of its own — the real FIIK Platform will hand off
// pilot/milestone records from the Four-Party Review module (Cloud 1/2).

export const pilot = {
  id: 'FIIK-PILOT-024',
  name: 'Smart Waste Segregation System',
  department: 'Department of Urban Development',
  startup: 'GreenGrid Technologies Pvt. Ltd.',
  status: 'In Progress',
  startDate: '12 Aug 2025',
  expectedEndDate: '12 Feb 2026',
};

export const pilotStages = [
  { key: 'charter', label: 'Pilot Charter', state: 'done' },
  { key: 'baseline', label: 'Baseline', state: 'done' },
  { key: 'execution', label: 'Execution', state: 'current' },
  { key: 'evidence', label: 'Evidence Review', state: 'upcoming' },
  { key: 'approval', label: 'Milestone Approval', state: 'upcoming' },
  { key: 'prep', label: 'PREP', state: 'upcoming' },
];

export const milestones = [
  {
    id: 1,
    name: 'Deployment and Installation',
    description: 'Installation of smart bins and system setup at pilot location.',
    timeline: '12 Aug – 12 Sep 2025',
    expectedOutput: 'Smart bins operational at all 6 pilot wards',
    status: 'Completed',
  },
  {
    id: 2,
    name: 'Initial Performance Evaluation',
    description: 'Assess system performance in real conditions.',
    timeline: '13 Sep – 10 Oct 2025',
    expectedOutput: 'Performance report with segregation accuracy data',
    status: 'In Progress',
  },
  {
    id: 3,
    name: 'User Feedback and Impact Assessment',
    description: 'Collect feedback from citizens and local authorities.',
    timeline: '11 Oct – 08 Nov 2025',
    expectedOutput: 'Citizen feedback summary and impact metrics',
    status: 'Pending',
  },
];

export const activeMilestone = {
  id: 2,
  name: 'Initial Performance Evaluation',
  description: 'Assess system performance in real conditions across all deployed pilot sites.',
  dueDate: '10 Oct 2025',
  status: 'In Progress',
};

export const uploadedEvidence = [
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

export const fileTypeIcons = {
  PDF: '📄',
  DOC: '📃',
  XLSX: '📊',
  XLS: '📊',
  JPG: '🖼️',
  PNG: '🖼️',
  MP4: '🎬',
  ZIP: '🗂️',
};

export const evaluation = {
  pilot: 'Smart Waste Segregation System',
  department: 'Department of Urban Development',
  pilotId: 'FIIK-PILOT-024',
  milestone: 'Milestone 2 — Initial Performance Evaluation',
  submissionDate: '25 Sep 2025',
  status: 'Under Evaluation',
};

export const evaluationChecklist = [
  { id: 'c1', label: 'Technical feasibility verified', checked: true },
  { id: 'c2', label: 'Performance data validated', checked: true },
  { id: 'c3', label: 'Field visit completed', checked: false },
  { id: 'c4', label: 'Evidence checklist reviewed', checked: false },
  { id: 'c5', label: 'Recommendations provided', checked: false },
];
