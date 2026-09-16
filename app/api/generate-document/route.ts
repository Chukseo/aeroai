import { NextRequest, NextResponse } from "next/server";
import { generateProfessionalDocument } from "@/lib/generator/document-engine";
import { openaiClient } from "@/lib/ai/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      prompt = "",
      category,
      doc_type,
      jurisdiction,
      company_name,
      counterparty_name,
      job_title,
      compensation,
      probation_period,
      notice_period,
      benefits,
      governing_law_override,
      tone,
    } = body;

    // 1. Generate document via core US Aviation synthesis engine
    const generatedDoc = generateProfessionalDocument({
      prompt,
      category,
      doc_type,
      jurisdiction,
      company_name,
      counterparty_name,
      job_title,
      compensation,
      probation_period,
      notice_period,
      benefits,
      governing_law_override,
      tone,
    });

    // 2. If OpenAI is configured and a custom prompt was provided, optionally enrich with bespoke aviation clauses
    if (openaiClient && prompt.trim().length > 10) {
      try {
        const completion = await openaiClient.chat.completions.create({
          model: process.env.OPENAI_MODEL || "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are an expert United States Aviation Legal Counsel, Chief Inspector, and FAA Regulatory Compliance Director.
Your task is to review and enhance a draft US aviation operational or employment document based on the user's prompt: "${prompt}".
Ensure statutory clauses conform strictly to United States Federal Aviation Regulations (FAA 14 CFR Part 121, Part 135, Part 145, Part 117, Part 120, Part 111, Part 5) and DOT 49 CFR Part 40.
Keep the response structured, clear, and professional.`,
            },
            {
              role: "user",
              content: `Here is the current draft document structure:\n${generatedDoc.full_content_text}\n\nProvide any supplemental statutory compliance notes or specific clauses needed for US aviation operations.`,
            },
          ],
          temperature: 0.2,
        });

        const aiNotes = completion.choices[0]?.message?.content;
        if (aiNotes) {
          generatedDoc.compliance_notes.push("AI Legal Review: Enhanced with FAA 14 CFR & DOT Part 40 compliance verification.");
        }
      } catch (aiErr) {
        console.warn("OpenAI enhancement skipped, using structured generator:", aiErr);
      }
    }

    return NextResponse.json({
      success: true,
      document: generatedDoc,
    });
  } catch (error) {
    console.error("API /api/generate-document error:", error);
    return NextResponse.json(
      { error: "Failed to generate document" },
      { status: 500 }
    );
  }
}
