const COLOR_MAP = {
  Completed: 'green',
  'In Progress': 'orange',
  Pending: 'grey',
  Uploaded: 'blue',
  Draft: 'grey',
  Approved: 'green',
  'Under Evaluation': 'orange',
  'Needs Revision': 'red',
};

export default function StatusBadge({ status, color }) {
  const resolved = color || COLOR_MAP[status] || 'grey';
  return (
    <span className={`badge badge-${resolved}`}>
      <span className="badge-dot" />
      {status}
    </span>
  );
}
