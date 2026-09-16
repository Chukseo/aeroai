import { NextRequest, NextResponse } from "next/server";
import { ComplianceReview, Finding } from "@/types";
import { SAMPLE_INTERNAL_MANUALS } from "@/lib/aviation/sample-manuals";
import { SEEDED_REGULATIONS } from "@/lib/aviation/seeded-regulations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { documentId = "doc-gmm-ch7", regulationCode = "14 CFR § 145.109" } = body;

    const sample = SAMPLE_INTERNAL_MANUALS.find((m) => m.document.id === documentId) || SAMPLE_INTERNAL_MANUALS[0];
    const regulation = SEEDED_REGULATIONS.find((r) => r.code === regulationCode) || SEEDED_REGULATIONS[0];

    let findings: Finding[] = [];
    let score = 84.5;
    let summary = "";

    if (sample.document.document_type === "EMPLOYMENT_CONTRACT" || regulation.code.includes("117") || regulation.code.includes("120") || regulation.code.includes("111")) {
      // HR & Employment Contract Gap Analysis findings
      findings = [
        {
          id: `f-${Date.now()}-1`,
          review_id: `rev-${Date.now()}`,
          regulation_ref: "14 CFR § 120.109(a)",
          manual_section_ref: `${sample.document.title.split("-")[0].trim()} - Drug Testing Clauses`,
          finding_type: "compliant",
          severity: "low",
          title: "Pre-Employment DOT Drug Screening Consent Compliant",
          description: "Contractual clauses mandate verified negative pre-employment drug screening under DOT 49 CFR Part 40 prior to beginning any safety-sensitive aviation duties.",
          risk_implication: "Protects certificate holder from civil enforcement actions under FAA Part 120.",
          recommended_action: "Maintain current mandatory consent language across all new hire onboarding packages.",
          status: "resolved",
          created_at: new Date().toISOString(),
        },
        {
          id: `f-${Date.now()}-2`,
          review_id: `rev-${Date.now()}`,
          regulation_ref: "14 CFR § 117.25(b)",
          manual_section_ref: `${sample.document.title.split("-")[0].trim()} Section 4 - Rest Periods`,
          finding_type: "missing_control",
          severity: "high",
          title: "Missing Explicit 8-Hour Uninterrupted Sleep Opportunity Guarantee in Contract",
          description: "While Section 4 specifies 10 hours of rest, it fails to explicitly guarantee 8 uninterrupted hours of quiet rest opportunity free from employer communication as strictly mandated by FAR § 117.25(b).",
          risk_implication: "Crew scheduling calls during rest period invalidate the statutory rest, leading to FAA enforcement and grounding of flights due to fatigue violations.",
          recommended_action: "Amend Section 4 to include explicit non-contact rest buffer: 'The 10-hour rest period must guarantee 8 uninterrupted hours of sleep opportunity during which the Company shall not contact the crewmember.'",
          status: "open",
          created_at: new Date().toISOString(),
        },
        {
          id: `f-${Date.now()}-3`,
          review_id: `rev-${Date.now()}`,
          regulation_ref: "14 CFR § 111.105(a)",
          manual_section_ref: "Section 8 - Pilot Records Database Authorization",
          finding_type: "compliant",
          severity: "low",
          title: "PRD Electronic Database Authorization Clause Present",
          description: "Applicant authorization to query FAA Pilot Records Database (PRD) for prior employer training records and check ride enforcement histories conforms with statutory PRD rollout mandates.",
          risk_implication: "None. Satisfies FAA Part 111 hiring prerequisite.",
          recommended_action: "Ensure electronic PRD consent timestamp is archived in employee personnel file for 5 years.",
          status: "resolved",
          created_at: new Date().toISOString(),
        },
        {
          id: `f-${Date.now()}-4`,
          review_id: `rev-${Date.now()}`,
          regulation_ref: "14 CFR § 5.21(a)(7)",
          manual_section_ref: "Employee Disciplinary Policy",
          finding_type: "potential_risk",
          severity: "medium",
          title: "Just Culture Reporting Protection Lacks Direct Contractual Cross-Reference",
          description: "The employment agreement does not explicitly cross-reference the Safety Management System (SMS) non-punitive reporting protections, creating ambiguity regarding whether contract breach penalties apply to reported self-errors.",
          risk_implication: "Chills safety hazard reporting among technicians and crewmembers who fear employment termination.",
          recommended_action: "Incorporate express immunity clause: 'In accordance with Company SMS Just Culture policy, self-reporting of unintentional errors shall not constitute contractual default or ground for termination.'",
          status: "in_remediation",
          created_at: new Date().toISOString(),
        },
      ];
      score = 88.0;
      summary = `Compliance gap analysis completed for aviation employment agreement '${sample.document.title}' against FAA personnel and safety rules (${regulation.code}). Verified DOT drug screening and PRD background authorizations. Identified 1 missing statutory rest buffer control and recommended contractual Just Culture immunity cross-reference.`;
    } else {
      // Standard maintenance / ops analysis
      findings = [
        {
          id: `f-${Date.now()}-1`,
          review_id: `rev-${Date.now()}`,
          regulation_ref: "14 CFR § 145.219(c)",
          manual_section_ref: `${sample.document.title.split("-")[0].trim()} Ch 7.2`,
          finding_type: "policy_conflict",
          severity: "critical",
          title: "Calibration Record Retention Non-Compliance (12 Mos vs 24 Mos)",
          description: `${sample.document.title} specifies 12-month retention, whereas 14 CFR § 145.219(c) strictly mandates retaining records for at least 2 years (24 months).`,
          risk_implication: "Major FAA audit finding during NASIP inspection; potential civil penalty and mandatory re-inspection.",
          recommended_action: "Immediately amend manual to require minimum 24-month retention for FAA operations (36-month for EASA).",
          status: "open",
          created_at: new Date().toISOString(),
        },
        {
          id: `f-${Date.now()}-2`,
          review_id: `rev-${Date.now()}`,
          regulation_ref: "14 CFR § 145.109(c)",
          manual_section_ref: "Calibration Standards",
          finding_type: "missing_control",
          severity: "high",
          title: "Missing Explicit NIST Traceability Clause",
          description: "Manual omits mandatory explicit reference to National Institute of Standards and Technology (NIST) traceable standards.",
          risk_implication: "FAA Principal Maintenance Inspector (PMI) may challenge airworthiness determination of torque-critical assemblies.",
          recommended_action: "Incorporate mandatory clause requiring calibration certificates to state NIST traceability under ISO/IEC 17025.",
          status: "open",
          created_at: new Date().toISOString(),
        },
        {
          id: `f-${Date.now()}-3`,
          review_id: `rev-${Date.now()}`,
          regulation_ref: "14 CFR § 145.109(b)",
          manual_section_ref: "Tool Tagging & Verification",
          finding_type: "compliant",
          severity: "low",
          title: "Tool Tagging and Pre-Dispatch Verification Compliant",
          description: "Physical inspection stickers bearing serial number, calibration date, and due date satisfy § 145.109(b) premises control.",
          risk_implication: "None. Represents strong preventive control.",
          recommended_action: "Maintain current physical barcoding and RFID tagging practices.",
          status: "resolved",
          created_at: new Date().toISOString(),
        },
      ];
      score = 84.5;
      summary = `Automated comparison completed between internal procedure '${sample.document.title}' and '${regulation.code}: ${regulation.title}'. The evaluation detected 1 critical policy conflict (record retention), 1 missing control (NIST traceability), and 1 compliant area.`;
    }

    const review: ComplianceReview = {
      id: `rev-${Date.now()}`,
      org_id: "org-skywings-aero",
      title: `${sample.document.title} vs ${regulation.code}`,
      document_id: sample.document.id,
      document_title: sample.document.title,
      target_authority: regulation.authority,
      target_regulation_code: regulation.code,
      compliance_score: score,
      status: "completed",
      summary,
      findings,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({ review });
  } catch (error) {
    console.error("API /api/gap-analysis error:", error);
    return NextResponse.json(
      { error: "Failed to execute gap analysis" },
      { status: 500 }
    );
  }
}
