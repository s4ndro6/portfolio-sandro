# CHECKPOINT PHASE 3 ✅

## Pages projet détaillées
- src/pages/Project.tsx créé — route /projets/:slug
- Hero plein écran avec parallax scrub, watermark numéro géant, titre + badges + tags
- Description 2 colonnes : texte long (longDesc, challenge, result) + meta (année/statut/type/outils)
- Galerie auto si mediaAlt présent (sites-clients)
- Nav prev/next avec titre du projet adjacent
- 404 fallback si slug inconnu

## content.ts
- Export projectDetails ajouté avec 6 projets (pulse-digital, vision-2, atlas-trading, direction-artistique, magazine-editorial, sites-clients)

## App.tsx
- Route /projets/:slug → <Project /> ajoutée

## ProjectCard.tsx
- Wrappé dans <Link to={/projets/:slug}> — navigation interne, hover effects conservés
