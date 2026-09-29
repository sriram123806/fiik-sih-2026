import React from 'react';

export function Card({ className = '', children, padding = true }) {
  return (
    <div
      className={`bg-white border-2 border-gray-200/90 rounded-2xl shadow-sm transition-all hover:border-gray-300 ${
        padding ? 'p-6 sm:p-8' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({ index, title, subtitle, action }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-3 border-b border-gray-100">
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

export function Field({ label, value, hint }) {
  return (
    <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-200/80">
      <span className="block text-[11px] font-black text-gray-400 uppercase tracking-wider">{label}</span>
      <span className="block text-sm font-bold text-[#071A3D] mt-1 break-words">{value || '—'}</span>
      {hint && <span className="block text-[11px] text-gray-500 mt-1 font-medium">{hint}</span>}
    </div>
  );
}
