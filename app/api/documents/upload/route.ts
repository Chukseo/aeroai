import { NextRequest, NextResponse } from "next/server";
import { chunkText } from "@/lib/ai/rag-engine";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = (formData.get("title") as string) || "Operational Manual";
    const docType = (formData.get("document_type") as string) || "GMM";
    const revision = (formData.get("revision") as string) || "Rev 1.0";
    const file = formData.get("file") as File | null;

    let extractedText = "";
    if (file) {
      const buffer = await file.arrayBuffer();
      const textDecoder = new TextDecoder("utf-8");
      // Basic text extraction for demo, fallback to filename contents
      extractedText = textDecoder.decode(buffer);
      if (extractedText.length < 50) {
        extractedText = `Document Title: ${title}\nManual Type: ${docType}\nRevision: ${revision}\n\nChapter 1 - Standard Operating Procedures\nThis document sets out the internal maintenance and operations controls to comply with civil aviation airworthiness standards.\n\nChapter 2 - Inspection and Release\nAll articles and work orders must be inspected by authorized personnel prior to airworthiness return to service.`;
      }
    } else {
      extractedText = `Document: ${title}\nOperating instructions and regulatory procedures.`;
    }

    // Chunk text
    const chunks = chunkText(extractedText);

    const newDocId = `doc-${Date.now()}`;
    const newDoc = {
      id: newDocId,
      org_id: "org-skywings-aero",
      title,
      document_type: docType,
      file_path: file ? `/manuals/${file.name}` : `/manuals/${title.toLowerCase().replace(/\s+/g, "-")}.pdf`,
      file_size: file ? file.size : 1240000,
      mime_type: file ? file.type : "application/pdf",
      revision_number: revision,
      effective_date: new Date().toISOString().split("T")[0],
      status: "indexed",
      chunks_count: chunks.length,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      try {
        await supabase.from("documents").insert(newDoc);
        // Insert chunks
        for (let i = 0; i < chunks.length; i++) {
          await supabase.from("document_chunks").insert({
            document_id: newDocId,
            org_id: "org-skywings-aero",
            chunk_index: i,
            content: chunks[i].content,
            section_title: chunks[i].sectionTitle,
          });
        }
      } catch (e) {
        console.warn("Supabase persistence skipped in local demo mode:", e);
      }
    }

    return NextResponse.json({
      success: true,
      document: newDoc,
      chunksCount: chunks.length,
    });
  } catch (error) {
    console.error("API /api/documents/upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload and vectorize document" },
      { status: 500 }
    );
  }
}
