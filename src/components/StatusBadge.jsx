const STATUS_STYLES = {
  New: 'bg-purple-100 text-purple-700 ring-purple-600/20',
  'Under Review': 'bg-amber-100 text-amber-800 ring-amber-600/20',
  Approved: 'bg-emerald-100 text-emerald-700 ring-emerald-600/20',
  Declined: 'bg-slate-100 text-slate-600 ring-slate-600/20',
}

export default function StatusBadge({ status }) {
  const styles = STATUS_STYLES[status] ?? STATUS_STYLES.New

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles}`}
    >
      {status}
    </span>
  )
}
