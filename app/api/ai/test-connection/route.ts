import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json({
      connected: false,
      status: "missing_key",
      message: "OPENAI_API_KEY is not configured in environment variables.",
    });
  }

  try {
    const client = new OpenAI({ apiKey });
    
    // First, verify the key authentication
    await client.models.list();

    // Second, verify credit balance by making a minimal test call
    const model = process.env.OPENAI_MODEL || "gpt-4o";
    const testCall = await client.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: "ping" }],
      max_tokens: 5,
    });

    return NextResponse.json({
      connected: true,
      status: "ready",
      model: model,
      message: `Successfully connected to OpenAI API using model: ${model}.`,
    });
  } catch (err: any) {
    const status = err.status || 500;
    const code = err.code || err.error?.code || "unknown";
    const errorMessage = err.message || "Failed to connect to OpenAI API";

    if (code === "credit_balance_exhausted" || status === 429) {
      return NextResponse.json({
        connected: false,
        status: "credit_balance_exhausted",
        statusCode: 429,
        message: "Your OpenAI API key is valid, but your OpenAI account has $0 credits remaining. Please add credits at https://platform.openai.com/settings/organization/billing",
        rawError: errorMessage,
      });
    }

    if (status === 401) {
      return NextResponse.json({
        connected: false,
        status: "invalid_key",
        statusCode: 401,
        message: "Invalid OpenAI API Key provided.",
        rawError: errorMessage,
      });
    }

    return NextResponse.json({
      connected: false,
      status: "error",
      statusCode: status,
      message: errorMessage,
    });
  }
}
