import React from 'react';
import StatusBadge from './StatusBadge';

export default function PilotSummaryBar({ pilot, badge }) {
  const safePilot = pilot || {};
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-card mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-extrabold text-navy-950">{safePilot.name || safePilot.title || 'Smart Waste Segregation System'}</h2>
          {badge && <StatusBadge status={badge.label} tone={badge.tone} />}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {safePilot.department || 'Department of Urban Development'} · Startup: <span className="font-semibold text-gray-700">{safePilot.startup || 'GreenGrid Technologies Pvt. Ltd.'}</span>
        </p>
      </div>
      <div className="flex items-center gap-6 text-xs text-gray-500">
        <div>
          <span className="block text-gray-400">Pilot ID</span>
          <span className="font-bold text-navy-950">{safePilot.pilotId || safePilot.id || 'FIIK-PILOT-024'}</span>
        </div>
        <div>
          <span className="block text-gray-400">Duration</span>
          <span className="font-semibold text-gray-700">{safePilot.duration || safePilot.startDate || '12 Aug 2025 – 12 Feb 2026'}</span>
        </div>
      </div>
    </div>
  );
}
