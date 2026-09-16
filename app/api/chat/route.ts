import { NextRequest, NextResponse } from "next/server";
import { generateComplianceAnswer } from "@/lib/ai/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, history } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const result = await generateComplianceAnswer({
      query,
      conversationHistory: history || [],
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("API /api/chat error:", error);
    return NextResponse.json(
      { error: "Failed to process compliance query" },
      { status: 500 }
    );
  }
}
