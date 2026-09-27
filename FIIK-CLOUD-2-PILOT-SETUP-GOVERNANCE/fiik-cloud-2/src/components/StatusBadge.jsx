const STYLES = {
  submitted: 'badge-blue',
  under_review: 'badge-amber',
  pending: 'badge-gray',
  approved: 'badge-green',
  returned: 'badge-orange',
  in_progress: 'badge-purple',
};

const TEXT = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  pending: 'Pending',
  approved: 'Approved',
  returned: 'Returned for Revision',
  in_progress: 'In Progress',
};

export default function StatusBadge({ status }) {
  return (
    <span className={'badge ' + (STYLES[status] || 'badge-gray')}>
      <span className="badge-dot" />
      {TEXT[status] || status}
    </span>
  );
}
