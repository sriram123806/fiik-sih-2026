export default function ProgressTracker({ stages }) {
  return (
    <div className="progress-tracker">
      {stages.map((stage, i) => (
        <div key={stage.key} className={`progress-step ${stage.state}`}>
          <div className="circle">{stage.state === 'done' ? '✓' : i + 1}</div>
          <div className="label">{stage.label}</div>
          {i < stages.length - 1 && <div className="progress-line" />}
        </div>
      ))}
    </div>
  );
}
