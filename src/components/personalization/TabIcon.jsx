// Small line icons shown above each tab label. Stroke-based so they inherit
// the tab's text colour.
const PATHS = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  exchange: (
    <>
      <path d="M5.5 9A7 7 0 0 1 18 7.5" />
      <path d="M18.5 4v3.8h-3.8" />
      <path d="M18.5 15A7 7 0 0 1 6 16.5" />
      <path d="M5.5 20v-3.8h3.8" />
      <path d="M12 8.5v7M13.8 10.2c-.4-.6-1-.9-1.8-.9-1 0-1.7.5-1.7 1.3 0 1.9 3.6.9 3.6 2.9 0 .8-.8 1.3-1.9 1.3-.8 0-1.5-.3-1.9-.9" />
    </>
  ),
  tools: (
    <>
      <path d="m4 20 7-7" />
      <path d="M14.5 4.5a3.5 3.5 0 0 0 4.9 4.9l-2.6-.4-.4-2.6-1.9-1.9Z" />
      <path d="m13 11 7 7.5-1.5 1.5L11 13" />
      <path d="M4 4l3 1 2 2-2 2-2-2-1-3Z" />
    </>
  ),
  compare: (
    <>
      <rect x="3.5" y="4.5" width="7.5" height="15" rx="1" />
      <rect x="13" y="4.5" width="7.5" height="15" rx="1" />
      <path d="M5.8 9h3M5.8 12h3M15.3 12h3M15.3 15h3" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="m7 15 4-4 3 3 5.5-6" />
    </>
  ),
  bolt: <path d="M13.5 3 6 13.5h5.5L10 21l8-11h-5.5L13.5 3Z" fill="currentColor" />,
  badge: (
    <>
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="m9 14.5-1.5 6 4.5-2.3 4.5 2.3-1.5-6" />
    </>
  ),
  code: <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M13.5 5l-3 14" />,
  support: (
    <>
      <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" />
      <rect x="3.5" y="13" width="3.5" height="5.5" rx="1.2" />
      <rect x="17" y="13" width="3.5" height="5.5" rx="1.2" />
      <path d="M19 18.5c0 1.4-1.6 2.5-4.5 2.5H13" />
    </>
  ),
}

export default function TabIcon({ name, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name] ?? PATHS.search}
    </svg>
  )
}
