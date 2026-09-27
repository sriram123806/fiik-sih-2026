import React from 'react';
import { usePilot } from '../context/PilotContext';

export default function PilotProgressChart() {
  const { milestones } = usePilot();
  const safeMilestones = Array.isArray(milestones) ? milestones : [];

  // Map milestones to chart data points over time
  const points = safeMilestones.map((m, idx) => {
    const total = safeMilestones.length || 5;
    const targetPct = Math.round(((idx + 1) / total) * 100);
    
    // Status completion state
    let isCompleted = m.status === 'Completed' || m.completed === true;
    let isInProgress = m.status === 'In Progress';
    let progressVal = isCompleted ? targetPct : isInProgress ? Math.round(targetPct - (100 / total) * 0.4) : 0;

    // Timeline label extraction
    const dateLabel = m.timeline ? m.timeline.split('–')[1] || m.timeline.split('-')[1] || m.timeline : `M${m.id}`;

    return {
      id: m.id,
      name: m.name,
      timeline: m.timeline,
      dateLabel: dateLabel.trim(),
      status: m.status,
      isCompleted,
      isInProgress,
      targetPct,
      progressVal,
    };
  });

  // Calculate cumulative completion stats
  const completedCount = points.filter((p) => p.isCompleted).length;
  const inProgressCount = points.filter((p) => p.isInProgress).length;
  const totalCount = points.length;
  const overallPct = Math.round((completedCount / totalCount) * 100 + (inProgressCount ? 15 : 0));

  // SVG coordinates setup
  const width = 650;
  const height = 180;
  const paddingX = 50;
  const paddingY = 30;
  const graphWidth = width - paddingX * 2;
  const graphHeight = height - paddingY * 2;

  // Chart coordinates
  const coords = points.map((p, idx) => {
    const x = paddingX + (idx / (points.length - 1 || 1)) * graphWidth;
    // Top is 0% progress (y = paddingY + graphHeight), bottom is 100% progress (y = paddingY)
    const y = paddingY + graphHeight - (p.progressVal / 100) * graphHeight;
    return { ...p, x, y };
  });

  // Path generator for line
  const linePath = coords.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  // Area path generator for gradient background under actual completed line
  const areaPath = coords.length > 0
    ? `${linePath} L ${coords[coords.length - 1].x} ${height - paddingY} L ${coords[0].x} ${height - paddingY} Z`
    : '';

  return (
    <div className="mt-6 pt-5 border-t border-gray-100 bg-gray-50/50 rounded-xl p-5 border border-gray-200/60">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base">📈</span>
            <h4 className="font-extrabold text-navy-950 text-sm">Pilot Execution Progress Chart</h4>
            <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
              Real-time Telemetry
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Graphical milestone velocity tracking over pilot duration ({points[0]?.timeline?.split('–')[0] || '12 Aug 2025'} – {points[points.length - 1]?.dateLabel || '12 Feb 2026'}).
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-gray-700">
            <span className="h-2.5 w-2.5 rounded-full bg-green-600 inline-block" />
            <span>Completed ({completedCount})</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-700">
            <span className="h-2.5 w-2.5 rounded-full bg-fiik-orange inline-block animate-pulse" />
            <span>In Progress ({inProgressCount})</span>
          </div>
          <div className="bg-white border border-gray-200 px-3 py-1 rounded-md text-navy-950 font-bold">
            Progress: <span className="text-fiik-orangeDark">{overallPct}%</span>
          </div>
        </div>
      </div>

      {/* SVG Responsive Progress Line Graph */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px] relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
            <defs>
              {/* Line Gradient */}
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#16A34A" />
                <stop offset="40%" stopColor="#F26A21" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>

              {/* Area Fill Gradient */}
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F26A21" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#16A34A" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 25, 50, 75, 100].map((pct) => {
              const yGrid = paddingY + graphHeight - (pct / 100) * graphHeight;
              return (
                <g key={pct}>
                  <line
                    x1={paddingX}
                    y1={yGrid}
                    x2={width - paddingX}
                    y2={yGrid}
                    stroke="#E2E8F0"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <text x={paddingX - 8} y={yGrid + 4} textAnchor="end" fontSize="10" fill="#9CA3AF">
                    {pct}%
                  </text>
                </g>
              );
            })}

            {/* Shaded area under line */}
            <path d={areaPath} fill="url(#areaGrad)" />

            {/* Progress Trend Line */}
            <path
              d={linePath}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Points and Labels */}
            {coords.map((pt) => {
              const pointColor = pt.isCompleted ? '#16A34A' : pt.isInProgress ? '#F26A21' : '#94A3B8';
              return (
                <g key={pt.id} className="group cursor-pointer">
                  {/* Vertical Guideline */}
                  <line
                    x1={pt.x}
                    y1={paddingY}
                    x2={pt.x}
                    y2={height - paddingY}
                    stroke="#F1F5F9"
                    strokeWidth="1"
                  />

                  {/* Outer Pulsing Ring for In-Progress point */}
                  {pt.isInProgress && (
                    <circle cx={pt.x} cy={pt.y} r="10" fill="#F26A21" opacity="0.2" className="animate-ping" />
                  )}

                  {/* Node Circle */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={pt.isInProgress ? '7' : '6'}
                    fill={pointColor}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="transition-transform duration-200 group-hover:r-8"
                  />

                  {/* Node Status Mark */}
                  {pt.isCompleted && (
                    <text x={pt.x} y={pt.y + 3.5} textAnchor="middle" className="text-[9px] fill-white font-black">
                      ✓
                    </text>
                  )}

                  {/* Milestone Name Top Label */}
                  <text
                    x={pt.x}
                    y={pt.y - 12}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight={pt.isInProgress ? '800' : '600'}
                    fill={pt.isInProgress ? '#C2410C' : pt.isCompleted ? '#111827' : '#9CA3AF'}
                  >
                    M{pt.id}: {pt.name.length > 14 ? pt.name.substring(0, 14) + '…' : pt.name}
                  </text>

                  {/* Date Label Bottom Axis */}
                  <text
                    x={pt.x}
                    y={height - paddingY + 16}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="500"
                    fill="#6B7280"
                  >
                    {pt.dateLabel}
                  </text>

                  {/* Status Badge Label under Axis */}
                  <text
                    x={pt.x}
                    y={height - paddingY + 28}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill={pt.isCompleted ? '#15803D' : pt.isInProgress ? '#EA580C' : '#9CA3AF'}
                  >
                    {pt.status}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
