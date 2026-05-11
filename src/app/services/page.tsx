"use client";
import { useI18n } from "@/lib/i18n";

const services = [
  {
    icon: "🤖",
    tKey: "svc_1_title" as const,
    dKey: "svc_1_desc" as const,
    tags: ["n8n", "OpenAI", "Claude", "Gemini", "Python"],
    color: "brand",
  },
  {
    icon: "💻",
    tKey: "svc_2_title" as const,
    dKey: "svc_2_desc" as const,
    tags: ["Java", "Spring Boot", "React", "TypeScript", "React Native"],
    color: "accent",
  },
  {
    icon: "🔧",
    tKey: "svc_3_title" as const,
    dKey: "svc_3_desc" as const,
    tags: ["Docker", "Kubernetes", "CI/CD", "PostgreSQL"],
    color: "brand",
  },
  {
    icon: "🧠",
    tKey: "svc_4_title" as const,
    dKey: "svc_4_desc" as const,
    tags: ["LLM Agents", "RAG", "HIVE", "Langchain"],
    color: "accent",
  },
] as const;

export default function ServicesPage() {
  const { t } = useI18n();

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[var(--border)] grid-bg">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand)] mb-4">Servicios</p>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">{t("svc_hero_title")}</h1>
          <p className="text-lg text-[var(--muted)] max-w-xl">{t("svc_hero_sub")}</p>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(({ icon, tKey, dKey, tags, color }) => (
            <div
              key={tKey}
              className={`p-8 rounded-2xl border bg-[var(--surface)] transition-all duration-300 card-glow${color === "accent" ? "-accent" : ""} ${
                color === "accent"
                  ? "border-[var(--accent)]/20 hover:border-[var(--accent)]/40"
                  : "border-[var(--border)] hover:border-[var(--brand)]/40"
              }`}
            >
              <span className="text-4xl mb-5 block">{icon}</span>
              <h2 className="text-xl font-bold text-[var(--text)] mb-3">{t(tKey)}</h2>
              <p className="text-[var(--muted)] leading-relaxed mb-6 text-sm">{t(dKey)}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-3 py-1 rounded-full border ${
                      color === "accent"
                        ? "border-[var(--accent)]/30 text-[var(--accent)] bg-[var(--accent)]/5"
                        : "border-[var(--brand)]/30 text-[var(--brand)] bg-[var(--brand)]/5"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand)] mb-4">Process</p>
          <h2 className="text-3xl font-bold text-[var(--text)] mb-12">{t("process_title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", tKey: "process_1_title" as const, dKey: "process_1_desc" as const },
              { num: "02", tKey: "process_2_title" as const, dKey: "process_2_desc" as const },
              { num: "03", tKey: "process_3_title" as const, dKey: "process_3_desc" as const },
            ].map(({ num, tKey, dKey }) => (
              <div key={tKey} className="relative p-6 rounded-2xl border border-[var(--border)]">
                <span className="text-5xl font-black text-[var(--brand)]/15 absolute top-4 right-5">{num}</span>
                <h3 className="font-bold text-[var(--text)] mb-3">{t(tKey)}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{t(dKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-20 w-full">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
          <h2 className="text-2xl font-bold gradient-text mb-4">{t("contact_title")}</h2>
          <p className="text-[var(--muted)] mb-8">{t("contact_desc")}</p>
          <a
            href="mailto:info@capybaralabs.tech"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-8 py-3.5 font-semibold text-sm text-[var(--bg)] hover:opacity-90 transition-opacity"
          >
            {t("contact_cta")}
          </a>
        </div>
      </section>
    </div>
  );
}
