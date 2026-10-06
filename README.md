# FeatureFlow

A collection of product prototypes built with React, Vite, and Tailwind CSS.

## Views

- **Submit Request** — a form for stakeholders to report bugs or request features, with Title, Description, Priority (Low/Medium/High/Critical), and Justification fields.
- **PM Dashboard** — lists all submissions with filtering by status/priority and search. Each submission expands to let a PM write a response and update its status (New, Under Review, Approved, Declined).

- **Personalization** (`/#personalization`) — shown standalone, without the tracker header. A "Tailor-made content for you" module. An inline audience dropdown ("I'm *new to trading* and looking for information on:") swaps the set of tabs shown in a tabbed content card. Each tab shows copy and a call-to-action on the left with an image on the right (illustrated placeholders stand in for photography). On mobile the card stacks image-above-copy and the tab bar becomes a horizontal slider with a peeking next tab; swiping the panel also moves between tabs. Tabs follow the WAI-ARIA tabs pattern (arrow keys, Home/End). Content lives in `src/data/personalizationContent.js`.

Each view has a shareable URL hash (`#submit`, `#dashboard`, `#personalization`).

Data is currently in-memory mock data (`src/data/mockData.js`) — there is no backend yet.

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploying to Vercel

Each prototype can have its own Vercel project (and URL) from this one repo.
Vercel detects Vite automatically; no `vercel.json` is needed.

| Project | Environment variable | Root URL shows |
| --- | --- | --- |
| Tracker | _(none)_ | Stakeholder Request & Bug Tracker (Personalization still at `/#personalization`) |
| Personalization | `VITE_PROTOTYPE=personalization` | Only the Personalization component |

`VITE_PROTOTYPE` accepts `submit`, `dashboard` or `personalization`. It is read at build time, so redeploy after changing it.
