# FIIK — Cloud 3: Pilot Execution + Evidence + Evaluation

This is the standalone frontend prototype for FIIK workflow stages **07–09**:

- **07 — Pilot & Milestone Execution** (`/execution`)
- **08 — Evidence Submission** (`/evidence-submission`)
- **09 — Field Evaluation by Evaluator (MSInS)** (`/field-evaluation`)

It does **not** include the Landing Page, Login, Registration, Requirement
Builder, Four-Party Review, Payment Processing, or PREP Generation — those
belong to the other FIIK ZIP projects and are only referenced here (via the
shared header/sidebar and the pilot's stage tracker) for continuity.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
```

The app uses `HashRouter`, so the production build in `dist/` can be opened
directly or hosted as static files without any server-side rewrite rules —
useful both for running this module standalone and for dropping it into a
shared shell later.

## Structure

```
src/
  components/     Header, Sidebar, ProgressTracker, StatusBadge — shared
                  chrome reused across all three pages.
  data/           mockData.js — every pilot/milestone/evidence/evaluation
                  record used by the pages. Swap this for real API calls
                  when the backend (FastAPI) is wired up.
  pages/
    PilotExecutionDashboard.jsx   Page 07
    EvidenceSubmission.jsx        Page 08
    FieldEvaluation.jsx           Page 09
```

## Notes for integration with the other three FIIK clouds

- All colors, spacing and type live in CSS custom properties at the top of
  `src/index.css` (`--fiik-navy`, `--fiik-orange`, etc.) so the shared visual
  language is easy to reconcile if another cloud's build defines the same
  tokens slightly differently.
- `Header` and `Sidebar` are intentionally minimal and duplicate what the
  other clouds likely also build; when merging, keep one copy and point all
  pages at it.
- Workflow boundary: this module starts at **Milestone Execution** (after
  Work Order Issuance) and ends at **Milestone Approved**. Payment
  Processing and PREP Generation are explicitly out of scope and are not
  triggered from here — the "Approve Milestone" action only updates local
  mock state.
- Evidence submission is a startup action; FIIK only stores/organizes it.
  Field Evaluation is modeled as optional (a `Field Visit Details` tab),
  matching the brief.

## Mock data

Everything in `src/data/mockData.js` is illustrative (pilot
`FIIK-PILOT-024`, "Smart Waste Segregation System"). No real government API
calls, payments, or procurement transactions are implemented — this is a
frontend-only prototype.
