import { useState } from 'react'
import SubmissionForm from './components/SubmissionForm'
import Dashboard from './components/Dashboard'
import { initialSubmissions } from './data/mockData'

const VIEWS = {
  SUBMIT: 'submit',
  DASHBOARD: 'dashboard',
}

let nextId = initialSubmissions.length + 1

export default function App() {
  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [view, setView] = useState(VIEWS.SUBMIT)

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
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
              F
            </div>
            <span className="text-base font-semibold text-slate-900">FeatureFlow</span>
          </div>
          <nav className="flex gap-1 rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setView(VIEWS.SUBMIT)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                view === VIEWS.SUBMIT
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Submit Request
            </button>
            <button
              type="button"
              onClick={() => setView(VIEWS.DASHBOARD)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                view === VIEWS.DASHBOARD
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              PM Dashboard
            </button>
          </nav>
        </div>
      </header>

      <main className="px-4 py-10">
        {view === VIEWS.SUBMIT ? (
          <SubmissionForm onSubmit={handleCreate} />
        ) : (
          <Dashboard submissions={submissions} onUpdate={handleUpdate} />
        )}
      </main>
    </div>
  )
}
