"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Zap, Code2, Wrench, Brain, ArrowRight, Search, Rocket, HeartHandshake } from "lucide-react";

const services = [
  { Icon: Zap,   tKey: "svc_1_title" as const, dKey: "svc_1_desc" as const, tags: ["n8n", "OpenAI", "Claude", "Gemini", "Python"], accent: false },
  { Icon: Code2, tKey: "svc_2_title" as const, dKey: "svc_2_desc" as const, tags: ["Java", "Spring Boot", "React", "TypeScript", "React Native"], accent: false },
  { Icon: Wrench, tKey: "svc_3_title" as const, dKey: "svc_3_desc" as const, tags: ["Docker", "Kubernetes", "CI/CD", "PostgreSQL", "Security"], accent: false },
  { Icon: Brain,  tKey: "svc_4_title" as const, dKey: "svc_4_desc" as const, tags: ["LLM Agents", "RAG", "HIVE", "Function Calling"], accent: true },
] as const;

const process = [
  { Icon: Search, tKey: "process_1_title" as const, dKey: "process_1_desc" as const, num: "01" },
  { Icon: Rocket, tKey: "process_2_title" as const, dKey: "process_2_desc" as const, num: "02" },
  { Icon: HeartHandshake, tKey: "process_3_title" as const, dKey: "process_3_desc" as const, num: "03" },
] as const;

export default function ServicesPage() {
  const { t } = useI18n();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#06090f] overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <p className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-4">Servicios</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight g-hero mb-5">{t("svc_hero_title")}</h1>
          <p className="text-slate-400 text-xl max-w-xl">{t("svc_hero_sub")}</p>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(({ Icon, tKey, dKey, tags, accent }) => (
              <div key={tKey}
                className={`p-8 rounded-2xl border bg-white card-hover ${
                  accent ? "card-hover-accent border-violet-100" : "border-[var(--border)]"
                }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                  accent ? "bg-violet-50" : "bg-sky-50"
                }`}>
                  <Icon size={22} className={accent ? "text-violet-600" : "text-sky-500"} />
                </div>
                <h2 className="text-xl font-bold text-[var(--text)] mb-3">{t(tKey)}</h2>
                <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">{t(dKey)}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag}
                      className={`text-xs font-medium px-3 py-1 rounded-full border ${
                        accent
                          ? "border-violet-200 text-violet-700 bg-violet-50"
                          : "border-sky-200 text-sky-700 bg-sky-50"
                      }`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[var(--bg-subtle)] border-y border-[var(--border)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)] mb-3">Proceso</p>
            <h2 className="text-3xl font-black text-[var(--text)] tracking-tight">{t("process_title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {process.map(({ Icon, num, tKey, dKey }) => (
              <div key={tKey} className="relative p-8 rounded-2xl border border-[var(--border)] bg-white">
                <span className="absolute top-6 right-6 text-6xl font-black text-[var(--brand)]/8 select-none">{num}</span>
                <div className="w-11 h-11 rounded-xl bg-[var(--brand-bg)] flex items-center justify-center mb-5">
                  <Icon size={20} className="text-[var(--brand)]" />
                </div>
                <h3 className="font-bold text-[var(--text)] mb-3">{t(tKey)}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{t(dKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-black text-[var(--text)] mb-4 tracking-tight">{t("contact_title")}</h2>
          <p className="text-[var(--muted)] mb-8 max-w-md mx-auto">{t("contact_desc")}</p>
          <a href="mailto:info@capybaralabs.tech"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white font-bold px-8 py-4 transition-colors">
            {t("contact_cta")} <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
