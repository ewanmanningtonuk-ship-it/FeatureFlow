import { useMemo, useState } from 'react'
import SubmissionRow from './SubmissionRow'
import { PRIORITIES, STATUSES } from '../data/mockData'

export default function Dashboard({ submissions, onUpdate }) {
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return submissions
      .filter((s) => statusFilter === 'All' || s.status === statusFilter)
      .filter((s) => priorityFilter === 'All' || s.priority === priorityFilter)
      .filter((s) => {
        const q = query.trim().toLowerCase()
        if (!q) return true
        return (
          s.title.toLowerCase().includes(q) ||
          s.submittedBy.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
  }, [submissions, statusFilter, priorityFilter, query])

  const counts = useMemo(() => {
    return STATUSES.reduce(
      (acc, status) => ({ ...acc, [status]: submissions.filter((s) => s.status === status).length }),
      {},
    )
  }, [submissions])

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">PM Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Review submissions, respond, and update their status.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATUSES.map((status) => (
          <div key={status} className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-medium text-slate-500">{status}</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">{counts[status] ?? 0}</p>
          </div>
        ))}
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, requester, or ID..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:max-w-xs"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All statuses</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All priorities</option>
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-8 text-center text-sm text-slate-500">
            No submissions match the current filters.
          </div>
        )}
        {filtered.map((submission) => (
          <SubmissionRow key={submission.id} submission={submission} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  )
}
