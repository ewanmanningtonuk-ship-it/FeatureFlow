# FeatureFlow

A prototype Stakeholder Request & Bug Tracker built with React, Vite, and Tailwind CSS.

## Views

- **Submit Request** — a form for stakeholders to report bugs or request features, with Title, Description, Priority (Low/Medium/High/Critical), and Justification fields.
- **PM Dashboard** — lists all submissions with filtering by status/priority and search. Each submission expands to let a PM write a response and update its status (New, Under Review, Approved, Declined).

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
