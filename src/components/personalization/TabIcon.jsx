// Small line icons shown beside each tab label. Stroke-based so they inherit
// the tab's text colour.
const PATHS = {
  flag: (
    <>
      <path d="M5.5 21V4" />
      <path d="M5.5 4.5h11l-2.2 3.8 2.2 3.7h-11" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="m9 14.8 2 2 4-4" />
    </>
  ),
  shoe: (
    <>
      <path d="M3 17.5V9.8c0-.7.6-1.2 1.3-1l3 .9 2.2-3.2c.4-.5 1.1-.6 1.6-.2l1.4 1.1c2.5 2 5.4 3.4 8.5 4 .6.1 1 .7 1 1.3v2.3a2.5 2.5 0 0 1-2.5 2.5H3Z" />
      <path d="M3 14.5h19M10.5 9.5l1.5 1M12.5 8l1.5 1" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10C19.5 15.6 12 20 12 20Z" />
      <path d="M7 12.5h2.5l1.2-2.2 2 4 1.3-1.8H17" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="m7.5 15 3.5-4 3 2.5 5-6" />
    </>
  ),
  stopwatch: (
    <>
      <circle cx="12" cy="13.5" r="7" />
      <path d="M12 13.5V10M10 3h4M12 3v3.5M18.5 7l1.3-1.3" />
    </>
  ),
  drop: (
    <>
      <path d="M12 3.5s-6 6.4-6 10.6a6 6 0 0 0 12 0C18 9.9 12 3.5 12 3.5Z" />
      <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
    </>
  ),
  refresh: (
    <>
      <path d="M19.5 12a7.5 7.5 0 0 1-13.2 4.9" />
      <path d="M4.5 12A7.5 7.5 0 0 1 17.7 7.1" />
      <path d="M18 3.5v4h-4M6 20.5v-4h4" />
    </>
  ),
  dumbbell: (
    <>
      <path d="M8 12h8" />
      <rect x="4.5" y="7.5" width="3.5" height="9" rx="1.2" />
      <rect x="16" y="7.5" width="3.5" height="9" rx="1.2" />
      <path d="M2.5 10v4M21.5 10v4" />
    </>
  ),
}

export default function TabIcon({ name, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name] ?? PATHS.flag}
    </svg>
  )
}
