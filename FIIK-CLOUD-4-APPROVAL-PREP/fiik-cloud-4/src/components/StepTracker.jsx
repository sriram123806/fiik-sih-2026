// Connected horizontal step tracker. `steps` is an array of
// { label, meta?, state } where state is 'done' | 'current' | 'pending'.
export default function StepTracker({ steps, numbered = false }) {
  return (
    <div className="flex items-start">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center text-center w-28">
            <StepDot state={step.state} index={i + 1} numbered={numbered} />
            <div
              className={`mt-2 text-xs font-medium ${
                step.state === 'pending' ? 'text-gray-400' : 'text-gray-800'
              }`}
            >
              {step.label}
            </div>
            {step.meta && (
              <div className="text-[11px] text-gray-400 mt-0.5">{step.meta}</div>
            )}
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-[2px] flex-1 -mt-6 ${
                step.state === 'done' ? 'bg-status-green' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function StepDot({ state, index, numbered }) {
  const base =
    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0'
  if (state === 'done') {
    return (
      <div className={`${base} bg-status-green text-white`}>
        <CheckIcon />
      </div>
    )
  }
  if (state === 'current') {
    return (
      <div className={`${base} bg-saffron text-white ring-4 ring-saffron/15`}>
        {numbered ? index : <span className="w-2 h-2 rounded-full bg-white" />}
      </div>
    )
  }
  return (
    <div className={`${base} bg-gray-100 text-gray-400 border border-gray-200`}>
      {numbered ? index : ''}
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
