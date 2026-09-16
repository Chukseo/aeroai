import { NextRequest, NextResponse } from "next/server";
import { getAllImpactAssessments, SEEDED_REGULATION_CHANGES } from "@/lib/aviation/regulatory-intelligence";

export async function GET(req: NextRequest) {
  try {
    const assessments = getAllImpactAssessments();
    
    // Quick summary counts
    const criticalCount = assessments.filter((a) => a.overall_risk_level === "critical").length;
    const highCount = assessments.filter((a) => a.overall_risk_level === "high").length;
    const totalAffectedManuals = new Set(
      assessments.flatMap((a) => a.affected_procedures.map((p) => p.document_id))
    ).size;

    return NextResponse.json({
      assessments,
      changes: SEEDED_REGULATION_CHANGES,
      stats: {
        totalChanges: assessments.length,
        criticalCount,
        highCount,
        totalAffectedManuals,
      },
    });
  } catch (error) {
    console.error("API /api/intelligence error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve regulatory intelligence feed" },
      { status: 500 }
    );
  }
}
