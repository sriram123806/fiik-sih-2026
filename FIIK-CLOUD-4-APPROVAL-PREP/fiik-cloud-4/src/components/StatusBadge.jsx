const TONE_CLASSES = {
  green: 'bg-status-greenBg text-status-green',
  blue: 'bg-status-blueBg text-status-blue',
  amber: 'bg-status-amberBg text-status-amber',
  purple: 'bg-status-purpleBg text-status-purple',
  teal: 'bg-status-tealBg text-status-teal',
  grey: 'bg-status-greyBg text-status-grey',
}

export default function StatusBadge({ label, tone = 'grey' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${TONE_CLASSES[tone]}`}
    >
      {label}
    </span>
  )
}
