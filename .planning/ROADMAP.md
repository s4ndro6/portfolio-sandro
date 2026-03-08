# Roadmap: AAZ Portfolio V4

## Overview

Six phases build a cinematic brutalist portfolio from bare scaffold to Vercel-ready deployment. Phase 1 establishes the technical foundation and data layer. Phase 2 wraps the entire site in interactive chrome (cursor, bootloader, transitions, navbar, statusbar, noise). Phase 3 constructs the Hero — the first thing every visitor sees. Phase 4 produces the four programmatic canvas assets that replace missing project images. Phase 5 assembles all four pages into complete, navigable experiences. Phase 6 wires scroll animations across every section, hardens mobile, and ships a clean build.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Vite/React/TS scaffold, globals, routing, data, utilities
- [ ] **Phase 2: Layout Core** - Cursor, bootloader, page transitions, navbar, statusbar, noise overlay
- [ ] **Phase 3: Hero** - WebGL shader background, tilt photo, hero layout, typewriter, text scramble
- [ ] **Phase 4: Canvas Assets** - Four animated canvas components for projects without images
- [ ] **Phase 5: Pages** - Home, Projects, About, Contact pages fully assembled
- [ ] **Phase 6: Polish** - Scroll animations, responsive, SEO, performance, Vercel build

## Phase Details

### Phase 1: Foundation
**Goal**: The project runs in the browser with correct styling, routing, all data, and core utilities available
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07
**Success Criteria** (what must be TRUE):
  1. `npm run dev` serves the app at localhost with no console errors
  2. Navigating to /projects, /about, /contact renders a placeholder without crashing
  3. The palette (#020804 background, #00FF88 accent, Syne ExtraBold) is visually applied
  4. Lenis smooth scroll is active — page scroll feels damped, not native-jerky
  5. All 7 project entries and full data (timeline, skills) are importable from content.ts
**Plans**: TBD

### Phase 2: Layout Core
**Goal**: Every page is wrapped in the interactive chrome that defines the site's identity before any content is built
**Depends on**: Phase 1
**Requirements**: LAYOUT-01, LAYOUT-02, LAYOUT-03, LAYOUT-04, LAYOUT-05, LAYOUT-06
**Success Criteria** (what must be TRUE):
  1. On site load a terminal bootloader plays for ~2s then reveals the page
  2. A custom crosshair cursor with 8 GSAP-delayed clone trails follows the mouse on desktop
  3. Navigating between pages triggers a diagonal clip-path transition
  4. The navbar is transparent at top and switches to blur/frosted when scrolled down
  5. A statusbar at the bottom of every page shows a live clock and "B2 DISPONIBLE" pill
  6. A grain noise overlay is visible on all pages at all times
**Plans**: TBD

### Phase 3: Hero
**Goal**: The first screen visitors see is immersive — scan-line WebGL background, tilt photo, massive name, typewriter subtitle
**Depends on**: Phase 2
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05
**Success Criteria** (what must be TRUE):
  1. A fullscreen WebGL fragment shader with green scan lines and mouse-driven ripple plays behind the hero
  2. Alessandro's photo tilts in 3D on hover and shows an RGB glitch on initial load
  3. The hero layout shows the name in Syne 800 occupying ~55% width on the left
  4. The subtitle "Createur de systemes IA_" animates with a blinking cursor typewriter effect
  5. H1 text goes through a TextScramble animation on load and transitions cleanly from the bootloader
**Plans**: TBD

### Phase 4: Canvas Assets
**Goal**: The four projects that have no real image each display a distinctive, animated programmatic canvas that communicates the project type
**Depends on**: Phase 1
**Requirements**: CANVAS-01, CANVAS-02, CANVAS-03, CANVAS-04
**Success Criteria** (what must be TRUE):
  1. Agent Studio canvas shows scrolling JetBrains Mono green code lines resembling a terminal session
  2. ATLAS Trading canvas displays animated OHLC candlestick bars with simulated live price movement
  3. TikTok Pipeline canvas shows a 9:16 frame grid with animated transitions between frames
  4. Job Bot canvas displays kanban cards moving between columns in a looping flow animation
**Plans**: TBD

### Phase 5: Pages
**Goal**: All four routes are complete, navigable pages with real content — the portfolio is functionally done
**Depends on**: Phase 2, Phase 3, Phase 4
**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, PAGE-06, PAGE-07
**Success Criteria** (what must be TRUE):
  1. Home page shows hero, an About preview section, a 3-project preview grid, and a tools marquee
  2. Projects page shows all 7 projects in an asymmetric CSS Grid with a CLI-style filter dropdown (ALL / WEB / IA / DESIGN)
  3. About page shows bio typewriter, tilt photo, CountUp stats, CLI skill bars, and stroke-draw timeline
  4. Contact page is a full-page terminal form with name/email/subject/message fields and the B2 alternance card
  5. ProjectCard shows title, tags, year, and status on hover overlay; CTA buttons have magnetic GSAP effect
  6. Section number labels (01, 02, 03...) appear as large background text on each section
**Plans**: TBD

### Phase 6: Polish
**Goal**: The site animates richly on scroll, works cleanly on mobile, is discoverable by search engines, and deploys without errors on Vercel
**Depends on**: Phase 5
**Requirements**: ANIM-01, ANIM-02, ANIM-03, ANIM-04, ANIM-05, ANIM-06, ANIM-07, ANIM-08
**Success Criteria** (what must be TRUE):
  1. Every H1/H2 heading triggers a TextScramble effect when it enters the viewport
  2. About stats count up from 0 and skill bars animate in on scroll
  3. The About timeline path draws itself stroke-by-stroke as the user scrolls into it
  4. On a 375px mobile viewport: Three.js is disabled, custom cursor is absent, and a hamburger menu replaces the navbar links
  5. Each page has a unique title, meta description, and OG image set correctly in the document head
  6. `npm run build` completes with zero errors and the dist output is deployable to Vercel
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6
Note: Phase 4 depends only on Phase 1 and can be executed in parallel with Phases 2-3 if needed.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/TBD | Not started | - |
| 2. Layout Core | 0/TBD | Not started | - |
| 3. Hero | 0/TBD | Not started | - |
| 4. Canvas Assets | 0/TBD | Not started | - |
| 5. Pages | 0/TBD | Not started | - |
| 6. Polish | 0/TBD | Not started | - |
