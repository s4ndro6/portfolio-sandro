# CHECKPOINT PHASE 3 ✅ — POLISH VISUEL

## FloatingImages
- Déjà supprimé (session précédente) ✅

## ProjectCard hover fix
- onLeave : clipPath 'inset(0% 0 100% 0)' → overlay sort par le bas (power2.in 0.32s)
- killTweensOf() présent sur enter ET leave ✅

## Projects.tsx
- Grille 12 colonnes asymétrique déjà en place ✅ (rangées 7/5 · 5/7 · 7/5)

## ProjectsStrip.tsx
- ScrollTrigger importé
- setTimeout 200ms avant création du ScrollTrigger
- dist calculé et vérifié (dist <= 0 → return)
- scrub: 1.2 (était 1)
- ScrollTrigger.refresh() après création
- cleanup : clearTimeout + ctx.revert()
