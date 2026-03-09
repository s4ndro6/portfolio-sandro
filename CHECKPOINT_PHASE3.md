# CHECKPOINT AAZ V4 — Phase 3 Complete
Date: 2026-03-09

## ✅ FAIT
- `HeroShader.tsx` : React Three Fiber Canvas plein écran, ShaderMaterial custom
  - Fragment shader : scanlines + bruit + ripple souris + vignette + glow bas
  - uTime via useFrame, uMouse lerp via mousemove
- `TiltPhoto.tsx` : perspective 1000px, GSAP rotateY/X 15/-8deg, elastic.out retour
  - Glitch RGB au mount (3 frames 40ms, hue-rotate)
  - Badge RTX 4070 · ONLINE flottant + caption
- `TypeWriter.tsx` : character-by-character setInterval, curseur | clignotant
- `TextScramble.tsx` : composant React wrappant TextScramble utility
- `Hero.tsx` : grid 55/45, GSAP timeline onLoaded (label→h1→typewriter→pills→buttons→photo)
  - h1 ALESSANDRO + h1 SCHILLACI .outline
  - Pills stagger, boutons magnétiques

## 📁 FICHIERS CLÉS
- src/components/three/HeroShader.tsx
- src/components/ui/TiltPhoto.tsx
- src/components/ui/TypeWriter.tsx
- src/components/sections/Hero.tsx

## 💬 PROMPT DE REPRISE
> Reprends le portfolio AAZ V4 depuis le checkpoint Phase 3.
> Lis CHECKPOINT_PHASE3.md et continue à partir de la Phase 4.
