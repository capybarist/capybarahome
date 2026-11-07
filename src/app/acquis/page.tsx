"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import {
  ArrowUpRight, ArrowRight, MessageSquare, Plug, Building2, FileX2, History, ShieldQuestion, CheckCircle2,
} from "lucide-react";

// Acquis lives on its own domain; this page is the summary inside the
// Capybara Labs site, and every call to action sends people to acquislaw.com.
const SITE = "https://acquislaw.com";

const NAVY = "#1e3a5f";
const ACCENT = "#9cc3f0";

const REGULATIONS = [
  "AI Act", "GDPR", "DSA", "DMA", "NIS2", "Data Act", "Cyber Resilience Act",
  "DORA", "eIDAS 2", "Product Liability Directive", "Data Governance Act", "ePrivacy", "Copyright DSM", "MiCA",
];

export default function AcquisPage() {
  const { lang } = useI18n();
  const en = lang === "en";

  const problems = [
    { Icon: FileX2,
      title: en ? "Invented articles" : "Artículos inventados",
      body: en ? "General-purpose chatbots cite provisions that don't exist, or put words in the regulation's mouth."
               : "Los chatbots generalistas citan disposiciones que no existen o ponen en boca del reglamento lo que no dice." },
    { Icon: History,
      title: en ? "Stale and repealed text" : "Texto desfasado o derogado",
      body: en ? "Their answers come from whatever version they were trained on, not from the consolidated text in force."
               : "Responden con la versión que vieron al entrenarse, no con el texto consolidado vigente." },
    { Icon: ShieldQuestion,
      title: en ? "Nothing to defend" : "Nada que defender",
      body: en ? "Without the exact provision and its source, an answer can't hold up in an audit or in front of a client."
               : "Sin la disposición exacta y su fuente, una respuesta no se sostiene en una auditoría ni ante un cliente." },
  ];

  const channels = [
    { Icon: MessageSquare,
      title: en ? "Web chat" : "Chat web",
      body: en ? "Ask in plain language at acquislaw.com." : "Pregunta en lenguaje natural en acquislaw.com." },
    { Icon: Plug,
      title: en ? "Inside your AI assistant" : "Dentro de tu asistente de IA",
      body: en ? "A connector for Claude, ChatGPT and VS Code, so verified law shows up where you already work."
               : "Un conector para Claude, ChatGPT y VS Code, para tener la ley verificada donde ya trabajas." },
    { Icon: Building2,
      title: en ? "For companies" : "Para empresas",
      body: en ? "Self-hosted deployments for teams that need it on their own infrastructure."
               : "Despliegue en tu propia infraestructura para equipos que lo necesitan." },
  ];

  const steps = en
    ? ["You ask a question in plain language.", "Acquis finds the exact provisions in the current consolidated text.",
       "It returns them verbatim, with the citation and the EUR-Lex link.", "Each fragment is cryptographically verified, so the model never writes the law."]
    : ["Haces una pregunta en lenguaje natural.", "Acquis localiza las disposiciones exactas en el texto consolidado vigente.",
       "Te las devuelve literales, con su cita y el enlace a EUR-Lex.", "Cada fragmento va verificado criptográficamente: el modelo nunca escribe la ley."];

  return (
    // Acquis keeps its own blue for the accent words instead of the studio plum.
    <div style={{ "--plum": "#2f5d94" } as React.CSSProperties}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="on-dark relative overflow-hidden" style={{ background: "#0f1b2d" }}>
        <div className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ background: NAVY }} aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-[#d6e2f2] mb-8">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {en ? "A Capybara Labs product · Live" : "Un producto de Capybara Labs · En producción"}
              </div>
              <h1 className="font-display text-6xl md:text-7xl text-white leading-[0.95] mb-6">
                <span style={{ color: ACCENT }}>§</span>acquis
              </h1>
              <p className="font-display text-2xl md:text-3xl text-[#e6eef8] [&_em]:!text-[#9cc3f0] leading-tight mb-6 max-w-xl">
                {en ? <>AI answers about EU law <em>you can defend in an audit.</em></> : <>Respuestas de IA sobre derecho de la UE <em>que puedes defender en una auditoría.</em></>}
              </p>
              <p className="text-lg text-[#a9b8cc] leading-relaxed max-w-xl mb-10">
                {en
                  ? "Ask in plain language and get the verbatim provision from the current consolidated text, with its exact citation and EUR-Lex link."
                  : "Pregunta en lenguaje natural y recibe la disposición literal del texto consolidado vigente, con su cita exacta y el enlace a EUR-Lex."}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={SITE} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#0f1b2d] font-semibold text-sm px-7 py-3.5 hover:bg-[#e6eef8] transition-colors">
                  {en ? "Go to acquislaw.com" : "Ir a acquislaw.com"} <ArrowUpRight size={16} />
                </a>
                <a href={`${SITE}/#pricing`} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 text-[#e6eef8] hover:bg-white/5 font-semibold text-sm px-7 py-3.5 transition-colors">
                  {en ? "See plans" : "Ver planes"}
                </a>
              </div>
            </div>

            {/* Answer mock */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-2xl bg-[#faf8f4] shadow-2xl shadow-black/40 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
                  <span className="eyebrow">acquis · {en ? "answer" : "respuesta"}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle2 size={12} /> {en ? "verified" : "verificado"}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-sm text-[var(--muted)] mb-3">
                    {en ? "When must a manufacturer report an actively exploited vulnerability?" : "¿Cuándo debe un fabricante notificar una vulnerabilidad explotada activamente?"}
                  </p>
                  <div className="rounded-xl border-l-4 bg-white p-4 mb-3" style={{ borderColor: NAVY }}>
                    <p className="text-[11px] font-semibold mb-1.5" style={{ color: NAVY }}>Cyber Resilience Act · Art. 14(1)</p>
                    <p className="text-sm text-[var(--ink)] leading-relaxed">
                      {/* Verbatim from the corpus (CELEX 02024R2847-20241120), kept in English in both languages. */}
                      “A manufacturer shall notify any actively exploited vulnerability contained in the product with digital elements that it becomes aware of simultaneously to the CSIRT designated as coordinator […] and to ENISA.”
                    </p>
                  </div>
                  <p className="text-xs text-[var(--muted)]">EUR-Lex ↗ · {en ? "consolidated text in force" : "texto consolidado vigente"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
            <p className="eyebrow md:col-span-3 pt-3">{en ? "The problem" : "El problema"}</p>
            <h2 className="md:col-span-9 font-display text-3xl md:text-[2.75rem] text-[var(--ink)] leading-[1.08]">
              {en ? <>Why legal AI fails, <em>and what Acquis does instead.</em></> : <>Por qué falla la IA legal <em>y qué hace Acquis en su lugar.</em></>}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
            {problems.map(({ Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-[#e6eef8]">
                  <Icon size={20} style={{ color: NAVY }} />
                </div>
                <h3 className="font-semibold text-[var(--ink)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <p className="eyebrow md:col-span-3 pt-1">{en ? "How it works" : "Cómo funciona"}</p>
            <ol className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-mono text-sm pt-0.5" style={{ color: NAVY }}>0{i + 1}</span>
                  <span className="text-[var(--text-2)] leading-relaxed">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Where ────────────────────────────────────────────────────────── */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
            <p className="eyebrow md:col-span-3 pt-3">{en ? "Where" : "Dónde"}</p>
            <h2 className="md:col-span-9 font-display text-3xl md:text-[2.75rem] text-[var(--ink)] leading-[1.08]">
              {en ? <>Use it <em>where you already work.</em></> : <>Úsalo <em>donde ya trabajas.</em></>}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
            {channels.map(({ Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <Icon size={20} className="mb-4" style={{ color: NAVY }} />
                <h3 className="font-semibold text-[var(--ink)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-3">
              <p className="eyebrow mb-2">{en ? "Coverage" : "Cobertura"}</p>
              <p className="text-sm text-[var(--muted)]">{en ? "EU digital regulation, kept current." : "Regulación digital de la UE, siempre al día."}</p>
            </div>
            <div className="md:col-span-9 flex flex-wrap gap-2">
              {REGULATIONS.map((r) => (
                <span key={r} className="text-sm text-[var(--ink)] bg-[var(--surface)] border border-[var(--border)] rounded-full px-3.5 py-1.5">{r}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 md:py-24 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-[var(--ink)] leading-[1.02] mb-5">
            {en ? <>EU law, <em>straight from the source.</em></> : <>El derecho de la UE, <em>directo de la fuente.</em></>}
          </h2>
          <p className="text-[var(--muted)] mb-8">
            {en ? "Try Pro free for 7 days, no card needed." : "Prueba Pro gratis 7 días, sin tarjeta."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={SITE} target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 rounded-full text-white font-semibold text-sm px-7 py-3.5 transition-opacity hover:opacity-90"
              style={{ background: NAVY }}>
              acquislaw.com <ArrowUpRight size={16} />
            </a>
            <Link href="/hive"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-dark)] text-[var(--ink)] font-semibold text-sm px-7 py-3.5 hover:bg-[var(--surface)] transition-colors">
              {en ? "Built on HIVE" : "Construido sobre HIVE"} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
