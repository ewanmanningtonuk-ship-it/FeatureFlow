import { useState } from 'react'
import PriorityBadge from './PriorityBadge'
import StatusBadge from './StatusBadge'
import { STATUSES } from '../data/mockData'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function SubmissionRow({ submission, onUpdate }) {
  const [expanded, setExpanded] = useState(false)
  const [draftStatus, setDraftStatus] = useState(submission.status)
  const [draftResponse, setDraftResponse] = useState(submission.pmResponse)

  const isDirty = draftStatus !== submission.status || draftResponse !== submission.pmResponse

  function handleSave() {
    onUpdate(submission.id, { status: draftStatus, pmResponse: draftResponse })
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-mono">{submission.id}</span>
            <span>&middot;</span>
            <span>{formatDate(submission.submittedAt)}</span>
            <span>&middot;</span>
            <span>{submission.submittedBy}</span>
          </div>
          <p className="mt-0.5 truncate text-sm font-medium text-slate-900">{submission.title}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <PriorityBadge priority={submission.priority} />
          <StatusBadge status={submission.status} />
          <svg
            className={`h-4 w-4 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="space-y-4 border-t border-slate-100 px-5 py-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Description</h3>
            <p className="mt-1 text-sm text-slate-700">{submission.description}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Justification</h3>
            <p className="mt-1 text-sm text-slate-700">{submission.justification}</p>
          </div>

          <div className="grid gap-4 rounded-lg bg-slate-50 p-4 sm:grid-cols-[160px_1fr]">
            <div>
              <label htmlFor={`status-${submission.id}`} className="block text-xs font-medium text-slate-600">
                Status
              </label>
              <select
                id={`status-${submission.id}`}
                value={draftStatus}
                onChange={(e) => setDraftStatus(e.target.value)}
                className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={`response-${submission.id}`} className="block text-xs font-medium text-slate-600">
                PM Response
              </label>
              <textarea
                id={`response-${submission.id}`}
                rows={2}
                value={draftResponse}
                onChange={(e) => setDraftResponse(e.target.value)}
                placeholder="Leave a note for the stakeholder..."
                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
