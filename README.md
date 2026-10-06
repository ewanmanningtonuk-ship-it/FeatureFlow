# FeatureFlow

A collection of product prototypes built with React, Vite, and Tailwind CSS.

## Stakeholder Request & Bug Tracker

- **Submit Request** — a form for stakeholders to report bugs or request features, with Title, Description, Priority (Low/Medium/High/Critical), and Justification fields.
- **PM Dashboard** — lists all submissions with filtering by status/priority and search. Each submission expands to let a PM write a response and update its status (New, Under Review, Approved, Declined).

Data is currently in-memory mock data (`src/data/mockData.js`) — there is no backend yet.

## Personalization

A separate prototype with its own page, favicon and deployment, presented as "Pacewise", a fictional running-coach brand. An inline audience dropdown ("I'm *just getting started* and I'd like help with:") swaps the set of topic tabs shown in a content card. Each tab shows an illustration alongside copy and a call to action. On mobile the card stacks and the pill tab bar becomes a horizontal slider; swiping the panel also moves between tabs. Tabs follow the WAI-ARIA tabs pattern (arrow keys, Home/End).

All copy, illustrations (inline SVG) and styling are original to this prototype. Content lives in `src/data/personalizationContent.js`, and illustrations in `src/components/personalization/PlaceholderArt.jsx`.

## Getting started

```bash
npm install
npm run dev
```

In local dev both prototypes are available: the tracker at `http://localhost:5173/` and Personalization at `http://localhost:5173/#personalization`.

## Build

```bash
npm run build
```

## Deploying to Vercel

Each prototype is its own Vercel project, built from this one repo, so each has its own URL. Vercel detects Vite automatically; no `vercel.json` is needed. Which prototype a build serves is set by the `VITE_PROTOTYPE` environment variable:

| Vercel project | `VITE_PROTOTYPE` | Serves |
| --- | --- | --- |
| Tracker | _(unset)_ or `tracker` | Only the Stakeholder Request & Bug Tracker |
| Personalization | `personalization` | Only the Personalization component |

Production builds without the variable serve the tracker only, so the existing tracker project needs no changes. The variable is read at build time, so redeploy after changing it.
