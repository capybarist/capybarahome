import { NextResponse } from "next/server";

// Proxies to the HIVE queen's /api/crawl (was "aggregator" pre-v0.7.0;
// the queen container still answers on the same port and accepts the
// same /api/crawl route — dashboard plumbing only). The env var name
// HIVE_AGGREGATOR_URL is kept for backward-compat with the Vercel
// deployment; HIVE_QUEEN_URL takes precedence if set, and the old one
// goes away in v0.8.
export async function GET() {
  const HIVE_URL = process.env.HIVE_QUEEN_URL ?? process.env.HIVE_AGGREGATOR_URL;
  if (!HIVE_URL) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  try {
    const apiKey = process.env.HIVE_API_KEY;
    const res = await fetch(`${HIVE_URL}/api/crawl`, {
      headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : undefined,
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
