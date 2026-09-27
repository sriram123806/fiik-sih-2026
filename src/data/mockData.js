// Canonical FIIK Mock Data
// Normalizing mock data across all FIIK modules with true RBAC roles.

export const currentStartup = {
  id: 'STARTUP-024',
  name: 'GreenGrid Technologies Pvt. Ltd.',
  legalEntityType: 'Private Limited Company',
  cin: 'U74999MH2023PTC123456',
  incorporationDate: '14/03/2023',
  pan: 'AAECG1234F',
  address: 'A-101, Innovators Hub, Hinjawadi Phase 2',
  state: 'Maharashtra',
  district: 'Pune',
  pin: '411057',
  website: 'https://www.greengridtech.in',
  industry: 'CleanTech / Waste Management',
  sector: 'Environmental Services',
  contactName: 'Rahul Deshmukh',
  contactDesignation: 'Founder & CEO',
  contactEmail: 'rahul.deshmukh@greengridtech.in',
  contactPhone: '9876543210',
  department: 'Department of Urban Development',
  problemStatement: 'Smart waste segregation and collection solution for urban local bodies to improve recycling rates and reduce landfill waste.',
  verificationStatus: 'Verified by MSInS',
};

export const pilot = {
  id: 'FIIK-PILOT-024',
  pilotId: 'FIIK-PILOT-024',
  name: 'Smart Waste Segregation System',
  title: 'Smart Waste Segregation System',
  department: 'Department of Urban Development',
  startup: 'GreenGrid Technologies Pvt. Ltd.',
  location: 'Pune, Maharashtra',
  status: 'IN_EXECUTION',
  statusLabel: 'In Progress',
  startDate: '12 Aug 2025',
  endDate: '12 Feb 2026',
  expectedEndDate: '12 Feb 2026',
  duration: '12 Aug 2025 – 12 Feb 2026',
  problemStatement: 'Smart waste segregation and collection solution for urban wards with low compliance in source segregation.',
  pilotObjective: 'Validate an IoT-enabled segregation and collection workflow that improves source segregation rates and reduces operational cost across three municipal wards.',
  pilotScope: 'Deployment across 3 wards, 40 smart bins, citizen engagement toolkit, and a department-facing monitoring dashboard.',
  currentMilestone: 'Milestone 2 of 5',
  currentMilestoneLabel: 'Initial Performance Evaluation',
  milestoneStatus: 'Milestone Recommended',
  completionStatus: 'In Progress',
};

export const stakeholders = [
  { key: 'startups', label: 'Startups & Innovators' },
  { key: 'departments', label: 'Government Departments' },
  { key: 'evaluators', label: 'Evaluators (MSInS)' },
  { key: 'procurement', label: 'Procurement Systems (GeM)' },
];

export const pillars = [
  {
    key: 'visibility',
    color: 'orange',
    label: 'Pilot Visibility',
    description: 'End-to-end tracking of startup pilots across government departments.',
  },
  {
    key: 'governance',
    color: 'blue',
    label: 'Four-Party Governance',
    description: 'Startup, Department, Evaluator (MSInS), and Procurement alignment.',
  },
  {
    key: 'ledger',
    color: 'green',
    label: 'Evidence Ledger',
    description: 'Capture and verify milestone evidence once, reuse many times.',
  },
  {
    key: 'prep',
    color: 'purple',
    label: 'Procurement Readiness Evidence Passport (PREP)',
    description: 'Standardized, portable pilot performance record for procurement.',
  },
  {
    key: 'reuse',
    color: 'teal',
    label: 'Pilot Reuse',
    description: 'Verified pilots can be accessed and reused by other departments.',
  },
];

export const howItWorks = [
  { key: 'problem', label: 'Problem', description: 'Government departments post real-world challenges.' },
  { key: 'pilot', label: 'Pilot Proposal', description: 'Startup proposes pilot and baseline plan.' },
  { key: 'review', label: 'Department & Evaluator', description: 'Department reviews, evaluator assesses feasibility.' },
  { key: 'workorder', label: 'MSInS Work Order', description: 'MSInS verifies & publishes official FIIK Work Order.' },
  { key: 'evidence', label: 'Execution & Evidence', description: 'Startup executes & submits milestone evidence.' },
  { key: 'prep', label: 'PREP & Procurement', description: 'PREP generated for direct procurement & GeM scaling.' },
];

