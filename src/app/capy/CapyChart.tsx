"use client";
import { useEffect, useRef, useState } from "react";
import { createChart, LineSeries, type IChartApi, type ISeriesApi, type Time } from "lightweight-charts";

type Point = { time: string; value: number };
type Series = { bot: Point[]; btc: Point[]; eth?: Point[] };

interface Props {
  series: Series;
  periodStart: string;
  periodEnd: string;
}

interface HoverState {
  date: string;
  bot: number | null;
  btc: number | null;
  eth: number | null;
}

export function CapyChart({ series, periodStart, periodEnd }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [hover, setHover] = useState<HoverState | null>(null);

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
        mode: 1, // magnet mode
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
      color: "#0ea5e9",
      lineWidth: 2,
      title: "Bot cAPY",
      priceFormat: { type: "custom", formatter: (p: number) => `${p >= 0 ? "+" : ""}${p.toFixed(2)}%` },
    });
    const btcSeries = chart.addSeries(LineSeries, {
      color: "#f59e0b",
      lineWidth: 1,
      title: "BTC HODL",
      priceFormat: { type: "custom", formatter: (p: number) => `${p >= 0 ? "+" : ""}${p.toFixed(2)}%` },
    });
    let ethSeries: ISeriesApi<"Line"> | null = null;
    if (series.eth) {
      ethSeries = chart.addSeries(LineSeries, {
        color: "#10b981",
        lineWidth: 1,
        title: "ETH HODL",
        priceFormat: { type: "custom", formatter: (p: number) => `${p >= 0 ? "+" : ""}${p.toFixed(2)}%` },
      });
    }

    botSeries.setData(series.bot as Array<{ time: Time; value: number }>);
    btcSeries.setData(series.btc as Array<{ time: Time; value: number }>);
    if (ethSeries && series.eth) ethSeries.setData(series.eth as Array<{ time: Time; value: number }>);

    chart.timeScale().fitContent();

    // Hover handler for the metric overlay
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
        bot: botPoint?.value ?? null,
        btc: btcPoint?.value ?? null,
        eth: ethPoint?.value ?? null,
      });
    });

    // Resize observer
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

  const finalBot = series.bot[series.bot.length - 1]?.value ?? 0;
  const finalBtc = series.btc[series.btc.length - 1]?.value ?? 0;
  const finalEth = series.eth ? series.eth[series.eth.length - 1]?.value : null;

  const displayBot = hover?.bot ?? finalBot;
  const displayBtc = hover?.btc ?? finalBtc;
  const displayEth = hover?.eth ?? finalEth;
  const displayDate = hover?.date ?? periodEnd;

  const fmtPct = (v: number | null) =>
    v === null ? "—" : `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5 md:p-6 shadow-2xl shadow-sky-900/10">
      {/* Header with hover-driven values */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
        <div className="text-slate-400 text-sm font-mono">{displayDate}</div>
        <div className="flex flex-wrap gap-5 text-sm">
          <Legend color="#0ea5e9" label="Bot cAPY" value={fmtPct(displayBot)} />
          <Legend color="#f59e0b" label="BTC HODL" value={fmtPct(displayBtc)} />
          {series.eth ? <Legend color="#10b981" label="ETH HODL" value={fmtPct(displayEth)} /> : null}
        </div>
      </div>
      <div ref={containerRef} className="w-full" />
      <div className="mt-3 text-xs text-slate-500 text-center">
        {periodStart} → {periodEnd} · Hover to inspect any day · Scroll/drag to zoom & pan
      </div>
    </div>
  );
}

function Legend({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold text-white tabular-nums">{value}</span>
    </div>
  );
}
