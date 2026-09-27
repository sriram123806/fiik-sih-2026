# FIIK — Cloud 1: Public Entry + Authentication + Startup Home

Frontend prototype module for the FIIK platform. This ZIP contains **only**
the Cloud 1 scope — it is meant to be merged with three other independently
built FIIK modules.

## Scope (what's in this module)

| Page | Route |
|---|---|
| 01 — Landing Page | `/` |
| 02 — Role-Based Login | `/login` |
| 03 — Role Selection | `/role-selection` |
| 04 — Startup Dashboard / Home | `/dashboard` |

Everything else (Startup Registration, Requirement/Work Order, Four-Party
Review, Pilot Execution, Evidence Submission/Evaluation, Payment, PREP
Generation, Completed PREP Record) belongs to other modules and is **not**
built here. The sidebar items for those sections route to a placeholder
screen (`src/components/PlaceholderPage.jsx`) that just says the section is
part of another module, so navigation never breaks or leads nowhere.

## Auth / login

Login and Government SSO are both **mock prototype interactions** — no real
backend, database or SSO (Parichay/ePramaan) is connected. Any email +
password submits successfully; SSO logs in immediately. State is kept in
`src/context/AuthContext.jsx` (in-memory only, resets on refresh).

On Role Selection, only **Startup** is wired to a real dashboard. Department
and Evaluator show a "module under development" notice, per the assigned
scope.

## Tech stack

- React 18 + Vite
- React Router v6 (client-side routing)
- Tailwind CSS (utility styling, matches the shared FIIK visual language:
  navy header, orange accent, tricolor top bar, rounded cards)

No backend calls are made. All dashboard content (`summaryCards`,
`activePilot`, `notifications`, etc.) is mock data in `src/data/mockData.js`,
ready to be swapped for real API calls (FastAPI, per the platform's shared
tech direction) later.

## Running the project

```bash
npm install
npm run dev      # starts a local dev server (default: http://localhost:5173)
```

To build a production bundle:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    Header.jsx          shared FIIK header (public + dashboard variants)
    Sidebar.jsx          startup dashboard sidebar nav
    PlaceholderPage.jsx   stand-in for out-of-scope routes
  context/
    AuthContext.jsx       mock login/role state
  data/
    mockData.js           all mock/local data used by these pages
  pages/
    Landing.jsx
    Login.jsx
    RoleSelection.jsx
    StartupDashboard.jsx
  App.jsx                 route table
  main.jsx                app entry point
  index.css               Tailwind + shared base styles
tailwind.config.js         FIIK color tokens (navy, saffron, orange, etc.)
```

## Integration notes for merging with other modules

- No absolute paths; all imports are relative.
- Route names are flat and predictable (`/login`, `/role-selection`,
  `/dashboard`, `/dashboard/<section>`) so other modules can extend
  `App.jsx`'s route table without renaming existing routes.
- `Header` and `Sidebar` are standalone components with no dependency on
  page-specific state — safe to reuse from other modules.
- `AuthContext` is intentionally minimal (boolean + role string) so it can
  be swapped for a real auth/session implementation without changing the
  pages that consume it via `useAuth()`.
- Tailwind config's `fiik.*` and `navy.*` color tokens are the shared
  palette — reuse them rather than introducing new hex values, to keep
  visual consistency across modules once merged.