export const roles = [
  {
    key: 'startup',
    label: 'Startup Innovator',
    description: 'Propose pilots, execute assigned milestones, upload evidence, and track PREP status.',
    cta: 'Continue as Startup',
    accent: 'blue',
    implemented: true,
  },
  {
    key: 'department',
    label: 'Government Department',
    description: 'Review startup pilot requests, monitor department pilots, and validate outcomes.',
    cta: 'Continue as Department',
    accent: 'orange',
    implemented: true,
  },
  {
    key: 'evaluator',
    label: 'Technical Evaluator (MSInS)',
    description: 'Assess technical feasibility, review milestone evidence, and conduct field visits.',
    cta: 'Continue as Evaluator',
    accent: 'green',
    implemented: true,
  },
  {
    key: 'admin',
    label: 'MSInS Nodal Authority / Admin',
    description: 'Verify startups, issue/publish official FIIK Work Orders, and oversee PREP registry.',
    cta: 'Continue as MSInS Admin',
    accent: 'purple',
    implemented: true,
  },
];

// Role-Specific Navigation Links for RBAC Sidebar
export const sidebarNavByRole = {
  startup: [
    { key: 'home', label: 'Startup Dashboard', path: '/dashboard' },
    { key: 'registration', label: 'Startup Profile & Registration', path: '/registration' },
    { key: 'workorder', label: 'Propose Pilot Request', path: '/work-order' },
    { key: 'governance', label: 'Four-Party Review Status', path: '/four-party-review' },
    { key: 'execution', label: 'Pilot & Milestone Execution', path: '/execution' },
    { key: 'evidence', label: 'Submit Milestone Evidence', path: '/evidence-submission' },
    { key: 'payment', label: 'Payment Status & Invoices', path: '/approval-payment' },
    { key: 'prep', label: 'Completed PREP Passport', path: '/completed-pilot' },
  ],
  department: [
    { key: 'home', label: 'Department Dashboard', path: '/dashboard' },
    { key: 'workorder', label: 'Review Pilot Proposals', path: '/work-order' },
    { key: 'governance', label: 'Four-Party Governance Review', path: '/four-party-review' },
    { key: 'execution', label: 'Monitor Active Pilots', path: '/execution' },
    { key: 'evaluation', label: 'View Technical Evaluations', path: '/field-evaluation' },
    { key: 'payment', label: 'Department Sign-off & Payment', path: '/approval-payment' },
    { key: 'prep', label: 'PREP Registry & Scale-Up Reuse', path: '/completed-pilot' },
  ],
  evaluator: [
    { key: 'home', label: 'Evaluator Dashboard', path: '/dashboard' },
    { key: 'execution', label: 'Assigned Pilots Oversight', path: '/execution' },
    { key: 'evaluation', label: 'Field Evaluation & Evidence Review', path: '/field-evaluation' },
    { key: 'governance', label: 'Technical Review Sign-Off', path: '/four-party-review' },
    { key: 'prep', label: 'Evaluation History & PREP Records', path: '/completed-pilot' },
  ],
  admin: [
    { key: 'home', label: 'MSInS Admin Dashboard', path: '/dashboard' },
    { key: 'registration', label: 'Verify Startup Eligibility', path: '/registration' },
    { key: 'workorder', label: 'Create & Publish Official Work Order', path: '/work-order' },
    { key: 'governance', label: 'Four-Party Final Approval', path: '/four-party-review' },
    { key: 'execution', label: 'System-wide Pilot Oversight', path: '/execution' },
    { key: 'evaluation', label: 'Review Technical Audits', path: '/field-evaluation' },
    { key: 'payment', label: 'Grant & Finance Processing', path: '/approval-payment' },
    { key: 'prepgeneration', label: 'PREP Generation & Publish', path: '/prep-generation' },
    { key: 'prep', label: 'Official PREP Registry', path: '/completed-pilot' },
  ],
};

// Default fallback sidebar nav
export const sidebarNav = sidebarNavByRole.startup;

export const summaryCardsByRole = {
  startup: [
    { id: 1, value: '2', label: 'Applications Submitted' },
    { id: 2, value: '1', label: 'Active Pilot' },
    { id: 3, value: '3', label: 'Milestones Completed' },
    { id: 4, value: '1', label: 'PREP Generated' },
  ],
  department: [
    { id: 1, value: '5', label: 'Department Proposals Received' },
    { id: 2, value: '2', label: 'Active Department Pilots' },
    { id: 3, value: '1', label: 'Pending Dept Sign-off' },
    { id: 4, value: '3', label: 'Proven Solutions for Scale' },
  ],
  evaluator: [
    { id: 1, value: '3', label: 'Pilots Assigned for Evaluation' },
    { id: 2, value: '1', label: 'Pending Field Visit' },
    { id: 3, value: '4', label: 'Evidence Files to Audit' },
    { id: 4, value: '8', label: 'Evaluations Completed' },
  ],
  admin: [
    { id: 1, value: '24', label: 'Registered Startups Verified' },
    { id: 2, value: '6', label: 'Official Work Orders Issued' },
    { id: 3, value: '4', label: 'Pilots In Execution' },
    { id: 4, value: '12', label: 'PREP Passports Published' },
  ],
};

