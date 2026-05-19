"use client";

import { useEffect, useRef, useState } from "react";
import {
  createChart,
  LineSeries,
  type IChartApi,
  type Time,
} from "lightweight-charts";
import { AlertTriangle, CheckCircle2, Wifi, WifiOff } from "lucide-react";
import { useI18n, type TranslationKey } from "@/lib/i18n";

// Fetch via same-origin Next.js route handlers (server-side proxy to the bot).
// Avoids mixed-content blocking that would otherwise hide our HTTP backend
// behind the HTTPS site. Mirrors HIVE's approach (/api/hive/*).
const API_BASE = "/api/capy";
const POLL_MS = 30_000;
const STATUS_FRESH_S = 360; // 6 min — bot writes status every 5 min

type Position = {
  asset: string;
  origin: string;
  side: "long" | "short";
  size_usd: number;
  entry: number;
  stop: number;
  leverage: number;
};

type Status = {
  schema_version: number;
  updated_at: string;
  version_sha?: string;
  built_at?: string;
  env: string;
  mode: string;
  assets: string[];
  timeframe: string;
  halted: boolean;
  halt_reason: string | null;
  uptime_s: number;
  nav_usd: number;
  peak_nav_usd: number;
  drawdown_pct: number;
  open_positions: Position[];
  last_candle_processed: Record<string, string>;
};

type Trade = {
  ts: string;
  action: string;
  asset: string;
  origin: string;
  side: "long" | "short";
  size_usd: number;
  price: number;
  reason: string;
  pnl?: number;
};

type EquityPoint = { ts: string; nav: number; peak: number; dd_pct: number };

type Health = "live" | "halted" | "stale" | "offline" | "loading";

