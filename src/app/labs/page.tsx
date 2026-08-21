"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import {
  ArrowRight, Zap, Code2, Wrench, Brain, Scale,
  Briefcase, GitBranch, ShieldCheck, Search, Rocket, LifeBuoy,
  Signature, Radar, Network, Terminal, Globe, Lock, Layers, Package,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────────
   Copy lives inline as {en, es} pairs rather than in lib/i18n.tsx: this landing
   is the only place most of it appears, and keeping it next to the markup makes
   the section it belongs to obvious. Shared strings (nav, services, process,
   contact) still come from t(), so /services and /hive stay in sync.

   Every claim below is checkable against the products themselves — the 13-act
   corpus, the 5 MCP tools, ed25519 signing and the HIVE version all come from
   acquis/README.md, acquis/LAUNCH.md and hive/package.json. No invented client
   counts, no fabricated metrics.
   ────────────────────────────────────────────────────────────────────────────*/

type S = { en: string; es: string };

/* ── Acquis corpus — the 13 acts currently ingested ── */
const CORPUS = [
  "AI Act", "GDPR", "DSA", "DMA", "NIS2", "Data Act", "Cyber Resilience Act",
  "DORA", "eIDAS 2", "Product Liability Dir.", "Data Governance Act",
  "ePrivacy Dir.", "Copyright DSM Dir.",
];

/* ── Proof strip ── */
const PROOF: { k: string; v: S }[] = [
  { k: "13", v: { en: "EU regulations live in Acquis, consolidated and swept daily", es: "reglamentos UE en producción en Acquis, consolidados y barridos a diario" } },
  { k: "ed25519", v: { en: "every fragment signed and content-hashed at ingestion", es: "cada fragmento firmado y con hash de contenido al ingerirlo" } },
  { k: "5 tools", v: { en: "read-only MCP tools inside Claude, ChatGPT and VS Code", es: "herramientas MCP de solo lectura en Claude, ChatGPT y VS Code" } },
  { k: "v1.3", v: { en: "HIVE, our knowledge engine — open source, on npm", es: "HIVE, nuestro motor de conocimiento — open source, en npm" } },
];

/* ── Acquis feature bullets ── */
const ACQUIS_POINTS: { Icon: typeof Scale; t: S; d: S }[] = [
  {
    Icon: Signature,
    t: { en: "The model never writes the law", es: "El modelo nunca escribe la ley" },
    d: { en: "Provisions are rendered verbatim from the signed corpus. The LLM only picks which ones answer you — so an article number cannot be invented.", es: "Las disposiciones se renderizan literalmente desde el corpus firmado. El LLM solo elige cuáles responden — así no puede inventarse un número de artículo." },
  },
  {
    Icon: Radar,
    t: { en: "Always the current consolidation", es: "Siempre la consolidación vigente" },
    d: { en: "Daily sweeps of the official EUR-Lex/CELLAR catalog pick up new consolidations, corrigenda and status changes.", es: "Barridos diarios del catálogo oficial EUR-Lex/CELLAR recogen nuevas consolidaciones, correcciones y cambios de estado." },
  },
  {
    Icon: ShieldCheck,
    t: { en: "Provenance you can hand to an auditor", es: "Trazabilidad que puedes entregar a un auditor" },
    d: { en: "Exact citation, in-force status, consolidation date, EUR-Lex deep link and a cryptographic check on every quote.", es: "Cita exacta, estado en vigor, fecha de consolidación, enlace directo a EUR-Lex y verificación criptográfica en cada cita." },
  },
  {
    Icon: Layers,
    t: { en: "Two doors, one subscription", es: "Dos puertas, una suscripción" },
    d: { en: "A focused web app at acquislaw.com, and the same verified answers inside Claude, ChatGPT and VS Code over MCP.", es: "Una app web enfocada en acquislaw.com, y las mismas respuestas verificadas dentro de Claude, ChatGPT y VS Code vía MCP." },
  },
];

