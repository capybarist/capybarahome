import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const HIVE_URL = process.env.HIVE_QUEEN_URL ?? process.env.HIVE_AGGREGATOR_URL;
  if (!HIVE_URL) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  try {
    const body = await req.json();
    const apiKey = process.env.HIVE_API_KEY;
    const res = await fetch(`${HIVE_URL}/api/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30000),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "unreachable" }, { status: 502 });
  }
}
