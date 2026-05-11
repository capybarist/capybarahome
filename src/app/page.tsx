"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

const stack = [
  "n8n", "OpenAI", "Claude", "Gemini", "Java · Spring Boot",
  "TypeScript · React", "React Native", "Python", "PostgreSQL",
  "Docker", "Kubernetes", "CI/CD", "HIVE",
];

const socialLinks = [
  { icon: "▶", label: "YouTube", href: "https://youtube.com/@capybaralabs" },
  { icon: "💼", label: "LinkedIn", href: "https://linkedin.com/company/capybara-labs" },
  { icon: "🐙", label: "GitHub", href: "https://github.com/capybarist" },
  { icon: "𝕏", label: "Twitter/X", href: "https://twitter.com/capybaraitech" },
];

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="relative grid-bg overflow-hidden">
        <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[var(--brand)]/5 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-[var(--accent)]/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs text-[var(--muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
              AI · Software · Open Source
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 gradient-text">
              {t("hero_title")}
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-10 max-w-xl">
              {t("hero_sub")}
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-6 py-3 font-semibold text-sm text-[var(--bg)] hover:opacity-90 transition-opacity"
              >
                {t("hero_cta_primary")} →
              </a>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-semibold text-sm text-[var(--text)] hover:border-[var(--brand)] transition-colors"
              >
                {t("hero_cta_secondary")}
              </Link>
            </div>
            <div className="flex flex-wrap gap-3">
              {(["pill_fast", "pill_secure", "pill_stack"] as const).map((k) => (
                <span key={k} className="text-xs text-[var(--brand)] border border-[var(--brand)]/30 bg-[var(--brand)]/5 rounded-full px-4 py-1.5">
                  {t(k)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services preview ── */}
      <section className="mx-auto max-w-6xl px-6 py-24 w-full">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand)] mb-3">Servicios</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">{t("svc_hero_sub")}</h2>
          <p className="text-[var(--muted)] max-w-lg">{t("stack_lead")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {[
            { icon: "🤖", tKey: "svc_1_title" as const, dKey: "svc_1_desc" as const },
            { icon: "💻", tKey: "svc_2_title" as const, dKey: "svc_2_desc" as const },
            { icon: "🔧", tKey: "svc_3_title" as const, dKey: "svc_3_desc" as const },
            { icon: "🧠", tKey: "svc_4_title" as const, dKey: "svc_4_desc" as const },
          ].map(({ icon, tKey, dKey }) => (
            <div key={tKey} className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--brand)]/40 transition-all duration-300 card-glow">
              <span className="text-3xl mb-4 block">{icon}</span>
              <h3 className="font-semibold text-[var(--text)] mb-2">{t(tKey)}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{t(dKey)}</p>
            </div>
          ))}
        </div>
        <Link href="/services" className="text-sm text-[var(--brand)] hover:underline inline-flex items-center gap-1">
          {t("nav_services")} →
        </Link>
      </section>

      {/* ── HIVE feature ── */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--accent)] border border-[var(--accent)]/30 bg-[var(--accent)]/5 rounded-full px-4 py-1.5 mb-5">
                {t("hive_preview_badge")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 gradient-text-hive leading-tight">
                {t("hive_preview_title")}
              </h2>
              <p className="text-[var(--muted)] leading-relaxed mb-8">{t("hive_preview_desc")}</p>
              <Link
                href="/hive"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-6 py-3 text-sm font-semibold text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-colors"
              >
                {t("hive_preview_cta")}
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { sKey: "hive_preview_stat1" as const, dKey: "hive_preview_stat1_desc" as const, icon: "🌳" },
                { sKey: "hive_preview_stat2" as const, dKey: "hive_preview_stat2_desc" as const, icon: "🔐" },
                { sKey: "hive_preview_stat3" as const, dKey: "hive_preview_stat3_desc" as const, icon: "🌐" },
              ].map(({ sKey, dKey, icon }) => (
                <div key={sKey} className="flex items-center gap-5 p-5 rounded-xl border border-[var(--accent)]/20 bg-[var(--accent)]/5">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <div className="font-bold text-[var(--text)]">{t(sKey)}</div>
                    <div className="text-xs text-[var(--muted)]">{t(dKey)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stack ── */}
      <section className="mx-auto max-w-6xl px-6 py-24 w-full">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand)] mb-3">{t("stack_title")}</p>
          <h2 className="text-2xl font-bold text-[var(--text)]">{t("stack_lead")}</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {stack.map((s) => (
            <span key={s} className="text-sm px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--brand)]/40 hover:text-[var(--text)] transition-colors cursor-default">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── Community ── */}
      <section id="community" className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand)] mb-3">{t("nav_community")}</p>
            <h2 className="text-2xl font-bold text-[var(--text)]">Síguenos</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialLinks.map(({ icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--brand)]/40 hover:-translate-y-1 transition-all duration-200 text-[var(--muted)] hover:text-[var(--text)]">
                <span className="text-3xl">{icon}</span>
                <span className="text-sm font-medium">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-24 w-full">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 md:p-14 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[var(--brand)]/8 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">{t("contact_title")}</h2>
            <p className="text-[var(--muted)] mb-8 max-w-md">{t("contact_desc")}</p>
            <div className="flex flex-wrap gap-4 items-center">
              <a href="mailto:info@capybaralabs.tech"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-8 py-3.5 font-semibold text-sm text-[var(--bg)] hover:opacity-90 transition-opacity">
                {t("contact_cta")}
              </a>
              <div className="text-sm text-[var(--muted)]">
                {t("contact_email_label")}:{" "}
                <a href="mailto:info@capybaralabs.tech" className="text-[var(--brand)] hover:underline">info@capybaralabs.tech</a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
