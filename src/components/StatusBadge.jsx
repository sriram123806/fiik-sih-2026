import React from 'react';

const STATUS_CONFIGS = {
  // Governance / Standard statuses
  DRAFT: { label: 'Draft', color: 'bg-gray-100 text-gray-700 border-gray-200' },
  UNDER_REVIEW: { label: 'Under Review', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  under_review: { label: 'Under Review', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  REVISION_REQUIRED: { label: 'Revision Required', color: 'bg-red-50 text-red-700 border-red-200' },
  APPROVED: { label: 'Approved', color: 'bg-green-50 text-green-700 border-green-200' },
  approved: { label: 'Approved', color: 'bg-green-50 text-green-700 border-green-200' },
  WORK_ORDER_ISSUED: { label: 'Work Order Issued', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  IN_EXECUTION: { label: 'In Execution', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  EVIDENCE_SUBMITTED: { label: 'Evidence Submitted', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  UNDER_EVALUATION: { label: 'Under Evaluation', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  MILESTONE_APPROVED: { label: 'Milestone Approved', color: 'bg-green-50 text-green-700 border-green-200' },
  PAYMENT_PROCESSING: { label: 'Payment Processing', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  MILESTONE_COMPLETED: { label: 'Milestone Completed', color: 'bg-green-50 text-green-700 border-green-200' },
  PREP_GENERATING: { label: 'PREP Generating', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  COMPLETED: { label: 'Completed', color: 'bg-green-50 text-green-700 border-green-200' },
  completed: { label: 'Completed', color: 'bg-green-50 text-green-700 border-green-200' },
  submitted: { label: 'Submitted', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  pending: { label: 'Pending', color: 'bg-gray-100 text-gray-600 border-gray-200' },
  'In Progress': { label: 'In Progress', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  Completed: { label: 'Completed', color: 'bg-green-50 text-green-700 border-green-200' },
  Pending: { label: 'Pending', color: 'bg-gray-100 text-gray-600 border-gray-200' },
};

export default function StatusBadge({ status, label, tone, color }) {
  const displayLabel = label || STATUS_CONFIGS[status]?.label || status;
  let colorClasses = STATUS_CONFIGS[status]?.color || 'bg-gray-100 text-gray-700 border-gray-200';

  if (tone === 'green' || color === 'green') {
    colorClasses = 'bg-green-50 text-green-700 border-green-200';
  } else if (tone === 'amber' || color === 'amber') {
    colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (tone === 'blue' || color === 'blue') {
    colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
  } else if (tone === 'red' || color === 'red') {
    colorClasses = 'bg-red-50 text-red-700 border-red-200';
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorClasses}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5 opacity-75" />
      {displayLabel}
    </span>
  );
}
