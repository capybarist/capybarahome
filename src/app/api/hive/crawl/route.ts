import { NextResponse } from "next/server";

// Proxies to the HIVE aggregator's /api/crawl, which itself forwards to the
// active bee peer. Single source of truth for spider state on the dashboard.
export async function GET() {
  const HIVE_URL = process.env.HIVE_AGGREGATOR_URL;
  if (!HIVE_URL) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  try {
    const res = await fetch(`${HIVE_URL}/api/crawl`, {
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 15 },   // cache 15s — queue moves slowly enough
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: `upstream ${res.status}` },
        { status: 502 },
      );
    }
    return NextResponse.json(await res.json());
  } catch (e: any) {
    return NextResponse.json(
      { error: "unreachable", detail: String(e) },
      { status: 502 },
    );
  }
}
