import { NextRequest, NextResponse } from "next/server";
import { SAMPLE_INTERNAL_MANUALS } from "@/lib/aviation/sample-manuals";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

export async function GET(req: NextRequest) {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ documents: data });
      }
    }

    // Default sample manuals
    const documents = SAMPLE_INTERNAL_MANUALS.map((s) => s.document);
    return NextResponse.json({ documents });
  } catch (error) {
    console.error("API /api/documents error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve documents" },
      { status: 500 }
    );
  }
}
