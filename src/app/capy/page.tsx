"use client";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import {
  AlertTriangle, TrendingUp, ShieldCheck, Activity, ArrowRight,
  CheckCircle2, Clock, Mail,
} from "lucide-react";
import { CapyChart } from "./CapyChart";
import { LiveBotPanel } from "./LiveBotPanel";

type Point = { time: string; value: number };

interface CapyData {
  generated_at: string;
  period: { start: string; end: string };
  metrics: {
    bot_return_pct: number;
    btc_return_pct: number;
    eth_return_pct: number | null;
    multiplier_vs_btc: number | null;
    cagr_pct: number;
    max_drawdown_pct: number;
  };
  series: { bot: Point[]; btc: Point[]; eth?: Point[] };
}

const phases = [
  { key: "phase_backtest", done: true, current: false, icon: CheckCircle2 },
  { key: "phase_alpha", done: false, current: true, icon: Activity },
  { key: "phase_testnet", done: false, current: false, icon: Clock },
  { key: "phase_mainnet", done: false, current: false, icon: Clock },
  { key: "phase_vault", done: false, current: false, icon: Clock },
] as const;

export default function CapyPage() {
  const { t } = useI18n();
  const [data, setData] = useState<CapyData | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch("/capy/data.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(`HTTP ${r.status}`)))
      .then(setData)
      .catch((e) => setErr(String(e)));
  }, []);

  return (
    <div>
      {/* ── HERO (dark, financial vibe) ────────────────────────────────────── */}
      <section className="relative bg-[#06090f] overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-sky-600/10 blur-3xl pointer-events-none" />
        <div className="absolute top-32 -left-32 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-24 md:pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs text-amber-300 mb-6">
            <AlertTriangle size={14} />
            {t("capy_status_badge")}
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5 g-hero">
            cAPY
          </h1>
          <p className="text-slate-300 text-xl md:text-2xl font-semibold max-w-2xl mb-4">
            {t("capy_tagline")}
          </p>
          <p className="text-slate-400 text-base max-w-2xl leading-relaxed mb-8">
            {t("capy_subhead")}
          </p>

          {/* Headline metrics */}
          {data && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
              <MetricPill
                Icon={TrendingUp}
                label={t("capy_metric_return")}
                value={`${data.metrics.bot_return_pct >= 0 ? "+" : ""}${data.metrics.bot_return_pct.toFixed(1)}%`}
                accent="text-sky-300"
              />
              <MetricPill
                Icon={Activity}
                label={t("capy_metric_vs_btc")}
                value={data.metrics.multiplier_vs_btc ? `${data.metrics.multiplier_vs_btc.toFixed(2)}×` : "—"}
                accent="text-emerald-300"
              />
              <MetricPill
                Icon={TrendingUp}
                label={t("capy_metric_cagr")}
                value={`${data.metrics.cagr_pct >= 0 ? "+" : ""}${data.metrics.cagr_pct.toFixed(1)}%`}
                accent="text-violet-300"
              />
              <MetricPill
                Icon={ShieldCheck}
                label={t("capy_metric_dd")}
                value={`${data.metrics.max_drawdown_pct.toFixed(1)}%`}
                accent="text-rose-300"
              />
            </div>
          )}
        </div>
      </section>

      {/* ── CHART SECTION ──────────────────────────────────────────────────── */}
      <section className="bg-[#06090f] border-b border-slate-800/60">
        <div className="mx-auto max-w-6xl px-6 pb-20">
          {err && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-300 text-sm">
              {t("capy_chart_error")}: {err}
            </div>
          )}
          {!data && !err && (
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-12 text-center text-slate-500 text-sm">
              {t("capy_chart_loading")}
            </div>
          )}
          {data && (
            <CapyChart
              series={data.series}
              periodStart={data.period.start}
              periodEnd={data.period.end}
            />
          )}
        </div>
      </section>

      {/* ── LIVE BOT PANEL (Sprint 3 testnet) ──────────────────────────────── */}
      <LiveBotPanel />

      {/* ── ROADMAP / PHASE STATUS ─────────────────────────────────────────── */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)] mb-3">
              {t("capy_roadmap_eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] tracking-tight mb-3">
              {t("capy_roadmap_title")}
            </h2>
            <p className="text-[var(--muted)] max-w-2xl">
              {t("capy_roadmap_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {phases.map((p, i) => {
              const Icon = p.icon;
              const tone = p.done
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : p.current
                ? "border-sky-300 bg-sky-50 text-sky-700 ring-2 ring-sky-200"
                : "border-[var(--border)] bg-white text-[var(--muted)]";
              return (
                <div key={p.key} className={`p-5 rounded-2xl border ${tone}`}>
                  <div className="flex items-center justify-between mb-3">
                    <Icon size={20} />
                    <span className="text-xs font-mono opacity-60">{i + 1}/5</span>
                  </div>
                  <div className="font-bold text-sm mb-1">{t(`capy_${p.key}_title` as const)}</div>
                  <div className="text-xs opacity-80 leading-relaxed">
                    {t(`capy_${p.key}_desc` as const)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER / WHAT WE'RE DOING ──────────────────────────────────── */}
      <section className="bg-[var(--bg-subtle)] border-y border-[var(--border)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} className="text-amber-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-900 mb-2">
                  {t("capy_disclaimer_title")}
                </h3>
                <p className="text-amber-800 text-sm leading-relaxed mb-3">
                  {t("capy_disclaimer_1")}
                </p>
                <p className="text-amber-800 text-sm leading-relaxed">
                  {t("capy_disclaimer_2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────────── */}
      <section id="contact" className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-[#06090f] p-12 md:p-16">
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-sky-600/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-violet-700/10 blur-3xl pointer-events-none" />
            <div className="relative max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 g-hero">
                {t("capy_contact_title")}
              </h2>
              <p className="text-slate-400 text-base mb-8 leading-relaxed">
                {t("capy_contact_desc")}
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="mailto:capy@capybaralabs.tech?subject=Interested%20in%20cAPY"
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-[#06090f] font-bold text-sm px-8 py-4 hover:bg-sky-100 transition-colors"
                >
                  <Mail size={16} />
                  {t("capy_contact_cta")}
                  <ArrowRight size={16} />
                </a>
                <a
                  href="mailto:capy@capybaralabs.tech"
                  className="text-slate-500 text-sm hover:text-white transition-colors font-mono"
                >
                  capy@capybaralabs.tech
                </a>
              </div>
            </div>
          </div>
          {data && (
            <p className="text-xs text-[var(--muted)] mt-6 text-center font-mono">
              {t("capy_data_updated")}: {new Date(data.generated_at).toLocaleString()}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function MetricPill({
  Icon,
  label,
  value,
  accent,
}: {
  Icon: typeof TrendingUp;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-4">
      <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wider font-semibold mb-2">
        <Icon size={13} />
        {label}
      </div>
      <div className={`text-2xl md:text-3xl font-black tabular-nums ${accent}`}>{value}</div>
    </div>
  );
}
