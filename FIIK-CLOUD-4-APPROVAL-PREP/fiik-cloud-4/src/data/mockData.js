// Mock/local data for the FIIK Cloud 4 module (Approval & Payment,
// PREP Generation, Completed Pilot / Portable PREP Record).
// No backend calls — this stands in for the FastAPI + PostgreSQL
// services described in the shared FIIK foundation doc.

export const pilot = {
  pilotId: 'FIIK-PILOT-024',
  name: 'Smart Waste Segregation System',
  department: 'Department of Urban Development',
  startup: 'GreenGrid Technologies Pvt. Ltd.',
  problemStatement:
    'Smart waste segregation and collection solution for urban wards with low compliance in source segregation.',
  pilotObjective:
    'Validate an IoT-enabled segregation and collection workflow that improves source segregation rates and reduces operational cost across three municipal wards.',
  pilotScope:
    'Deployment across 3 wards, 40 smart bins, citizen engagement toolkit, and a department-facing monitoring dashboard.',
  startDate: '12 Aug 2025',
  endDate: '12 Feb 2026',
  duration: '12 Aug 2025 – 12 Feb 2026',
  currentMilestone: 'Milestone 2 of 5',
  currentMilestoneLabel: 'Initial Performance Evaluation',
  milestoneStatus: 'Milestone Recommended',
  completionStatus: 'Completed',
}

export const fourPartyApproval = [
  {
    party: 'Startup',
    status: 'Submitted',
    detail: '08 Oct 2025, 10:15 AM',
    state: 'green',
  },
  {
    party: 'Government Department',
    status: 'Approved',
    detail: '10 Oct 2025, 02:30 PM',
    state: 'green',
  },
  {
    party: 'Evaluator',
    status: 'Recommended',
    detail: '09 Oct 2025, 04:45 PM',
    state: 'green',
  },
  {
    party: 'Finance / MSInS',
    status: 'In Process',
    detail: 'Expected by 12 Oct 2025',
    state: 'amber',
  },
]

export const approvalTimeline = [
  { label: 'Evidence Submitted', date: '06 Oct', state: 'done' },
  { label: 'Evaluator Review', date: '09 Oct', state: 'done' },
  { label: 'Department Approval', date: '10 Oct', state: 'done' },
  { label: 'Finance Processing', date: 'In progress', state: 'current' },
  { label: 'Payment Release', date: 'Pending', state: 'pending' },
]

export const paymentDetails = {
  approvedAmount: '₹10,00,000',
  milestone: '2 of 5',
  paymentType: 'Milestone-based',
  expectedReleaseDate: '15 Oct 2025',
}

export const paymentHistory = [
  {
    label: 'Milestone 1 Payment Released',
    amount: '₹10,00,000',
    date: '12 Sep 2025',
    status: 'Released',
  },
]

export const prepProgress = [
  { step: 'Data Compilation', state: 'done' },
  { step: 'Evaluation Summary', state: 'done' },
  { step: 'PREP Generation', state: 'current' },
  { step: 'Review & Publish', state: 'pending' },
]

export const prepDataSources = [
  'Pilot Charter & Baseline Data',
  'Milestone Evidence & Evaluation Reports',
  'Department & Evaluator Approvals',
  'Performance Metrics & Outcomes',
]

export const prepContentIncludes = [
  'Startup and solution details',
  'Problem statement and objectives',
  'Pilot execution summary',
  'Verified outcomes and impact metrics',
  'Department and evaluator validation',
  'Scalability and procurement readiness',
  'Digital verification (QR code)',
]

export const verifiedOutcomes = [
  { label: 'Waste collection efficiency', delta: '↑ 45%', direction: 'up' },
  { label: 'Segregation rate', delta: '↑ 20%', direction: 'up' },
  { label: 'Operational cost per bin', delta: '↓ 30%', direction: 'down' },
]

export const recommendation = 'Recommended for procurement'

export const prepMeta = {
  pilotId: 'FIIK-PILOT-024',
  issueDate: '20 Feb 2026',
  status: 'PREP Verified',
}

export const milestonesSummary = [
  { name: 'Deployment and Installation', status: 'Completed' },
  { name: 'Initial Performance Evaluation', status: 'Completed' },
  { name: 'User Feedback and Impact Assessment', status: 'Completed' },
  { name: 'Scale-Readiness Review', status: 'Completed' },
  { name: 'Final Handover & PREP Compilation', status: 'Completed' },
]

export const reuseDepartments = [
  {
    department: 'Department of Sanitation',
    location: 'Coimbatore Municipal Corporation',
    note: 'Reviewing for a 5-ward segregation pilot with similar scope.',
  },
  {
    department: 'Department of Urban Development',
    location: 'Madurai Smart City Mission',
    note: 'Evaluating evidence for a source-segregation procurement track.',
  },
  {
    department: 'MSInS Innovation Cell',
    location: 'State-wide scale-up shortlist',
    note: 'Flagged as a reference pilot for the FY26 procurement pipeline.',
  },
]