export function LiveBotPanel() {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [equity, setEquity] = useState<EquityPoint[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchAll = async () => {
      try {
        const [sRes, tRes, eRes] = await Promise.all([
          fetch(`${API_BASE}/status`, { cache: "no-store" }),
          fetch(`${API_BASE}/trades?limit=30`, { cache: "no-store" }),
          fetch(`${API_BASE}/equity?limit=500`, { cache: "no-store" }),
        ]);
        if (cancelled) return;
        if (sRes.ok) setStatus(await sRes.json());
        else if (sRes.status === 503) setStatus(null); // bot not ready
        if (tRes.ok) {
          const j = await tRes.json();
          setTrades(j.items ?? []);
        }
        if (eRes.ok) {
          const j = await eRes.json();
          setEquity(j.items ?? []);
        }
        setFetchError(null);
      } catch (e) {
        if (!cancelled) setFetchError(String(e));
      }
    };
    void fetchAll();
    const id = setInterval(fetchAll, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const health: Health = (() => {
    if (fetchError) return "offline";
    if (!status) return "loading";
    if (status.halted) return "halted";
    const ageS =
      (Date.now() - new Date(status.updated_at).getTime()) / 1000;
    if (ageS > STATUS_FRESH_S) return "stale";
    return "live";
  })();

  return (
    <section className="bg-[var(--bg-subtle)] border-y border-[var(--border)] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)] mb-3">
              {t("capy_live_eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] tracking-tight">
              {t("capy_live_title")}
            </h2>
            <p className="text-[var(--muted)] text-sm max-w-2xl mt-2">
              {t("capy_live_subtitle")}
            </p>
            {status?.version_sha && status.version_sha !== "dev" && (
              <p className="text-[var(--muted)] text-xs font-mono mt-2 opacity-70">
                build{" "}
                <a
                  href={`https://github.com/capybarist/cAPY/commit/${status.version_sha}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text)] underline-offset-2 hover:underline"
                >
                  {status.version_sha.slice(0, 7)}
                </a>
                {status.built_at && status.built_at !== "unknown" && (
                  <> · {new Date(status.built_at).toLocaleString()}</>
                )}
              </p>
            )}
          </div>
          <HealthBadge health={health} status={status} t={t} />
        </div>

        {/* Snapshot cards */}
        {status && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <SnapshotCard
              label={t("capy_live_card_nav")}
              value={`$${status.nav_usd.toFixed(2)}`}
            />
            <SnapshotCard
              label={t("capy_live_card_peak")}
              value={`$${status.peak_nav_usd.toFixed(2)}`}
            />
            <SnapshotCard
              label={t("capy_live_card_dd")}
              value={`${status.drawdown_pct.toFixed(2)}%`}
              tone={status.drawdown_pct > 15 ? "danger" : "neutral"}
            />
            <SnapshotCard
              label={t("capy_live_card_open")}
              value={status.open_positions.length.toString()}
            />
          </div>
        )}

        {/* Halt banner */}
        {status?.halted && (
          <div className="rounded-xl border border-rose-300/60 bg-rose-50 p-4 mb-6 flex items-start gap-3">
            <AlertTriangle size={18} className="text-rose-700 shrink-0 mt-0.5" />
            <div className="text-sm text-rose-900">
              <strong>{t("capy_live_halt_banner")}</strong>{" "}
              {t("capy_live_halt_reason")}{" "}
              <code className="text-xs">{status.halt_reason}</code>.{" "}
              {t("capy_live_halt_action")}
            </div>
          </div>
        )}

        {/* Equity mini-chart */}
        {equity.length > 1 && (
          <EquityChart
            points={equity}
            label={t("capy_live_equity_label")
              .replace("{n}", String(equity.length))
              .replace("{h}", String(Math.round((equity.length * 5) / 60)))}
          />
        )}

        {/* Open positions table */}
        {status && status.open_positions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[var(--text)] mb-3">
              {t("capy_live_positions_title")}
            </h3>
            <PositionsTable positions={status.open_positions} t={t} />
          </div>
        )}

        {/* Trades table */}
        <div>
          <h3 className="text-sm font-bold text-[var(--text)] mb-3">
            {t("capy_live_trades_title")}
          </h3>
          {trades.length === 0 ? (
            <div className="rounded-xl border border-[var(--border)] bg-white p-6 text-center text-sm text-[var(--muted)]">
              {t("capy_live_trades_empty")}
            </div>
          ) : (
            <TradesTable trades={trades} t={t} />
          )}
        </div>
      </div>
    </section>
  );
}

type Translate = (k: TranslationKey) => string;

/* ── Subcomponents ────────────────────────────────────────────────────── */

function HealthBadge({ health, status, t }: { health: Health; status: Status | null; t: Translate }) {
  const map: Record<Health, { label: string; tone: string; Icon: typeof CheckCircle2 }> = {
    live: { label: t("capy_live_health_live"), tone: "border-emerald-300 bg-emerald-50 text-emerald-700", Icon: CheckCircle2 },
    halted: { label: t("capy_live_health_halted"), tone: "border-rose-300 bg-rose-50 text-rose-700", Icon: AlertTriangle },
    stale: { label: t("capy_live_health_stale"), tone: "border-amber-300 bg-amber-50 text-amber-700", Icon: WifiOff },
    offline: { label: t("capy_live_health_offline"), tone: "border-rose-300 bg-rose-50 text-rose-700", Icon: WifiOff },
    loading: { label: t("capy_live_health_loading"), tone: "border-slate-300 bg-slate-50 text-slate-600", Icon: Wifi },
  };
  const { label, tone, Icon } = map[health];
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${tone}`}>
      <Icon size={16} />
      {label}
      {status && (
        <span className="text-xs opacity-70 font-mono font-normal ml-1">
          · {status.env}
        </span>
      )}
    </div>
  );
}

function SnapshotCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "danger";
}) {
  const accent = tone === "danger" ? "text-rose-700" : "text-[var(--text)]";
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-4">
      <div className="text-xs uppercase tracking-wider font-semibold text-[var(--muted)] mb-2">
        {label}
      </div>
      <div className={`text-2xl md:text-3xl font-black tabular-nums ${accent}`}>
        {value}
      </div>
    </div>
  );
}

function PositionsTable({ positions, t }: { positions: Position[]; t: Translate }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-white">
      <table className="w-full text-sm">
        <thead className="bg-[var(--bg-subtle)] text-xs uppercase text-[var(--muted)]">
          <tr>
            <Th>{t("capy_live_col_asset")}</Th>
            <Th>{t("capy_live_col_side")}</Th>
            <Th>{t("capy_live_col_origin")}</Th>
            <Th>{t("capy_live_col_size")}</Th>
            <Th>{t("capy_live_col_entry")}</Th>
            <Th>{t("capy_live_col_stop")}</Th>
            <Th>{t("capy_live_col_lev")}</Th>
          </tr>
        </thead>
        <tbody>
          {positions.map((p, i) => (
            <tr key={i} className="border-t border-[var(--border)]">
              <Td className="font-mono">{p.asset}</Td>
              <Td className={p.side === "long" ? "text-emerald-700 font-bold" : "text-rose-700 font-bold"}>
                {p.side.toUpperCase()}
              </Td>
              <Td>{p.origin}</Td>
              <Td className="tabular-nums">${p.size_usd.toFixed(2)}</Td>
              <Td className="tabular-nums">{p.entry.toFixed(2)}</Td>
              <Td className="tabular-nums">{p.stop.toFixed(2)}</Td>
              <Td>{p.leverage}×</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TradesTable({ trades, t }: { trades: Trade[]; t: Translate }) {
  const reversed = [...trades].reverse();
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-white">
      <table className="w-full text-sm">
        <thead className="bg-[var(--bg-subtle)] text-xs uppercase text-[var(--muted)]">
          <tr>
            <Th>{t("capy_live_col_date")}</Th>
            <Th>{t("capy_live_col_action")}</Th>
            <Th>{t("capy_live_col_asset")}</Th>
            <Th>{t("capy_live_col_side")}</Th>
            <Th>{t("capy_live_col_size_short")}</Th>
            <Th>{t("capy_live_col_price")}</Th>
            <Th>{t("capy_live_col_pnl")}</Th>
          </tr>
        </thead>
        <tbody>
          {reversed.map((t, i) => (
            <tr key={i} className="border-t border-[var(--border)]">
              <Td className="text-xs text-[var(--muted)] font-mono whitespace-nowrap">
                {new Date(t.ts).toLocaleString()}
              </Td>
              <Td className="font-mono text-xs">{t.action}</Td>
              <Td className="font-mono">{t.asset}</Td>
              <Td className={t.side === "long" ? "text-emerald-700" : "text-rose-700"}>
                {t.side}
              </Td>
              <Td className="tabular-nums">${t.size_usd.toFixed(2)}</Td>
              <Td className="tabular-nums">{t.price.toFixed(2)}</Td>
              <Td className="tabular-nums">
                {t.pnl !== undefined ? (
                  <span className={t.pnl >= 0 ? "text-emerald-700 font-bold" : "text-rose-700 font-bold"}>
                    {t.pnl >= 0 ? "+" : ""}${t.pnl.toFixed(2)}
                  </span>
                ) : (
                  <span className="text-[var(--muted)]">—</span>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-4 py-3">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}

function EquityChart({ points, label }: { points: EquityPoint[]; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, {
      autoSize: true,
      layout: {
        background: { color: "transparent" },
        textColor: "#64748b",
      },
      grid: {
        vertLines: { color: "rgba(100,116,139,0.08)" },
        horzLines: { color: "rgba(100,116,139,0.08)" },
      },
      timeScale: { timeVisible: true, secondsVisible: false },
      handleScroll: false,
      handleScale: false,
    });
    chartRef.current = chart;
    const series = chart.addSeries(LineSeries, {
      color: "#0284c7",
      lineWidth: 2,
      priceFormat: { type: "price", precision: 2, minMove: 0.01 },
    });
    series.setData(
      points.map((p) => ({
        time: (new Date(p.ts).getTime() / 1000) as Time,
        value: p.nav,
      })),
    );
    chart.timeScale().fitContent();
    return () => chart.remove();
  }, [points]);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-4 mb-6">
      <div className="text-xs uppercase tracking-wider font-semibold text-[var(--muted)] mb-3">
        {label}
      </div>
      <div ref={containerRef} style={{ height: 240 }} />
    </div>
  );
}
