import { useEffect, useId, useRef, useState } from 'react'
import { AUDIENCES } from '../../data/personalizationContent'
import TabIcon from './TabIcon'
import PlaceholderArt from './PlaceholderArt'

const SWIPE_THRESHOLD = 50

function AudienceSelect({ id, value, onChange }) {
  const current = AUDIENCES.find((a) => a.id === value)
  return (
    // The native <select> sits invisibly on top so it keeps native keyboard and
    // mobile picker behaviour, while the pill underneath carries the styling.
    <span className="relative inline-flex w-full items-center justify-between gap-3 rounded-full bg-[#1f4d3a] py-2 pr-4 pl-5 text-[#fbf6ee] shadow-sm transition-colors focus-within:ring-4 focus-within:ring-[#ef6f4f]/35 hover:bg-[#2f6b4f] sm:w-auto">
      <span className="truncate font-medium">{current.label}</span>
      <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
        <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        {AUDIENCES.map((a) => (
          <option key={a.id} value={a.id}>
            {a.label}
          </option>
        ))}
      </select>
    </span>
  )
}

export default function Personalization() {
  const [audienceId, setAudienceId] = useState(AUDIENCES[0].id)
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef([])
  const stripRef = useRef(null)
  const touchStartX = useRef(null)
  const baseId = useId()

  const audience = AUDIENCES.find((a) => a.id === audienceId)
  const tabs = audience.tabs
  const active = tabs[activeIndex]

  function changeAudience(id) {
    setAudienceId(id)
    setActiveIndex(0)
  }

  function selectTab(index, { focus = false } = {}) {
    const next = (index + tabs.length) % tabs.length
    setActiveIndex(next)
    if (focus) tabRefs.current[next]?.focus()
  }

  // Keep the active tab in view when the strip overflows (mobile slider).
  useEffect(() => {
    const strip = stripRef.current
    const tab = tabRefs.current[activeIndex]
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return
    const left = tab.offsetLeft - (activeIndex === 0 ? 0 : 24)
    strip.scrollTo({ left, behavior: 'smooth' })
  }, [activeIndex, audienceId])

  function handleTabKeyDown(e, index) {
    const keys = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    }
    if (!(e.key in keys)) return
    e.preventDefault()
    selectTab(keys[e.key], { focus: true })
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) < SWIPE_THRESHOLD) return
    const next = activeIndex + (dx < 0 ? 1 : -1)
    if (next >= 0 && next < tabs.length) selectTab(next)
  }

  const selectId = `${baseId}-audience`
  const panelId = `${baseId}-panel`

  const position = `${String(activeIndex + 1).padStart(2, '0')} / ${String(tabs.length).padStart(2, '0')}`

  return (
    <section className="personalization mx-auto max-w-[1180px] text-[#1f2a24]">
      <p className="mb-3 text-[13px] font-semibold tracking-[0.14em] text-[#ef6f4f] uppercase">Pacewise coaching</p>
      <h2 className="font-display mb-6 text-[34px] leading-[1.1] font-semibold tracking-[-0.02em] text-[#1f4d3a] sm:text-[48px]">
        Advice that fits your stride
      </h2>

      <div className="mb-8 flex flex-col items-start gap-3 text-[17px] sm:mb-10 sm:flex-row sm:items-center sm:text-[19px]">
        <label htmlFor={selectId}>I’m</label>
        <AudienceSelect id={selectId} value={audienceId} onChange={changeAudience} />
        <span>and I’d like help with:</span>
      </div>

      <div className="rounded-[28px] bg-white p-3 shadow-[0_18px_50px_-24px_rgba(31,77,58,0.35)] sm:p-4">
        <div
          ref={stripRef}
          role="tablist"
          aria-label="Topics"
          className="no-scrollbar flex snap-x snap-mandatory gap-1.5 overflow-x-auto rounded-full bg-[#f4ede2] p-1.5"
        >
          {tabs.map((tab, i) => {
            const selected = i === activeIndex
            return (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[i] = el)}
                id={`${baseId}-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectTab(i)}
                onKeyDown={(e) => handleTabKeyDown(e, i)}
                className={`flex shrink-0 snap-start items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[14px] whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef6f4f] md:flex-1 md:text-[15px] ${
                  selected
                    ? 'bg-[#1f4d3a] font-semibold text-[#fbf6ee] shadow-sm'
                    : 'font-medium text-[#4b5a52] hover:bg-[#e9dfcf] hover:text-[#1f4d3a]'
                }`}
              >
                <TabIcon name={tab.icon} className="h-4 w-4" />
                {tab.title}
              </button>
            )
          })}
        </div>

        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active.id}`}
          tabIndex={0}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef6f4f]"
        >
          <div
            key={`${audienceId}-${active.id}`}
            className="panel-enter grid gap-5 px-1 pt-4 pb-2 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-14 md:p-6 md:pr-10"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-[20px]">
              <PlaceholderArt art={active.art} label={active.title} />
            </div>

            <div className="px-2 md:px-0">
              <p className="mb-2 text-[13px] font-semibold tracking-[0.12em] text-[#ef6f4f] tabular-nums">{position}</p>
              <h3 className="font-display mb-4 text-[26px] leading-tight font-semibold text-[#1f4d3a] md:text-[34px]">
                {active.title}
              </h3>
              <div className="space-y-3 text-[15px] leading-relaxed text-[#3d4a43] md:text-[17px]">
                {active.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#ef6f4f] px-5 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-[#d95a3b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f4d3a]"
              >
                {active.cta}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