/* ── HIVE stats (dark restyle of the light hive_preview_stat* keys) ── */
const HIVE_STATS: { Icon: typeof Globe; k: S; d: S }[] = [
  { Icon: Globe, k: { en: "Multilingual retrieval", es: "Recuperación multilingüe" }, d: { en: "e5-base embeddings + cross-encoder rerank — ask in Spanish, match an English source", es: "embeddings e5-base + rerank cross-encoder — pregunta en español, encuentra fuente en inglés" } },
  { Icon: Lock, k: { en: "Signed end to end", es: "Firmado de extremo a extremo" }, d: { en: "ed25519 over the text and its embedding vector, plus SHA-256 content hashes", es: "ed25519 sobre el texto y su vector de embedding, más hashes SHA-256 de contenido" } },
  { Icon: Network, k: { en: "P2P or fully closed", es: "P2P o totalmente cerrado" }, d: { en: "Hyperswarm + Hypercore for the open network — or direct mode for a private corpus", es: "Hyperswarm + Hypercore para la red abierta — o modo directo para un corpus privado" } },
];

/* ── Services (titles/descriptions from i18n; chips are the concrete stack) ── */
const SERVICES = [
  { Icon: Zap, tKey: "svc_1_title" as const, dKey: "svc_1_desc" as const, chips: ["n8n", "OpenAI", "Claude", "Gemini", "Python"], accent: false },
  { Icon: Brain, tKey: "svc_4_title" as const, dKey: "svc_4_desc" as const, chips: ["LLM agents", "RAG", "MCP", "HIVE", "Function calling"], accent: true },
  { Icon: Code2, tKey: "svc_2_title" as const, dKey: "svc_2_desc" as const, chips: ["Java", "Spring Boot", "TypeScript", "React", "React Native"], accent: false },
  { Icon: Wrench, tKey: "svc_3_title" as const, dKey: "svc_3_desc" as const, chips: ["Docker", "Kubernetes", "CI/CD", "PostgreSQL", "Security"], accent: false },
] as const;

/* ── Process (i18n keys that until now only rendered on /services) ── */
const PROCESS = [
  { Icon: Search, n: "01", tKey: "process_1_title" as const, dKey: "process_1_desc" as const },
  { Icon: Rocket, n: "02", tKey: "process_2_title" as const, dKey: "process_2_desc" as const },
  { Icon: LifeBuoy, n: "03", tKey: "process_3_title" as const, dKey: "process_3_desc" as const },
] as const;

/* ── Stack, grouped instead of a rainbow of pills ── */
const STACK: { g: S; items: string[] }[] = [
  { g: { en: "AI & agents", es: "IA y agentes" }, items: ["OpenAI", "Claude", "Gemini", "MCP", "RAG", "e5 embeddings", "n8n"] },
  { g: { en: "Backend", es: "Backend" }, items: ["Java", "Kotlin", "Spring Boot", "Node", "TypeScript", "Python"] },
  { g: { en: "Data", es: "Datos" }, items: ["PostgreSQL", "LanceDB", "Hypercore", "REST", "GraphQL"] },
  { g: { en: "Frontend & infra", es: "Frontend e infra" }, items: ["React", "Next.js", "React Native", "Docker", "Kubernetes", "CI/CD"] },
];

/* ── Community ── */
const COMMUNITY: { Icon: typeof GitBranch; label: string; meta: S; href: string; at: string; accent?: boolean }[] = [
  { Icon: GitBranch, label: "GitHub", meta: { en: "HIVE, the MCP servers and the rest of our open-source work", es: "HIVE, los servidores MCP y el resto de nuestro trabajo open source" }, href: "https://github.com/capybarist", at: "github.com/capybarist" },
  { Icon: Package, label: "npm", meta: { en: "Install the engine that runs Acquis, or the MCP server that exposes it", es: "Instala el motor que mueve Acquis, o el servidor MCP que lo expone" }, href: "https://www.npmjs.com/package/@capybaralabs/hive", at: "@capybaralabs/hive", accent: true },
  { Icon: Briefcase, label: "LinkedIn", meta: { en: "What we ship, as we ship it — releases, write-ups and the occasional post-mortem", es: "Lo que lanzamos, según lo lanzamos — releases, artículos y algún post-mortem" }, href: "https://www.linkedin.com/company/capybara-labsllc", at: "capybara-labsllc" },
];

