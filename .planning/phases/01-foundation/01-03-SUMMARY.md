---
phase: 01-foundation
plan: 03
subsystem: ui
tags: [react, react-router, lenis, gsap, smooth-scroll, hooks]

# Dependency graph
requires:
  - phase: 01-foundation plan 01
    provides: Vite/React/TypeScript scaffold with installed dependencies
  - phase: 01-foundation plan 02
    provides: globals.css design tokens (--bg-0, --accent, --font-display, --font-mono)
provides:
  - BrowserRouter with four active routes (/, /projects, /about, /contact)
  - useLenis hook: Lenis smooth scroll wired to GSAP ticker
  - useTilt stub hook (Phase 3 ready)
  - useMousePosition hook with live x/y tracking (Phase 2 ready)
  - Four page placeholder components using CSS design tokens
affects: [02-animation, 03-hero, 04-canvas, 05-pages, 06-polish]

# Tech tracking
tech-stack:
  added: [lenis v1.3.18, react-router-dom v7.13.1]
  patterns: [useLenis in AppContent above Routes, GSAP ticker drives Lenis RAF loop, hooks directory for reusable animation/interaction logic]

key-files:
  created:
    - src/hooks/useLenis.ts
    - src/hooks/useTilt.ts
    - src/hooks/useMousePosition.ts
    - src/pages/Home.tsx
    - src/pages/Projects.tsx
    - src/pages/About.tsx
    - src/pages/Contact.tsx
  modified:
    - src/App.tsx
    - src/main.tsx

key-decisions:
  - "useLenis called inside AppContent (child of BrowserRouter) so useNavigate is accessible in future without restructuring"
  - "index.css removed from main.tsx — Vite default set background-color:#242424 and body display:flex which conflicted with --bg-0 design token"
  - "gsap.ticker.lagSmoothing(0) disables GSAP lag smoothing to prevent conflicts with Lenis RAF timing"

patterns-established:
  - "Hooks pattern: animation/interaction hooks live in src/hooks/, each file exports a single named function"
  - "Page pattern: each page component is a single default export, uses CSS vars directly in style props for Phase 1 placeholders"
  - "Scroll pattern: Lenis instance created in useEffect, wired to gsap.ticker.add for unified RAF loop"

requirements-completed: [FOUND-03, FOUND-04]

# Metrics
duration: 8min
completed: 2026-03-08
---

# Phase 1 Plan 03: React Router + Lenis Smooth Scroll Summary

**React Router v7 with four routes and Lenis smooth scroll synced to GSAP ticker via shared RAF loop, completing the Phase 1 foundation**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-03-08T12:27:10Z
- **Completed:** 2026-03-08T12:35:00Z
- **Tasks:** 2
- **Files modified:** 9 (3 created hooks, 4 created pages, App.tsx replaced, main.tsx updated)

## Accomplishments
- Four routed pages active (/, /projects, /about, /contact) rendering CSS-token-styled placeholders
- Lenis smooth scroll initialized on every route via useLenis() hook wired to gsap.ticker.add
- Three reusable hooks scaffolded: useLenis (active), useTilt (Phase 3 stub), useMousePosition (Phase 2 active)
- Removed conflicting Vite default index.css that overrode the --bg-0 design token
- TypeScript build passes with 0 errors (318 kB bundle, 106 kB gzip)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create useLenis, useTilt, useMousePosition hooks** - `79d16fe` (feat)
2. **Task 2: Wire React Router with four page routes and Lenis scroll** - `aa1bc3b` (feat)

## Files Created/Modified
- `src/hooks/useLenis.ts` - Lenis smooth scroll init, gsap.ticker.add integration, lagSmoothing(0)
- `src/hooks/useTilt.ts` - Phase 3 stub with useRef, returns ref for 3D tilt effect
- `src/hooks/useMousePosition.ts` - Live x/y mouse tracking via mousemove event listener
- `src/pages/Home.tsx` - Home placeholder: "AAZ" in --accent Syne font on --bg-0
- `src/pages/Projects.tsx` - Projects placeholder using --accent and --font-mono
- `src/pages/About.tsx` - About placeholder using --accent and --font-mono
- `src/pages/Contact.tsx` - Contact placeholder using --accent and --font-mono
- `src/App.tsx` - Replaced Vite default: BrowserRouter + Routes + useLenis() in AppContent
- `src/main.tsx` - Removed conflicting index.css import; globals.css only

## Decisions Made
- useLenis called inside AppContent (child of BrowserRouter) so React Router context is available to all hooks in future phases without restructuring.
- Vite's default index.css removed — it set `background-color: #242424` and `body { display: flex; place-items: center }` which conflicted with the --bg-0 design token and the page layout structure.
- gsap.ticker.lagSmoothing(0) added per Lenis documentation to prevent timing conflicts between GSAP's lag smoothing and Lenis's RAF calculations.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed Vite default index.css import from main.tsx**
- **Found during:** Task 2 (wire App.tsx and main.tsx)
- **Issue:** src/index.css (Vite scaffold default) sets `background-color: #242424` and `body { display: flex; place-items: center; min-height: 100vh }` which overrides the --bg-0: #020804 design token and breaks page layout
- **Fix:** Removed `import './index.css'` from main.tsx, keeping only globals.css
- **Files modified:** src/main.tsx
- **Verification:** npm run build passes with 0 TypeScript errors; background will render --bg-0 correctly
- **Committed in:** aa1bc3b (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - bug)
**Impact on plan:** Auto-fix necessary to meet the must_have truth "Background color is #020804 (--bg-0) on all pages." No scope creep.

## Issues Encountered
None beyond the index.css conflict documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 1 foundation complete: all 5 success criteria met (4 routes, Lenis active, #020804 background, Syne font on Home, build passes)
- Phase 2 (Animation System) can begin immediately — useMousePosition hook is ready
- Phase 3 (Hero) can begin — useTilt stub is ready for implementation
- Phase 4 (Canvas) depends only on Phase 1 and can be parallelized if needed

---
*Phase: 01-foundation*
*Completed: 2026-03-08*

## Self-Check: PASSED

- All 9 files exist on disk (verified)
- Commits 79d16fe and aa1bc3b present in git log (verified)
- npm run build: 0 TypeScript errors, 318 kB bundle produced
