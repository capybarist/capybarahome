"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import {
  Zap, Code2, Wrench, Brain, ArrowRight,
  Play, Briefcase, GitBranch,
  CheckCircle2, Shield, Clock, Star,
  Network, Lock, FileText, Globe,
} from "lucide-react";

const stack = [
  { label: "n8n", color: "bg-orange-50 text-orange-600 border-orange-100" },
  { label: "OpenAI", color: "bg-green-50 text-green-700 border-green-100" },
  { label: "Claude", color: "bg-violet-50 text-violet-700 border-violet-100" },
  { label: "Gemini", color: "bg-blue-50 text-blue-700 border-blue-100" },
  { label: "Java · Spring Boot", color: "bg-red-50 text-red-700 border-red-100" },
  { label: "TypeScript", color: "bg-sky-50 text-sky-700 border-sky-100" },
  { label: "React", color: "bg-cyan-50 text-cyan-700 border-cyan-100" },
  { label: "React Native", color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
  { label: "Python", color: "bg-yellow-50 text-yellow-700 border-yellow-100" },
  { label: "PostgreSQL", color: "bg-blue-50 text-blue-800 border-blue-100" },
  { label: "Docker", color: "bg-sky-50 text-sky-800 border-sky-100" },
  { label: "Kubernetes", color: "bg-blue-50 text-blue-700 border-blue-100" },
  { label: "CI/CD", color: "bg-slate-50 text-slate-700 border-slate-200" },
  { label: "HIVE", color: "bg-violet-50 text-violet-700 border-violet-200" },
];

const socialLinks = [
  { Icon: Play,      label: "YouTube",  href: "https://www.youtube.com/@capybara-labs",                   color: "hover:text-red-500" },
  { Icon: Briefcase, label: "LinkedIn", href: "https://www.linkedin.com/company/capybara-labsllc",         color: "hover:text-blue-600" },
  { Icon: GitBranch, label: "GitHub",   href: "https://github.com/capybarist",                             color: "hover:text-slate-900" },
];

/* ── HIVE terminal mockup ──────────────────────────────────────────────────── */
function HiveTerminal() {
  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900 overflow-hidden shadow-2xl shadow-violet-900/20 w-full max-w-md">
      {/* titlebar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/60">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-slate-500 font-mono">hive — node_a1b2c3</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 font-mono">live</span>
        </span>
      </div>
      {/* content */}
      <div className="p-4 font-mono text-sm space-y-3">
        <div className="text-slate-500 text-xs">🐝 BEE autonomous extractor starting</div>
        <div className="flex gap-2">
          <span className="text-violet-400">▶</span>
          <span className="text-slate-300">Topic: <span className="text-sky-300">quantum_computing</span></span>
        </div>
        <div className="space-y-1.5 pl-4 border-l border-slate-700">
          <div className="flex gap-2 text-xs">
            <span className="text-green-400">+</span>
            <span className="text-slate-400">"Quantum advantage in optimization"</span>
          </div>
          <div className="text-xs text-slate-600 pl-4">arXiv:2401.12345 · <span className="text-green-500">✓ signed</span></div>
          <div className="flex gap-2 text-xs">
            <span className="text-green-400">+</span>
            <span className="text-slate-400">"Error correction in NISQ devices"</span>
          </div>
          <div className="text-xs text-slate-600 pl-4">arXiv:2402.67890 · <span className="text-green-500">✓ signed</span></div>
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-xs">
          <span className="text-slate-500"><span className="text-white font-semibold">247</span> fragments · <span className="text-white font-semibold">3</span> peers</span>
          <span className="text-violet-400">syncing...</span>
        </div>
      </div>
    </div>
  );
}

/* ── Value props ── */
const valueProps = [
  { Icon: Clock, text: "pill_fast" as const },
  { Icon: Shield, text: "pill_secure" as const },
  { Icon: Star, text: "pill_stack" as const },
];

