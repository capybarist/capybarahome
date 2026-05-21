"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "es" | "en";

// ── Translations ──────────────────────────────────────────────────────────────

const translations = {
  es: {
    // Nav
    nav_services: "Servicios",
    nav_hive: "HIVE",
    nav_pixel: "pixel",
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

    // Try HIVE widget
    try_title: "Prueba HIVE",
    try_sub: "Demo en vivo conectada al aggregator público. Cada respuesta viene de fragmentos firmados criptográficamente por BEEs reales.",
    try_placeholder: "Pregunta algo sobre ciencia, IA, investigación...",
    try_btn: "Preguntar",
    try_loading: "Buscando en HIVE...",
    try_offline: "El aggregator público no está disponible en este momento. Vuelve pronto o lanza tu propio BEE.",
    try_no_config: "El aggregator público aún no está configurado. Vuelve pronto — estamos desplegándolo.",
    try_no_results: "No se encontraron resultados en HIVE para esta consulta. ¿Quieres contribuir?",
    try_verified: "✓ Verificado por HIVE",
    try_llm_fallback: "⚠ Fuera de HIVE — conocimiento del LLM",
    try_sources: "Fuentes",
    try_stat_fragments: "fragmentos indexados",
    try_stat_bees: "BEEs activos",
    try_stat_topics: "tópicos cubiertos",
    try_run_bee: "¿No encuentras lo que buscas? Contribuye lanzando un BEE →",

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
    hive_status_badge: "v0.5 activo",
    hive_planned_title: "Próximo — v0.6+",
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

    hive_status_title: "Estado actual — v0.5",
    hive_status_desc: "HIVE v0.5 está en producción. Todos los módulos operativos, Ollama local integrado, extracción de Wikipedia por secciones completas.",
    hive_status_done: "Implementado",
    hive_status_m1: "Embeddings locales (all-MiniLM-L6-v2) + índice HNSW",
    hive_status_m2: "Extractor autónomo — Wikipedia (secciones completas), arXiv, RSS, web",
    hive_status_m3: "KnowledgeStore en Hypercore + Hyperbee — replicación P2P nativa",
    hive_status_m4: "Red P2P — Hyperswarm + replicación Hypercore nativa",
    hive_status_m5: "API vectorial (Fastify) + búsqueda federada",
    hive_status_m6: "UI web + LLM local (Ollama) o cloud (Groq / Gemini / Claude / OpenAI)",
    hive_status_m7: "Aggregator + Qdrant + dedup/TTL/supersede automático",

    // Forager live widget
    hive_forager_eyebrow: "Forager en vivo",
    hive_forager_title: "Lo que la abeja está recolectando ahora mismo",
    hive_forager_sub: "Cada artículo de Wikipedia que indexa añade sus enlaces internos a una cola persistente. La abeja drena la cola indefinidamente, recolectando conocimiento como una abeja recolectora.",
    hive_forager_updated: "Actualizado",
    hive_forager_card_indexed: "Fragments indexados",
    hive_forager_card_queue: "En cola",
    hive_forager_card_visited: "Artículos visitados",
    hive_forager_card_rate: "Ritmo (15s)",
    hive_forager_recent_title: "Últimos artículos procesados",
    hive_forager_recent_sub: "La abeja acaba de indexar todas las secciones verbatim de estos artículos.",
    hive_forager_recent_empty: "La abeja aún no ha procesado ningún artículo.",
    hive_forager_next_title: "Próximos en la cola",
    hive_forager_next_sub: "Descubiertos como enlaces internos en artículos ya procesados. Se procesarán en los siguientes ciclos.",
    hive_forager_next_empty: "Cola vacía. La abeja pasará a modo de seeding en el próximo ciclo.",

    hive_install_title: "Ejecuta un BEE",
    hive_install_desc: "Tu BEE arrancará, encontrará un área de conocimiento sin cubrir y comenzará a indexar. Sin configuración necesaria.",

    hive_license: "Licencia Business Source (BUSL-1.1). Gratuito para uso no comercial. Se convierte en MIT en 4 años.",

    // ── cAPY ──────────────────────────────────────────────────────────────
    nav_capy: "cAPY",
    capy_status_badge: "Alpha · Fase de backtest",
    capy_tagline: "Trading algorítmico de perpetuos en Hyperliquid.",
    capy_subhead:
      "Estrategia adaptativa que opera BTC y ETH long y short según el régimen de mercado. Backtesteado con fees, funding, slippage y simulación de liquidación reales. Estos resultados son históricos — no constituyen promesa ni garantía de rendimiento futuro.",
    capy_metric_return: "Retorno (24m)",
    capy_metric_vs_btc: "vs BTC HODL",
    capy_metric_cagr: "CAGR anualizado",
    capy_metric_dd: "Max drawdown",
    capy_chart_loading: "Cargando datos del backtest…",
    capy_chart_error: "No se pudo cargar el backtest",

    capy_roadmap_eyebrow: "Roadmap",
    capy_roadmap_title: "Fases hasta el vault público",
    capy_roadmap_desc:
      "Validamos cada fase antes de avanzar. Sin atajos: si una fase no cumple sus métricas objetivo, iteramos hasta que las cumple.",

    capy_phase_backtest_title: "Backtest",
    capy_phase_backtest_desc: "Walk-forward 24m sobre datos reales. Métricas objetivo superadas.",
    capy_phase_alpha_title: "Alpha (actual)",
    capy_phase_alpha_desc: "Refinando estrategias y stress-testing antes de exponer capital.",
    capy_phase_testnet_title: "Testnet",
    capy_phase_testnet_desc: "Ejecución en vivo contra Hyperliquid testnet. Mínimo 2 semanas estables.",
    capy_phase_mainnet_title: "Mainnet single",
    capy_phase_mainnet_desc: "Capital propio durante 4+ semanas. Skin in the game.",
    capy_phase_vault_title: "Vault público",
    capy_phase_vault_desc: "Apertura de vault en Hyperliquid para depositantes externos.",

    capy_disclaimer_title: "Aviso importante",
    capy_disclaimer_1:
      "Los resultados mostrados son de un backtest sobre datos históricos. Trading apalancado de perpetuos conlleva riesgo de pérdida total del capital. Rendimientos pasados no garantizan rendimientos futuros.",
    capy_disclaimer_2:
      "Actualmente NO aceptamos depósitos. Esta página existe para mostrar transparencia sobre el desarrollo. El vault solo se abrirá tras superar todas las fases del roadmap.",

    capy_contact_title: "¿Te interesa cuando abramos el vault?",
    capy_contact_desc:
      "Escríbenos y te avisaremos cuando estemos listos para aceptar depositantes. También nos puedes contactar para feedback sobre la estrategia o preguntas técnicas.",
    capy_contact_cta: "Notifícame",
    capy_data_updated: "Datos actualizados",

    // Live bot panel (testnet)
    capy_live_eyebrow: "Live · Testnet",
    capy_live_title: "Bot en tiempo real",
    capy_live_subtitle:
      "Datos publicados por el bot cada 5 minutos desde testnet. La página los consulta vía proxy para mantener la conexión segura.",
    capy_live_health_live: "Activo",
    capy_live_health_halted: "Detenido",
    capy_live_health_stale: "Sin updates",
    capy_live_health_offline: "Sin conexión",
    capy_live_health_loading: "Cargando…",
    capy_live_card_nav: "NAV actual",
    capy_live_card_peak: "Pico NAV",
    capy_live_card_dd: "Drawdown",
    capy_live_card_open: "Posiciones abiertas",
    capy_live_halt_banner: "Bot detenido.",
    capy_live_halt_reason: "Razón:",
    capy_live_halt_action: "Requiere intervención manual.",
    capy_live_positions_title: "Posiciones abiertas",
    capy_live_trades_title: "Últimas transacciones",
    capy_live_trades_empty:
      "Sin transacciones todavía. El bot abrirá su primera posición cuando una señal cumpla el filtro de calidad (score ≥ 70).",
    capy_live_col_asset: "Asset",
    capy_live_col_side: "Side",
    capy_live_col_origin: "Origen",
    capy_live_col_size: "Tamaño USD",
    capy_live_col_entry: "Entry",
    capy_live_col_stop: "Stop",
    capy_live_col_lev: "Lev",
    capy_live_col_date: "Fecha",
    capy_live_col_action: "Acción",
    capy_live_col_price: "Precio",
    capy_live_col_pnl: "PnL",
    capy_live_col_size_short: "Tamaño",
    capy_live_equity_label: "Equity (últimos {n} snapshots, ~{h}h)",

    // ── pixel ─────────────────────────────────────────────────────────────
    // Home preview card (sits next to HIVE preview)
    pixel_preview_badge: "Nuevo · Alpha pública",
    pixel_preview_title: "pixel — el Lovable de los videojuegos móviles",
    pixel_preview_desc:
      "Describe un juego en lenguaje natural y juégalo en tu navegador en segundos. Itera por chat. Cuando esté listo, expórtalo a APK e IPA bajo tu propia cuenta de developer.",
    pixel_preview_cta: "Abrir studio →",
    pixel_preview_stat1: "Phaser 3",
    pixel_preview_stat1_desc: "motor 2D LLM-friendly",
    pixel_preview_stat2: "Multi-LLM",
    pixel_preview_stat2_desc: "Gemini · Claude · OpenAI",
    pixel_preview_stat3: "APK / IPA",
    pixel_preview_stat3_desc: "Capacitor wrapper",

    // /pixel page
    pixel_status_badge: "Fase 1 · Alpha pública",
    pixel_tagline: "Vibe-coded mobile games.",
    pixel_subhead:
      "Del prompt al APK. Describe un juego en lenguaje natural, juégalo en tu navegador y publícalo en las stores cuando esté listo. Sin Unity, sin Godot, sin curva de aprendizaje.",
    pixel_cta_primary: "Abrir Studio",
    pixel_cta_secondary: "Ver en GitHub",

    pixel_how_eyebrow: "Cómo funciona",
    pixel_how_title: "Tres pasos. Sin experiencia previa.",
    pixel_how_1_title: "Describe",
    pixel_how_1_desc:
      "\"Un platformer donde un capibara recoge monedas esquivando aviones.\" Lenguaje natural, sin código.",
    pixel_how_2_title: "Juega",
    pixel_how_2_desc:
      "El studio genera el juego con Phaser 3 y lo corre en un frame de móvil. Itera por chat con cualquier modelo LLM (Gemini, Claude, OpenAI, Groq u Ollama local).",
    pixel_how_3_title: "Publica",
    pixel_how_3_desc:
      "Compilamos a .apk y .ipa reales con Capacitor y los publicas bajo tu propia cuenta de developer. Sin revenue share. (Fase 4)",

    pixel_why_eyebrow: "Por qué pixel",
    pixel_why_title: "Diseñado para que un LLM lo entienda bien.",
    pixel_why_1_title: "Phaser 3 + TypeScript",
    pixel_why_1_desc:
      "Archivos .ts planos. Sin formatos binarios ni YAML con GUIDs que el modelo pueda corromper.",
    pixel_why_2_title: "Tu LLM, tu coste",
    pixel_why_2_desc:
      "Conecta Gemini gratis para iterar, Claude para producción, o Ollama 100 % local. Pones tu propia API key.",
    pixel_why_3_title: "Móvil-first",
    pixel_why_3_desc:
      "Portrait 360×640. Controles touch. Build de 1–3 MB. No es una web encogida.",
    pixel_why_4_title: "Assets CC0",
    pixel_why_4_desc:
      "Sprites de Kenney.nl licenciados como dominio público. Sin riesgo legal cuando publiques.",

    pixel_cta_final_title: "Construye tu primer juego.",
    pixel_cta_final_desc: "Gratis durante la alpha. Sin tarjeta.",
    pixel_cta_final_btn: "Abrir el studio →",

    pixel_phase_eyebrow: "Roadmap",
    pixel_phase_title: "Fases hasta las stores",
    pixel_phase_1_title: "Fase 1 — Web demo",
    pixel_phase_1_desc: "Studio jugable en navegador. Una plantilla platformer. Sin login. ← Estamos aquí.",
    pixel_phase_2_title: "Fase 2 — Múltiples plantillas + QR",
    pixel_phase_2_desc: "Platformer, runner, puzzle, top-down. Jugable en tu móvil escaneando un QR.",
    pixel_phase_3_title: "Fase 3 — Cuentas + dashboard",
    pixel_phase_3_desc: "Auth, persistencia, sharing público de proyectos.",
    pixel_phase_4_title: "Fase 4 — Compilación nativa",
    pixel_phase_4_desc: ".apk y .ipa generados en la nube con Capacitor. Listos para TestFlight y Google Play interno.",
    pixel_phase_5_title: "Fase 5 — Publicación BYODA",
    pixel_phase_5_desc: "Flujo guiado para publicar bajo tu cuenta de Apple/Google. Tú te quedas el 100 % de los ingresos.",
  },

  en: {
    // Nav
    nav_services: "Services",
    nav_hive: "HIVE",
    nav_pixel: "pixel",
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

    // Try HIVE widget
    try_title: "Try HIVE",
    try_sub: "Live demo connected to the public aggregator. Every answer comes from cryptographically signed fragments by real BEEs.",
    try_placeholder: "Ask anything about science, AI, research...",
    try_btn: "Ask",
    try_loading: "Searching HIVE...",
    try_offline: "The public aggregator is not available right now. Come back soon or run your own BEE.",
    try_no_config: "The public aggregator is not configured yet. Come back soon — we're deploying it.",
    try_no_results: "No results found in HIVE for this query. Want to contribute?",
    try_verified: "✓ Verified by HIVE",
    try_llm_fallback: "⚠ Outside HIVE — LLM knowledge",
    try_sources: "Sources",
    try_stat_fragments: "fragments indexed",
    try_stat_bees: "active BEEs",
    try_stat_topics: "topics covered",
    try_run_bee: "Not finding what you need? Contribute by running a BEE →",

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
    hive_status_badge: "v0.5 live",
    hive_planned_title: "Next — v0.6+",
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

    hive_status_title: "Current state — v0.5",
    hive_status_desc: "HIVE v0.5 is live. All modules operational, local Ollama LLM integrated, full Wikipedia section extraction.",
    hive_status_done: "Implemented",
    hive_status_m1: "Local embeddings (all-MiniLM-L6-v2) + HNSW index",
    hive_status_m2: "Autonomous extractor — Wikipedia (full sections), arXiv, RSS, web",
    hive_status_m3: "KnowledgeStore on Hypercore + Hyperbee — native P2P replication",
    hive_status_m4: "P2P network — Hyperswarm + native Hypercore replication",
    hive_status_m5: "Vector API (Fastify) + federated search",
    hive_status_m6: "Web UI + local LLM (Ollama) or cloud (Groq / Gemini / Claude / OpenAI)",
    hive_status_m7: "Aggregator + Qdrant + automatic dedup/TTL/supersede",

    // Forager live widget
    hive_forager_eyebrow: "Forager live",
    hive_forager_title: "What the bee is foraging right now",
    hive_forager_sub: "Every Wikipedia article it indexes feeds its internal links into a persistent queue. The bee drains that queue indefinitely, foraging knowledge back to the hive.",
    hive_forager_updated: "Updated",
    hive_forager_card_indexed: "Indexed fragments",
    hive_forager_card_queue: "Queued",
    hive_forager_card_visited: "Articles visited",
    hive_forager_card_rate: "Rate (15s)",
    hive_forager_recent_title: "Recently processed",
    hive_forager_recent_sub: "The bee just indexed every section of these articles verbatim.",
    hive_forager_recent_empty: "No articles processed yet.",
    hive_forager_next_title: "Next in queue",
    hive_forager_next_sub: "Discovered as internal links in articles already processed. Will be fetched in upcoming cycles.",
    hive_forager_next_empty: "Queue empty. The bee will enter seed mode on the next cycle.",

    hive_install_title: "Run a BEE",
    hive_install_desc: "Your BEE will start, find a knowledge area nobody is covering, and begin extracting. No configuration needed.",

    hive_license: "Business Source License (BUSL-1.1). Free for non-commercial use. Converts to MIT in 4 years.",

    // ── cAPY ──────────────────────────────────────────────────────────────
    nav_capy: "cAPY",
    capy_status_badge: "Alpha · Backtest phase",
    capy_tagline: "Algorithmic perpetuals trading on Hyperliquid.",
    capy_subhead:
      "Adaptive regime-based strategy that trades BTC and ETH long and short. Backtested with real fees, funding, slippage and liquidation simulation. Past performance shown here is historical and does not constitute a guarantee of future returns.",
    capy_metric_return: "Return (24m)",
    capy_metric_vs_btc: "vs BTC HODL",
    capy_metric_cagr: "Annualized CAGR",
    capy_metric_dd: "Max drawdown",
    capy_chart_loading: "Loading backtest data…",
    capy_chart_error: "Failed to load backtest",

    capy_roadmap_eyebrow: "Roadmap",
    capy_roadmap_title: "Phases to public vault",
    capy_roadmap_desc:
      "Every phase is validated before moving on. No shortcuts: if a phase doesn't hit its target metrics, we iterate until it does.",

    capy_phase_backtest_title: "Backtest",
    capy_phase_backtest_desc: "Walk-forward 24m on real data. All target metrics passed.",
    capy_phase_alpha_title: "Alpha (current)",
    capy_phase_alpha_desc: "Refining strategies and stress-testing before risking capital.",
    capy_phase_testnet_title: "Testnet",
    capy_phase_testnet_desc: "Live execution on Hyperliquid testnet. Minimum 2 stable weeks.",
    capy_phase_mainnet_title: "Mainnet single",
    capy_phase_mainnet_desc: "Own capital for 4+ weeks. Skin in the game.",
    capy_phase_vault_title: "Public vault",
    capy_phase_vault_desc: "Vault opens on Hyperliquid for external depositors.",

    capy_disclaimer_title: "Important notice",
    capy_disclaimer_1:
      "Results shown are from a backtest on historical data. Leveraged perpetuals trading carries risk of full capital loss. Past performance does not guarantee future results.",
    capy_disclaimer_2:
      "We do NOT accept deposits at this time. This page exists for development transparency. The vault will only open once every roadmap phase has been cleared.",

    capy_contact_title: "Interested when the vault opens?",
    capy_contact_desc:
      "Drop us a line and we'll notify you when we're ready to accept depositors. You can also reach out for feedback on the strategy or technical questions.",
    capy_contact_cta: "Notify me",
    capy_data_updated: "Data updated",

    // Live bot panel (testnet)
    capy_live_eyebrow: "Live · Testnet",
    capy_live_title: "Bot in real time",
    capy_live_subtitle:
      "Snapshots published by the bot every 5 minutes from testnet. The page queries them through a proxy to keep the connection secure.",
    capy_live_health_live: "Live",
    capy_live_health_halted: "Halted",
    capy_live_health_stale: "Stale",
    capy_live_health_offline: "Offline",
    capy_live_health_loading: "Loading…",
    capy_live_card_nav: "Current NAV",
    capy_live_card_peak: "Peak NAV",
    capy_live_card_dd: "Drawdown",
    capy_live_card_open: "Open positions",
    capy_live_halt_banner: "Bot halted.",
    capy_live_halt_reason: "Reason:",
    capy_live_halt_action: "Manual intervention required.",
    capy_live_positions_title: "Open positions",
    capy_live_trades_title: "Recent trades",
    capy_live_trades_empty:
      "No trades yet. The bot will open its first position when a signal passes the quality filter (score ≥ 70).",
    capy_live_col_asset: "Asset",
    capy_live_col_side: "Side",
    capy_live_col_origin: "Origin",
    capy_live_col_size: "Size USD",
    capy_live_col_entry: "Entry",
    capy_live_col_stop: "Stop",
    capy_live_col_lev: "Lev",
    capy_live_col_date: "Date",
    capy_live_col_action: "Action",
    capy_live_col_price: "Price",
    capy_live_col_pnl: "PnL",
    capy_live_col_size_short: "Size",
    capy_live_equity_label: "Equity (last {n} snapshots, ~{h}h)",

    // ── pixel ─────────────────────────────────────────────────────────────
    pixel_preview_badge: "New · Public alpha",
    pixel_preview_title: "pixel — the Lovable for mobile games",
    pixel_preview_desc:
      "Describe a game in plain language and play it in your browser in seconds. Iterate by chat. When it's ready, export to APK and IPA under your own developer account.",
    pixel_preview_cta: "Open studio →",
    pixel_preview_stat1: "Phaser 3",
    pixel_preview_stat1_desc: "LLM-friendly 2D engine",
    pixel_preview_stat2: "Multi-LLM",
    pixel_preview_stat2_desc: "Gemini · Claude · OpenAI",
    pixel_preview_stat3: "APK / IPA",
    pixel_preview_stat3_desc: "Capacitor wrapper",

    pixel_status_badge: "Phase 1 · Public alpha",
    pixel_tagline: "Vibe-coded mobile games.",
    pixel_subhead:
      "From prompt to APK. Describe a game in plain language, play it in your browser, and ship it to the stores when it's ready. No Unity, no Godot, no learning curve.",
    pixel_cta_primary: "Open Studio",
    pixel_cta_secondary: "View on GitHub",

    pixel_how_eyebrow: "How it works",
    pixel_how_title: "Three steps. No experience required.",
    pixel_how_1_title: "Describe",
    pixel_how_1_desc:
      "\"A platformer where a capybara collects coins while avoiding planes.\" Natural language, no code.",
    pixel_how_2_title: "Play",
    pixel_how_2_desc:
      "The studio generates a Phaser 3 game and runs it in a phone frame. Iterate by chat with any LLM (Gemini, Claude, OpenAI, Groq, or local Ollama).",
    pixel_how_3_title: "Ship",
    pixel_how_3_desc:
      "We compile to real .apk and .ipa with Capacitor and you publish under your own developer account. No revenue share. (Phase 4)",

    pixel_why_eyebrow: "Why pixel",
    pixel_why_title: "Built so an LLM can actually understand it.",
    pixel_why_1_title: "Phaser 3 + TypeScript",
    pixel_why_1_desc:
      "Plain .ts files. No binary formats or YAML with GUIDs that the model can corrupt.",
    pixel_why_2_title: "Your LLM, your cost",
    pixel_why_2_desc:
      "Plug in Gemini free for iteration, Claude for production, or Ollama 100 % local. Bring your own API key.",
    pixel_why_3_title: "Mobile-first",
    pixel_why_3_desc:
      "Portrait 360×640. Touch controls. 1–3 MB builds. Not a shrunk-down desktop game.",
    pixel_why_4_title: "CC0 assets",
    pixel_why_4_desc:
      "Sprites from Kenney.nl licensed as public domain. Zero legal risk when you publish.",

    pixel_cta_final_title: "Build your first game.",
    pixel_cta_final_desc: "Free during alpha. No credit card.",
    pixel_cta_final_btn: "Open the studio →",

    pixel_phase_eyebrow: "Roadmap",
    pixel_phase_title: "Phases to the stores",
    pixel_phase_1_title: "Phase 1 — Web demo",
    pixel_phase_1_desc: "Playable studio in the browser. Single platformer template. No login. ← We are here.",
    pixel_phase_2_title: "Phase 2 — Multiple templates + QR",
    pixel_phase_2_desc: "Platformer, runner, puzzle, top-down. Playable on your phone via QR.",
    pixel_phase_3_title: "Phase 3 — Accounts + dashboard",
    pixel_phase_3_desc: "Auth, persistence, public sharing of projects.",
    pixel_phase_4_title: "Phase 4 — Native compilation",
    pixel_phase_4_desc: ".apk and .ipa generated in the cloud with Capacitor. Ready for TestFlight and Google Play internal.",
    pixel_phase_5_title: "Phase 5 — BYODA publishing",
    pixel_phase_5_desc: "Guided flow to publish under your Apple/Google account. You keep 100 % of revenue.",
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
