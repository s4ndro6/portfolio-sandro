# Requirements: AAZ Portfolio V4

**Defined:** 2026-03-08
**Core Value:** Chaque visiteur doit ressentir en 5 secondes qu'Alessandro est un créateur de systèmes IA de haut niveau

## v1 Requirements

### Foundation

- [ ] **FOUND-01**: Projet Vite + React 18 + TypeScript initialisé avec toutes les dépendances (GSAP, Three.js, Framer Motion, Lenis, React Router)
- [ ] **FOUND-02**: globals.css avec palette V4 complète (variables CSS), utilities, grain texture, font imports (Syne, DM Sans, JetBrains Mono)
- [ ] **FOUND-03**: Lenis smooth scroll configuré et synchronisé avec GSAP ticker
- [ ] **FOUND-04**: React Router configuré avec routes Home, Projects, About, Contact
- [ ] **FOUND-05**: content.ts avec tous les projets (7), timeline (4), skills (4 catégories) et données complètes
- [ ] **FOUND-06**: Utilitaire TextScramble (textScramble.ts) implémenté avec chars ABCDEF...
- [ ] **FOUND-07**: Images copiées dans public/images/ (sandro.jpg, pulse_digital.png, avant-apres.png, magazine.png, 491shots_so.png)

### Layout Core

- [ ] **LAYOUT-01**: Cursor custom — croix fine 20px + trail 8 clones avec délai GSAP + états hover/drag/copy
- [ ] **LAYOUT-02**: BootLoader terminal — séquence lignes mono vert avec barres de progression, 2s, puis split reveal
- [ ] **LAYOUT-03**: PageTransition — clip-path diagonal cinématique entre les pages
- [ ] **LAYOUT-04**: Navbar — transparent + blur au scroll + pill "B2 · DISPONIBLE ●" + hover avec images projets
- [ ] **LAYOUT-05**: StatusBar fixe bas de page — heure temps réel (JetBrains Mono) + statut B2 disponible
- [ ] **LAYOUT-06**: NoiseOverlay — grain CSS animé overlay sur toutes les pages

### Hero Section

- [ ] **HERO-01**: HeroShader WebGL — fragment shader scan lines vertes + mouse ripple fullscreen background
- [ ] **HERO-02**: TiltPhoto — photo sandro.jpg en tilt 3D au hover + glow vert + RGB glitch au load
- [ ] **HERO-03**: Hero layout complet — nom massif Syne 800 gauche 55% + photo droite 45% + pills + boutons magnétiques
- [ ] **HERO-04**: TypeWriter — animation curseur sur le sous-titre "Créateur de systèmes IA_"
- [ ] **HERO-05**: TextScramble intégré sur les titres H1 Hero au load + transition depuis BootLoader

### Canvas Projets

- [ ] **CANVAS-01**: Agent Studio canvas — terminal animé avec lignes de code défilantes (JetBrains Mono vert)
- [ ] **CANVAS-02**: ATLAS Trading canvas — graphique OHLC animé avec prix en temps réel simulé
- [ ] **CANVAS-03**: TikTok Pipeline canvas — grille frames 9:16 animée avec transitions
- [ ] **CANVAS-04**: Job Bot canvas — kanban flow animé avec cards qui se déplacent

### Pages Complètes

- [ ] **PAGE-01**: Home — Hero + AboutHome preview + ProjectsGrid (3 projets preview) + ToolsMarquee
- [ ] **PAGE-02**: Projects — grille asymétrique CSS Grid + 7 cards + filtre CLI dropdown (ALL/WEB/IA/DESIGN)
- [ ] **PAGE-03**: About — bio typewriter + tilt photo + stats CountUp (05/20/∞) + skills CLI barres + timeline stroke-draw
- [ ] **PAGE-04**: Contact — terminal form fullpage (nom/email/sujet dropdown/message) + card alternance "● DISPONIBLE B2 · Sept 2025"
- [ ] **PAGE-05**: ProjectCard component — default + hover avec overlay infos (titre, tags, année, statut)
- [ ] **PAGE-06**: MagneticBtn component — effet magnétique GSAP sur boutons CTA
- [ ] **PAGE-07**: Numéros de section en background (01, 02, 03...) sur chaque section

### Animations & Polish

- [ ] **ANIM-01**: ScrollTrigger — TextScramble sur chaque H1/H2 au scroll dans le viewport
- [ ] **ANIM-02**: ScrollTrigger — CountUp stats animé sur About
- [ ] **ANIM-03**: ScrollTrigger — barres skills CLI animées au scroll
- [ ] **ANIM-04**: ScrollTrigger — stroke-draw timeline animé
- [ ] **ANIM-05**: Responsive — mobile (Three.js off, cursor off, animations légères, menu hamburger)
- [ ] **ANIM-06**: SEO — meta tags, OG image, title, description par page
- [ ] **ANIM-07**: Performance — lazy loading images, code splitting routes, build optimisé
- [ ] **ANIM-08**: Build Vercel-ready — vite.config.ts configuré, public assets, pas d'erreur build

## v2 Requirements

### Améliorations futures

- **V2-01**: Mode sombre/clair toggle (actuellement 100% dark)
- **V2-02**: Blog/articles intégré
- **V2-03**: Formulaire contact connecté à un vrai service (EmailJS/Resend)
- **V2-04**: Section testimonials clients
- **V2-05**: Internationalisation FR/EN
- **V2-06**: PWA / installable

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend réel | Portfolio statique, pas besoin de serveur |
| CMS dynamique | Contenu stable, static suffit |
| Auth/dashboard | Hors scope portfolio vitrine |
| Figma MCP design | Utilisateur préfère coder directement depuis le brief |
| Blog | Hors scope v1 |
| Chat/messagerie temps réel | Complexité disproportionnée |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 1 | Pending |
| FOUND-06 | Phase 1 | Pending |
| FOUND-07 | Phase 1 | Pending |
| LAYOUT-01 | Phase 2 | Pending |
| LAYOUT-02 | Phase 2 | Pending |
| LAYOUT-03 | Phase 2 | Pending |
| LAYOUT-04 | Phase 2 | Pending |
| LAYOUT-05 | Phase 2 | Pending |
| LAYOUT-06 | Phase 2 | Pending |
| HERO-01 | Phase 3 | Pending |
| HERO-02 | Phase 3 | Pending |
| HERO-03 | Phase 3 | Pending |
| HERO-04 | Phase 3 | Pending |
| HERO-05 | Phase 3 | Pending |
| CANVAS-01 | Phase 4 | Pending |
| CANVAS-02 | Phase 4 | Pending |
| CANVAS-03 | Phase 4 | Pending |
| CANVAS-04 | Phase 4 | Pending |
| PAGE-01 | Phase 5 | Pending |
| PAGE-02 | Phase 5 | Pending |
| PAGE-03 | Phase 5 | Pending |
| PAGE-04 | Phase 5 | Pending |
| PAGE-05 | Phase 5 | Pending |
| PAGE-06 | Phase 5 | Pending |
| PAGE-07 | Phase 5 | Pending |
| ANIM-01 | Phase 6 | Pending |
| ANIM-02 | Phase 6 | Pending |
| ANIM-03 | Phase 6 | Pending |
| ANIM-04 | Phase 6 | Pending |
| ANIM-05 | Phase 6 | Pending |
| ANIM-06 | Phase 6 | Pending |
| ANIM-07 | Phase 6 | Pending |
| ANIM-08 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 35 total
- Mapped to phases: 35
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-08*
*Last updated: 2026-03-08 after initial definition*
