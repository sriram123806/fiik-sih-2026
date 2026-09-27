import { Link } from 'react-router-dom';

export default function Header({ role = 'Startup', backTo }) {
  return (
    <header className="fiik-header">
      <div className="fiik-header-left">
        <div className="fiik-gov-id">
          <span className="emoji">🏛️</span>
          <span>
            GOVERNMENT OF INDIA
            <br />
            MINISTRY OF COMMERCE AND INDUSTRY
          </span>
        </div>
        <div className="fiik-divider" />
        <div className="fiik-startupindia">#startupindia</div>
        <div className="fiik-divider" />
        <div className="fiik-brand">
          <span className="fiik-brand-name">FIIK</span>
          <span className="fiik-brand-sub">Pilot Intelligence &amp; Evidence Infrastructure</span>
        </div>
      </div>
      <div className="fiik-header-right">
        {backTo && (
          <Link className="back-link" to={backTo}>
            ← Back to Dashboard
          </Link>
        )}
        <span>Help ⌄</span>
        <span className="icon-btn">
          🔔<span className="dot">2</span>
        </span>
        <div className="fiik-user-chip">
          <span className="avatar">S</span>
          {role} ⌄
        </div>
      </div>
    </header>
  );
}
