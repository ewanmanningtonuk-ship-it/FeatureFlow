import { useEffect, useState } from 'react'
import SubmissionForm from './components/SubmissionForm'
import Dashboard from './components/Dashboard'
import Personalization from './components/personalization/Personalization'
import { initialSubmissions } from './data/mockData'

const VIEWS = {
  SUBMIT: 'submit',
  DASHBOARD: 'dashboard',
  PERSONALIZATION: 'personalization',
}

const NAV_ITEMS = [
  { view: VIEWS.SUBMIT, label: 'Submit Request' },
  { view: VIEWS.DASHBOARD, label: 'PM Dashboard' },
  { view: VIEWS.PERSONALIZATION, label: 'Personalization' },
]

function viewFromHash() {
  const hash = window.location.hash.slice(1)
  return Object.values(VIEWS).includes(hash) ? hash : VIEWS.SUBMIT
}

let nextId = initialSubmissions.length + 1

export default function App() {
  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [view, setView] = useState(viewFromHash)

  // Mirror the view in the URL hash so each prototype has a shareable link,
  // e.g. /#personalization.
  useEffect(() => {
    window.history.replaceState(null, '', `#${view}`)
  }, [view])

  function handleCreate(form) {
    const submission = {
      id: `REQ-${1000 + nextId}`,
      ...form,
      submittedAt: new Date().toISOString(),
      status: 'New',
      pmResponse: '',
    }
    nextId += 1
    setSubmissions((prev) => [submission, ...prev])
  }

  function handleUpdate(id, changes) {
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, ...changes } : s)))
  }

  return (
    <div className={`min-h-screen ${view === VIEWS.PERSONALIZATION ? 'bg-white' : 'bg-slate-50'}`}>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-4">
          <div className="flex shrink-0 items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
              F
            </div>
            <span className="hidden text-base font-semibold text-slate-900 sm:inline">FeatureFlow</span>
          </div>
          <nav className="flex gap-1 overflow-x-auto rounded-lg bg-slate-100 p-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.view}
                type="button"
                onClick={() => setView(item.view)}
                className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
                  view === item.view
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="px-4 py-10">
        {view === VIEWS.SUBMIT && <SubmissionForm onSubmit={handleCreate} />}
        {view === VIEWS.DASHBOARD && <Dashboard submissions={submissions} onUpdate={handleUpdate} />}
        {view === VIEWS.PERSONALIZATION && <Personalization />}
      </main>
    </div>
  )
}