export const notificationsByRole = {
  startup: [
    { id: 1, title: 'Milestone 2 approved by Evaluator', context: 'Initial Performance Evaluation milestone has been approved.', time: '1 hour ago' },
    { id: 2, title: 'Department requested clarification on Milestone 3', context: 'Please share site deployment plan and photographs.', time: '2 hours ago' },
    { id: 3, title: 'Evaluator assigned', context: 'Dr. Ananya Rao has been assigned as technical evaluator for your pilot.', time: '2 days ago' },
  ],
  department: [
    { id: 1, title: 'New Pilot Request Received', context: 'GreenGrid Technologies submitted Smart Waste Segregation System proposal.', time: '30 mins ago' },
    { id: 2, title: 'Evaluator Field Report Submitted', context: 'Dr. Ananya Rao submitted field evaluation report for Ward 12 & 14.', time: '3 hours ago' },
    { id: 3, title: 'Milestone 2 Sign-off Required', context: 'Review Initial Performance Evaluation results to approve payment release.', time: '1 day ago' },
  ],
  evaluator: [
    { id: 1, title: 'New Evidence Submitted for Audit', context: 'GreenGrid Technologies submitted performance analytics for Milestone 2.', time: '1 hour ago' },
    { id: 2, title: 'Field Visit Scheduled', context: 'On-site inspection scheduled at Pune Ward 12 smart bin deployment site.', time: 'Yesterday' },
  ],
  admin: [
    { id: 1, title: 'Work Order Ready for Official Publication', context: 'Department & Evaluator sign-offs complete for FIIK-PILOT-024.', time: '15 mins ago' },
    { id: 2, title: 'Startup DPIIT Registration Verified', context: 'GreenGrid Technologies Pvt. Ltd. verified via DPIIT database.', time: '2 hours ago' },
    { id: 3, title: 'PREP Passport Generation Pending', context: 'Milestone 5 completed for Smart Water Quality Monitoring pilot.', time: '1 day ago' },
  ],
};

export const summaryCards = summaryCardsByRole.startup;
export const notifications = notificationsByRole.startup;

export const legalEntityTypes = [
  'Private Limited Company',
  'Public Limited Company',
  'Limited Liability Partnership (LLP)',
  'Registered Partnership Firm',
  'Sole Proprietorship',
];

export const indianStates = [
  'Maharashtra',
  'Karnataka',
  'Delhi',
  'Tamil Nadu',
  'Telangana',
  'Gujarat',
  'Uttar Pradesh',
  'West Bengal',
  'Kerala',
  'Rajasthan',
];

export const sectors = [
  'CleanTech / Waste Management',
  'Urban Governance & Smart Cities',
  'Healthcare & MedTech',
  'Agriculture & AgTech',
  'Education & EdTech',
  'E-Governance & IT',
  'Mobility & Transportation',
];

export const recognitionTypes = [
  { id: 'dpiit', label: 'DPIIT Recognition Number' },
  { id: 'msins', label: 'MSInS Startup ID' },
  { id: 'udyam', label: 'Udyam Registration Number' },
];

export function founderTemplate() {
  return {
    id: Date.now() + Math.random(),
    name: '',
    din: '',
    email: '',
    phone: '',
    shareholding: '',
  };
}

export function workOrderMilestoneTemplate() {
  return {
    id: Date.now() + Math.random(),
    name: '',
    timeline: '',
    expectedOutput: '',
    status: 'Pending',
  };
}

export const fourPartyStages = [
  {
    key: 'startup',
    label: '1. Startup Request',
    status: 'submitted',
    reviewer: 'GreenGrid Technologies',
    note: 'Proposal and baseline metrics submitted by startup.',
  },
  {
    key: 'dept',
    label: '2. Department Review',
    status: 'approved',
    reviewer: 'Dept. of Urban Development',
    note: 'Department reviewed problem fit & location readiness.',
  },
  {
    key: 'evaluator',
    label: '3. Evaluator Technical Review',
    status: 'approved',
    reviewer: 'Dr. Ananya Rao (MSInS Expert)',
    note: 'Technical feasibility and milestone design recommended.',
  },
  {
    key: 'msins',
    label: '4. MSInS Official Work Order',
    status: 'approved',
    reviewer: 'MSInS Nodal Authority',
    note: 'Official FIIK Work Order template issued & published.',
  },
];

