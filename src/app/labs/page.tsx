"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { PROJECTS, STATUS_LABEL, projectHref } from "@/lib/projects";
import { ProjectMark, SmartLink } from "@/components/ProjectCard";
import { ArrowRight, Zap, Brain, Code2, Wrench } from "lucide-react";

// Home (/) is the studio: what we build for clients. Our own products live
// under /products and only appear here as a short proof strip.

const stack = [
  "Claude", "OpenAI", "Gemini", "MCP", "n8n", "TypeScript", "React", "React Native", "Next.js",
  "Java · Spring Boot", "Python", "PostgreSQL", "Docker", "Kubernetes", "CI/CD",
];

const services = [
  { n: "01", Icon: Zap, tKey: "svc_1_title", dKey: "svc_1_desc", tags: ["n8n", "Claude", "OpenAI", "Python"] },
  { n: "02", Icon: Brain, tKey: "svc_4_title", dKey: "svc_4_desc", tags: ["LLM agents", "RAG", "MCP", "HIVE"] },
  { n: "03", Icon: Code2, tKey: "svc_2_title", dKey: "svc_2_desc", tags: ["Spring Boot", "React", "React Native", "TypeScript"] },
  { n: "04", Icon: Wrench, tKey: "svc_3_title", dKey: "svc_3_desc", tags: ["DevOps", "CI/CD", "PostgreSQL", "Security"] },
] as const;

