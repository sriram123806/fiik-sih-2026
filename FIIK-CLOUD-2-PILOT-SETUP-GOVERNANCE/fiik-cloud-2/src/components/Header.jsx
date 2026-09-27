import { HelpCircle, Bell, ChevronDown } from 'lucide-react';
import './Header.css';

export default function Header({ userName = 'Startup X', role = 'Startup' }) {
  return (
    <header className="fiik-header">
      <div className="fiik-header-top">
        <div className="gov-id">
          <span className="ashoka">⚖</span>
          <div className="gov-id-text">
            <span>Government of India</span>
            <span className="gov-id-sub">Ministry of Commerce and Industry</span>
          </div>
        </div>
        <div className="fiik-header-actions">
          <button className="icon-btn" title="Help"><HelpCircle size={16} /></button>
          <button className="icon-btn" title="Notifications">
            <Bell size={16} />
            <span className="notif-dot" />
          </button>
          <button className="user-chip">
            <span className="user-avatar">{userName.charAt(0)}</span>
            <span>{userName}</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
      <div className="fiik-header-main">
        <div className="brand-badges">
          <span className="badge-pill startup-india">#startupindia</span>
          <span className="badge-pill azadi">Azadi Ka<br />Amrit Mahotsav</span>
        </div>
        <div className="brand-divider" />
        <div className="brand-name">
          <span className="brand-fiik">FIIK</span>
          <span className="brand-sub">Pilot Intelligence &amp; Evidence Infrastructure</span>
        </div>
        <div className="role-indicator">{role}</div>
      </div>
    </header>
  );
}
