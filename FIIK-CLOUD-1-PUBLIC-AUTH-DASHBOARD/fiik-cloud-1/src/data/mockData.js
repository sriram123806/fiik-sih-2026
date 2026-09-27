// Mock/local data for the Cloud 1 (Public Entry + Auth + Startup Home) module.
// No real backend, government SSO, or procurement systems are connected here.

export const currentStartup = {
  name: 'Sriram Innovations Pvt. Ltd.',
  contactName: 'Sriram',
  sector: 'CleanTech / IoT'
}

export const summaryCards = [
  { id: 'applications', label: 'Applications Submitted', value: 6 },
  { id: 'active', label: 'Active Pilots', value: 2 },
  { id: 'milestones', label: 'Milestones Completed', value: 9 },
  { id: 'prep', label: 'PREP Generated', value: 1 }
]

export const activePilot = {
  name: 'Smart Waste Segregation System',
  department: 'Department of Urban Development',
  pilotId: 'FIIK-PILOT-024',
  status: 'Evidence Review',
  startDate: '12 Feb 2026',
  expectedEndDate: '30 Sep 2026',
  stages: [
    { key: 'charter', label: 'Pilot Charter', state: 'done' },
    { key: 'baseline', label: 'Baseline', state: 'done' },
    { key: 'execution', label: 'Execution', state: 'done' },
    { key: 'evidence', label: 'Evidence Review', state: 'current' },
    { key: 'approval', label: 'Milestone Approval', state: 'upcoming' },
    { key: 'prep', label: 'PREP', state: 'upcoming' }
  ]
}

export const notifications = [
  {
    id: 1,
    title: 'Department requested clarification on Milestone 3',
    context: 'Department of Urban Development',
    time: '2 hours ago'
  },
  {
    id: 2,
    title: 'Milestone 2 approved by Evaluator',
    context: 'FIIK-PILOT-024',
    time: 'Yesterday'
  },
  {
    id: 3,
    title: 'Evaluator assigned',
    context: 'MSInS — Field Evaluation Unit',
    time: '3 days ago'
  }
]

export const stakeholders = [
  { key: 'startups', label: 'Startups / Innovators', description: 'Apply, execute and evidence pilots end to end.' },
  { key: 'departments', label: 'Government Departments', description: 'Post challenges, review pilots, enable procurement.' },
  { key: 'evaluators', label: 'Evaluators / MSInS', description: 'Validate evidence and field-verify outcomes.' },
  { key: 'procurement', label: 'Procurement Systems (GeM)', description: 'Receive verified, procurement-ready pilot records.' }
]

export const pillars = [
  { key: 'visibility', label: 'Pilot Visibility', description: 'End-to-end tracking of startup pilots across departments.', color: 'orange' },
  { key: 'governance', label: 'Four-Party Governance', description: 'Startup, Department, Evaluator (MSInS) and Procurement in one review loop.', color: 'blue' },
  { key: 'ledger', label: 'Evidence Ledger', description: 'Capture and verify evidence once, reuse it many times.', color: 'green' },
  { key: 'prep', label: 'Procurement Readiness Evidence Passport (PREP)', description: 'A standardised, portable pilot record for procurement.', color: 'purple' },
  { key: 'reuse', label: 'Pilot Reuse', description: 'Verified pilots can be discovered and reused by other departments.', color: 'teal' }
]

export const howItWorks = [
  { key: 'problem', label: 'Problem', description: 'Government departments post real-world challenges.' },
  { key: 'pilot', label: 'Pilot', description: 'Startups apply and execute department-wise pilots.' },
  { key: 'evidence', label: 'Evidence', description: 'Milestones and evidence submitted on FIIK.' },
  { key: 'validation', label: 'Validation', description: 'Evaluated by experts and departments.' },
  { key: 'prep', label: 'PREP', description: 'Generates a reusable pilot performance record.' },
  { key: 'procurement', label: 'Procurement', description: 'Across departments or via GeM for scale-up.' }
]

export const roles = [
  {
    key: 'department',
    label: 'Government Department',
    description: 'Post challenges, review pilots, track progress and enable procurement.',
    cta: 'Continue as Department',
    accent: 'orange',
    implemented: false
  },
  {
    key: 'startup',
    label: 'Startup',
    description: 'Discover opportunities, apply for pilots, submit evidence and track your progress.',
    cta: 'Continue as Startup',
    accent: 'blue',
    implemented: true
  },
  {
    key: 'evaluator',
    label: 'Evaluator (MSInS)',
    description: 'Review evidence, evaluate milestones and validate pilot outcomes.',
    cta: 'Continue as Evaluator',
    accent: 'green',
    implemented: false
  }
]

export const sidebarNav = [
  { key: 'home', label: 'Home', path: '/dashboard', implemented: true },
  { key: 'browse', label: 'Browse Opportunities', path: '/dashboard/browse-opportunities', implemented: false },
  { key: 'applications', label: 'My Applications', path: '/dashboard/my-applications', implemented: false },
  { key: 'pilots', label: 'Active Pilots', path: '/dashboard/active-pilots', implemented: false },
  { key: 'evidence', label: 'Evidence Submission', path: '/dashboard/evidence-submission', implemented: false },
  { key: 'prep', label: 'My PREP', path: '/dashboard/my-prep', implemented: false },
  { key: 'profile', label: 'My Profile', path: '/dashboard/my-profile', implemented: false },
  { key: 'support', label: 'Support', path: '/dashboard/support', implemented: false }
]
