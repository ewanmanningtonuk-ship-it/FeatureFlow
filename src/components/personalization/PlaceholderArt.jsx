import { useId } from 'react'

// Stand-in for the editorial photography used in production. Each theme gets
// its own palette and motif so switching tabs still feels like new content.
const THEMES = {
  markets: { from: '#1e3a5f', to: '#9fb3c8', accent: '#7dd3c0', motif: 'candles', seed: 3 },
  forex: { from: '#14324a', to: '#4f7ea8', accent: '#f6c66b', motif: 'line', seed: 7 },
  tools: { from: '#2a2f45', to: '#6b7a99', accent: '#a5b4fc', motif: 'bars', seed: 11 },
  platforms: { from: '#203040', to: '#8aa0b5', accent: '#93c5fd', motif: 'devices', seed: 5 },
  costs: { from: '#5b5b5b', to: '#d4d4d4', accent: '#f5f5f5', motif: 'coin', seed: 2 },
  analytics: { from: '#1f2b3d', to: '#5d7593', accent: '#86efac', motif: 'line', seed: 13 },
  pivots: { from: '#2b2140', to: '#6c5a8f', accent: '#fca5a5', motif: 'candles', seed: 17 },
}

const W = 600
const H = 360

function rng(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function series(seed, count) {
  const rand = rng(seed)
  let v = H * 0.55
  return Array.from({ length: count }, () => {
    v = Math.min(H * 0.8, Math.max(H * 0.2, v + (rand() - 0.48) * 50))
    return v
  })
}

function Candles({ theme }) {
  const rand = rng(theme.seed + 1)
  const pts = series(theme.seed, 22)
  const step = W / pts.length
  return pts.map((y, i) => {
    const prev = pts[i - 1] ?? y
    const up = y < prev
    const top = Math.min(y, prev)
    const body = Math.max(6, Math.abs(y - prev))
    const wick = 10 + rand() * 20
    return (
      <g key={i} opacity={0.35 + (i / pts.length) * 0.65}>
        <line
          x1={i * step + step / 2}
          x2={i * step + step / 2}
          y1={top - wick}
          y2={top + body + wick}
          stroke={up ? theme.accent : '#f87171'}
          strokeWidth="1.5"
        />
        <rect
          x={i * step + step * 0.25}
          y={top}
          width={step * 0.5}
          height={body}
          rx="1.5"
          fill={up ? theme.accent : '#f87171'}
        />
      </g>
    )
  })
}

function Line({ theme, gradientId }) {
  const pts = series(theme.seed, 30)
  const step = W / (pts.length - 1)
  const d = pts.map((y, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${y.toFixed(1)}`).join(' ')
  return (
    <>
      <path d={`${d} L${W},${H} L0,${H} Z`} fill={`url(#${gradientId}-area)`} />
      <path d={d} fill="none" stroke={theme.accent} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx={W - step * 4} cy={pts[pts.length - 5]} r="6" fill={theme.accent} />
      <circle cx={W - step * 4} cy={pts[pts.length - 5]} r="14" fill={theme.accent} opacity="0.25" />
    </>
  )
}

function Bars({ theme }) {
  const pts = series(theme.seed, 14)
  const step = W / pts.length
  return pts.map((y, i) => (
    <rect
      key={i}
      x={i * step + step * 0.2}
      y={y}
      width={step * 0.6}
      height={H - y}
      rx="4"
      fill={theme.accent}
      opacity={0.2 + (i / pts.length) * 0.6}
    />
  ))
}

function Devices({ theme }) {
  return (
    <g fill="none" stroke={theme.accent} strokeWidth="3" opacity="0.85">
      <rect x="120" y="90" width="260" height="170" rx="10" />
      <path d="M95 275h310" strokeLinecap="round" />
      <rect x="420" y="130" width="80" height="140" rx="12" />
      <path d="M145 220l50-40 40 25 60-60 55 30" strokeLinejoin="round" />
      <path d="M432 230l18-20 14 10 24-30" strokeLinejoin="round" />
    </g>
  )
}

function Coin({ theme }) {
  return (
    <g fill="none" stroke={theme.accent} opacity="0.8">
      <circle cx={W * 0.8} cy={H * 0.5} r="230" strokeWidth="10" />
      <circle cx={W * 0.8} cy={H * 0.5} r="212" strokeWidth="2" strokeDasharray="2 6" />
      <circle cx={W * 0.8} cy={H * 0.5} r="190" strokeWidth="1.5" />
      <text
        x={W * 0.8 - 120}
        y={H * 0.5 + 40}
        fill={theme.accent}
        stroke="none"
        fontSize="120"
        fontFamily="Georgia, serif"
        opacity="0.6"
      >
        $
      </text>
    </g>
  )
}

const MOTIFS = { candles: Candles, line: Line, bars: Bars, devices: Devices, coin: Coin }

export default function PlaceholderArt({ art, label }) {
  const theme = THEMES[art] ?? THEMES.markets
  const Motif = MOTIFS[theme.motif]
  const id = useId().replace(/:/g, '')

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Placeholder illustration: ${label}`}
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={theme.from} />
          <stop offset="1" stopColor={theme.to} />
        </linearGradient>
        <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={theme.accent} stopOpacity="0.35" />
          <stop offset="1" stopColor={theme.accent} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.25" cy="0.2" r="0.8">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-bg)`} />
      <g stroke="#fff" strokeOpacity="0.08">
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} x2={i * 50} y1="0" y2={H} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`h${i}`} x1="0" x2={W} y1={i * 50} y2={i * 50} />
        ))}
      </g>
      <Motif theme={theme} gradientId={id} />
      <rect width={W} height={H} fill={`url(#${id}-glow)`} />
    </svg>
  )
}
