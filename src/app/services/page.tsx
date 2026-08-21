"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import {
  Zap, Code2, Wrench, Brain, ArrowRight, Search, Rocket, LifeBuoy,
  Scale, GitBranch, Check,
} from "lucide-react";

/* Same dark shell and copy convention as the landing (src/app/labs/page.tsx):
   shared strings come from t(), page-specific copy lives inline as {en, es}. */

type S = { en: string; es: string };

const SERVICES: {
  Icon: typeof Zap;
  tKey: "svc_1_title" | "svc_2_title" | "svc_3_title" | "svc_4_title";
  dKey: "svc_1_desc" | "svc_2_desc" | "svc_3_desc" | "svc_4_desc";
  deliverables: S[];
  tags: string[];
  accent: boolean;
}[] = [
  {
    Icon: Zap, tKey: "svc_1_title", dKey: "svc_1_desc", accent: false,
    tags: ["n8n", "OpenAI", "Claude", "Gemini", "Python"],
    deliverables: [
      { en: "A map of the manual process and the hours it actually costs you", es: "Un mapa del proceso manual y las horas que te cuesta de verdad" },
      { en: "n8n flows with retries, alerting and logs — not a happy-path demo", es: "Flujos n8n con reintentos, alertas y logs — no una demo del caso feliz" },
      { en: "Integration with the CRM, ERP and tools you already run", es: "Integración con el CRM, el ERP y las herramientas que ya usas" },
      { en: "Handoff: documentation and access so your team can edit the flows", es: "Handoff: documentación y accesos para que tu equipo edite los flujos" },
    ],
  },
  {
    Icon: Brain, tKey: "svc_4_title", dKey: "svc_4_desc", accent: true,
    tags: ["LLM agents", "RAG", "MCP", "HIVE", "Function calling"],
    deliverables: [
      { en: "Agents with real tools over your systems — function calling or MCP", es: "Agentes con herramientas reales sobre tus sistemas — function calling o MCP" },
      { en: "RAG over your own documentation, with traceable citations", es: "RAG sobre tu propia documentación, con citas trazables" },
      { en: "An eval set and metrics before anything reaches production", es: "Un set de evaluación y métricas antes de que nada llegue a producción" },
      { en: "Deployed on your infrastructure, with your keys", es: "Desplegado en tu infraestructura, con tus claves" },
    ],
  },
  {
    Icon: Code2, tKey: "svc_2_title", dKey: "svc_2_desc", accent: false,
    tags: ["Java", "Kotlin", "Spring Boot", "TypeScript", "React", "React Native"],
    deliverables: [
      { en: "Backends in Java/Kotlin and Spring Boot, REST and GraphQL APIs", es: "Backends en Java/Kotlin y Spring Boot, APIs REST y GraphQL" },
      { en: "Frontends in React / Next.js and mobile apps in React Native", es: "Frontends en React / Next.js y apps móviles en React Native" },
      { en: "Tests, CI and migrations from day one, not bolted on at the end", es: "Tests, CI y migraciones desde el día uno, no pegados al final" },
      { en: "The code is yours, in your repository, from the first commit", es: "El código es tuyo, en tu repositorio, desde el primer commit" },
    ],
  },
  {
    Icon: Wrench, tKey: "svc_3_title", dKey: "svc_3_desc", accent: false,
    tags: ["Docker", "Kubernetes", "CI/CD", "PostgreSQL", "Security"],
    deliverables: [
      { en: "Architecture and security audit, written down and prioritised", es: "Auditoría de arquitectura y seguridad, escrita y priorizada" },
      { en: "CI/CD, containers and observability you can actually operate", es: "CI/CD, contenedores y observabilidad que se puedan operar" },
      { en: "Third-party integrations — payments, identity, data providers", es: "Integraciones con terceros — pagos, identidad, proveedores de datos" },
      { en: "An improvement plan ordered by impact, not by what is fun to build", es: "Un plan de mejora ordenado por impacto, no por lo que apetece construir" },
    ],
  },
];

