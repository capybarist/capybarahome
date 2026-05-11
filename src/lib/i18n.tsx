"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "es" | "en";

// ── Translations ──────────────────────────────────────────────────────────────

const translations = {
  es: {
    // Nav
    nav_services: "Servicios",
    nav_hive: "HIVE",
    nav_community: "Comunidad",
    nav_contact: "Contacto",

    // Home hero
    hero_title: "Construimos software que trabaja por ti",
    hero_sub: "Automatización con IA, desarrollo a medida e integración de sistemas. Entregamos en semanas, no en meses.",
    hero_cta_primary: "Hablemos de tu proyecto",
    hero_cta_secondary: "Ver servicios",

    // Trust pills
    pill_fast: "Entrega ágil",
    pill_secure: "Seguridad por defecto",
    pill_stack: "Stack moderno",

    // Services page / section
    svc_hero_title: "Servicios",
    svc_hero_sub: "Soluciones IT end-to-end que escalan con tu negocio.",
    svc_1_title: "Automatización con IA",
    svc_1_desc: "Orquestamos flujos con n8n y agentes de IA para eliminar trabajo manual: ingestión de datos, respuestas inteligentes, CRM, reporting y más.",
    svc_2_title: "Desarrollo de software",
    svc_2_desc: "Backends robustos (Java/Kotlin, Spring Boot), APIs REST y GraphQL, microservicios, y frontends modernos en React/React Native.",
    svc_3_title: "Consultoría e integración",
    svc_3_desc: "Auditoría de arquitectura, DevOps, CI/CD, seguridad y cumplimiento. Integramos tus sistemas con proveedores externos de forma segura.",
    svc_4_title: "Agentes de IA a medida",
    svc_4_desc: "Diseñamos y desplegamos agentes LLM que razonan, toman decisiones y ejecutan tareas complejas de forma autónoma en tu infraestructura.",

    // Process
    process_title: "Cómo trabajamos",
    process_1_title: "Diagnóstico",
    process_1_desc: "Entendemos tu problema antes de proponer una solución. Análisis de procesos, KPIs y puntos de dolor.",
    process_2_title: "Prototipo",
    process_2_desc: "Entregamos algo funcional en la primera semana. Validamos supuestos con datos reales.",
    process_3_title: "Producción",
    process_3_desc: "Iteramos hasta producción con documentación, tests y handoff para tu equipo.",

    // Stack
    stack_title: "Stack tecnológico",
    stack_lead: "Elegimos la herramienta adecuada, no la moda.",

    // HIVE preview (home)
    hive_preview_badge: "Proyecto open source",
    hive_preview_title: "HIVE — Base de conocimiento descentralizada para LLMs",
    hive_preview_desc: "Una red P2P de BEEs autónomos que extraen, firman y sincronizan conocimiento verificado. Lo que Wikipedia es para los humanos, pero optimizado para ser consumido por máquinas.",
    hive_preview_cta: "Explorar HIVE →",
    hive_preview_stat1: "95 tópicos",
    hive_preview_stat1_desc: "árbol de conocimiento",
    hive_preview_stat2: "ed25519",
    hive_preview_stat2_desc: "firma criptográfica",
    hive_preview_stat3: "P2P nativo",
    hive_preview_stat3_desc: "Hyperswarm + Hypercore",

    // Contact
    contact_title: "¿Hablamos?",
    contact_desc: "Cuéntanos tu caso y te proponemos un plan en 48h.",
    contact_email_label: "Escríbenos",
    contact_cta: "Agendar una llamada",

    // Footer
    foot_privacy: "Privacidad",
    foot_legal: "Aviso legal",
    foot_tagline: "Construido con ☕ y demasiadas líneas de TypeScript.",
    foot_projects: "Proyectos",
    foot_rights: "Todos los derechos reservados.",

    // Section labels (hardcoded en componentes)
    section_services: "Servicios",
    section_process: "Proceso",
    section_follow: "Síguenos",
    hero_badge: "Automatización IA · Software · Open Source",

    // HIVE section labels
    hive_badge_tagline: "Open Source · P2P · Conocimiento verificado",
    hive_section_problem: "El problema",
    hive_section_what: "Qué es",
    hive_section_how: "Cómo funciona",
    hive_section_why: "Por qué importa",
    hive_section_tech: "Tecnología",
    hive_section_status: "Estado",
    hive_section_run: "Ejecuta un BEE",
    hive_status_badge: "v0.2 activo",
    hive_planned_title: "Planificado — v0.3",
    hive_no_blockchain: "Sin blockchain. Sin tokens por ahora. Sin servidor central.",
    hive_github_cta: "Ver en GitHub",

    // HIVE page
    hive_hero_title: "HIVE",
    hive_hero_sub: "Base de conocimiento descentralizada y verificable para LLMs",
    hive_hero_tagline: "Lo que Wikipedia es para los humanos — pero para máquinas.",
    hive_hero_cta_primary: "Ver en GitHub",
    hive_hero_cta_secondary: "Cómo funciona",

    hive_problem_title: "El problema con el conocimiento en IA",
    hive_problem_desc: "Los modelos de IA de hoy — GPT, Claude, Gemini — se entrenan una vez y se congelan. Su conocimiento tiene una fecha de corte. Alucinan cuando no saben algo. Su contenido lo decide un puñado de corporaciones. Y cada consulta pasa por servidores que no controlas.\n\nEsta es la arquitectura equivocada para un mundo que funciona con IA.",

    hive_what_title: "Qué es HIVE",
    hive_what_desc: "HIVE es una base de conocimiento descentralizada y verificable, construida para LLMs — no para humanos. Es para la IA lo que Wikipedia es para los humanos: un repositorio vivo, abierto y con fuentes trazables que cualquiera puede leer, en el que cualquiera puede contribuir, y que nadie controla.",

    hive_props_signed: "Fuente verificada",
    hive_props_signed_desc: "Sin citas fabricadas. Cada fragmento tiene origen real.",
    hive_props_crypto: "Firma criptográfica",
    hive_props_crypto_desc: "ed25519 + SHA-256. Sabes quién lo añadió y que no fue modificado.",
    hive_props_append: "Log append-only",
    hive_props_append_desc: "Historial permanente en Hypercore. Las correcciones son explícitas.",
    hive_props_p2p: "Sin punto de fallo",
    hive_props_p2p_desc: "Cientos de nodos independientes. Sin censura ni punto central.",

    hive_how_title: "Cómo funciona",
    hive_how_desc: "Cada participante ejecuta un BEE — un nodo en la red HIVE. Los BEEs son agentes autónomos que:",
    hive_how_1: "Eligen un dominio de conocimiento leyendo la red y encontrando áreas sin cubrir",
    hive_how_2: "Extraen contenido de fuentes verificadas: arXiv, CrossRef, feeds de noticias",
    hive_how_3: "Verifican y firman cada fragmento con su identidad criptográfica",
    hive_how_4: "Sirven consultas a cualquier LLM o humano que se conecte",

    hive_why_title: "Por qué importa",
    hive_why_users: "Para usuarios de IA",
    hive_why_users_desc: "Respuestas basadas en fuentes verificables y actualizadas. Sabes exactamente de dónde viene cada dato.",
    hive_why_devs: "Para desarrolladores",
    hive_why_devs_desc: "Una capa RAG descentralizada que no requiere construir y mantener tu propio pipeline de conocimiento.",
    hive_why_web: "Para la web abierta",
    hive_why_web_desc: "Un común de conocimiento legible por máquinas que ninguna corporación puede retirar, editar en silencio o monetizar.",

    hive_tech_title: "La tecnología",
    hive_tech_desc: "Construido sobre infraestructura P2P probada en producción:",

    hive_status_title: "Estado actual — v0.2",
    hive_status_desc: "HIVE v0.2 es una prueba de concepto funcional con todos los módulos implementados.",
    hive_status_done: "Implementado",
    hive_status_m1: "Embeddings locales (all-MiniLM-L6-v2) + índice HNSW",
    hive_status_m2: "Extractor reactivo (arXiv + RSS)",
    hive_status_m3: "KnowledgeStore en Hypercore + Hyperbee",
    hive_status_m4: "Red P2P — Hyperswarm + replicación nativa Hypercore",
    hive_status_m5: "API vectorial (Fastify)",
    hive_status_m6: "UI web con síntesis Gemini",
    hive_status_m7: "Extractor autónomo + árbol de tópicos + registro de claims",

    hive_install_title: "Ejecuta un BEE",
    hive_install_desc: "Tu BEE arrancará, encontrará un área de conocimiento sin cubrir y comenzará a indexar. Sin configuración necesaria.",

    hive_license: "Licencia Business Source (BUSL-1.1). Gratuito para uso no comercial. Se convierte en MIT en 4 años.",
  },

  en: {
    // Nav
    nav_services: "Services",
    nav_hive: "HIVE",
    nav_community: "Community",
    nav_contact: "Contact",

    // Home hero
    hero_title: "We build software that works for you",
    hero_sub: "AI automation, custom development and system integration. We deliver in weeks, not months.",
    hero_cta_primary: "Let's talk about your project",
    hero_cta_secondary: "See services",

    // Trust pills
    pill_fast: "Fast delivery",
    pill_secure: "Security by default",
    pill_stack: "Modern stack",

    // Services
    svc_hero_title: "Services",
    svc_hero_sub: "End-to-end IT solutions that scale with your business.",
    svc_1_title: "AI Automation",
    svc_1_desc: "We orchestrate n8n flows and AI agents to eliminate manual work: data ingestion, smart replies, CRM, reporting and more.",
    svc_2_title: "Software development",
    svc_2_desc: "Robust backends (Java/Kotlin, Spring Boot), REST and GraphQL APIs, microservices, and modern frontends in React/React Native.",
    svc_3_title: "Consulting & integration",
    svc_3_desc: "Architecture audits, DevOps, CI/CD, security and compliance. We integrate your systems with external providers safely.",
    svc_4_title: "Custom AI agents",
    svc_4_desc: "We design and deploy LLM agents that reason, make decisions and execute complex tasks autonomously on your infrastructure.",

    // Process
    process_title: "How we work",
    process_1_title: "Diagnosis",
    process_1_desc: "We understand your problem before proposing a solution. Process analysis, KPIs and pain points.",
    process_2_title: "Prototype",
    process_2_desc: "We deliver something functional in the first week. We validate assumptions with real data.",
    process_3_title: "Production",
    process_3_desc: "We iterate to production with documentation, tests and handoff for your team.",

    // Stack
    stack_title: "Tech stack",
    stack_lead: "We pick the right tool, not the trend.",

    // HIVE preview (home)
    hive_preview_badge: "Open source project",
    hive_preview_title: "HIVE — Decentralized knowledge base for LLMs",
    hive_preview_desc: "A P2P network of autonomous BEEs that extract, sign and sync verified knowledge. What Wikipedia is for humans, but optimized to be consumed by machines.",
    hive_preview_cta: "Explore HIVE →",
    hive_preview_stat1: "95 topics",
    hive_preview_stat1_desc: "knowledge tree",
    hive_preview_stat2: "ed25519",
    hive_preview_stat2_desc: "cryptographic signature",
    hive_preview_stat3: "Native P2P",
    hive_preview_stat3_desc: "Hyperswarm + Hypercore",

    // Contact
    contact_title: "Shall we talk?",
    contact_desc: "Tell us about your case and we'll propose a plan within 48h.",
    contact_email_label: "Write to us",
    contact_cta: "Book a call",

    // Footer
    foot_privacy: "Privacy",
    foot_legal: "Legal",
    foot_tagline: "Built with ☕ and too many lines of TypeScript.",
    foot_projects: "Projects",
    foot_rights: "All rights reserved.",

    // Section labels
    section_services: "Services",
    section_process: "Process",
    section_follow: "Follow us",
    hero_badge: "AI Automation · Software · Open Source",

    // HIVE section labels
    hive_badge_tagline: "Open Source · P2P · Verified Knowledge",
    hive_section_problem: "The problem",
    hive_section_what: "What",
    hive_section_how: "How",
    hive_section_why: "Why",
    hive_section_tech: "Technology",
    hive_section_status: "Status",
    hive_section_run: "Run a BEE",
    hive_status_badge: "v0.2 live",
    hive_planned_title: "Planned — v0.3",
    hive_no_blockchain: "No blockchain. No tokens yet. No central server.",
    hive_github_cta: "View on GitHub",

    // HIVE page
    hive_hero_title: "HIVE",
    hive_hero_sub: "Decentralized, verifiable knowledge base for LLMs",
    hive_hero_tagline: "What Wikipedia is for humans — but for machines.",
    hive_hero_cta_primary: "View on GitHub",
    hive_hero_cta_secondary: "How it works",

    hive_problem_title: "The problem with AI knowledge",
    hive_problem_desc: "Today's AI models — GPT, Claude, Gemini — are trained once and frozen. Their knowledge has a cutoff date. They hallucinate when they don't know something. Their content is decided by a handful of corporations. And every query goes through servers you don't control.\n\nThis is the wrong architecture for a world that runs on AI.",

    hive_what_title: "What HIVE is",
    hive_what_desc: "HIVE is a decentralized, verifiable knowledge base built for LLMs — not for humans. It is to AI what Wikipedia is to humans: a living, open, source-traceable repository of knowledge that anyone can read, anyone can contribute to, and no one controls.",

    hive_props_signed: "Verified source",
    hive_props_signed_desc: "No fabricated citations. Every fragment has a real origin.",
    hive_props_crypto: "Cryptographic signature",
    hive_props_crypto_desc: "ed25519 + SHA-256. You know who added it and that it hasn't been modified.",
    hive_props_append: "Append-only log",
    hive_props_append_desc: "Permanent history in Hypercore. Corrections are explicit.",
    hive_props_p2p: "No single point of failure",
    hive_props_p2p_desc: "Hundreds of independent nodes. No censorship or central point.",

    hive_how_title: "How it works",
    hive_how_desc: "Each participant runs a BEE — a node in the HIVE network. BEEs are autonomous agents that:",
    hive_how_1: "Choose a knowledge domain by reading the network and finding uncovered areas",
    hive_how_2: "Extract content from verified sources: arXiv, CrossRef, news feeds",
    hive_how_3: "Verify and sign each fragment with their cryptographic identity",
    hive_how_4: "Serve queries from any LLM or human that connects",

    hive_why_title: "Why it matters",
    hive_why_users: "For AI users",
    hive_why_users_desc: "Answers grounded in verifiable, up-to-date sources. Know exactly where every fact came from.",
    hive_why_devs: "For developers",
    hive_why_devs_desc: "A decentralized RAG layer that doesn't require building and maintaining your own knowledge pipeline.",
    hive_why_web: "For the open web",
    hive_why_web_desc: "A commons of machine-readable knowledge that no corporation can take down, edit silently, or monetize.",

    hive_tech_title: "The technology",
    hive_tech_desc: "Built on battle-tested P2P infrastructure:",

    hive_status_title: "Current state — v0.2",
    hive_status_desc: "HIVE v0.2 is a functional proof of concept with all modules implemented.",
    hive_status_done: "Implemented",
    hive_status_m1: "Local embeddings (all-MiniLM-L6-v2) + HNSW index",
    hive_status_m2: "Reactive extractor (arXiv + RSS)",
    hive_status_m3: "KnowledgeStore on Hypercore + Hyperbee",
    hive_status_m4: "P2P network — Hyperswarm + native Hypercore replication",
    hive_status_m5: "Vector API (Fastify)",
    hive_status_m6: "Web UI with LLM synthesis",
    hive_status_m7: "Autonomous extractor + topic tree + claim registry",

    hive_install_title: "Run a BEE",
    hive_install_desc: "Your BEE will start, find a knowledge area nobody is covering, and begin extracting. No configuration needed.",

    hive_license: "Business Source License (BUSL-1.1). Free for non-commercial use. Converts to MIT in 4 years.",
  },
} as const;

export type TranslationKey = keyof typeof translations.es;

// ── Context ───────────────────────────────────────────────────────────────────

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    const detected = navigator.language?.toLowerCase().startsWith("en") ? "en" : "es";
    setLangState(saved ?? detected);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
  };

  const t = (key: TranslationKey): string =>
    (translations[lang] as Record<string, string>)[key] ?? key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
