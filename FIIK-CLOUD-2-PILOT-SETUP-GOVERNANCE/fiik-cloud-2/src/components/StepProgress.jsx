import { Check } from 'lucide-react';
import './StepProgress.css';

export default function StepProgress({ steps, currentIndex }) {
  return (
    <div className="step-progress">
      {steps.map((label, i) => {
        const state = i < currentIndex ? 'done' : i === currentIndex ? 'active' : 'upcoming';
        return (
          <div className="step-node" key={label}>
            <div className="step-line-wrap">
              <div className={'step-circle ' + state}>
                {state === 'done' ? <Check size={14} /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={'step-line ' + (state === 'done' ? 'done' : '')} />}
            </div>
            <span className={'step-label ' + state}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
