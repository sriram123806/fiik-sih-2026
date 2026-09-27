import React from 'react';

export default function StepTracker({ steps = [], numbered = false }) {
  return (
    <div className="flex items-center justify-between overflow-x-auto py-2">
      {steps.map((step, i) => {
        const isDone = step.state === 'done';
        const isCurrent = step.state === 'current';
        return (
          <React.Fragment key={step.label || i}>
            <div className="flex flex-col items-center text-center shrink-0 min-w-[100px]">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isDone
                    ? 'bg-green-600 text-white'
                    : isCurrent
                    ? 'bg-fiik-orange text-white ring-4 ring-orange-100'
                    : 'bg-gray-100 text-gray-400 border border-gray-200'
                }`}
              >
                {isDone ? '✓' : numbered ? i + 1 : ''}
              </div>
              <span
                className={`text-[11px] font-semibold mt-2 leading-tight ${
                  isCurrent ? 'text-fiik-orangeDark' : isDone ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
              {step.meta && <span className="text-[10px] text-gray-400 mt-0.5">{step.meta}</span>}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 min-w-[30px] ${
                  isDone ? 'bg-green-600' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
