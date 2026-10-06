import { useState } from 'react'
import { PRIORITIES } from '../data/mockData'

const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'Medium',
  justification: '',
  submittedBy: '',
}

export default function SubmissionForm({ onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [confirmation, setConfirmation] = useState(null)

  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function validate() {
    const nextErrors = {}
    if (!form.title.trim()) nextErrors.title = 'Title is required.'
    if (!form.description.trim()) nextErrors.description = 'Description is required.'
    if (!form.justification.trim()) nextErrors.justification = 'Justification is required.'
    if (!form.submittedBy.trim()) nextErrors.submittedBy = 'Your name is required.'
    return nextErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onSubmit(form)
    setForm(EMPTY_FORM)
    setErrors({})
    setConfirmation(`Thanks! Your request has been submitted for review.`)
    window.setTimeout(() => setConfirmation(null), 4000)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Submit a Request</h1>
        <p className="mt-1 text-sm text-slate-500">
          Report a bug or request a new feature. The Product team reviews every submission.
        </p>
      </div>

      {confirmation && (
        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {confirmation}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label htmlFor="submittedBy" className="block text-sm font-medium text-slate-700">
            Your name
          </label>
          <input
            id="submittedBy"
            type="text"
            value={form.submittedBy}
            onChange={handleChange('submittedBy')}
            placeholder="Jane Doe"
            className={`mt-1.5 block w-full rounded-lg border px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.submittedBy ? 'border-red-300' : 'border-slate-300'
            }`}
          />
          {errors.submittedBy && <p className="mt-1 text-xs text-red-600">{errors.submittedBy}</p>}
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={handleChange('title')}
            placeholder="Short summary of the bug or request"
            className={`mt-1.5 block w-full rounded-lg border px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.title ? 'border-red-300' : 'border-slate-300'
            }`}
          />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={handleChange('description')}
            placeholder="What's happening? What did you expect instead?"
            className={`mt-1.5 block w-full rounded-lg border px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.description ? 'border-red-300' : 'border-slate-300'
            }`}
          />
          {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-slate-700">
            Priority
          </label>
          <select
            id="priority"
            value={form.priority}
            onChange={handleChange('priority')}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="justification" className="block text-sm font-medium text-slate-700">
            Justification
          </label>
          <textarea
            id="justification"
            rows={3}
            value={form.justification}
            onChange={handleChange('justification')}
            placeholder="Why does this matter? Who is impacted, and how much?"
            className={`mt-1.5 block w-full rounded-lg border px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.justification ? 'border-red-300' : 'border-slate-300'
            }`}
          />
          {errors.justification && <p className="mt-1 text-xs text-red-600">{errors.justification}</p>}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  )
}
