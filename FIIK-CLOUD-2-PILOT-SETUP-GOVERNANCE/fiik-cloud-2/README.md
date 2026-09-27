# FIIK — Cloud 2: Startup Onboarding + Pilot Setup + Governance

This is one module of the larger **FIIK** platform (Pilot Intelligence & Evidence
Infrastructure for Startup-Friendly Government Procurement). It implements only
steps **04–06** of the twelve-step FIIK workflow, and is meant to be merged with
the other three independently generated FIIK modules.

## Scope

| Step | Page | Route |
|---|---|---|
| 04 | Startup Registration | `/registration` |
| 05 | Requirement / Work Order Builder | `/work-order` |
| 06 | Four-Party Review | `/four-party-review` |

Everything else in the workflow (landing page, login, main dashboard, pilot
execution, evidence submission/evaluation, payment, PREP generation) belongs
to other modules and is intentionally **not** built here. `/` redirects to
`/registration` for standalone preview purposes only.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
```

## Stack

- React 19 + Vite
- React Router (in-module route switching only)
- lucide-react (icons)
- Plain CSS with a shared design-token stylesheet (no CSS framework), so it
  drops cleanly into the shared FIIK shell without extra build config.

## Structure

```
src/
  components/
    Header.jsx / Header.css      Shared FIIK top header (Gov of India strip,
                                  #startupindia + Azadi badges, FIIK brand,
                                  help/notifications/profile)
    Sidebar.jsx / Sidebar.css    Shared Startup Dashboard sidebar. Standard
                                  8-item nav is rendered for visual
                                  consistency; only "My Applications" and
                                  "My Profile" light up in context, since
                                  those are the only two this module touches.
                                  A "Module preview" section link-navigates
                                  between this module's 3 pages for review —
                                  remove this block once merged into the
                                  full app's real sidebar routing.
    Layout.jsx                   Header + Sidebar + page body wrapper
    StepProgress.jsx / .css      Numbered step indicator used by both
                                  multi-step forms
    StatusBadge.jsx              Color-coded status pill (submitted / under
                                  review / pending / approved / returned)
    FormField.jsx                Field/Input/Select/TextArea/FieldGrid
                                  primitives shared by both forms
  pages/
    StartupRegistration.jsx      Page 04, 6 steps
    WorkOrderBuilder.jsx         Page 05, 5 steps
    FourPartyReview.jsx          Page 06
  data/
    mockData.js                 All mock/local data (no backend calls)
  index.css                     Design tokens (color, radius, shadow, base
                                  element styles) — shared across the module
  pages.css                     Page-level component classes (review blocks,
                                  milestone cards, four-party layout, etc.)
```

## Design tokens

Colors, radii and shadows are defined as CSS custom properties at the top of
`src/index.css` (`--navy`, `--orange`, `--green`, `--blue`, `--purple`,
`--teal`, etc.) so the palette can be re-pointed in one place if the merged
app's design system differs slightly.

## Notes for integration

- No backend calls: all data is local component state seeded from
  `src/data/mockData.js`.
- No absolute paths; all imports are relative.
- Government recognition is recorded, never granted, by this module (per the
  FIIK brief).
- The Work Order Builder's milestone template is presented as a FIIK-provided
  starting framework, not an official MSInS template.
- Four-Party Review does not link into payment or PREP — it only carries the
  proposal to "Work Order Issuance."
