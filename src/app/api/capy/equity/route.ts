import { NextRequest, NextResponse } from "next/server";

const CAPY_URL =
  process.env.CAPY_API_URL || "http://178.105.140.134:8001";

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get("limit") || "500";
  try {
    const res = await fetch(`${CAPY_URL}/equity?limit=${limit}`, {
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "upstream", status: res.status },
        { status: res.status },
      );
    }
    return NextResponse.json(await res.json());
  } catch (e) {
    return NextResponse.json(
      { error: "unreachable", detail: String(e) },
      { status: 502 },
    );
  }
}
