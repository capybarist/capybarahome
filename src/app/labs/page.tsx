"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { PROJECTS, STATUS_LABEL, projectHref, type Project } from "@/lib/projects";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const stack = [
  "Claude", "OpenAI", "Gemini", "MCP", "n8n", "TypeScript", "React", "React Native", "Next.js",
  "Java · Spring Boot", "Python", "PostgreSQL", "Docker", "Kubernetes", "CI/CD", "HIVE",
];

const services = [
  { n: "01", tKey: "svc_1_title", dKey: "svc_1_desc", tags: ["n8n", "Claude", "OpenAI", "Python"] },
  { n: "02", tKey: "svc_4_title", dKey: "svc_4_desc", tags: ["LLM agents", "RAG", "MCP", "HIVE"] },
  { n: "03", tKey: "svc_2_title", dKey: "svc_2_desc", tags: ["Spring Boot", "React", "React Native"] },
  { n: "04", tKey: "svc_3_title", dKey: "svc_3_desc", tags: ["DevOps", "CI/CD", "Security"] },
] as const;

const process = [
  { n: "01", tKey: "process_1_title", dKey: "process_1_desc" },
  { n: "02", tKey: "process_2_title", dKey: "process_2_desc" },
  { n: "03", tKey: "process_3_title", dKey: "process_3_desc" },
] as const;

function StatusPill({ p, en }: { p: Project; en: boolean }) {
  const s = STATUS_LABEL[p.status];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-2)]">
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {en ? s.en : s.es}
    </span>
  );
}

function SmartLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return href.startsWith("/")
    ? <Link href={href} className={className}>{children}</Link>
    : <a href={href} target="_blank" rel="noopener" className={className}>{children}</a>;
}