const PROCESS: {
  Icon: typeof Search;
  num: string;
  tKey: "process_1_title" | "process_2_title" | "process_3_title";
  dKey: "process_1_desc" | "process_2_desc" | "process_3_desc";
  when: S;
  out: S;
}[] = [
  {
    Icon: Search, num: "01", tKey: "process_1_title", dKey: "process_1_desc",
    when: { en: "Week 0", es: "Semana 0" },
    out: { en: "A process map, the KPIs we will move, and a scope with a closed price.", es: "Un mapa del proceso, los KPIs que vamos a mover y un alcance con precio cerrado." },
  },
  {
    Icon: Rocket, num: "02", tKey: "process_2_title", dKey: "process_2_desc",
    when: { en: "Week 1", es: "Semana 1" },
    out: { en: "Something deployed you can click, running against real data.", es: "Algo desplegado que puedes tocar, corriendo contra datos reales." },
  },
  {
    Icon: LifeBuoy, num: "03", tKey: "process_3_title", dKey: "process_3_desc",
    when: { en: "From there on", es: "A partir de ahí" },
    out: { en: "Documentation, tests and a handoff so your team owns it without us.", es: "Documentación, tests y un handoff para que tu equipo lo lleve sin nosotros." },
  },
];

export default function ServicesPage() {
  const { t, lang } = useI18n();
  const en = lang === "en";
  const L = (s: S) => (en ? s.en : s.es);

  return (
    <div className="relative bg-[#06090f] text-slate-300">
      {/* layout.tsx paints body from the light tokens; this covers the viewport
          so a tall window or an overscroll bounce never flashes white. */}
      <div className="fixed inset-0 -z-10 bg-[#06090f]" aria-hidden />

      {/* ═══════════════════════════════════════════════════════════ HERO ════ */}
      <section className="relative overflow-hidden border-b border-slate-800/70">
        <div className="absolute inset-0 grid-lines" />
        <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-sky-600/12 blur-[110px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-violet-700/12 blur-[110px] pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400 mb-4">{t("section_services")}</p>
          <h1 className="text-[2rem] sm:text-5xl md:text-6xl font-black tracking-tight g-hero mb-5 text-balance">
            {t("svc_hero_title")}
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-9">
            {t("svc_hero_sub")}{" "}
            {en
              ? "The same engineering that keeps Acquis running in production, pointed at your problem."
              : "La misma ingeniería que mantiene Acquis en producción, aplicada a tu problema."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm px-6 py-3.5 transition-colors shadow-lg shadow-sky-500/20">
              {t("hero_cta_primary")} <ArrowRight size={16} />
            </Link>
            <Link href="/#products"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-white/[0.03] text-slate-300 hover:border-slate-500 hover:text-white font-semibold text-sm px-6 py-3.5 transition-colors">
              {en ? "See what we have built" : "Ver lo que hemos construido"} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════ SERVICES ══ */}
      <section className="py-24 border-b border-slate-800/70">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map(({ Icon, tKey, dKey, deliverables, tags, accent }) => (
              <div key={tKey} className={`p-8 rounded-2xl d-card flex flex-col ${accent ? "d-card-accent" : ""}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 border ${
                  accent ? "bg-violet-500/10 border-violet-500/25" : "bg-sky-500/10 border-sky-500/25"
                }`}>
                  <Icon size={20} className={accent ? "text-violet-300" : "text-sky-300"} />
                </div>

                <h2 className="text-xl font-bold text-white mb-2.5">{t(tKey)}</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{t(dKey)}</p>

                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">
                  {en ? "What you get" : "Qué te llevas"}
                </p>
                <ul className="space-y-2.5 mb-7 flex-1">
                  {deliverables.map((d) => (
                    <li key={d.en} className="flex gap-2.5">
                      <Check size={14} className={`shrink-0 mt-0.5 ${accent ? "text-violet-400" : "text-sky-400"}`} />
                      <span className="text-[13px] text-slate-400 leading-relaxed">{L(d)}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-5 border-t border-slate-700/30">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[11.5px] font-medium text-slate-400 bg-white/[0.04] border border-slate-700/40 rounded-md px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ PROCESS ══ */}
      <section className="py-24 border-b border-slate-800/70 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400 mb-3">{t("section_process")}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">{t("process_title")}</h2>
            <p className="text-slate-400 leading-relaxed">
              {en
                ? "Three steps, no discovery theatre. Each one ends with something you can hold."
                : "Tres pasos, sin teatro de descubrimiento. Cada uno termina con algo que puedes tener en la mano."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PROCESS.map(({ Icon, num, tKey, dKey, when, out }) => (
              <div key={num} className="relative p-8 rounded-2xl d-card flex flex-col">
                <span className="absolute top-6 right-7 text-5xl font-black text-white/[0.06] select-none">{num}</span>
                <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-sky-300" />
                </div>
                <span className="inline-flex self-start items-center rounded-full border border-slate-700/50 bg-white/[0.04] px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  {L(when)}
                </span>
                <h3 className="text-lg font-bold text-white mb-2.5">{t(tKey)}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{t(dKey)}</p>
                <div className="pt-5 border-t border-slate-700/30">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
                    {en ? "Deliverable" : "Entregable"}
                  </p>
                  <p className="text-[13px] text-slate-300 leading-relaxed">{L(out)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ PROOF ══ */}
      <section className="py-24 border-b border-slate-800/70">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400 mb-3">
              {en ? "Proof" : "Prueba"}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              {en ? "We run our own software too." : "También operamos nuestro propio software."}
            </h2>
            <p className="text-slate-400 leading-relaxed">
              {en
                ? "Everything above is how we build for clients — and it is how we built the two products we run ourselves. Judge the method by what it produced."
                : "Todo lo anterior es cómo construimos para clientes — y es cómo construimos los dos productos que operamos nosotros. Juzga el método por lo que ha producido."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <a href="https://acquislaw.com" target="_blank" rel="noopener"
              className="group p-7 rounded-2xl d-card flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Scale size={20} className="text-sky-400" />
                <h3 className="text-lg font-bold text-white">Acquis</h3>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-semibold text-green-400 bg-green-500/10 border border-green-500/25 rounded-full px-2.5 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> {en ? "Live" : "En vivo"}
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                {en
                  ? "A paid product: verified EU law, quoted verbatim with cryptographic provenance, in a web app and inside Claude, ChatGPT and VS Code over MCP."
                  : "Un producto de pago: derecho europeo verificado, citado literalmente y con trazabilidad criptográfica, en una app web y dentro de Claude, ChatGPT y VS Code vía MCP."}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-sky-400 group-hover:text-sky-300 transition-colors">
                acquislaw.com <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>

            <Link href="/hive" className="group p-7 rounded-2xl d-card d-card-accent flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <GitBranch size={20} className="text-violet-300" />
                <h3 className="text-lg font-bold text-white">HIVE</h3>
                <span className="ml-auto inline-flex items-center text-[11px] font-semibold text-violet-300 bg-violet-500/10 border border-violet-500/25 rounded-full px-2.5 py-0.5">
                  {en ? "Open source" : "Open source"}
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                {en
                  ? "The knowledge engine underneath Acquis: a signed, verifiable, local-first RAG published on npm. Read the code before you trust us with yours."
                  : "El motor de conocimiento bajo Acquis: un RAG firmado, verificable y local-first publicado en npm. Lee el código antes de confiarnos el tuyo."}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-violet-300 group-hover:text-violet-200 transition-colors">
                {t("hive_preview_cta")}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ CONTACT ══ */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 grid-lines" />
        <div className="absolute -top-24 right-1/4 w-[420px] h-[420px] rounded-full bg-sky-600/12 blur-[110px] pointer-events-none" />
        <div className="absolute -bottom-32 left-1/4 w-[420px] h-[420px] rounded-full bg-violet-700/12 blur-[110px] pointer-events-none" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-5 g-hero">{t("contact_title")}</h2>
          <p className="text-slate-400 text-lg mb-9 max-w-lg mx-auto">{t("contact_desc")}</p>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <a href="mailto:info@capybaralabs.tech"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-[#06090f] font-bold text-sm px-7 py-4 hover:bg-sky-100 transition-colors">
              {t("contact_cta")} <ArrowRight size={16} />
            </a>
            <a href="mailto:info@capybaralabs.tech" className="text-slate-400 text-sm font-mono hover:text-white transition-colors">
              info@capybaralabs.tech
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
