import { NextResponse } from "next/server";

// CAPY_API_URL points at the bot's status API. Hardcoded fallback so the
// route works without setting a Vercel env var (the IP isn't a secret).
// Override on Vercel if you move the bot to a different host.
const CAPY_URL =
  process.env.CAPY_API_URL || "http://178.105.140.134:8001";

export async function GET() {
  try {
    const res = await fetch(`${CAPY_URL}/status`, {
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "upstream", status: res.status },
        { status: res.status },
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "unreachable", detail: String(e) },
      { status: 502 },
    );
  }
}
