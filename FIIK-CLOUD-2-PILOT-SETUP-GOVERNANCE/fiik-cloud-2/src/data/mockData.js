// Mock/local data for the Cloud 2 module (Startup Onboarding + Pilot Setup +
// Governance). No backend calls — this stands in for FastAPI/PostgreSQL data
// until the modules are merged and wired to real services.

export const currentStartup = {
  name: 'Startup X',
  problemStatement: 'Smart Waste Segregation and Collection Solution',
  department: 'Department of Urban Development',
};

export const legalEntityTypes = [
  'Private Limited Company',
  'Limited Liability Partnership (LLP)',
  'One Person Company (OPC)',
  'Partnership Firm',
  'Registered Partnership',
];

export const indianStates = [
  'Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan',
  'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal',
];

export const sectors = [
  'CleanTech', 'AgriTech', 'HealthTech', 'FinTech', 'EdTech',
  'GovTech', 'Mobility', 'Water & Sanitation', 'Waste Management',
];

export const recognitionTypes = [
  'DPIIT Recognition',
  'MSInS Registration (Madhya Pradesh)',
  'Udyam Registration',
  'Other applicable state startup recognition',
];

export const fourPartyStages = [
  {
    key: 'startup',
    label: 'Startup',
    status: 'submitted',
    reviewer: 'Startup X (Self)',
    note: 'Proposal submitted for department requirement REQ-2026-0417.',
  },
  {
    key: 'department',
    label: 'Government Department',
    status: 'under_review',
    reviewer: 'Dept. of Urban Development',
    note: 'Reviewing problem fit and pilot scope.',
  },
  {
    key: 'evaluator',
    label: 'Technical Evaluator',
    status: 'pending',
    reviewer: 'Awaiting department clearance',
    note: 'Will assess technical approach and feasibility.',
  },
  {
    key: 'msins',
    label: 'MSInS',
    status: 'pending',
    reviewer: 'Awaiting evaluator review',
    note: 'Final approval and work order issuance.',
  },
];

export const reviewTimeline = [
  { label: 'Submitted by Startup', date: '05 Sep 2026', done: true },
  { label: 'Department Review', date: 'In progress · Est. 3 days', done: false, active: true },
  { label: 'Evaluator Review', date: 'Pending', done: false },
  { label: 'MSInS Approval', date: 'Pending', done: false },
  { label: 'Work Order Issued', date: 'Pending', done: false },
];

export const workOrderMilestoneTemplate = () => ({
  id: crypto.randomUUID(),
  name: '',
  description: '',
  timeline: '',
  expectedOutput: '',
  evidenceRequired: '',
  trancheReference: '',
});

export const founderTemplate = () => ({
  id: crypto.randomUUID(),
  name: '',
  designation: '',
  details: '',
});