export const reviewTimeline = [
  { label: 'Startup Submitted Request', date: '28 Sep 2025, 10:15 AM', done: true },
  { label: 'Government Department Approved Requirement', date: '28 Sep 2025, 02:30 PM', done: true },
  { label: 'Evaluator Recommended Technical Feasibility', date: '29 Sep 2025, 11:45 AM', done: true },
  { label: 'MSInS Verified & Published Official Work Order', date: '30 Sep 2025, 04:00 PM', done: true },
  { label: 'Pilot In Execution & Milestone Tracking', date: 'Active Phase', active: true },
];

export const fileTypeIcons = {
  PDF: '📄',
  DOC: '📝',
  XLSX: '📊',
  XLS: '📊',
  JPG: '🖼️',
  PNG: '🖼️',
  MP4: '🎥',
  ZIP: '📦',
};

export const evaluationChecklist = [
  { id: 'c1', label: 'Technical feasibility verified', checked: true },
  { id: 'c2', label: 'Performance data validated', checked: true },
  { id: 'c3', label: 'Field visit completed', checked: true },
  { id: 'c4', label: 'Citizen feedback reviewed', checked: true },
  { id: 'c5', label: 'Recommendations provided', checked: true },
];

export const fourPartyApproval = [
  { party: 'Startup Request', status: 'Submitted', detail: '08 Oct 2025, 10:15 AM', state: 'green' },
  { party: 'Government Department', status: 'Approved', detail: '10 Oct 2025, 02:30 PM', state: 'green' },
  { party: 'Technical Evaluator', status: 'Recommended', detail: '09 Oct 2025, 04:45 PM', state: 'green' },
  { party: 'MSInS / Admin', status: 'Work Order Published', detail: '12 Oct 2025, 05:00 PM', state: 'green' },
];

export const approvalTimeline = [
  { label: 'Evidence Submitted by Startup', date: '08 Oct 2025', state: 'done' },
  { label: 'Evaluator Technical Audit', date: '09 Oct 2025', state: 'done' },
  { label: 'Department Milestone Approval', date: '10 Oct 2025', state: 'done' },
  { label: 'MSInS / Finance Grant Processing', date: 'In progress', state: 'current' },
  { label: 'Payment Release & Milestone Sign-off', date: 'Pending', state: 'pending' },
];

export const paymentDetails = {
  approvedAmount: '₹10,00,000',
  milestone: '2 of 5',
  paymentType: 'Milestone-based',
  expectedReleaseDate: '15 Oct 2025',
};

export const paymentHistory = [
  {
    label: 'Milestone 1 Payment Released',
    amount: '₹10,00,000',
    date: '12 Sep 2025',
    status: 'Released',
  },
];

export const prepProgress = [
  { step: 'Data Compilation', state: 'done' },
  { step: 'Evaluation Summary', state: 'done' },
  { step: 'PREP Generation', state: 'current' },
  { step: 'Review & Publish', state: 'pending' },
];

export const prepDataSources = [
  'Pilot Charter & Baseline Data',
  'Milestone Evidence & Evaluation Reports',
  'Department & Evaluator Approvals',
  'Performance Metrics & Outcomes',
];

export const prepContentIncludes = [
  'Startup and solution details',
  'Problem statement and objectives',
  'Pilot execution summary',
  'Verified outcomes and impact metrics',
  'Department and evaluator validation',
  'Scalability and procurement readiness',
  'Digital verification (QR code)',
];

export const verifiedOutcomes = [
  { label: 'Waste collection efficiency', delta: '+ 45%', direction: 'up' },
  { label: 'Segregation rate', delta: '+ 20%', direction: 'up' },
  { label: 'Operational cost per bin', delta: '- 30%', direction: 'down' },
];

export const recommendation = 'Recommended for procurement';

export const prepMeta = {
  pilotId: 'FIIK-PILOT-024',
  issueDate: '20 Feb 2026',
  status: 'PREP Verified',
};

export const milestonesSummary = [
  { name: 'Deployment and Installation', status: 'Completed' },
  { name: 'Initial Performance Evaluation', status: 'Completed' },
  { name: 'User Feedback and Impact Assessment', status: 'Completed' },
  { name: 'Scale-Readiness Review', status: 'Completed' },
  { name: 'Final Handover & PREP Compilation', status: 'Completed' },
];

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
];
