"use client";
import { useI18n } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

const services = [
  { n: "01", tKey: "svc_1_title", dKey: "svc_1_desc", tags: ["n8n", "OpenAI", "Claude", "Gemini", "Python"] },
  { n: "02", tKey: "svc_4_title", dKey: "svc_4_desc", tags: ["LLM Agents", "RAG", "MCP", "HIVE", "Function Calling"] },
  { n: "03", tKey: "svc_2_title", dKey: "svc_2_desc", tags: ["Java", "Spring Boot", "React", "TypeScript", "React Native"] },
  { n: "04", tKey: "svc_3_title", dKey: "svc_3_desc", tags: ["Docker", "Kubernetes", "CI/CD", "PostgreSQL", "Security"] },
] as const;

const process = [
  { n: "01", tKey: "process_1_title", dKey: "process_1_desc" },
  { n: "02", tKey: "process_2_title", dKey: "process_2_desc" },
  { n: "03", tKey: "process_3_title", dKey: "process_3_desc" },
] as const;

export default function ServicesPage() {
  const { t, lang } = useI18n();
  const en = lang === "en";

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 paper-grid pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-16 md:pt-24 md:pb-20">
          <p className="eyebrow mb-6">{t("section_services")}</p>
          <h1 className="font-display text-5xl md:text-7xl text-[var(--ink)] leading-[1.02] mb-6 max-w-4xl">
            {en
              ? <>Software that works for you, <em>built by people who ship.</em></>
              : <>Software que trabaja por ti, <em>hecho por quien lanza productos.</em></>}
          </h1>
          <p className="text-lg text-[var(--text-2)] max-w-xl">{t("svc_hero_sub")}</p>
        </div>
      </section>

      {/* Services */}
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
          <div className="border-t border-[var(--border)]">
            {services.map(({ n, tKey, dKey, tags }) => (
              <div key={n} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-10 border-b border-[var(--border)]">
                <span className="md:col-span-2 font-mono text-sm text-[var(--plum)]">{n}</span>
                <h2 className="md:col-span-4 font-display text-3xl md:text-4xl text-[var(--ink)] leading-tight">{t(tKey)}</h2>
                <div className="md:col-span-6">
                  <p className="text-[var(--muted)] leading-relaxed mb-5">{t(dKey)}</p>
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

      {/* Process */}
      <section className="bg-[var(--bg-subtle)] border-y border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
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
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 md:py-24 text-center">
          <h2 className="font-display text-5xl text-[var(--ink)] mb-4">
            {en ? <>Got an idea? <em>Let&apos;s talk.</em></> : <>¿Tienes una idea? <em>Hablemos.</em></>}
          </h2>
          <p className="text-[var(--muted)] mb-8 max-w-md mx-auto">{t("contact_desc")}</p>
          <a href="mailto:info@capybaralabs.tech"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] hover:bg-[var(--plum)] text-[var(--bg)] font-semibold text-sm px-7 py-3.5 transition-colors">
            {en ? "Write to us" : "Escríbenos"} <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