const process = [
  { n: "01", tKey: "process_1_title", dKey: "process_1_desc" },
  { n: "02", tKey: "process_2_title", dKey: "process_2_desc" },
  { n: "03", tKey: "process_3_title", dKey: "process_3_desc" },
] as const;

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
              <p className="eyebrow mb-6">Capybara Labs · {en ? "Software & applied AI" : "Software e IA aplicada"}</p>
              <h1 className="font-display text-[2.5rem] leading-[1.02] sm:text-5xl md:text-6xl text-[var(--ink)] mb-7">
                {en
                  ? <>Custom software and AI <em>that works for your business.</em></>
                  : <>Software a medida e IA <em>que trabajan para tu negocio.</em></>}
              </h1>
              <p className="text-lg text-[var(--text-2)] leading-relaxed max-w-xl mb-10">
                {en
                  ? "We automate processes with AI, build custom applications and agents, and connect your systems. Delivered in weeks, not months, by a team that also ships and runs its own products."
                  : "Automatizamos procesos con IA, desarrollamos aplicaciones y agentes a medida e integramos tus sistemas. En semanas, no en meses, y de la mano de un equipo que también lanza y opera sus propios productos."}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-[var(--bg)] font-medium text-sm px-6 py-3 hover:bg-[var(--plum)] transition-colors">
                  {t("hero_cta_primary")} <ArrowRight size={16} />
                </a>
                <a href="#services"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-dark)] text-[var(--ink)] font-medium text-sm px-6 py-3 hover:bg-[var(--surface)] transition-colors">
                  {t("hero_cta_secondary")}
                </a>
              </div>
            </div>

            {/* What we do, at a glance */}
            <div className="lg:col-span-5">
              <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_30px_60px_-30px_rgba(23,20,15,.35)] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
                  <span className="eyebrow">{en ? "What we do" : "Qué hacemos"}</span>
                  <span className="eyebrow">{en ? "Proposal in 48h" : "Propuesta en 48h"}</span>
                </div>
                <ul>
                  {services.map(({ n, Icon, tKey }) => (
                    <li key={n} className="border-b border-[var(--border)] last:border-0">
                      <a href="#services" className="group flex items-center gap-4 px-5 py-4 hover:bg-[var(--bg)] transition-colors">
                        <span className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-[var(--plum-bg)] text-[var(--plum)]">
                          <Icon size={18} />
                        </span>
                        <span className="flex-1 font-semibold text-[var(--ink)]">{t(tKey)}</span>
                        <span className="font-mono text-xs text-[var(--muted-light)]">{n}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ SERVICES ══ */}
      <section id="services" className="scroll-mt-16 border-t border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
            <p className="eyebrow md:col-span-3 pt-3">{t("section_services")}</p>
            <div className="md:col-span-9">
              <h2 className="font-display text-3xl md:text-[2.75rem] text-[var(--ink)] leading-[1.08] mb-4">
                {en
                  ? <>End-to-end, <em>from the first prototype to production.</em></>
                  : <>De principio a fin, <em>del primer prototipo a producción.</em></>}
              </h2>
              <p className="text-[var(--muted)] max-w-xl">{t("svc_hero_sub")}</p>
            </div>
          </div>

          <div className="border-t border-[var(--border)]">
            {services.map(({ n, tKey, dKey, tags }) => (
              <div key={n} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-8 border-b border-[var(--border)]">
                <span className="md:col-span-3 font-mono text-sm text-[var(--plum)]">{n}</span>
                <h3 className="md:col-span-4 font-display text-2xl text-[var(--ink)] leading-tight">{t(tKey)}</h3>
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
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ HOW WE WORK ══ */}
      <section id="process" className="scroll-mt-16 border-t border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
            <p className="eyebrow md:col-span-3 pt-3">{t("section_process")}</p>
            <h2 className="md:col-span-9 font-display text-3xl md:text-[2.75rem] text-[var(--ink)]">{t("process_title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {process.map(({ n, tKey, dKey }) => (
              <div key={n} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7">
                <span className="font-display text-4xl text-[var(--plum)] block mb-6">{n}</span>
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

      {/* ═══════════════════════════════════════════ OWN PRODUCTS (proof) ══ */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
            <p className="eyebrow md:col-span-3 pt-3">{en ? "Our products" : "Productos propios"}</p>
            <div className="md:col-span-9">
              <h2 className="font-display text-3xl md:text-[2.75rem] text-[var(--ink)] leading-[1.08] mb-4">
                {en ? <>We also build our own, <em>and keep them running.</em></> : <>También construimos lo nuestro <em>y lo mantenemos en marcha.</em></>}
              </h2>
              <p className="text-[var(--muted)] max-w-xl">
                {en
                  ? "Running our own products in production is how we learn what we then bring to client projects."
                  : "Operar productos propios en producción es como aprendemos lo que luego llevamos a los proyectos de clientes."}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROJECTS.map((p) => (
              <SmartLink key={p.slug} href={projectHref(p)}
                className="lift group flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="flex items-center justify-between">
                  <ProjectMark p={p} size="sm" />
                  <span className={`h-2 w-2 rounded-full ${STATUS_LABEL[p.status].dot}`} title={en ? STATUS_LABEL[p.status].en : STATUS_LABEL[p.status].es} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[var(--ink)]">{p.name}</p>
                  <p className="text-sm text-[var(--muted)]">{en ? p.tagline.en : p.tagline.es}</p>
                </div>
                <p className="eyebrow !text-[0.65rem]">{en ? p.category.en : p.category.es}</p>
              </SmartLink>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)] hover:text-[var(--plum)] transition-colors">
              {en ? "See all products" : "Ver todos los productos"} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ CONTACT ══ */}
      <section id="contact" className="scroll-mt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 md:pb-24">
          <div className="on-dark relative overflow-hidden rounded-3xl bg-[var(--ink)] px-7 py-12 md:p-16">
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[var(--plum)]/25 blur-3xl pointer-events-none" aria-hidden />
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
              <div className="md:col-span-8">
                <p className="eyebrow !text-[#9a907f] mb-5">{t("nav_contact")}</p>
                <h2 className="font-display text-4xl md:text-5xl text-white leading-[1.02] mb-5">
                  {en ? <>Got a project? <em>Let&apos;s talk.</em></> : <>¿Tienes un proyecto? <em>Hablemos.</em></>}
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
