# CHECKPOINT PHASE 1 ✅ — FIX HERO

## Problème résolu
- SANDRO ne se casse plus sur plusieurs lignes
- Animation lettre-par-lettre supprimée → clipPath sur lignes entières

## Changes
- globals.css : classe .hero-line ajoutée (display:block, white-space:nowrap, clamp(52px,10vw,160px))
- Hero.tsx : line1Ref / line2Ref sur spans .hero-line dans overflow:hidden wrappers
- Animation : gsap.from(line1Ref, { y: '105%', duration: 1.0, power4.out })
- SCHILLACI : WebkitTextStroke '1.5px var(--text-0)', color transparent
- Bouton "MES PROJETS →" : background var(--accent), color #0C0C0A, font-weight 600
- Bouton "ALTERNANCE B2 ↓" : Link vers /contact
