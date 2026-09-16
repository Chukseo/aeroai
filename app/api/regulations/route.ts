import { NextRequest, NextResponse } from "next/server";
import { SEEDED_REGULATIONS } from "@/lib/aviation/seeded-regulations";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const authority = searchParams.get("authority");
    const query = searchParams.get("q")?.toLowerCase();

    let filtered = SEEDED_REGULATIONS;

    if (authority && authority !== "ALL") {
      filtered = filtered.filter((r) => r.authority === authority);
    }

    if (query) {
      filtered = filtered.filter(
        (r) =>
          r.code.toLowerCase().includes(query) ||
          r.title.toLowerCase().includes(query) ||
          r.summary.toLowerCase().includes(query) ||
          r.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    return NextResponse.json({ regulations: filtered });
  } catch (error) {
    console.error("API /api/regulations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch regulations" },
      { status: 500 }
    );
  }
}
