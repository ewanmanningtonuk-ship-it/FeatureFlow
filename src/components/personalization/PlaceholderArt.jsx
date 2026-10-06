// Flat, warm illustrations used in place of photography. Each `art` key is a
// small scene built from the shared palette below.
const C = {
  forest: '#1f4d3a',
  pine: '#2f6b4f',
  sage: '#9cc5a1',
  mint: '#d8eadb',
  coral: '#ef6f4f',
  peach: '#f7b89f',
  sun: '#f6b54a',
  sand: '#f4e4cf',
  cream: '#fbf6ee',
  sky: '#d6e8ec',
}

const W = 600
const H = 450

function Sunrise() {
  return (
    <>
      <rect width={W} height={H} fill={C.sand} />
      <circle cx="300" cy="270" r="120" fill={C.sun} />
      <circle cx="300" cy="270" r="160" fill="none" stroke={C.sun} strokeOpacity="0.35" strokeWidth="14" />
      <path d="M0 290 C120 230 220 260 320 300 S520 250 600 270 V450 H0Z" fill={C.sage} />
      <path d="M0 340 C140 300 260 330 380 350 S540 320 600 330 V450 H0Z" fill={C.pine} />
      <path
        d="M110 450 C200 400 260 380 300 360 S420 330 470 320"
        fill="none"
        stroke={C.cream}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="2 22"
      />
    </>
  )
}

function Calendar() {
  const done = new Set([0, 2, 4, 7, 9, 11, 14, 16])
  return (
    <>
      <rect width={W} height={H} fill={C.mint} />
      <rect x="120" y="70" width="360" height="310" rx="28" fill={C.cream} />
      <rect x="120" y="70" width="360" height="72" rx="28" fill={C.forest} />
      <rect x="120" y="114" width="360" height="28" fill={C.forest} />
      <circle cx="200" cy="70" r="10" fill={C.coral} />
      <circle cx="400" cy="70" r="10" fill={C.coral} />
      {Array.from({ length: 21 }, (_, i) => {
        const x = 150 + (i % 7) * 44
        const y = 168 + Math.floor(i / 7) * 66
        return done.has(i) ? (
          <g key={i}>
            <circle cx={x + 14} cy={y + 18} r="17" fill={C.coral} />
            <path
              d={`M${x + 6} ${y + 18} l6 6 l11 -12`}
              fill="none"
              stroke={C.cream}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ) : (
          <circle key={i} cx={x + 14} cy={y + 18} r="17" fill="none" stroke={C.sage} strokeWidth="3" />
        )
      })}
    </>
  )
}

function Route() {
  return (
    <>
      <rect width={W} height={H} fill={C.sky} />
      <path d="M0 120 L600 60 M80 0 L180 450 M0 330 L600 380 M420 0 L520 450" stroke={C.cream} strokeWidth="18" />
      <circle cx="470" cy="150" r="70" fill={C.sage} />
      <circle cx="120" cy="380" r="55" fill={C.sage} />
      <path
        d="M140 300 C180 200 260 240 300 180 S420 120 440 240 S330 360 250 330"
        fill="none"
        stroke={C.coral}
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray="1 18"
      />
      <circle cx="140" cy="300" r="16" fill={C.forest} />
      <circle cx="140" cy="300" r="6" fill={C.cream} />
      <path d="M250 330 v-62" stroke={C.forest} strokeWidth="6" strokeLinecap="round" />
      <path d="M250 268 h46 l-12 15 12 15 h-46Z" fill={C.coral} />
    </>
  )
}

function Pulse() {
  return (
    <>
      <rect width={W} height={H} fill={C.peach} />
      <circle cx="300" cy="225" r="150" fill={C.cream} fillOpacity="0.55" />
      <path
        d="M300 330 s-110-64-110-145a62 62 0 0 1 110-39 62 62 0 0 1 110 39c0 81-110 145-110 145Z"
        fill={C.coral}
      />
      <path
        d="M40 230 H210 l22-46 34 96 30-70 20 20 H560"
        fill="none"
        stroke={C.forest}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  )
}

function Track() {
  return (
    <>
      <rect width={W} height={H} fill={C.pine} />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={70 + i * 34}
          y={60 + i * 34}
          width={460 - i * 68}
          height={330 - i * 68}
          rx={165 - i * 34}
          fill="none"
          stroke={i === 0 ? C.coral : C.cream}
          strokeOpacity={i === 0 ? 1 : 0.6}
          strokeWidth="6"
        />
      ))}
      <rect x="206" y="196" width="188" height="58" rx="29" fill={C.sage} />
      <path d="M470 76 v40" stroke={C.cream} strokeWidth="6" />
      <circle cx="300" cy="60" r="14" fill={C.sun} />
    </>
  )
}

function Stopwatch() {
  return (
    <>
      <rect width={W} height={H} fill={C.cream} />
      <circle cx="300" cy="245" r="190" fill={C.sand} />
      <rect x="282" y="52" width="36" height="34" rx="8" fill={C.forest} />
      <rect x="264" y="40" width="72" height="20" rx="10" fill={C.forest} />
      <circle cx="300" cy="245" r="150" fill={C.forest} />
      <circle cx="300" cy="245" r="126" fill={C.cream} />
      <path d="M300 245 L300 119 A126 126 0 0 1 409 182 Z" fill={C.peach} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2
        return (
          <line
            key={i}
            x1={300 + Math.sin(a) * 108}
            y1={245 - Math.cos(a) * 108}
            x2={300 + Math.sin(a) * 118}
            y2={245 - Math.cos(a) * 118}
            stroke={C.forest}
            strokeWidth="5"
            strokeLinecap="round"
          />
        )
      })}
      <path d="M300 245 L384 196" stroke={C.coral} strokeWidth="8" strokeLinecap="round" />
      <circle cx="300" cy="245" r="12" fill={C.coral} />
    </>
  )
}

function Mountain() {
  return (
    <>
      <rect width={W} height={H} fill={C.sky} />
      <circle cx="455" cy="110" r="46" fill={C.sun} />
      <path d="M0 330 L170 130 L290 270 L380 180 L600 360 V450 H0Z" fill={C.sage} />
      <path d="M170 130 L210 178 L180 172 L150 190 L140 166Z" fill={C.cream} />
      <path d="M0 380 C150 330 280 360 420 340 S560 350 600 345 V450 H0Z" fill={C.pine} />
      <path
        d="M90 450 C160 410 240 400 300 385 S430 360 520 352"
        fill="none"
        stroke={C.sand}
        strokeWidth="12"
        strokeLinecap="round"
      />
      <circle cx="520" cy="300" r="22" fill={C.coral} />
      <path d="M514 298 q6 -14 12 0 q-6 14 -12 0" fill={C.cream} />
    </>
  )
}

const SCENES = {
  sunrise: Sunrise,
  calendar: Calendar,
  route: Route,
  pulse: Pulse,
  track: Track,
  stopwatch: Stopwatch,
  mountain: Mountain,
}

export default function PlaceholderArt({ art, label }) {
  const Scene = SCENES[art] ?? Sunrise
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Illustration: ${label}`}
      className="h-full w-full"
    >
      <Scene />
    </svg>
  )
}
