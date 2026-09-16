import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json({
      connected: false,
      status: "missing_key",
      message: "OPENAI_API_KEY is not configured in environment variables.",
    });
  }

  const baseURL = process.env.OPENAI_BASE_URL?.trim();
  const providerName = baseURL?.includes("groq.com")
    ? "Groq"
    : baseURL?.includes("mistral.ai")
    ? "Mistral"
    : "OpenAI";

  try {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) });

    const model = process.env.OPENAI_MODEL || "gpt-4o";
    await client.chat.completions.create({
      model,
      messages: [{ role: "user", content: "ping" }],
      max_tokens: 5,
    });

    return NextResponse.json({
      connected: true,
      status: "ready",
      model,
      message: `✓ Connected to ${providerName} — model: ${model}`,
    });
  } catch (err: any) {
    const status = err.status || 500;
    const code = err.code || err.error?.code || "unknown";
    const errorMessage = err.message || "Failed to connect";

    if (code === "credit_balance_exhausted" || (status === 429 && providerName === "OpenAI")) {
      return NextResponse.json({
        connected: false,
        status: "credit_balance_exhausted",
        message:
          "Your OpenAI API key is valid but your account has $0 credits. Add credits at: platform.openai.com/settings/organization/billing",
      });
    }

    if (status === 401) {
      return NextResponse.json({
        connected: false,
        status: "invalid_key",
        message: `Invalid API key for ${providerName}.`,
      });
    }

    return NextResponse.json({
      connected: false,
      status: "error",
      message: `${providerName} error: ${errorMessage}`,
    });
  }
}
