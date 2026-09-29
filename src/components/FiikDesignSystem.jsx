import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../utils/roleTheme';

/**
 * FIIK Master Page Shell
 * Level 1 & 5: Manages layout, sticky official header, role-aware sidebar,
 * and high-contrast #F4F6F8 workspace.
 */
export function FiikPageShell({
  children,
  backTo,
  maxWidth = 'max-w-6xl',
  className = '',
  showHeader = true,
  showSidebar = true,
}) {
  const { role } = useAuth();
  const theme = useRoleTheme(role);

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col font-sans text-gray-900 antialiased selection:bg-amber-200">
      {showHeader && <Header variant="dashboard" backTo={backTo} />}
      
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        
        <main className={`flex-1 px-4 sm:px-6 lg:px-8 py-8 ${maxWidth} mx-auto w-full ${className}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

/**
 * FIIK Master Hero Banner
 * Level 1: Deep Navy (#071A3D) surface with tricolor / amber accent,
 * large 28-34px typography, status badges, and optional right KPI / grade slot.
 */
export function FiikHero({
  tag = 'OFFICIAL FIIK WORKFLOW',
  tagColor = 'amber',
  verifiedLabel = 'FIIK Registry (Prototype)',
  title,
  subtitle,
  rightSlot,
  pipelineStep = 0,
  className = '',
}) {
  const { role } = useAuth();
  const theme = useRoleTheme(role);

  const pipelineSteps = [
    { label: '1. Requirement', sub: 'Problem Defined' },
    { label: '2. Work Order', sub: '4-Party Signed' },
    { label: '3. Execution', sub: 'IoT Telemetry Live' },
    { label: '4. Evaluation', sub: 'Field Audit Approved' },
    { label: '5. PREP Passport', sub: 'Scale-Up Ready' },
  ];

  return (
    <div className={`bg-[#071A3D] text-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-amber-400/80 mb-8 relative overflow-hidden ${className}`}>
      {/* Background Ambient Glow */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle, ${theme.accent} 0%, transparent 70%)`,
          marginRight: '-4rem',
          marginTop: '-4rem',
        }}
      />
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-400/10 rounded-full -ml-20 -mt-20 pointer-events-none" />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-2xl min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-300 bg-amber-500/20 border border-amber-400/40 px-3 py-1 rounded-full">
              {tag}
            </span>
            {verifiedLabel && (
              <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/40 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {verifiedLabel}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-300 mt-2.5 font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {rightSlot && <div className="shrink-0 relative z-10">{rightSlot}</div>}
      </div>

      {/* 5-Step Pipeline Progression */}
      {pipelineStep > 0 && (
        <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-bold relative z-10">
          {pipelineSteps.map((step, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < pipelineStep;
            const isCurrent = stepNum === pipelineStep;
            
            return (
              <div
                key={step.label}
                className={`p-2.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-sm ring-2 ring-amber-400/50'
                    : isCompleted
                    ? 'bg-emerald-600/30 border-emerald-400/60 text-emerald-200'
                    : 'bg-white/5 border-white/10 text-gray-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>{step.label}</span>
                  {isCompleted && <span className="text-emerald-300">✓</span>}
                </div>
                <span className="block text-[10px] font-normal opacity-90 mt-0.5">
                  {step.sub}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * FIIK Level 2 Dark Panel
 * High-contrast operational and governance box for telemetry, checklists,
 * and multi-stakeholder decisions.
 */
export function FiikDarkPanel({
  title,
  subtitle,
  badge,
  children,
  className = '',
  roleAccent = false,
}) {
  const { role } = useAuth();
  const theme = useRoleTheme(role);

  return (
    <div
      className={`rounded-2xl p-6 sm:p-7 shadow-lg border text-white mb-6 relative overflow-hidden ${className}`}
      style={{
        backgroundColor: '#0B1E3F',
        borderColor: roleAccent ? theme.accent : 'rgba(255, 255, 255, 0.15)',
      }}
    >
      {(title || badge) && (
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/15">
          <div>
            {title && <h2 className="text-base sm:text-lg font-black text-white">{title}</h2>}
            {subtitle && <p className="text-xs text-gray-300 mt-0.5">{subtitle}</p>}
          </div>
          {badge && <div>{badge}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * FIIK Level 3 Document Card
 * Structured, pure white (#FFFFFF) document-grade card with 2px borders,
 * prominent headers, and high legibility.
 */
export function FiikDocumentCard({
  title,
  subtitle,
  index,
  icon,
  badge,
  action,
  children,
  className = '',
  padding = true,
}) {
  return (
    <div
      className={`bg-white border-2 border-gray-200/90 rounded-2xl shadow-sm mb-6 transition-all hover:border-gray-300 ${
        padding ? 'p-6 sm:p-8' : ''
      } ${className}`}
    >
      {(title || index || icon || badge || action) && (
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-gray-100">
          <div className="flex items-center gap-3 min-w-0">
            {index !== undefined && (
              <span className="h-7 w-7 rounded-xl bg-[#071A3D] text-white text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
                {String(index).padStart(2, '0')}
              </span>
            )}
            {icon && <span className="text-2xl shrink-0">{icon}</span>}
            <div className="min-w-0">
              {title && (
                <h2 className="text-lg sm:text-xl font-black text-[#071A3D] tracking-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xs text-gray-500 mt-0.5 font-medium leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {badge && <div>{badge}</div>}
            {action && <div>{action}</div>}
          </div>
        </div>
      )}

      {children}
    </div>
  );
}

/**
 * FIIK Master Enterprise KPI Metric Block
 * Prominent large numbers (32-40px), bold titles, supporting status,
 * and solid role-accented container.
 */
export function FiikMetricCard({
  icon,
  number,
  title,
  subtitle,
  status,
  actionText = 'View Details →',
  onClick,
  accentColor,
  className = '',
}) {
  const { role } = useAuth();
  const theme = useRoleTheme(role);
  const bgColor = accentColor || theme.accent;

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-6 text-white shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer border border-white/20 hover:scale-[1.01] hover:shadow-xl ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-2xl p-2 rounded-xl bg-white/20 backdrop-blur-xs border border-white/20 shrink-0">
            {icon}
          </span>
          {status && (
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/25 text-white border border-white/20">
              {status}
            </span>
          )}
        </div>

        <div className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-white mb-2">
          {number}
        </div>

        <h3 className="text-base sm:text-lg font-black tracking-tight text-white mb-1">
          {title}
        </h3>

        {subtitle && (
          <p className="text-xs font-semibold text-white/85 leading-snug">
            {subtitle}
          </p>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-white/20 flex items-center justify-between text-xs font-bold text-white/90">
        <span>{actionText}</span>
        <span>→</span>
      </div>
    </div>
  );
}

/**
 * FIIK Master Status Badge
 * Standardized, high-contrast, government-grade status indicator.
 */
export function FiikStatusBadge({ status = '', label, tone }) {
  const s = String(status).toUpperCase();

  let styles = 'bg-gray-100 text-gray-700 border-gray-300';
  let dotColor = 'bg-gray-400';
  let defaultLabel = status;

  if (s.includes('COMPLET') || s.includes('VERIF') || s.includes('APPROVED') || tone === 'green') {
    styles = 'bg-emerald-50 text-emerald-900 border-emerald-300';
    dotColor = 'bg-emerald-500';
    defaultLabel = label || 'Verified & Approved';
  } else if (s.includes('PROGRESS') || s.includes('EXECUTION') || tone === 'orange' || tone === 'amber') {
    styles = 'bg-amber-50 text-amber-900 border-amber-300';
    dotColor = 'bg-amber-500';
    defaultLabel = label || 'In Progress';
  } else if (s.includes('REVIEW') || s.includes('EVALUAT') || tone === 'blue') {
    styles = 'bg-blue-50 text-blue-900 border-blue-300';
    dotColor = 'bg-blue-500';
    defaultLabel = label || 'Under Review';
  } else if (s.includes('PAYMENT') || tone === 'purple') {
    styles = 'bg-purple-50 text-purple-900 border-purple-300';
    dotColor = 'bg-purple-500';
    defaultLabel = label || 'Payment Processing';
  } else if (s.includes('REWORK') || s.includes('REJECT') || tone === 'red') {
    styles = 'bg-rose-50 text-rose-900 border-rose-300';
    dotColor = 'bg-rose-500';
    defaultLabel = label || 'Action Required';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border shadow-2xs ${styles}`}
    >
      <span className={`h-2 w-2 rounded-full ${dotColor}`} />
      {label || defaultLabel}
    </span>
  );
}

/**
 * FIIK Section Heading
 * Standardized 18-22px section heading for inner pages.
 */
export function FiikSectionHeading({ index, title, subtitle, action, className = '' }) {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 mb-4 ${className}`}>
      <div className="flex items-center gap-3">
        {index !== undefined && (
          <span className="h-7 w-7 rounded-xl bg-[#071A3D] text-white text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
            {String(index).padStart(2, '0')}
          </span>
        )}
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#071A3D] tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5 font-medium">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

/**
 * FIIK Role Governance Context Notice
 */
export function FiikRoleNotice({ title, children, action }) {
  const { role } = useAuth();
  const theme = useRoleTheme(role);

  return (
    <div
      className="p-5 rounded-2xl border-2 mb-6 shadow-sm flex flex-wrap items-center justify-between gap-4"
      style={{
        backgroundColor: theme.accentLight,
        borderColor: theme.accentBorder,
      }}
    >
      <div className="flex items-start gap-3.5 max-w-2xl">
        <span className="text-2xl shrink-0 p-2 rounded-xl bg-white shadow-xs border border-black/5">
          {theme.icon}
        </span>
        <div>
          <span
            className="text-xs font-black uppercase tracking-wider block"
            style={{ color: theme.accentText }}
          >
            {title || `ROLE WORKFLOW PERMISSION · ${theme.roleLabel.toUpperCase()}`}
          </span>
          <p className="text-xs font-bold text-gray-700 mt-1 leading-relaxed">{children}</p>
        </div>
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
