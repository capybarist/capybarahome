"use client";
import { useEffect, useRef, useState } from "react";
import { createChart, LineSeries, type IChartApi, type ISeriesApi, type Time } from "lightweight-charts";

type Point = { time: string; value: number; raw?: number };
type Series = { bot: Point[]; btc: Point[]; eth?: Point[] };

interface Props {
  series: Series;
  periodStart: string;
  periodEnd: string;
}

interface HoverState {
  date: string;
  bot: { pct: number | null; raw: number | null };
  btc: { pct: number | null; raw: number | null };
  eth: { pct: number | null; raw: number | null };
}

export function CapyChart({ series, periodStart, periodEnd }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [hover, setHover] = useState<HoverState | null>(null);

  // Build time → raw lookup tables so we can show raw prices on hover
  // (lightweight-charts series only carry one "value" per point)
  const rawLookup = useRef<{
    bot: Map<string, number>;
    btc: Map<string, number>;
    eth: Map<string, number>;
  }>({ bot: new Map(), btc: new Map(), eth: new Map() });

  useEffect(() => {
    rawLookup.current = {
      bot: new Map(series.bot.map((p) => [p.time, p.raw ?? 0])),
      btc: new Map(series.btc.map((p) => [p.time, p.raw ?? 0])),
      eth: new Map((series.eth ?? []).map((p) => [p.time, p.raw ?? 0])),
    };
  }, [series]);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 480,
      layout: {
        background: { color: "transparent" },
        textColor: "#94a3b8",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
      },
      grid: {
        vertLines: { color: "rgba(148, 163, 184, 0.08)" },
        horzLines: { color: "rgba(148, 163, 184, 0.08)" },
      },
      crosshair: {
        mode: 1,
        vertLine: { color: "rgba(148, 163, 184, 0.4)", width: 1, style: 2, labelVisible: true },
        horzLine: { color: "rgba(148, 163, 184, 0.4)", width: 1, style: 2 },
      },
      rightPriceScale: {
        borderColor: "rgba(148, 163, 184, 0.15)",
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderColor: "rgba(148, 163, 184, 0.15)",
        timeVisible: false,
        rightOffset: 5,
      },
      handleScale: true,
      handleScroll: true,
    });

    chartRef.current = chart;

    const botSeries = chart.addSeries(LineSeries, {
      color: "#0ea5e9", lineWidth: 2, title: "Bot cAPY",
      priceFormat: { type: "custom", formatter: (p: number) => `${p >= 0 ? "+" : ""}${p.toFixed(2)}%` },
    });
    const btcSeries = chart.addSeries(LineSeries, {
      color: "#f59e0b", lineWidth: 1, title: "BTC HODL",
      priceFormat: { type: "custom", formatter: (p: number) => `${p >= 0 ? "+" : ""}${p.toFixed(2)}%` },
    });
    let ethSeries: ISeriesApi<"Line"> | null = null;
    if (series.eth) {
      ethSeries = chart.addSeries(LineSeries, {
        color: "#10b981", lineWidth: 1, title: "ETH HODL",
        priceFormat: { type: "custom", formatter: (p: number) => `${p >= 0 ? "+" : ""}${p.toFixed(2)}%` },
      });
    }

    botSeries.setData(series.bot.map(({ time, value }) => ({ time: time as Time, value })));
    btcSeries.setData(series.btc.map(({ time, value }) => ({ time: time as Time, value })));
    if (ethSeries && series.eth)
      ethSeries.setData(series.eth.map(({ time, value }) => ({ time: time as Time, value })));

    chart.timeScale().fitContent();

    chart.subscribeCrosshairMove((param) => {
      if (!param.time || !param.seriesData.size) {
        setHover(null);
        return;
      }
      const dateStr = String(param.time);
      const botPoint = param.seriesData.get(botSeries) as { value: number } | undefined;
      const btcPoint = param.seriesData.get(btcSeries) as { value: number } | undefined;
      const ethPoint = ethSeries ? (param.seriesData.get(ethSeries) as { value: number } | undefined) : undefined;
      setHover({
        date: dateStr,
        bot: { pct: botPoint?.value ?? null, raw: rawLookup.current.bot.get(dateStr) ?? null },
        btc: { pct: btcPoint?.value ?? null, raw: rawLookup.current.btc.get(dateStr) ?? null },
        eth: { pct: ethPoint?.value ?? null, raw: rawLookup.current.eth.get(dateStr) ?? null },
      });
    });

    const ro = new ResizeObserver(() => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: containerRef.current.clientWidth });
      }
    });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      chart.remove();
      chartRef.current = null;
    };
  }, [series]);

  // ─── Default to end-of-series values when not hovering ───
  const lastBot = series.bot[series.bot.length - 1];
  const lastBtc = series.btc[series.btc.length - 1];
  const lastEth = series.eth ? series.eth[series.eth.length - 1] : null;

  const display = hover ?? {
    date: periodEnd,
    bot: { pct: lastBot?.value ?? null, raw: lastBot?.raw ?? null },
    btc: { pct: lastBtc?.value ?? null, raw: lastBtc?.raw ?? null },
    eth: { pct: lastEth?.value ?? null, raw: lastEth?.raw ?? null },
  };

  const fmtPct = (v: number | null) =>
    v === null ? "—" : `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
  const fmtUsd = (v: number | null, label: "bot" | "btc" | "eth") => {
    if (v === null) return "—";
    if (label === "bot") return `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    if (label === "btc") return `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    return `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5 md:p-6 shadow-2xl shadow-sky-900/10">
      {/* Header with hover-driven values — pct AND raw price */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
        <div className="text-slate-400 text-sm font-mono">{display.date}</div>
        <div className="flex flex-wrap gap-5 text-sm">
          <Legend
            color="#0ea5e9"
            label="Bot NAV"
            pct={fmtPct(display.bot.pct)}
            raw={fmtUsd(display.bot.raw, "bot")}
            rawLabel="NAV"
          />
          <Legend
            color="#f59e0b"
            label="BTC"
            pct={fmtPct(display.btc.pct)}
            raw={fmtUsd(display.btc.raw, "btc")}
            rawLabel="price"
          />
          {series.eth ? (
            <Legend
              color="#10b981"
              label="ETH"
              pct={fmtPct(display.eth.pct)}
              raw={fmtUsd(display.eth.raw, "eth")}
              rawLabel="price"
            />
          ) : null}
        </div>
      </div>
      <div ref={containerRef} className="w-full" />
      <div className="mt-3 text-xs text-slate-500 text-center">
        {periodStart} → {periodEnd} · Hover for daily values · Scroll/drag to zoom & pan ·
        Y-axis shows % gain (all series start at 0)
      </div>
    </div>
  );
}

function Legend({
  color, label, pct, raw, rawLabel,
}: {
  color: string;
  label: string;
  pct: string;
  raw: string;
  rawLabel: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
      <div className="flex flex-col items-start leading-tight">
        <span className="text-xs text-slate-500">{label}</span>
        <span className="font-semibold text-white tabular-nums">{pct}</span>
        <span className="text-xs text-slate-400 tabular-nums">
          {rawLabel}: <span className="text-slate-200">{raw}</span>
        </span>
      </div>
    </div>
  );
}
