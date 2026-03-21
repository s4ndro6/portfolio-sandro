/* ============================================================
   Sandro Portfolio V8 — Content Data Layer
   ============================================================ */

export interface Project {
  id: string
  slug: string
  title: string
  subtitle: string
  year: string
  status: string
  location: string
  description: string
  tags: string[]
  color: string
  media: string
  size: 'small' | 'medium' | 'large'
}

export interface TimelineEntry {
  year: string
  title: string
  desc: string
}

export interface SkillItem {
  name: string
  level: number
}

export interface SkillCategory {
  category: string
  items: SkillItem[]
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "pulse-digital",
    title: "PULSE\nDIGITAL",
    subtitle: "Agence créative digitale",
    year: "2024",
    status: "Livré",
    location: "Lille, France",
    description: "Studio créatif propulsant PME et créateurs locaux. Identité visuelle complète, site web, stratégie digitale. Faites battre le cœur de votre marque.",
    tags: ["Web Design", "Identité", "React", "Motion"],
    color: "#C8FF00",
    media: "/images/pulse_digital.png",
    size: "large",
  },
  {
    id: "02",
    slug: "direction-artistique",
    title: "DIRECTION\nARTISTIQUE",
    subtitle: "Parfum Capace Vylor",
    year: "2024",
    status: "Livré",
    location: "Studio, Lille",
    description: "Direction artistique complète pour le lancement du parfum Vylor. Mise en scène lumineuse contre-jour, retouche Lightroom, impact visuel maximal avant/après.",
    tags: ["Photo Direction", "Retouche", "Lightroom", "Branding"],
    color: "#FF4D6D",
    media: "/images/avant-apres.png",
    size: "small",
  },
  {
    id: "03",
    slug: "magazine-editorial",
    title: "L'HÉRITAGE\nDU BITHUME",
    subtitle: "Design éditorial magazine",
    year: "2024",
    status: "Livré",
    location: "Ynov Lille",
    description: "Magazine éditorial Fast & Furious. Layout double-page duel sombre/clair, typographie massive, direction artistique cinématographique.",
    tags: ["Editorial", "InDesign", "Typography", "Art Direction"],
    color: "#FFB800",
    media: "/images/magazine.png",
    size: "medium",
  },
  {
    id: "04",
    slug: "site-client-rh",
    title: "SITE\nRH",
    subtitle: "Cabinet RH lillois",
    year: "2024",
    status: "Livré",
    location: "Lille, France",
    description: "Site web complet pour un cabinet RH lillois. De la maquette Figma à la mise en ligne, responsive et SEO optimisé.",
    tags: ["React", "Web", "Design"],
    color: "#4DFFB4",
    media: "/images/site1.png",
    size: "small",
  },
  {
    id: "05",
    slug: "site-client-asso",
    title: "SITE\nASSOCIATION",
    subtitle: "Association culturelle",
    year: "2024",
    status: "Livré",
    location: "Hauts-de-France",
    description: "Site vitrine pour une association culturelle des Hauts-de-France. Design accessible, gestion autonome via CMS.",
    tags: ["Web", "CMS", "Design"],
    color: "#FFB800",
    media: "/images/site2.png",
    size: "small",
  },
  {
    id: "06",
    slug: "site-client-portfolio",
    title: "SITE\nPORTFOLIO",
    subtitle: "Portfolio créatif client",
    year: "2024",
    status: "Livré",
    location: "Remote",
    description: "Portfolio premium pour un client créatif. Animations GSAP, dark mode, typographie Syne.",
    tags: ["React", "Vite", "Design"],
    color: "#C8FF00",
    media: "/images/site3.png",
    size: "small",
  },
  {
    id: "06-b",
    slug: "site-client-4",
    title: "SITE\nCLIENT",
    subtitle: "Site client livré",
    year: "2024",
    status: "Livré",
    location: "Remote",
    description: "Site web livré pour un client — design premium, responsive, optimisé.",
    tags: ["Web", "Design", "Développement"],
    color: "#FF4D6D",
    media: "/images/site4.png",
    size: "small",
  },
  {
    id: "06-c",
    slug: "site-client-5",
    title: "SITE\nCLIENT",
    subtitle: "Site client livré",
    year: "2024",
    status: "Livré",
    location: "Remote",
    description: "Site web livré pour un client — design premium, responsive, optimisé.",
    tags: ["Web", "Design", "Développement"],
    color: "#FFB800",
    media: "/images/site5.png",
    size: "small",
  },
  {
    id: "06-d",
    slug: "alternance-hunt",
    title: "ALTERNANCE\nHUNT",
    subtitle: "Pipeline d'automatisation IA",
    year: "2025",
    status: "Actif",
    location: "Lille — Remote",
    description: "Système n8n complet de candidature automatique. 226+ emails envoyés, 94+ candidatures via API France Travail, agent IA de personnalisation des lettres de motivation en temps réel. Stack : n8n, OpenAI, SerpAPI, Gmail API.",
    tags: ["n8n", "OpenAI", "API", "Automation", "Gmail API", "SerpAPI"],
    color: "#84FF00",
    media: "/images/alternance_hunt.png",
    size: "large",
  },
  {
    id: "07",
    slug: "vision-2",
    title: "VISION 2",
    subtitle: "Agent IA autonome",
    year: "2025",
    status: "En cours",
    location: "Lille — Local",
    description: "Agent IA autonome que j'ai conçu et développé de A à Z. Vision 2 voit ton écran, comprend tes commandes vocales et exécute des tâches complexes en autonomie. Projet quasi finalisé — propulsé par Ollama + Groq sur ma RTX 4070.",
    tags: ["FastAPI", "Ollama", "Groq", "Python", "RTX 4070"],
    color: "#C8FF00",
    media: "/images/vision2.png",
    size: "large",
  },
  {
    id: "08",
    slug: "atlas-trading",
    title: "ATLAS\nTRADING",
    subtitle: "Robot trading Python/MT5",
    year: "2025",
    status: "En cours",
    location: "Remote",
    description: "Bot de trading algorithmique sur MetaTrader 5. Stratégies automatisées XAUUSD, gestion du risque, backtesting intégré.",
    tags: ["Python", "MT5", "Pandas", "NumPy"],
    color: "#FF4D6D",
    media: "/images/atlas_trading.png",
    size: "small",
  },
]

