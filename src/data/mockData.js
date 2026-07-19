export const PRIORITIES = ['Low', 'Medium', 'High', 'Critical']

export const STATUSES = ['New', 'Under Review', 'Approved', 'Declined']

/**
 * @typedef {Object} Submission
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'Low'|'Medium'|'High'|'Critical'} priority
 * @property {string} justification
 * @property {string} submittedBy
 * @property {string} submittedAt - ISO date string
 * @property {'New'|'Under Review'|'Approved'|'Declined'} status
 * @property {string} pmResponse
 */

/** @type {Submission[]} */
export const initialSubmissions = [
  {
    id: 'REQ-1001',
    title: 'Export dashboard data to CSV',
    description:
      'Stakeholders in Finance need to pull raw numbers from the analytics dashboard into spreadsheets for quarterly reporting. Currently they have to manually copy values one at a time.',
    priority: 'Medium',
    justification:
      'Saves the finance team an estimated 4 hours per month and reduces transcription errors in board reports.',
    submittedBy: 'Priya Natarajan',
    submittedAt: '2026-07-10T14:32:00Z',
    status: 'Under Review',
    pmResponse: 'Scoping this now with the data team, will confirm feasibility by end of week.',
  },
  {
    id: 'REQ-1002',
    title: 'Login page throws 500 error on Safari',
    description:
      'Multiple users on Safari 17 report a blank page and a 500 error after submitting valid credentials. Chrome and Firefox are unaffected.',
    priority: 'Critical',
    justification:
      'Blocking a subset of customers from accessing the product entirely. Support ticket volume rising.',
    submittedBy: 'Marcus Webb',
    submittedAt: '2026-07-15T09:05:00Z',
    status: 'New',
    pmResponse: '',
  },
  {
    id: 'REQ-1003',
    title: 'Add dark mode to settings page',
    description:
      'Several users have asked for a dark theme option, particularly the mobile app team who work late hours.',
    priority: 'Low',
    justification:
      'Nice-to-have quality of life improvement, low urgency but recurring request in feedback surveys.',
    submittedBy: 'Aisha Bello',
    submittedAt: '2026-07-08T11:20:00Z',
    status: 'Declined',
    pmResponse: 'Deprioritized for this quarter in favor of the mobile redesign. Revisiting in Q4 planning.',
  },
  {
    id: 'REQ-1004',
    title: 'Bulk-approve pending invoices',
    description:
      'Approvers currently have to open each invoice individually. They want a way to select multiple invoices and approve them in one action.',
    priority: 'High',
    justification:
      'Directly requested by our largest enterprise customer as a condition of renewal.',
    submittedBy: 'Diego Fuentes',
    submittedAt: '2026-07-17T16:45:00Z',
    status: 'Approved',
    pmResponse: 'Approved for next sprint. Engineering estimate is 3 days.',
  },
  {
    id: 'REQ-1005',
    title: 'Search results ignore filters after pagination',
    description:
      'When a user applies filters, then navigates to page 2 of results, the filters silently reset and unfiltered results are shown.',
    priority: 'High',
    justification:
      'Causes users to see incorrect data, which has already led to a mis-reported metric in a client-facing report.',
    submittedBy: 'Priya Natarajan',
    submittedAt: '2026-07-18T08:12:00Z',
    status: 'New',
    pmResponse: '',
  },
]
