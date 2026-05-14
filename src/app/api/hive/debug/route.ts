import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    HIVE_AGGREGATOR_URL: process.env.HIVE_AGGREGATOR_URL ? `set (${process.env.HIVE_AGGREGATOR_URL.length} chars)` : "NOT SET",
    NEXT_PUBLIC_HIVE_AGGREGATOR_URL: process.env.NEXT_PUBLIC_HIVE_AGGREGATOR_URL ? `set (${process.env.NEXT_PUBLIC_HIVE_AGGREGATOR_URL.length} chars)` : "NOT SET",
    NODE_ENV: process.env.NODE_ENV,
  });
}