/* ══════════════════════════════════════════════════════════ mock: Acquis ═════
   A real answer from the product: the verbatim provision zone kept visually
   separate from the interpretation zone — which is the whole point of Acquis. */
function AcquisAnswer({ en }: { en: boolean }) {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-slate-700/60 bg-[#0b1120] shadow-2xl shadow-sky-900/30 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-b border-slate-700/50">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-2 text-[11px] text-slate-500 font-mono">acquis · answer</span>
        <span className="ml-auto text-[11px] text-slate-500 font-mono">acquislaw.com</span>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-sm text-slate-300 leading-snug">
          <span className="text-slate-500">Q:</span>{" "}
          {en
            ? "Under the Cyber Resilience Act, how fast must we report an actively exploited vulnerability?"
            : "Bajo el Cyber Resilience Act, ¿en cuánto tiempo hay que notificar una vulnerabilidad explotada activamente?"}
        </p>

        {/* verbatim zone */}
        <div className="rounded-xl border border-sky-500/25 bg-sky-500/[0.06] p-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sky-300 mb-2.5">
            <Scale size={12} /> {en ? "Verbatim provision" : "Disposición literal"}
          </div>
          <div className="text-xs font-mono text-slate-400 mb-2">
            Cyber Resilience Act — Article 14(1) · <span className="text-green-400">{en ? "in force" : "en vigor"}</span>
          </div>
          <p className="text-[13px] text-slate-200 leading-relaxed italic">
            &ldquo;A manufacturer shall notify any actively exploited vulnerability contained in the product with digital elements that it becomes aware of simultaneously to the CSIRT designated as coordinator and to ENISA…&rdquo;
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-3 text-[10px] font-mono">
            <span className="inline-flex items-center gap-1 rounded-md bg-green-500/10 border border-green-500/25 text-green-400 px-2 py-0.5">
              <ShieldCheck size={10} /> {en ? "signed · verifiable" : "firmado · verificable"}
            </span>
            <span className="rounded-md bg-slate-700/40 border border-slate-600/40 text-slate-400 px-2 py-0.5">CELEX 32024R2847</span>
            <span className="rounded-md bg-slate-700/40 border border-slate-600/40 text-slate-400 px-2 py-0.5">EUR-Lex ↗</span>
          </div>
        </div>

        {/* interpretation zone — deliberately a different colour */}
        <div className="rounded-xl border border-violet-500/25 bg-violet-500/[0.06] p-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-violet-300 mb-2">
            <Brain size={12} /> {en ? "Interpretation" : "Interpretación"}
          </div>
          <p className="text-[13px] text-slate-300 leading-relaxed">
            {en ? (
              <>Early warning within <b className="text-white">24 hours</b>, full notification within <b className="text-white">72 hours</b>, final report within 14 days — Art. 14(2)–(4).</>
            ) : (
              <>Alerta temprana en <b className="text-white">24 horas</b>, notificación completa en <b className="text-white">72 horas</b>, informe final en 14 días — Art. 14(2)–(4).</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ mock: HIVE ══════ */
function HiveTerminal({ en }: { en: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-700/60 bg-[#0b1120] overflow-hidden shadow-2xl shadow-violet-900/25">
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-b border-slate-700/50">
        <Terminal size={13} className="text-slate-500" />
        <span className="text-[11px] text-slate-500 font-mono">hive — node_a1b2c3</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[11px] text-green-400 font-mono">live</span>
        </span>
      </div>
      <div className="p-4 font-mono text-[12px] space-y-2.5">
        <div className="text-slate-500">$ npx @capybaralabs/hive</div>
        <div className="text-slate-500">🐝 {en ? "BEE autonomous extractor starting" : "extractor autónomo BEE arrancando"}</div>
        <div className="flex gap-2">
          <span className="text-violet-400">▶</span>
          <span className="text-slate-300">Topic: <span className="text-sky-300">quantum_computing</span></span>
        </div>
        <div className="space-y-1 pl-3 border-l border-slate-700">
          <div className="text-slate-400">+ &ldquo;Quantum advantage in optimization&rdquo;</div>
          <div className="text-slate-600 pl-3">arXiv:2401.12345 · <span className="text-green-500">✓ signed</span></div>
          <div className="text-slate-400">+ &ldquo;Error correction in NISQ devices&rdquo;</div>
          <div className="text-slate-600 pl-3">arXiv:2402.67890 · <span className="text-green-500">✓ signed</span></div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-slate-500"><span className="text-white font-semibold">247</span> fragments · <span className="text-white font-semibold">3</span> peers</span>
          <span className="text-violet-400">syncing…</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ page ═════ */
export default function Home() {
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
        <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-sky-600/12 blur-[110px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[460px] h-[460px] rounded-full bg-violet-700/12 blur-[110px] pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-24 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-500/10 px-3.5 py-1.5 text-[11px] font-medium text-sky-300 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                {t("hero_badge")}
              </div>

              {/* The line break is decorative: forced on mobile it makes the
                  headline wider than the viewport and the whole page scrolls
                  sideways, so it only kicks in once there is room for it. */}
              <h1 className="text-[2rem] sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] md:leading-[1.03] mb-6 g-hero text-balance">
                {en
                  ? (<>We build AI products —<br className="hidden md:inline" /> and we run them in production.</>)
                  : (<>Construimos productos de IA —<br className="hidden md:inline" /> y los operamos en producción.</>)}
              </h1>

              <p className="text-slate-400 text-[17px] leading-relaxed mb-8 max-w-xl">
                {en
                  ? <>Capybara Labs is a small AI product studio. We built <b className="text-slate-200">Acquis</b> — verified EU law inside Claude, ChatGPT and VS Code — on top of <b className="text-slate-200">HIVE</b>, our own open-source knowledge engine. We build the same way for you: automation, agents and custom software, shipped in weeks.</>
                  : <>Capybara Labs es un estudio de producto de IA. Construimos <b className="text-slate-200">Acquis</b> — derecho digital de la UE verificado dentro de Claude, ChatGPT y VS Code — sobre <b className="text-slate-200">HIVE</b>, nuestro motor de conocimiento open source. Trabajamos igual para ti: automatización, agentes y software a medida, entregados en semanas.</>}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <a href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm px-6 py-3.5 transition-colors shadow-lg shadow-sky-500/20">
                  {t("hero_cta_primary")} <ArrowRight size={16} />
                </a>
                <a href="https://acquislaw.com" target="_blank" rel="noopener"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-white/[0.03] text-slate-300 hover:border-slate-500 hover:text-white font-semibold text-sm px-6 py-3.5 transition-colors">
                  {en ? "See Acquis live" : "Ver Acquis en vivo"} <ArrowRight size={15} />
                </a>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                {(["pill_fast", "pill_secure", "pill_stack"] as const).map((k) => (
                  <div key={k} className="flex items-center gap-2 text-[13px] text-slate-500">
                    <ShieldCheck size={14} className="text-green-500 shrink-0" /> {t(k)}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <AcquisAnswer en={en} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ PROOF STRIP ══ */}
      <section className="border-b border-slate-800/70 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 hairline-x">
            {PROOF.map(({ k, v }) => (
              <div key={k} className="px-0 md:px-7 first:md:pl-0 py-8">
                <div className="text-2xl md:text-[26px] font-black text-white tracking-tight mb-1.5">{k}</div>
                <p className="text-[13px] text-slate-500 leading-relaxed max-w-[15rem]">{L(v)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════ PRODUCTS ══ */}
      <section id="products" className="relative py-24 border-b border-slate-800/70">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400 mb-3">
              {en ? "Our products" : "Nuestros productos"}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              {en ? "Two products. Both live." : "Dos productos. Los dos en producción."}
            </h2>
            <p className="text-slate-400 leading-relaxed">
              {en
                ? "We do not demo slideware. Acquis is a paid product with real subscribers; HIVE is the open-source engine underneath it, published on npm."
                : "No enseñamos slides. Acquis es un producto de pago con suscriptores reales; HIVE es el motor open source que lo sostiene, publicado en npm."}
            </p>
          </div>

          {/* ── Acquis: the flagship ── */}
          <div className="rounded-3xl d-card overflow-hidden mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
              {/* left: the pitch */}
              <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-700/30">
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-green-400 bg-green-500/10 border border-green-500/25 rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> {en ? "Live product" : "Producto en vivo"}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">acquislaw.com</span>
                </div>

                <h3 className="text-3xl font-black text-white tracking-tight mb-3 flex items-center gap-2.5">
                  <Scale size={26} className="text-sky-400" /> Acquis
                </h3>
                <p className="text-lg text-slate-300 font-medium leading-snug mb-3">
                  {en ? "AI answers about EU law you can defend in an audit." : "Respuestas de IA sobre derecho europeo que aguantan una auditoría."}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xl">
                  {en
                    ? "Ask in plain language. Get the verbatim provision of the current consolidation — exact citation, in-force status, consolidation date and an EUR-Lex deep link — with the plain-language reading kept clearly apart from the legal text."
                    : "Pregunta en lenguaje natural. Obtén la disposición literal de la consolidación vigente — cita exacta, estado en vigor, fecha de consolidación y enlace directo a EUR-Lex — con la lectura en lenguaje llano claramente separada del texto legal."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-6 mb-8">
                  {ACQUIS_POINTS.map(({ Icon, t: title, d }) => (
                    <div key={title.en}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon size={15} className="text-sky-400 shrink-0" />
                        <h4 className="text-[13px] font-bold text-white">{L(title)}</h4>
                      </div>
                      <p className="text-[12.5px] text-slate-500 leading-relaxed">{L(d)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a href="https://acquislaw.com" target="_blank" rel="noopener"
                    className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm px-5 py-3 transition-colors">
                    {en ? "Open Acquis" : "Abrir Acquis"} <ArrowRight size={15} />
                  </a>
                  <span className="text-[12.5px] text-slate-500">
                    {en ? "7-day Pro trial, no card · from €4.95/mo" : "Prueba Pro de 7 días, sin tarjeta · desde 4,95 €/mes"}
                  </span>
                </div>
              </div>

              {/* right: the corpus, which is the actual asset */}
              <div className="p-8 md:p-10 bg-white/[0.02]">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
                  {en ? "The corpus · consolidated & signed" : "El corpus · consolidado y firmado"}
                </p>
                <div className="flex flex-wrap gap-2 mb-7">
                  {CORPUS.map((a) => (
                    <span key={a} className="text-[12px] font-medium text-slate-300 bg-white/[0.05] border border-slate-700/50 rounded-lg px-2.5 py-1.5">
                      {a}
                    </span>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-700/40">
                  {[
                    { k: en ? "Sources" : "Fuentes", v: "EUR-Lex / CELLAR" },
                    { k: en ? "Refresh" : "Actualización", v: en ? "daily catalog sweep" : "barrido diario del catálogo" },
                    { k: en ? "Integrity" : "Integridad", v: "ed25519 + SHA-256" },
                    { k: en ? "Access" : "Acceso", v: en ? "web app · MCP connector" : "app web · conector MCP" },
                    { k: "MCP", v: "Claude · ChatGPT · VS Code" },
                  ].map(({ k, v }) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 text-[12.5px]">
                      <span className="text-slate-500">{k}</span>
                      <span className="text-slate-300 font-mono text-right">{v}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-slate-700/40 bg-white/[0.03] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
                    {en ? "Next up" : "Lo siguiente"}
                  </p>
                  <p className="text-[12.5px] text-slate-400 leading-relaxed">
                    {en
                      ? "EDPB guidelines. We add corpora on request — built on HIVE, a new one is a matter of hours, not a rebuild."
                      : "Directrices del EDPB. Añadimos corpus a petición — sobre HIVE, uno nuevo son horas, no una reconstrucción."}
                  </p>
                </div>

                <p className="mt-5 text-[11px] text-slate-600 leading-relaxed">
                  {en
                    ? "Returns official sources verbatim with citations; not legal advice. Texts © European Union, reuse permitted (Decision 2011/833/EU)."
                    : "Devuelve fuentes oficiales literales con citas; no es asesoramiento jurídico. Textos © Unión Europea, reutilización permitida (Decisión 2011/833/UE)."}
                </p>
              </div>
            </div>
          </div>

          {/* ── HIVE: the engine ── */}
          <div className="rounded-3xl d-card d-card-accent overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
              <div className="p-8 md:p-10 order-2 lg:order-1 bg-white/[0.02] border-t lg:border-t-0 lg:border-r border-slate-700/30">
                <HiveTerminal en={en} />
                <div className="mt-5 space-y-2.5">
                  {HIVE_STATS.map(({ Icon, k, d }) => (
                    <div key={k.en} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={14} className="text-violet-300" />
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-white">{L(k)}</div>
                        <div className="text-[12px] text-slate-500 leading-relaxed">{L(d)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 md:p-10 order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-violet-300 bg-violet-500/10 border border-violet-500/25 rounded-full px-3 py-1">
                    {en ? "Open source · the engine" : "Open source · el motor"}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">v1.3 · npm</span>
                </div>

                {/* HiveLogo.png bakes a dark-violet "HIVE" wordmark under the mark
                    that vanishes on this card (and HiveLogo-white.png fills the
                    honeycomb cells solid). Use the mark, set the name as text. */}
                <div className="flex items-center gap-3.5 mb-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/HiveMark.png" alt="" className="h-14 w-auto" />
                  <span className="text-4xl font-black tracking-[0.22em] text-white">HIVE</span>
                </div>

                <p className="text-lg text-slate-300 font-medium leading-snug mb-3">
                  {en ? "Wikipedia for machines — a decentralized, verifiable knowledge base for LLMs." : "Wikipedia para máquinas — una base de conocimiento descentralizada y verificable para LLMs."}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {en
                    ? "A peer-to-peer network of autonomous BEEs that extract knowledge from any source, sign every fragment with ed25519 and sync it over Hypercore. Acquis is its first production deployment — and your own private corpus can be the next one."
                    : "Una red P2P de BEEs autónomos que extraen conocimiento de cualquier fuente, firman cada fragmento con ed25519 y lo sincronizan sobre Hypercore. Acquis es su primer despliegue en producción — y tu propio corpus privado puede ser el siguiente."}
                </p>

                <div className="rounded-xl border border-slate-700/50 bg-black/40 px-4 py-3 font-mono text-[12.5px] text-slate-300 mb-6 overflow-x-auto">
                  <span className="text-slate-600 select-none">$ </span>npx @capybaralabs/hive
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/hive"
                    className="inline-flex items-center gap-2 rounded-xl bg-violet-500 hover:bg-violet-400 text-white font-semibold text-sm px-5 py-3 transition-colors">
                    {t("hive_preview_cta")}
                  </Link>
                  <a href="https://github.com/capybarist/hive" target="_blank" rel="noopener"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-white/[0.03] text-slate-300 hover:border-slate-500 hover:text-white font-semibold text-sm px-5 py-3 transition-colors">
                    <GitBranch size={15} /> {t("hive_github_cta")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════ SERVICES ══ */}
      <section className="py-24 border-b border-slate-800/70 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400 mb-3">{t("section_services")}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">{t("svc_hero_sub")}</h2>
            <p className="text-slate-400 leading-relaxed">
              {en
                ? "The same engineering that runs Acquis, pointed at your problem. We take it from diagnosis to a system your team can own."
                : "La misma ingeniería que sostiene Acquis, aplicada a tu problema. Lo llevamos del diagnóstico a un sistema que tu equipo puede mantener."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map(({ Icon, tKey, dKey, chips, accent }) => (
              <div key={tKey} className={`p-8 rounded-2xl d-card flex flex-col ${accent ? "d-card-accent" : ""}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 border ${accent ? "bg-violet-500/10 border-violet-500/25" : "bg-sky-500/10 border-sky-500/25"}`}>
                  <Icon size={20} className={accent ? "text-violet-300" : "text-sky-300"} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2.5">{t(tKey)}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{t(dKey)}</p>
                <div className="flex flex-wrap gap-1.5 pt-5 border-t border-slate-700/30">
                  {chips.map((c) => (
                    <span key={c} className="text-[11.5px] font-medium text-slate-400 bg-white/[0.04] border border-slate-700/40 rounded-md px-2 py-1">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors">
              {t("nav_services")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ PROCESS ══ */}
      <section className="py-24 border-b border-slate-800/70">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400 mb-3">{t("section_process")}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">{t("process_title")}</h2>
            <p className="text-slate-400 leading-relaxed">
              {en
                ? "Three steps, no discovery theatre. You see something running in the first week."
                : "Tres pasos, sin teatro de descubrimiento. Ves algo funcionando en la primera semana."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PROCESS.map(({ Icon, n, tKey, dKey }) => (
              <div key={n} className="relative p-8 rounded-2xl d-card">
                <span className="absolute top-6 right-7 text-5xl font-black text-white/[0.06] select-none">{n}</span>
                <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-sky-300" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5">{t(tKey)}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t(dKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ STACK ══ */}
      <section className="py-24 border-b border-slate-800/70 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400 mb-3">{t("stack_title")}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{t("stack_lead")}</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {STACK.map(({ g, items }) => (
              <div key={g.en}>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 pb-3 mb-4 border-b border-slate-700/40">{L(g)}</p>
                <ul className="space-y-2.5">
                  {items.map((i) => (
                    <li key={i} className="text-sm text-slate-300">{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ COMMUNITY ══ */}
      <section id="community" className="py-24 border-b border-slate-800/70">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400 mb-3">{t("nav_community")}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">{t("section_follow")}</h2>
            <p className="text-slate-400 leading-relaxed">
              {en
                ? "HIVE is open source and published on npm. Read the code, run a node, or open an issue — the engine behind Acquis is the same one you can install."
                : "HIVE es open source y está publicado en npm. Lee el código, levanta un nodo o abre un issue — el motor detrás de Acquis es el mismo que puedes instalar."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COMMUNITY.map(({ Icon, label, meta, href, at, accent }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className={`group p-7 rounded-2xl d-card flex flex-col ${accent ? "d-card-accent" : ""}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 border ${accent ? "bg-violet-500/10 border-violet-500/25" : "bg-white/[0.05] border-slate-700/50"}`}>
                  <Icon size={19} className={accent ? "text-violet-300" : "text-slate-300"} />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{label}</h3>
                <p className="text-[12.5px] text-slate-500 leading-relaxed mb-5 flex-1">{L(meta)}</p>
                <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-400 group-hover:text-white transition-colors">
                  <span className="font-mono">{at}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ CONTACT ══ */}
      <section id="contact" className="relative overflow-hidden py-24">
        <div className="absolute inset-0 grid-lines" />
        <div className="absolute -top-24 right-1/4 w-[420px] h-[420px] rounded-full bg-sky-600/12 blur-[110px] pointer-events-none" />
        <div className="absolute -bottom-32 left-1/4 w-[420px] h-[420px] rounded-full bg-violet-700/12 blur-[110px] pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-5 g-hero">{t("contact_title")}</h2>
              <p className="text-slate-400 text-lg mb-9 max-w-lg">{t("contact_desc")}</p>
              <div className="flex flex-wrap gap-4 items-center">
                <a href="mailto:info@capybaralabs.tech"
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-[#06090f] font-bold text-sm px-7 py-4 hover:bg-sky-100 transition-colors">
                  {t("contact_cta")} <ArrowRight size={16} />
                </a>
                <a href="mailto:info@capybaralabs.tech" className="text-slate-400 text-sm font-mono hover:text-white transition-colors">
                  info@capybaralabs.tech
                </a>
              </div>
            </div>

            <div className="rounded-2xl d-card p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-5">
                {en ? "What happens next" : "Qué pasa después"}
              </p>
              <ol className="space-y-4">
                {[
                  { en: "You tell us the problem — not the solution you think you need.", es: "Nos cuentas el problema — no la solución que crees necesitar." },
                  { en: "We come back within 48h with a plan, a scope and a price.", es: "Volvemos en 48h con un plan, un alcance y un precio." },
                  { en: "Week one: something running you can actually click.", es: "Primera semana: algo funcionando que puedes tocar." },
                ].map((s, i) => (
                  <li key={i} className="flex gap-3.5">
                    <span className="w-6 h-6 rounded-md bg-sky-500/15 border border-sky-500/25 text-sky-300 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-[13.5px] text-slate-300 leading-relaxed">{L(s)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
