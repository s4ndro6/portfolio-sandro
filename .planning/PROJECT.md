# AAZ Portfolio V4

## What This Is

Portfolio professionnel ultra-interactif d'Alessandro Schillaci (AAZ), 20 ans, Lille — micro-entrepreneur IA & automation, designer créatif, étudiant Chef de Projets Digitaux Ynov B1→B2. Direction artistique Cinematic Brutalism, palette vert phosphore exclusive, animations GSAP/Three.js poussées. Cible : clients potentiels, recruteurs alternance B2 (sept 2025), collaborateurs créatifs.

## Core Value

Chaque visiteur doit ressentir en 5 secondes qu'Alessandro est un créateur de systèmes IA de haut niveau — le portfolio doit être aussi impressionnant techniquement que visuellement.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] BootLoader terminal séquencé (2s) avant affichage du site
- [ ] Hero section : nom massive Syne 800 + photo tilt 3D + shader WebGL scan lines
- [ ] TextScramble sur tous les titres H1/H2 au scroll/load
- [ ] Cursor trail 8 clones + états hover/drag/copy
- [ ] StatusBar fixe bas de page (heure temps réel + statut B2)
- [ ] Navbar transparent → blur au scroll + pill B2 disponible
- [ ] PageTransition clip-path diagonal entre pages
- [ ] Projects galerie asymétrique 7 projets (4 images, 3 canvas animés)
- [ ] Canvas animés : terminal (Agent Studio), chart OHLC (ATLAS), frames TikTok, kanban (Job Bot)
- [ ] About : bio typewriter + tilt photo + stats CountUp + skills CLI + timeline stroke-draw
- [ ] Contact : terminal form fullpage
- [ ] Lenis smooth scroll + GSAP ScrollTrigger intégration
- [ ] Responsive mobile (Three.js off, cursor off, animations light)
- [ ] Build Vercel-ready optimisé
- [ ] Noise overlay + section numbers (01, 02, 03...)

### Out of Scope

- Backend/API réels (formulaire contact → simulation) — complexité hors scope portfolio
- CMS dynamique — contenu statique suffit pour portfolio
- Auth/dashboard — pas pertinent pour un portfolio vitrine
- Blog — hors scope v1, peut venir en v2
- Internationalisation EN/FR — FR uniquement pour le moment

## Context

**DA : Cinematic Brutalism × Creative Technologist**

Palette :
- bg-0 : #020804 / bg-1 : #040D06 / bg-2 : #071209
- text-0 : #E8F4F0 / text-1 : #4A6B5A
- accent : #00FF88 / accent-dim : rgba(0,255,136,0.06)
- red : #FF2D55 / white : #FFFFFF

Typographie :
- Display H1/H2 : Syne ExtraBold 800
- Body : DM Sans 400, 16-20px, line-height 1.75
- Mono : JetBrains Mono 400/500, 11-13px

Stack : React 18 + Vite + TypeScript + GSAP + Three.js + Framer Motion + Lenis + React Router

Images disponibles dans `C:\Users\sandr\OneDrive\Desktop\portfolio F\portfolio-sandro\public\images\` :
sandro.jpg, pulse_digital.png, avant-apres.png, magazine.png, 491shots_so.png

7 projets définis avec data complète (voir content.ts). 4 images réelles, 3 canvas programmatiques.

Alessandro : Micro-entrepreneur AAZ depuis 2024, travaille chez Follow Park (CDI essai 21h/sem), Sapeur-Pompier Volontaire (2020-2023), Ynov Lille B1→B2.

## Constraints

- **Tech Stack**: React 18 + Vite + TypeScript — pas de framework CSS externe (MUI/shadcn/Chakra)
- **Fonts**: Syne + DM Sans + JetBrains Mono UNIQUEMENT — pas Inter/Roboto/Arial en display
- **Couleur accent**: #00FF88 UNIQUE — pas de gradient purple/violet
- **Animations**: GSAP + Framer Motion + CSS custom — pas scroll-snap CSS
- **Images manquantes**: Canvas animés programmatiques obligatoires (pas de placeholder gris)
- **Sections**: Numéro background obligatoire (01, 02, 03...)
- **Déploiement**: Vercel-ready (build statique)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React 18 + Vite + TypeScript | Moderne, rapide, DX optimal, compatible avec GSAP/Three.js | — Pending |
| Syne ExtraBold comme font display | DA Cinematic Brutalism, personnalité forte, différenciant | — Pending |
| Three.js WebGL hero shader | Immersion maximale dès la landing, différenciateur fort | — Pending |
| Canvas animés pour projets sans image | Cohérence visuelle, démontre la maîtrise code | — Pending |
| Lenis smooth scroll | Fluidité premium, compatible GSAP ScrollTrigger | — Pending |
| BootLoader terminal 2s | Crée de l'anticipation, signature "créateur de systèmes" | — Pending |
| Cursor trail 8 clones | Identité visuelle forte, effet "studio créatif" | — Pending |
| TextScramble sur tous les titres | Cohérence de l'identité, effet "hacker/tech" maîtrisé | — Pending |

---
*Last updated: 2026-03-08 after initialization*
