
export const projects = [
  // --- PROJETS RÉELS (Restaurés) ---
  {
    id: 1,
    title: "Automatisation Lead Gen",
    role: "Automation Engineer (n8n)",
    image: "/images/pulse digital.png",
    shortDesc: "Système d'automatisation de prospection intelligente.",
    brief: "Optimiser le tunnel de vente d'une agence digitale en automatisant la récolte et le tri de leads.",
    reflection: "L'objectif était de réduire le temps de traitement manuel de 70% tout en restant ultra-personnalisé. Gain de productivité via l'IA et les workflows.",
    realization: "Workflow n8n complexe avec embranchements logiques et notifications Slack en temps réel.",
    results: ["-70% Traitement Manuel", "Scoring IA Actif", "Pipeline Fluide"],
    tags: ["n8n", "AI", "CRM"]
  },
  {
    id: 2,
    title: "Stratégie Social Media",
    role: "Social Media Strategist",
    image: "/images/magazine.png",
    shortDesc: "Lancement d'une gamme 'Éco-Performance' secteur Sport.",
    brief: "Créer une stratégie d'acquisition sur TikTok et Instagram pour une marque de sport majeure.",
    reflection: "Focus sur l'authenticité et le storytelling de terrain. Pourquoi ? Parce que l'audience actuelle rejette les publicités trop polies.",
    realization: "Planning éditorial, concepts de vidéos UGC et structure de campagnes publicitaires ciblées.",
    results: ["Reach Organique x3", "ROAS Target Atteint", "Communauté Engagée"],
    tags: ["Strategy", "TikTok", "UGC"]
  },
  {
    id: 3,
    title: "App 'RescueSync'",
    role: "UX/UI Designer",
    image: "/images/491shots_so.png",
    shortDesc: "App de coordination pour services d'urgence.",
    brief: "Concevoir une interface intuitive pour la gestion des interventions en temps réel, inspirée de mon expérience de terrain.",
    reflection: "L'enjeu majeur était la lisibilité sous stress. J'ai opté pour un mode sombre à haut contraste et des zones de clic larges pour une utilisation immédiate.",
    realization: "Prototype complet sous Figma avec 15 écrans clés, testé sur des scénarios d'urgence réels.",
    results: ["Validation Terrain", "UX 'Stress-Proof'", "Design System"],
    tags: ["Figma", "Mobile", "UX Research"]
  },
  {
    id: 4,
    title: "Landing Page Tech",
    role: "Creative Dev",
    image: "/images/avant-apres.png",
    shortDesc: "Site vitrine pour une Startup IA.",
    brief: "Créer un site vitrine qui inspire la confiance et l'innovation technique.",
    reflection: "Utilisation du style 'Glassmorphism' pour évoquer la transparence (valeur qui m'est chère) et la clarté.",
    realization: "Développement sous React avec des animations fluides pour captiver l'utilisateur dès les premières secondes.",
    results: ["Conversion +5%", "Awwwards Nominee", "Performance 99/100"],
    tags: ["React", "Motion", "Glassmorphism"]
  },

  // --- NOUVEAUX PROJETS (Images Unsplash) ---

  {
    id: 5,
    title: "E-Shop Minimaliste",
    role: "Full Stack Dev",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Plateforme e-commerce pour marque de design.",
    brief: "Développer une expérience d'achat fluide et esthétique.",
    reflection: "Performance et SEO étaient les priorités.",
    realization: "Next.js, Stripe et Sanity CMS.",
    results: ["Vitesse Page 99/100", "Conversion +15%"],
    tags: ["Next.js", "Stripe", "E-commerce"]
  },
  {
    id: 6,
    title: "Dashboard Financier",
    role: "Frontend Dev",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Interface de visualisation de données boursières.",
    brief: "Simplifier la lecture de graphiques complexes.",
    reflection: "Utilisation de D3.js pour des visualisations interactives.",
    realization: "React, D3.js, WebSocket pour les données temps réel.",
    results: ["Temps Réel", "UX Fluide"],
    tags: ["React", "Data Viz", "Finance"]
  },
  {
    id: 7,
    title: "App Voyage",
    role: "Mobile Dev (React Native)",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Compagnon de voyage tout-en-un.",
    brief: "Centraliser réservations et itinéraires hors ligne.",
    reflection: "L'usage hors ligne était le défi technique principal.",
    realization: "React Native, WatermelonDB.",
    results: ["50k+ Téléchargements", "Note 4.7/5"],
    tags: ["Mobile", "React Native", "Travel"]
  },
  {
    id: 8,
    title: "Campagne Randonnée",
    role: "Digital Marketer",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Promotion multicanale équipement outdoor.",
    brief: "Lancer une nouvelle gamme de sacs à dos.",
    reflection: "Ciblage précis des passionnés de trek.",
    realization: "Google Ads, Facebook Ads et Influenceurs.",
    results: ["ROAS 3.8", "Ventes Records"],
    tags: ["Ads", "Marketing", "Outdoor"]
  },
  {
    id: 9,
    title: "Architecture Cloud",
    role: "DevOps",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Migration infrastructure haute disponibilité.",
    brief: "Sécuriser et scaler l'infrastructure d'une startup.",
    reflection: "Adoption de Kubernetes pour l'orchestration.",
    realization: "AWS, Docker, K8s, Terraform.",
    results: ["Uptime 99.99%", "Coûts -20%"],
    tags: ["DevOps", "AWS", "Cloud"]
  },
  {
    id: 10,
    title: "IA Génératrice Art",
    role: "AI Engineer",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Plateforme de génération d'images par IA.",
    brief: "Rendre la création d'art génératif accessible.",
    reflection: "Optimisation des temps d'inférence.",
    realization: "Python, PyTorch, Stable Diffusion.",
    results: ["1M+ Images", "Communauté Active"],
    tags: ["AI", "Python", "Art"]
  },
  {
    id: 11,
    title: "App Méditation",
    role: "Product Designer",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Application de bien-être mental.",
    brief: "Interface apaisante pour réduire le stress.",
    reflection: "Usage de la psychologie des couleurs.",
    realization: "Figma, Prototyping, User Testing.",
    results: ["Prix Design", "Retention Haute"],
    tags: ["UI/UX", "Wellness", "App"]
  },
  {
    id: 12,
    title: "Smart Home Dashboard",
    role: "IoT Developer",
    image: "https://images.unsplash.com/photo-1558002038-10917738179d?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Contrôle domotique centralisé.",
    brief: "Connecter tous les objets intelligents de la maison.",
    reflection: "Interopérabilité des protocoles (Zigbee, WiFi).",
    realization: "Node.js, MQTT, React.",
    results: ["Compatible 100+ Devices", "Open Source"],
    tags: ["IoT", "Smart Home", "Node.js"]
  },
  {
    id: 13,
    title: "Food Delivery API",
    role: "Backend Dev",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    shortDesc: "API robuste pour livraison de repas.",
    brief: "Gérer des milliers de commandes simultanées.",
    reflection: "Architecture microservices pour la résilience.",
    realization: "Go, gRPC, PostgreSQL.",
    results: ["Latence <50ms", "Scalabilité"],
    tags: ["Backend", "Go", "API"]
  },
  {
    id: 14,
    title: "Magazine Mode",
    role: "Web Designer",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Site éditorial pour fashion week.",
    brief: "Mettre en valeur les collections haute couture.",
    reflection: "Typographie audacieuse et grille asymétrique.",
    realization: "Webflow, Custom Code.",
    results: ["Awwwards Site of Day", "Traffic Record"],
    tags: ["Web Design", "Fashion", "Editorial"]
  }
];