export const timeline: TimelineEntry[] = [
  { year: "2025", title: "Pulse Digital", desc: "Micro-entreprise fondée · Design IA & Automation · Lille" },
  { year: "2024–2025", title: "Ynov Lille", desc: "Chef de Projets Digitaux B1 · En recherche alternance B2" },
]

export const skills: SkillCategory[] = [
  { category: "IA & Automation", items: [
    { name: "Claude API", level: 88 },
    { name: "Ollama", level: 82 },
    { name: "n8n", level: 85 },
    { name: "Groq", level: 80 },
  ]},
  { category: "3D & Motion", items: [
    { name: "GSAP", level: 90 },
    { name: "Three.js", level: 72 },
    { name: "ComfyUI", level: 85 },
    { name: "Framer Motion", level: 82 },
  ]},
  { category: "Développement", items: [
    { name: "React/Vite", level: 88 },
    { name: "Python", level: 82 },
    { name: "FastAPI", level: 75 },
    { name: "Docker", level: 70 },
  ]},
  { category: "Design", items: [
    { name: "Figma", level: 85 },
    { name: "Photoshop/AI", level: 80 },
    { name: "InDesign", level: 75 },
    { name: "Direction Art.", level: 85 },
  ]},
]

export interface ProjectDetail {
  longDesc: string
  challenge: string
  result: string
}

