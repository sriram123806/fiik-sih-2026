import React from 'react';

export function Card({ className = '', children, padding = true }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-card ${padding ? 'p-6' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({ index, title, subtitle }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        {index && (
          <span className="h-6 w-6 rounded-full bg-navy-950 text-white text-xs font-bold flex items-center justify-center">
            {index}
          </span>
        )}
        <h2 className="text-base font-bold text-navy-950">{title}</h2>
      </div>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}

export function Field({ label, value, hint }) {
  return (
    <div>
      <span className="block text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</span>
      <span className="block text-sm font-semibold text-navy-950 mt-0.5">{value || '—'}</span>
      {hint && <span className="block text-[11px] text-gray-400 mt-0.5">{hint}</span>}
    </div>
  );
}
