import { NextResponse } from "next/server";

export async function GET() {
  const HIVE_URL = process.env.HIVE_QUEEN_URL ?? process.env.HIVE_AGGREGATOR_URL;
  if (!HIVE_URL) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  try {
    const apiKey = process.env.HIVE_API_KEY;
    const res = await fetch(`${HIVE_URL}/api/status`, {
      headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : undefined,
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 30 },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "unreachable" }, { status: 502 });
  }
}
