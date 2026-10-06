const PRIORITY_STYLES = {
  Low: 'bg-slate-100 text-slate-700 ring-slate-600/20',
  Medium: 'bg-sky-100 text-sky-700 ring-sky-600/20',
  High: 'bg-amber-100 text-amber-800 ring-amber-600/20',
  Critical: 'bg-red-100 text-red-700 ring-red-600/20',
}

export default function PriorityBadge({ priority }) {
  const styles = PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.Low

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles}`}
    >
      {priority === 'Critical' && (
        <span className="h-1.5 w-1.5 rounded-full bg-red-600" aria-hidden="true" />
      )}
      {priority}
    </span>
  )
}
