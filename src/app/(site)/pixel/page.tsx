"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import {
  ArrowRight, Sparkles, Smartphone, GitBranch, Package,
  Code2, Cpu, Layers, FileImage,
} from "lucide-react";

// Studio URL. In production we rely on a Vercel rewrite from
// /pixel/studio/* → the pixel app deployment. For local dev override
// with NEXT_PUBLIC_PIXEL_STUDIO_URL (e.g. the Codespace forwarded URL).
const STUDIO_URL =
  process.env.NEXT_PUBLIC_PIXEL_STUDIO_URL || "/pixel/studio";

const GITHUB_URL = "https://github.com/capybarist/pixel";

export default function PixelPage() {
  const { t } = useI18n();

  return (
    <main className="bg-[var(--bg)]">
      {/* ═══════════════════════════════════════════════════════════ Hero ═ */}
      <section className="relative dot-grid">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)] border border-[var(--accent)]/30 bg-[var(--accent-bg)] rounded-full px-4 py-1.5 mb-6">
            <Sparkles size={12} />
            {t("pixel_status_badge")}
          </span>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            <span className="g-accent">{t("pixel_tagline")}</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-2)] max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("pixel_subhead")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={STUDIO_URL}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--text)] hover:bg-[var(--brand)] px-7 py-3.5 text-sm font-semibold text-white transition-colors"
            >
              {t("pixel_cta_primary")} <ArrowRight size={15} />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-white px-7 py-3.5 text-sm font-semibold text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <GitBranch size={15} /> {t("pixel_cta_secondary")}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ How it works ═ */}
      <section id="how" className="bg-[var(--bg-subtle)] border-y border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
              {t("pixel_how_eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] tracking-tight">
              {t("pixel_how_title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { num: "01", titleKey: "pixel_how_1_title" as const, descKey: "pixel_how_1_desc" as const },
              { num: "02", titleKey: "pixel_how_2_title" as const, descKey: "pixel_how_2_desc" as const },
              { num: "03", titleKey: "pixel_how_3_title" as const, descKey: "pixel_how_3_desc" as const },
            ].map(({ num, titleKey, descKey }) => (
              <div
                key={num}
                className="p-7 rounded-2xl border border-[var(--border)] bg-white card-hover"
              >
                <div className="font-mono text-xs text-[var(--accent)] mb-4">{num}</div>
                <h3 className="text-lg font-bold text-[var(--text)] mb-2.5">
                  {t(titleKey)}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {t(descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ Why pixel ═ */}
      <section className="bg-[var(--bg)] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)] mb-3">
              {t("pixel_why_eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] tracking-tight">
              {t("pixel_why_title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { Icon: Code2,      titleKey: "pixel_why_1_title" as const, descKey: "pixel_why_1_desc" as const, bg: "bg-violet-50",  ic: "text-violet-600" },
              { Icon: Cpu,        titleKey: "pixel_why_2_title" as const, descKey: "pixel_why_2_desc" as const, bg: "bg-blue-50",    ic: "text-blue-600" },
              { Icon: Smartphone, titleKey: "pixel_why_3_title" as const, descKey: "pixel_why_3_desc" as const, bg: "bg-sky-50",     ic: "text-sky-600" },
              { Icon: FileImage,  titleKey: "pixel_why_4_title" as const, descKey: "pixel_why_4_desc" as const, bg: "bg-emerald-50", ic: "text-emerald-600" },
            ].map(({ Icon, titleKey, descKey, bg, ic }) => (
              <div
                key={titleKey}
                className="flex gap-5 p-6 rounded-2xl border border-[var(--border)] bg-white card-hover"
              >
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                  <Icon size={22} className={ic} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text)] mb-1.5">{t(titleKey)}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{t(descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ Roadmap ═ */}
      <section className="bg-[var(--bg-subtle)] border-y border-[var(--border)] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
              {t("pixel_phase_eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] tracking-tight">
              {t("pixel_phase_title")}
            </h2>
          </div>

          <ol className="space-y-3">
            {[
              { titleKey: "pixel_phase_1_title" as const, descKey: "pixel_phase_1_desc" as const, current: true,  Icon: Package },
              { titleKey: "pixel_phase_2_title" as const, descKey: "pixel_phase_2_desc" as const, current: false, Icon: Layers },
              { titleKey: "pixel_phase_3_title" as const, descKey: "pixel_phase_3_desc" as const, current: false, Icon: Layers },
              { titleKey: "pixel_phase_4_title" as const, descKey: "pixel_phase_4_desc" as const, current: false, Icon: Smartphone },
              { titleKey: "pixel_phase_5_title" as const, descKey: "pixel_phase_5_desc" as const, current: false, Icon: Sparkles },
            ].map(({ titleKey, descKey, current, Icon }) => (
              <li
                key={titleKey}
                className={`flex gap-4 p-5 rounded-xl border ${
                  current
                    ? "border-[var(--accent)] bg-[var(--accent-bg)]"
                    : "border-[var(--border)] bg-white"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    current ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-muted)] text-[var(--muted)]"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm font-bold mb-1 ${current ? "text-[var(--accent-dark)]" : "text-[var(--text)]"}`}>
                    {t(titleKey)}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{t(descKey)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ CTA ═ */}
      <section className="bg-[var(--bg)] py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            <span className="g-accent">{t("pixel_cta_final_title")}</span>
          </h2>
          <p className="text-[var(--muted)] mb-8">{t("pixel_cta_final_desc")}</p>
          <a
            href={STUDIO_URL}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--text)] hover:bg-[var(--accent)] px-8 py-4 text-base font-semibold text-white transition-colors"
          >
            {t("pixel_cta_final_btn")}
          </a>
        </div>
      </section>
    </main>
  );
}