/* ── Hero side panel: the ecosystem as an index ─────────────────────────────── */
function EcosystemIndex({ en }: { en: boolean }) {
  return (
    <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_30px_60px_-30px_rgba(23,20,15,.35)] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
        <span className="eyebrow">{en ? "The ecosystem" : "El ecosistema"}</span>
        <span className="eyebrow">{PROJECTS.length} {en ? "projects" : "proyectos"}</span>
      </div>
      <ul>
        {PROJECTS.map((p) => (
          <li key={p.slug} className="border-b border-[var(--border)] last:border-0">
            <SmartLink href={projectHref(p)} className="group flex items-center gap-4 px-5 py-4 hover:bg-[var(--bg)] transition-colors">
              <span className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-white text-lg"
                style={{ background: p.swatch }} aria-hidden>{p.mark}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-[var(--ink)]">{p.name}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${STATUS_LABEL[p.status].dot}`} aria-hidden />
                </span>
                <span className="block text-sm text-[var(--muted)] truncate">{en ? p.tagline.en : p.tagline.es}</span>
              </span>
              <ArrowRight size={16} className="shrink-0 text-[var(--muted-light)] group-hover:text-[var(--ink)] group-hover:translate-x-0.5 transition-all" />
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  const { t, lang } = useI18n();
  const en = lang === "en";

  return (
    <div>
      {/* ══════════════════════════════════════════════════════════ HERO ══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 paper-grid pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-6">Capybara Labs · {en ? "AI studio" : "Estudio de IA"}</p>
              <h1 className="font-display text-[2.9rem] leading-[1.02] sm:text-6xl md:text-7xl text-[var(--ink)] mb-7">
                {en
                  ? <>We build AI products <em>people actually use.</em></>
                  : <>Construimos productos de IA <em>que la gente usa.</em></>}
              </h1>
              <p className="text-lg text-[var(--text-2)] leading-relaxed max-w-xl mb-10">
                {en
                  ? "An independent studio that ships and runs its own products, from verified EU law to a social network for pets, and puts the same craft into software for other companies."
                  : "Un estudio independiente que lanza y opera sus propios productos, del derecho europeo verificado a una red social para mascotas, y pone el mismo oficio en el software que hace para otras empresas."}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-[var(--bg)] font-medium text-sm px-6 py-3 hover:bg-[var(--plum)] transition-colors">
                  {en ? "See our projects" : "Ver los proyectos"} <ArrowRight size={16} />
                </a>
                <a href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-dark)] text-[var(--ink)] font-medium text-sm px-6 py-3 hover:bg-[var(--surface)] transition-colors">
                  {t("hero_cta_primary")}
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <EcosystemIndex en={en} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ PROJECTS ══ */}
      <section id="projects" className="scroll-mt-16 border-t border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
            <p className="eyebrow md:col-span-3 pt-3">{en ? "Projects" : "Proyectos"}</p>
            <h2 className="md:col-span-9 font-display text-4xl md:text-5xl text-[var(--ink)] leading-[1.08]">
              {en
                ? <>Software we build, <em>and run in production.</em></>
                : <>Software que construimos <em>y operamos en producción.</em></>}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROJECTS.map((p) => {
              const href = projectHref(p);
              const internal = href.startsWith("/");
              return (
                <SmartLink key={p.slug} href={href}
                  className="lift group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 md:p-8 overflow-hidden">
                  <span className="absolute inset-x-0 top-0 h-1" style={{ background: p.swatch }} aria-hidden />
                  <div className="flex items-start justify-between gap-4 mb-8">
                    <span className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl"
                      style={{ background: p.swatch }} aria-hidden>{p.mark}</span>
                    <StatusPill p={p} en={en} />
                  </div>
                  <h3 className="font-display text-4xl text-[var(--ink)] mb-1">{p.name}</h3>
                  <p className="font-medium text-[var(--text-2)] mb-3">{en ? p.tagline.en : p.tagline.es}</p>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-8 flex-1">{en ? p.body.en : p.body.es}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--ink)]">
                    {internal ? (en ? `About ${p.name}` : `Conoce ${p.name}`) : p.siteLabel}
                    {internal
                      ? <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                      : <ArrowUpRight size={15} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />}
                  </span>
                </SmartLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ SERVICES ══ */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
            <p className="eyebrow md:col-span-3 pt-3">{t("section_services")}</p>
            <div className="md:col-span-9">
              <h2 className="font-display text-4xl md:text-5xl text-[var(--ink)] leading-[1.08] mb-4">
                {en
                  ? <>What we learn shipping our own products, <em>we build for you.</em></>
                  : <>Lo que aprendemos lanzando lo nuestro, <em>lo construimos para ti.</em></>}
              </h2>
              <p className="text-[var(--muted)] max-w-xl">{t("svc_hero_sub")}</p>
            </div>
          </div>

          <div className="border-t border-[var(--border)]">
            {services.map(({ n, tKey, dKey, tags }) => (
              <div key={n} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-8 border-b border-[var(--border)]">
                <span className="md:col-span-3 font-mono text-sm text-[var(--plum)]">{n}</span>
                <h3 className="md:col-span-4 font-display text-3xl text-[var(--ink)] leading-tight">{t(tKey)}</h3>
                <div className="md:col-span-5">
                  <p className="text-[var(--muted)] leading-relaxed mb-4">{t(dKey)}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span key={tag} className="text-xs text-[var(--text-2)] border border-[var(--border)] rounded-full px-2.5 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)] hover:text-[var(--plum)] transition-colors">
              {en ? "All services and how we work" : "Todos los servicios y cómo trabajamos"} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ HOW WE WORK ══ */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
            <p className="eyebrow md:col-span-3 pt-3">{t("section_process")}</p>
            <h2 className="md:col-span-9 font-display text-4xl md:text-5xl text-[var(--ink)]">{t("process_title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {process.map(({ n, tKey, dKey }) => (
              <div key={n} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7">
                <span className="font-display text-5xl text-[var(--plum)] block mb-6">{n}</span>
                <h3 className="font-semibold text-[var(--ink)] mb-2">{t(tKey)}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{t(dKey)}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-6">
            <p className="eyebrow md:col-span-3 pt-1">{t("stack_title")}</p>
            <div className="md:col-span-9">
              <p className="text-[var(--text-2)] mb-5">{t("stack_lead")}</p>
              <div className="flex flex-wrap gap-2">
                {stack.map((label) => (
                  <span key={label} className="text-sm text-[var(--ink)] bg-[var(--surface)] border border-[var(--border)] rounded-full px-3.5 py-1.5">{label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ CONTACT ══ */}
      <section id="contact" className="scroll-mt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-24">
          <div className="on-dark relative overflow-hidden rounded-3xl bg-[var(--ink)] px-7 py-12 md:p-16">
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[var(--plum)]/25 blur-3xl pointer-events-none" aria-hidden />
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
              <div className="md:col-span-8">
                <p className="eyebrow !text-[#9a907f] mb-5">{t("nav_contact")}</p>
                <h2 className="font-display text-5xl md:text-6xl text-white leading-[1.02] mb-5">
                  {en ? <>Got an idea? <em>Let&apos;s talk.</em></> : <>¿Tienes una idea? <em>Hablemos.</em></>}
                </h2>
                <p className="text-[#b9b0a1] text-lg max-w-lg">{t("contact_desc")}</p>
              </div>
              <div className="md:col-span-4 flex flex-col gap-3 md:items-end">
                <a href="mailto:info@capybaralabs.tech"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--bg)] text-[var(--ink)] font-semibold text-sm px-7 py-3.5 hover:bg-[var(--plum-bg)] transition-colors">
                  {en ? "Write to us" : "Escríbenos"} <ArrowRight size={16} />
                </a>
                <a href="mailto:info@capybaralabs.tech" className="text-sm text-[#9a907f] hover:text-white transition-colors">
                  info@capybaralabs.tech
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
