import React from 'react';

export default function StepProgress({ steps, currentIndex }) {
  return (
    <div className="step-progress-container">
      {steps.map((step, i) => {
        const isCompleted = i < currentIndex;
        const isActive = i === currentIndex;
        return (
          <React.Fragment key={step}>
            <div className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <div className="step-circle">
                {isCompleted ? '✓' : i + 1}
              </div>
              <span className="step-label">{step}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 -mt-4 transition-colors ${
                  isCompleted ? 'bg-fiik-green' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
