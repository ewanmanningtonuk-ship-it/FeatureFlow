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

// Each prototype gets its own tab title and favicon.
const PAGE_META = {
  tracker: { title: 'FeatureFlow — Stakeholder Request & Bug Tracker', icon: '/favicon.svg' },
  personalization: { title: 'Tailor-made content — Personalization prototype', icon: '/favicon-forex.svg' },
}

// A deployment can be pinned to a single prototype with the VITE_PROTOTYPE
// env var (e.g. a dedicated Vercel project for Personalization). The page then
// always shows that view at its root URL, with no hash.
const PINNED_VIEW = Object.values(VIEWS).includes(import.meta.env.VITE_PROTOTYPE)
  ? import.meta.env.VITE_PROTOTYPE
  : null

function viewFromHash() {
  if (PINNED_VIEW) return PINNED_VIEW
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
    if (PINNED_VIEW) return
    window.history.replaceState(null, '', `#${view}`)
  }, [view])

  useEffect(() => {
    const meta = view === VIEWS.PERSONALIZATION ? PAGE_META.personalization : PAGE_META.tracker
    document.title = meta.title
    document.querySelector('link[rel="icon"]')?.setAttribute('href', meta.icon)
  }, [view])

  useEffect(() => {
    const onHashChange = () => setView(viewFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

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

  // The Personalization prototype is shown standalone, without the tracker's
  // header and navigation.
  if (view === VIEWS.PERSONALIZATION) {
    return (
      <main className="min-h-screen bg-white px-4 py-10">
        <Personalization />
      </main>
    )
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
