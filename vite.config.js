import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const PROTOTYPE_META = {
  tracker: {
    title: 'FeatureFlow — Stakeholder Request & Bug Tracker',
  },
  personalization: {
    title: 'Ewan Mannington Prototype - Pacewise — Personalised running advice',
    description:
      "This is a prototype component I am calling Pacewise. I don't have a design system available to me, something I would definitely incorporate to ensure styling is consistent across the website",
  },
}

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// Bakes the title/description for whichever prototype VITE_PROTOTYPE selects
// directly into the built index.html, so each Vercel deployment's actual page
// source (and link previews, crawlers) carries the right metadata — not just
// what PersonalizationPage.jsx sets client-side after the page loads.
function htmlMetaPlugin(env) {
  const prototype =
    (env.VITE_PROTOTYPE || '').trim().toLowerCase().replace('personalisation', 'personalization') || 'tracker'
  const meta = PROTOTYPE_META[prototype] ?? PROTOTYPE_META.tracker

  return {
    name: 'html-meta-per-prototype',
    transformIndexHtml(html) {
      let next = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(meta.title)}</title>`)
      if (meta.description) {
        const tag = `<meta name="description" content="${escapeHtml(meta.description)}" />`
        next = /<meta\s+name="description"[^>]*>/i.test(next)
          ? next.replace(/<meta\s+name="description"[^>]*>/i, tag)
          : next.replace('</head>', `    ${tag}\n  </head>`)
      }
      return next
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), tailwindcss(), htmlMetaPlugin(env)],
    server: {
      allowedHosts: true,
    },
  }
})
