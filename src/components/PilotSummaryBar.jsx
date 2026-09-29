import React from 'react';
import { FiikStatusBadge } from './FiikDesignSystem';

export default function PilotSummaryBar({ pilot, badge }) {
  const safePilot = pilot || {};
  return (
    <div className="bg-white border-2 border-gray-200/90 rounded-2xl p-6 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg sm:text-xl font-black text-[#071A3D] tracking-tight">
            {safePilot.name || safePilot.title || 'Smart Waste Segregation System'}
          </h2>
          {badge && <FiikStatusBadge status={badge.label} tone={badge.tone} />}
        </div>
        <p className="text-xs text-gray-600 mt-1 font-bold">
          🏛️ {safePilot.department || 'Department of Urban Development'} · 🚀 <span className="text-[#071A3D]">{safePilot.startup || 'GreenGrid Technologies Pvt. Ltd.'}</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-6 text-xs text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
        <div>
          <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400">PILOT ID</span>
          <span className="font-black text-[#071A3D] text-xs">{safePilot.pilotId || safePilot.id || 'FIIK-PILOT-024'}</span>
        </div>
        <div className="h-6 w-px bg-gray-200" />
        <div>
          <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400">DURATION</span>
          <span className="font-extrabold text-gray-800 text-xs">{safePilot.duration || safePilot.startDate || '12 Aug 2025 – 12 Feb 2026'}</span>
        </div>
      </div>
    </div>
  );
}
