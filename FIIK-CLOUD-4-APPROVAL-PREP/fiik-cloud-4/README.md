# FIIK — Cloud 4: Approval + Payment + PREP + Portable Pilot Record

A standalone frontend prototype (React + Vite + Tailwind) for the final
conversion layer of the FIIK workflow:

```
Approved Pilot → Payment → Completed Pilot Record → PREP Generation → Portable Evidence-Backed Pilot Credential
```

This module owns **only** steps 10–12 of the FIIK workflow:

| Route | Page |
|---|---|
| `/approval-payment` | 10 — Milestone Approval & Payment Processing |
| `/prep-generation` | 11 — PREP Generation |
| `/completed-pilot` | 12 — Completed Pilot / Portable PREP Record |

Landing, login, registration, requirement builder, four-party review,
execution and evidence submission belong to the other three Cloud
modules and are **not** included here. The sidebar shows the full
shared FIIK navigation for continuity, with the items outside this
module's scope shown disabled.

## Running locally

```bash
npm install
npm run dev      # dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  components/   Shared, reusable UI (Header, Sidebar, PageShell, StepTracker,
                PrepDocument, StatusBadge, Primitives)
  data/         mockData.js — all pilot/PREP/payment data is local mock data
  pages/        ApprovalPayment.jsx, PrepGeneration.jsx, CompletedPilot.jsx
  App.jsx       Route definitions for this module only
```

## Notes for integration with the other Cloud modules

- All data is local mock data (`src/data/mockData.js`) — no backend calls.
  Swap this file for real API calls against the FastAPI services when
  integrating.
- Routing uses `HashRouter` so the module runs standalone without a
  configured server; switch to `BrowserRouter` once merged into the
  shared FIIK shell.
- Shared visual tokens (navy, saffron, status colors) live in
  `tailwind.config.js` — keep these in sync with the other three Cloud
  modules so the merged app looks like one product.
- `Header.jsx` and `Sidebar.jsx` are built to the shared FIIK header/sidebar
  spec and are intended to be the ones that survive the merge; the other
  modules' copies can be dropped in favor of these (or vice versa, as long
  as one canonical copy is kept).
- PREP's QR code and payment transaction views are prototype-only visuals —
  not connected to any live government database or payment rail.
