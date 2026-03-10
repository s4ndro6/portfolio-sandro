# CHECKPOINT PHASE 2 ✅

## Loader — séquence 3 temps
- TEMPS 1 (0→0.6s) : ligne 1px accent scaleX 0→1, transformOrigin left
- TEMPS 2 (0.6→1.4s) : "SANDRO" 15vw clip-path inset(0 100% 0 0)→inset(0 0% 0 0)
- TEMPS 3 (1.4→2.0s) : fade centre + split panels top/bot, power4.in → onComplete

## Hero — animations lettres
- SANDRO : chaque lettre dans overflow:hidden span, gsap.from y:'110%' stagger 0.06
- SCHILLACI : idem, stagger -0.05 (droite→gauche), classe outline héritée
- Séparateur accent : scaleX 0→1
- Subtitle + pills : y:20→0 opacity stagger
- Boutons : y:15→0 opacity stagger
- Photo : x:60→0 opacity 1.2s
