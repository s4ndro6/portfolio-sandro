/* ============================================================
   Sandro Portfolio V5 — Content Data Layer
   All portfolio data: projects, timeline, skills
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
  media: string | null
  mediaType: 'image' | 'canvas-terminal' | 'canvas-chart' | 'canvas-frames'
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
    id: "01", slug: "pulse-digital",
    title: "PULSE\nDIGITAL",
    subtitle: "Agence créative digitale",
    year: "2024", status: "Livré", location: "Lille, France",
    description: "Studio créatif étudiant propulsant PME et créateurs locaux.",
    tags: ["Web Design", "Identité", "React", "Motion"],
    color: "#C8FF00",
    media: "/images/pulse_digital.png", mediaType: "image",
    size: "large"
  },
  {
    id: "02", slug: "direction-artistique",
    title: "DIRECTION\nARTISTIQUE",
    subtitle: "Parfum Capace Vylor",
    year: "2024", status: "Livré", location: "Studio, Lille",
    description: "Direction artistique complète pour lancement parfum.",
    tags: ["Photo Direction", "Retouche", "Lightroom", "Branding"],
    color: "#FF4D6D",
    media: "/images/avant-apres.png", mediaType: "image",
    size: "small"
  },
  {
    id: "03", slug: "magazine-editorial",
    title: "L'HÉRITAGE\nDU BITHUME",
    subtitle: "Design éditorial magazine",
    year: "2024", status: "Livré", location: "Ynov Lille",
    description: "Magazine éditorial Fast & Furious.",
    tags: ["Editorial Design", "InDesign", "Typography", "Art Direction"],
    color: "#FFB800",
    media: "/images/magazine.png", mediaType: "image",
    size: "medium"
  },
  {
    id: "04", slug: "sites-clients",
    title: "SITES\nCLIENTS",
    subtitle: "Webdesign & intégration",
    year: "2023–2025", status: "Livré", location: "Hauts-de-France",
    description: "Conception et développement de sites web clients.",
    tags: ["Web Design", "Figma", "HTML/CSS", "SEO"],
    color: "#4DFFB4",
    media: "/images/491shots_so.png", mediaType: "image",
    size: "large"
  },
  {
    id: "05", slug: "agent-studio",
    title: "AGENT\nSTUDIO",
    subtitle: "Contrôle PC par IA",
    year: "2025", status: "En cours", location: "Lille — Local",
    description: "Agent IA local qui contrôle le bureau via FastAPI + Ollama + Groq.",
    tags: ["FastAPI", "Ollama", "Groq", "Python", "Docker"],
    color: "#C8FF00",
    media: null, mediaType: "canvas-terminal",
    size: "medium"
  },
  {
    id: "06", slug: "atlas-trading",
    title: "ATLAS\nTRADING",
    subtitle: "Robot trading Python/MT5",
    year: "2025", status: "En cours", location: "Remote",
    description: "Bot de trading algorithmique sur MetaTrader 5.",
    tags: ["Python", "MT5", "Pandas", "NumPy", "Algo"],
    color: "#FF4D6D",
    media: null, mediaType: "canvas-chart",
    size: "small"
  },
  {
    id: "07", slug: "tiktok-pipeline",
    title: "TIKTOK\nPIPELINE",
    subtitle: "Motion Control IA 1080×1920",
    year: "2025", status: "En cours", location: "RunPod Cloud",
    description: "Pipeline génération vidéo verticale automatisée.",
    tags: ["ComfyUI", "WAN2.2", "RunPod", "Python", "FFmpeg"],
    color: "#FFB800",
    media: null, mediaType: "canvas-frames",
    size: "large"
  }
]

export const timeline: TimelineEntry[] = [
  { year: "2025", title: "Follow Park", desc: "CDI essai · 21h/semaine · Gestion parking connecté" },
  { year: "2024", title: "Micro-entreprise", desc: "Alessandro Schillaci · Premiers clients · 7 projets" },
  { year: "2023", title: "Ynov Lille B1", desc: "Chef de Projets Digitaux · Projets réels · Certifications" },
  { year: "2020", title: "Sapeur-Pompier Volontaire", desc: "3 ans de terrain · Rigueur · Travail d'équipe · Engagement" }
]

export const skills: SkillCategory[] = [
  { category: "IA & LLM", items: [
    { name: "Claude API", level: 88 },
    { name: "Ollama (local)", level: 82 },
    { name: "n8n Automation", level: 85 },
    { name: "Groq / OpenRouter", level: 80 }
  ]},
  { category: "3D & MOTION", items: [
    { name: "GSAP", level: 90 },
    { name: "Three.js", level: 72 },
    { name: "ComfyUI", level: 85 },
    { name: "Framer Motion", level: 82 }
  ]},
  { category: "DÉVELOPPEMENT", items: [
    { name: "React / Vite", level: 88 },
    { name: "Python", level: 82 },
    { name: "FastAPI", level: 75 },
    { name: "Docker", level: 70 }
  ]},
  { category: "DESIGN", items: [
    { name: "Figma", level: 85 },
    { name: "Adobe PS / AI", level: 80 },
    { name: "InDesign", level: 75 },
    { name: "Direction Artistique", level: 85 }
  ]}
]

export const tools = [
  "Claude", "Ollama", "Groq", "OpenRouter", "n8n", "LangChain",
  "Three.js", "GSAP", "ComfyUI", "WAN2.2", "Remotion",
  "React", "Vite", "FastAPI", "Python", "Docker",
  "TypeScript", "Vercel", "Git", "RunPod", "MT5",
  "Figma", "Blender", "Framer Motion"
]
