# CHECKPOINT EMERGENCY — Contexte 84%

## PHASE 1 — TERMINÉE ✅
- EchoTitle.tsx créé : SANDRO ×2 (main + écho outline), parallax scroll différent (scrub 1.5 vs 2), classe .echo-title
- TiltPhoto.tsx V2 : breathing idle (y:-12 sine.inOut repeat:-1), glow dynamique (boxShadow selon souris), pause/resume sur hover
- Hero.tsx : EchoTitle intégré, line1Ref/line2Ref passés en props, animations lentes (1.2s power4.out), mouse scrub global (echo x*15/y*10, photo rotateY*3), clipPath reveal photo gauche→droite

## PHASES 2, 3, 4 — À FAIRE (prochaine session)

### PHASE 2 — Sticky + Marquee + Loader + Mouse scrub
**Loader.tsx** : Ajouter echoNameRef (outline "Sandro") animé après le nom principal
  - Sequence: line → nameRef clipPath → echoNameRef clipPath (delay 0.1s) → pause → panels split

**AboutSnippet.tsx** : Sticky layout
  - section: display grid, gridTemplateColumns '1fr 1fr', alignItems start
  - Left: position sticky, top 0, height 100vh — img sandro.jpg objectFit cover objectPosition 'center 20%'
  - Right: div avec 2 blocs de 100vh chacun (bio + stats/citation)
  - Supprimer l'animation ScrollTrigger .animate-in (sticky gère le reveal)

**TextMarquee.tsx** : 2 lignes vitesses différentes
  - Ligne 1: → 35s, clamp(60px, 7vw, 100px), Syne 800, opacity 0.06, animation marquee-ltr
  - Ligne 2: ← 27s, même taille, animation marquee-rtl (keyframe à ajouter dans globals.css)
  - Text : "SANDRO · CRÉATEUR IA · PULSE DIGITAL · VISION 2 · AUTOMATION · LILLE ·"

### PHASE 3 — Projets + PageTransition + Lenis
**PageTransition.tsx** : Rideau vert #C8FF00
  - Ajouter fixed div background var(--accent) zIndex 0 (derrière le contenu)
  - Contenu: variants inset clipPath initial 'inset(100% 0 0% 0)' → animate 'inset(0% 0 0% 0)' → exit 'inset(0% 0 100% 0)'
  - Duration 0.55s enter, 0.45s exit, ease [0.76,0,0.24,1]

**main.tsx** : Lenis lerp 0.06, wheelMultiplier 0.85

**ProjectCard** : hover image 1.0s (était 0.8s), overlay 0.55s power3.out

### PHASE 4 — About page + Build
**About.tsx** : Citation mot par mot
  - Wrapper div ref, split(' ').map → span className="word" style opacity 0.15
  - gsap.to(words, { opacity: 1, stagger: 0.04, scrollTrigger... })
  - Supprimer le <br /> dans la citation (le span inline gère)

**npm run build** → 0 erreurs TS

## ÉTAT DES FICHIERS MODIFIÉS (cette session)
- src/components/ui/EchoTitle.tsx ← NOUVEAU
- src/components/ui/TiltPhoto.tsx ← MODIFIÉ
- src/components/sections/Hero.tsx ← MODIFIÉ
