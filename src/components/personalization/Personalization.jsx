import { useEffect, useId, useRef, useState } from 'react'
import { AUDIENCES } from '../../data/personalizationContent'
import TabIcon from './TabIcon'
import PlaceholderArt from './PlaceholderArt'

const SWIPE_THRESHOLD = 50

function AudienceSelect({ id, value, onChange }) {
  const current = AUDIENCES.find((a) => a.id === value)
  return (
    // The native <select> sits invisibly on top so it keeps native keyboard and
    // mobile picker behaviour, while the span underneath carries the styling.
    <span className="relative inline-flex h-9 w-full items-center justify-between gap-3 rounded-[3px] border border-[#c9c9c9] bg-white pr-2.5 pl-2.5 focus-within:border-[#2e5a9a] focus-within:ring-2 focus-within:ring-[#2e5a9a]/20 sm:w-auto">
      <span className="truncate text-[14px] text-[#1f1f1f] underline decoration-[#1f1f1f] decoration-dotted decoration-1 underline-offset-4">
        {current.label}
      </span>
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-[#555]" aria-hidden="true">
        <path d="m3.5 6 4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="1.4" />
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

  return (
    <section className="personalization mx-auto max-w-[1250px] text-[#1f1f1f]">
      <h2 className="mb-5 text-[32px] leading-tight font-normal tracking-[-0.01em] sm:mb-7 sm:text-[40px]">
        Tailor-made content for you
      </h2>

      <div className="mb-6 flex flex-col items-start gap-2 text-[15px] sm:mb-10 sm:flex-row sm:items-center sm:gap-2">
        <label htmlFor={selectId}>I’m</label>
        <AudienceSelect id={selectId} value={audienceId} onChange={changeAudience} />
        <span>and looking for information on:</span>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#e2e2e4] bg-white shadow-[0_2px_10px_rgba(20,25,40,0.08)] sm:rounded-2xl">
        <div
          ref={stripRef}
          role="tablist"
          aria-label="Topics"
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto bg-[#e9eaee] md:overflow-visible"
        >
          {tabs.map((tab, i) => {
            const selected = i === activeIndex
            // Hide the divider next to the active tab, as it has its own edge.
            const showDivider = i > 0 && !selected && i - 1 !== activeIndex
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
                className={`relative flex min-h-[64px] shrink-0 basis-[54%] snap-start flex-col items-center justify-center gap-1.5 px-3 py-3 text-center transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#2e5a9a] sm:basis-[38%] md:min-h-[110px] md:flex-1 md:basis-0 md:gap-2 md:px-6 md:py-5 ${
                  selected
                    ? 'z-10 rounded-t-xl bg-white text-[#1f1f1f] sm:rounded-t-2xl'
                    : 'text-[#4a4a4f] hover:bg-[#e1e2e8] hover:text-[#1f1f1f]'
                }`}
              >
                {showDivider && (
                  <span aria-hidden="true" className="absolute top-1/4 bottom-1/4 left-0 w-px bg-[#cfd0d6]" />
                )}
                <TabIcon name={tab.icon} className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span
                  className={`text-[12px] leading-snug md:text-[16.5px] ${
                    selected ? 'font-medium' : 'font-normal'
                  }`}
                >
                  {tab.title}
                </span>
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
          className="focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#2e5a9a]"
        >
          <div
            key={`${audienceId}-${active.id}`}
            className="panel-enter grid gap-4 p-3 pb-4 md:grid-cols-2 md:items-center md:gap-16 md:px-12 md:py-12"
          >
            <div className="aspect-[5/3] overflow-hidden rounded-lg md:order-2">
              <PlaceholderArt art={active.art} label={active.title} />
            </div>

            <div className="md:order-1 md:max-w-[530px]">
              <h3 className="mb-3 text-[20px] leading-tight font-normal md:mb-4 md:text-[26px]">{active.title}</h3>
              <div className="space-y-2.5 text-[14px] leading-[1.4] text-[#222] md:text-[16px] md:leading-[1.3]">
                {active.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group mt-4 inline-flex items-baseline gap-2 text-[13px] font-medium tracking-[0.01em] text-[#2e5a9a] uppercase hover:text-[#1d3f73] md:mt-5 md:text-[15px]"
              >
                <span className="group-hover:underline">{active.cta}</span>
                <span aria-hidden="true" className="text-[10px] transition-transform group-hover:translate-x-0.5 md:text-[11px]">
                  ►
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