export const projectDetails: Record<string, ProjectDetail> = {
  'pulse-digital': {
    longDesc: "Pulse Digital c'est ma structure. Créée en 2025 pour transformer ce que je fais en quelque chose de réel. Design complet, identité visuelle, développement web pour PME et créateurs lillois.",
    challenge: "Construire une image professionnelle crédible dès le premier projet, sans portfolio préalable.",
    result: "Site livré, identité cohérente sur tous les supports, premiers clients signés.",
  },
  'vision-2': {
    longDesc: "Vision 2 est l'agent IA que j'ai conçu et développé seul de A à Z. Il capture l'écran en temps réel, analyse le contenu via un LLM multimodal (Ollama qwen2.5vl) et exécute des actions autonomes — clics, saisie, navigation — via PyAutoGUI. Projet quasi finalisé.",
    challenge: "Faire tourner un LLM vision localement avec une latence acceptable. Solution : FastAPI + Groq pour les requêtes rapides, Ollama pour les analyses profondes.",
    result: "Latence moyenne 0.8s. Capable d'exécuter des workflows complets en autonomie sur ma RTX 4070.",
  },
  'atlas-trading': {
    longDesc: "Bot de trading algorithmique sur MetaTrader 5, spécialisé XAUUSD. Stratégies basées sur EMA, RSI, niveaux de support/résistance. Backtesting sur 3 ans de données.",
    challenge: "Gérer le risque dynamiquement et éviter le surapprentissage.",
    result: "+4.7% en simulation. En cours de validation sur compte réel.",
  },
  'direction-artistique': {
    longDesc: "Direction artistique complète pour le lancement du parfum Vylor. Shooting, retouche Lightroom avancée, mise en scène lumineuse contre-jour.",
    challenge: "Créer un rendu haut-de-gamme avec des moyens indie.",
    result: "Visuels utilisés sur tous les supports de lancement. Rendu professionnel.",
  },
  'magazine-editorial': {
    longDesc: "Magazine éditorial Fast & Furious pour un projet Ynov. Layout double-page, typographie massive, direction artistique cinématographique.",
    challenge: "Capturer l'énergie de la franchise sans copier ses codes.",
    result: "Note maximale. Format A4 imprimable, 16 pages, identité forte.",
  },
  'site-client-rh': {
    longDesc: "Site web complet pour un cabinet RH lillois. De la maquette Figma à la mise en ligne, responsive et SEO optimisé.",
    challenge: "Adapter le design à des clients non-techniciens avec un budget serré.",
    result: "Site livré, responsive, SEO optimisé, client autonome sur son CMS.",
  },
  'site-client-asso': {
    longDesc: "Site vitrine pour une association culturelle des Hauts-de-France. Design accessible, gestion autonome via CMS.",
    challenge: "Créer un design accessible et lisible pour un public varié.",
    result: "Site livré, accessible, gestion autonome via CMS, 0 maintenance.",
  },
  'site-client-portfolio': {
    longDesc: "Portfolio premium pour un client créatif. Animations GSAP, dark mode, typographie Syne.",
    challenge: "Traduire l'univers créatif du client en un design distinctif.",
    result: "Portfolio livré avec animations fluides et identité forte.",
  },
  'site-client-4': {
    longDesc: "Site web livré pour un client — design premium, responsive, optimisé.",
    challenge: "Design distinctif avec budget maîtrisé.",
    result: "Site livré, client satisfait.",
  },
  'site-client-5': {
    longDesc: "Site web livré pour un client — design premium, responsive, optimisé.",
    challenge: "Design distinctif avec budget maîtrisé.",
    result: "Site livré, client satisfait.",
  },
  'alternance-hunt': {
    longDesc: "Pipeline n8n complet d'automatisation de candidatures. Scraping des offres France Travail, génération de lettres de motivation personnalisées via OpenAI, envoi automatique par Gmail API. 3 robots actifs en parallèle.",
    challenge: "Orchestrer 3 robots en parallèle sans dépasser les rate limits des API et personnaliser chaque candidature pour éviter le spam.",
    result: "226+ emails envoyés, 94+ candidatures API, 0 erreurs. Pipeline stable et actif.",
  },
}

export const tools = [
  "Claude", "Ollama", "Groq", "n8n", "LangChain", "Three.js", "GSAP",
  "ComfyUI", "WAN2.2", "React", "Vite", "FastAPI", "Python", "Docker",
  "TypeScript", "Vercel", "Git", "RunPod", "MT5", "Figma", "Blender",
  "Framer Motion", "OpenRouter",
]