export default function Home() {
  const { t } = useI18n();

  return (
    <div>
      {/* ══════════════════════════════════════════════════════ HERO (dark) ══ */}
      <section className="relative bg-[#06090f] overflow-hidden">
        {/* dot grid */}
        <div className="absolute inset-0 dot-grid opacity-40" />
        {/* glow orbs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-sky-600/10 blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-0 w-[400px] h-[400px] rounded-full bg-violet-700/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs text-sky-300 mb-7">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                {t("hero_badge")}
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6 g-hero">
                {t("hero_title")}
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg">
                {t("hero_sub")}
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <a href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm px-6 py-3 transition-colors">
                  {t("hero_cta_primary")} <ArrowRight size={16} />
                </a>
                <Link href="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white font-semibold text-sm px-6 py-3 transition-colors">
                  {t("hero_cta_secondary")}
                </Link>
              </div>
              <div className="flex flex-wrap gap-3">
                {valueProps.map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 size={13} className="text-green-500 shrink-0" />
                    {t(text)}
                  </div>
                ))}
              </div>
            </div>
            {/* right — HIVE terminal */}
            <div className="flex justify-center lg:justify-end">
              <HiveTerminal />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ HIVE feature (subtle bg) ═ */}
      <section className="bg-[var(--bg-subtle)] border-y border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* text — 3 cols */}
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)] border border-[var(--accent)]/30 bg-[var(--accent-bg)] rounded-full px-4 py-1.5 mb-6">
                {t("hive_preview_badge")}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/HiveLogo.png" alt="HIVE" className="h-20 md:h-28 w-auto mb-5" />
              <p className="text-2xl font-semibold text-[var(--text)] mb-4 leading-snug">
                {t("hive_preview_title").replace("HIVE — ", "")}
              </p>
              <p className="text-[var(--muted)] leading-relaxed mb-8 max-w-lg">{t("hive_preview_desc")}</p>
              <Link href="/hive"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-semibold text-sm px-6 py-3 transition-colors">
                {t("hive_preview_cta")} <ArrowRight size={15} />
              </Link>
            </div>
            {/* stats — 2 cols */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {[
                { Icon: Globe, sKey: "hive_preview_stat1" as const, dKey: "hive_preview_stat1_desc" as const, bg: "bg-violet-50 border-violet-100", ic: "text-violet-600" },
                { Icon: Lock, sKey: "hive_preview_stat2" as const, dKey: "hive_preview_stat2_desc" as const, bg: "bg-blue-50 border-blue-100", ic: "text-blue-600" },
                { Icon: Network, sKey: "hive_preview_stat3" as const, dKey: "hive_preview_stat3_desc" as const, bg: "bg-sky-50 border-sky-100", ic: "text-sky-600" },
              ].map(({ Icon, sKey, dKey, bg, ic }) => (
                <div key={sKey} className={`flex items-center gap-4 p-5 rounded-xl border ${bg}`}>
                  <div className="w-10 h-10 rounded-lg bg-white/70 flex items-center justify-center shrink-0">
                    <Icon size={18} className={ic} />
                  </div>
                  <div>
                    <div className="font-bold text-[var(--text)] text-sm">{t(sKey)}</div>
                    <div className="text-xs text-[var(--muted)]">{t(dKey)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*
        pixel feature section was here. Hidden from the home page until the
        alpha is mature enough to demo — same treatment as cAPY. The /pixel
        page still exists at the URL (capybaralabs.tech/pixel works) but is
        intentionally not surfaced in the home flow or in the nav.
      */}

      {/* ═══════════════════════════════════════════════════ SERVICES (light) ═ */}
      <section className="bg-[var(--bg)] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)] mb-3">{t("section_services")}</p>
            <h2 className="text-4xl font-black text-[var(--text)] mb-4 tracking-tight">
              {t("svc_hero_sub")}
            </h2>
            <p className="text-[var(--muted)] max-w-md">{t("stack_lead")}</p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Large card */}
            <div className="md:col-span-2 p-8 rounded-2xl border border-[var(--border)] bg-white card-hover group">
              <div className="w-12 h-12 rounded-xl bg-[var(--brand-bg)] flex items-center justify-center mb-5">
                <Zap size={22} className="text-[var(--brand)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text)] mb-3">{t("svc_1_title")}</h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">{t("svc_1_desc")}</p>
            </div>
            {/* Small card */}
            <div className="p-8 rounded-2xl border border-[var(--border)] bg-white card-hover group">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-bg)] flex items-center justify-center mb-5">
                <Brain size={22} className="text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text)] mb-3">{t("svc_4_title")}</h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">{t("svc_4_desc")}</p>
            </div>
            {/* Small card */}
            <div className="p-8 rounded-2xl border border-[var(--border)] bg-white card-hover group">
              <div className="w-12 h-12 rounded-xl bg-[var(--brand-bg)] flex items-center justify-center mb-5">
                <Code2 size={22} className="text-[var(--brand)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text)] mb-3">{t("svc_2_title")}</h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">{t("svc_2_desc")}</p>
            </div>
            {/* Large card */}
            <div className="md:col-span-2 p-8 rounded-2xl border border-[var(--border)] bg-white card-hover group">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-bg)] flex items-center justify-center mb-5">
                <Wrench size={22} className="text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text)] mb-3">{t("svc_3_title")}</h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">{t("svc_3_desc")}</p>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline">
              {t("nav_services")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ STACK ════ */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)] mb-3">{t("stack_title")}</p>
            <h2 className="text-3xl font-black text-[var(--text)] tracking-tight">{t("stack_lead")}</h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {stack.map(({ label, color }) => (
              <span key={label}
                className={`text-sm font-medium px-4 py-2 rounded-lg border ${color} cursor-default transition-transform hover:-translate-y-0.5`}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ COMMUNITY (gray) ═ */}
      <section id="community" className="bg-[var(--bg-subtle)] border-t border-[var(--border)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)] mb-3">{t("nav_community")}</p>
            <h2 className="text-3xl font-black text-[var(--text)] tracking-tight">{t("section_follow")}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialLinks.map(({ Icon, label, href, color }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className={`flex flex-col items-center gap-3 p-7 rounded-2xl border border-[var(--border)] bg-white text-[var(--muted)] ${color} hover:-translate-y-1 hover:shadow-md transition-all duration-200 group`}>
                <Icon size={28} className="transition-colors" />
                <span className="text-sm font-semibold text-[var(--text)]">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ CONTACT ═════ */}
      <section id="contact" className="bg-[var(--bg)] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-[#06090f] p-12 md:p-16">
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-sky-600/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-violet-700/10 blur-3xl pointer-events-none" />
            <div className="relative max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 g-hero">{t("contact_title")}</h2>
              <p className="text-slate-400 text-lg mb-10">{t("contact_desc")}</p>
              <div className="flex flex-wrap gap-4 items-center">
                <a href="mailto:info@capybaralabs.tech"
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-[#06090f] font-bold text-sm px-8 py-4 hover:bg-sky-100 transition-colors">
                  {t("contact_cta")} <ArrowRight size={16} />
                </a>
                <a href="mailto:info@capybaralabs.tech" className="text-slate-500 text-sm hover:text-white transition-colors">
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
