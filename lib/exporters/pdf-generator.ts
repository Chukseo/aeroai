import { jsPDF } from "jspdf";
import { ComplianceReview, AuditReport } from "@/types";

export function generateComplianceReportPDF(review: ComplianceReview): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const primaryColor: [number, number, number] = [10, 22, 40]; // Dark Navy
  const skyColor: [number, number, number] = [14, 165, 233]; // Aviation Sky

  // Header Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 32, "F");

  // Header Titles
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("AEROCOMPLIANCE AI", 14, 15);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 220, 245);
  doc.text("OFFICIAL AVIATION REGULATORY COMPLIANCE AUDIT REPORT", 14, 23);

  // Metadata Block
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(10);
  let y = 42;

  doc.setFont("helvetica", "bold");
  doc.text("Title:", 14, y);
  doc.setFont("helvetica", "normal");
  doc.text(review.title, 50, y);

  y += 7;
  doc.setFont("helvetica", "bold");
  doc.text("Target Standard:", 14, y);
  doc.setFont("helvetica", "normal");
  doc.text(`${review.target_authority} - ${review.target_regulation_code}`, 50, y);

  y += 7;
  doc.setFont("helvetica", "bold");
  doc.text("Audited Document:", 14, y);
  doc.setFont("helvetica", "normal");
  doc.text(review.document_title, 50, y);

  y += 7;
  doc.setFont("helvetica", "bold");
  doc.text("Generated Date:", 14, y);
  doc.setFont("helvetica", "normal");
  doc.text(new Date(review.created_at).toLocaleDateString(), 50, y);

  // Score Badge
  doc.setFillColor(review.compliance_score >= 80 ? 16 : 220, review.compliance_score >= 80 ? 185 : 38, review.compliance_score >= 80 ? 129 : 38);
  doc.roundedRect(150, 38, 46, 24, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("COMPLIANCE", 154, 46);
  doc.setFontSize(16);
  doc.text(`${review.compliance_score.toFixed(1)}%`, 154, 56);

  // Divider
  y = 72;
  doc.setDrawColor(220, 225, 230);
  doc.line(14, y, 196, y);

  // Executive Summary
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.text("1. EXECUTIVE SUMMARY", 14, y);

  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  const summaryLines = doc.splitTextToSize(review.summary, 182);
  doc.text(summaryLines, 14, y);

  y += summaryLines.length * 5 + 8;

  // Findings Matrix
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.text("2. REGULATORY FINDINGS & CORRECTIVE ACTIONS", 14, y);

  y += 8;
  for (const finding of review.findings) {
    if (y > 255) {
      doc.addPage();
      y = 20;
    }

    // Finding Card
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, y, 182, 38, 2, 2, "F");
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, y, 182, 38, 2, 2, "S");

    // Badge
    const severityColor = finding.severity === "critical" ? [239, 68, 68] : finding.severity === "high" ? [245, 158, 11] : [59, 130, 246];
    doc.setFillColor(severityColor[0], severityColor[1], severityColor[2]);
    doc.rect(14, y, 3, 38, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`[${finding.severity.toUpperCase()}] ${finding.title}`, 20, y + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Regulation: ${finding.regulation_ref} | Manual Ref: ${finding.manual_section_ref}`, 20, y + 12);

    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const descLines = doc.splitTextToSize(finding.description, 172);
    doc.text(descLines, 20, y + 18);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...skyColor);
    doc.text("CAPA: " + finding.recommended_action, 20, y + 32);

    y += 44;
  }

  // Footer on each page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `AeroCompliance AI Platform • Confidential Aviation Quality Document • Page ${i} of ${pageCount}`,
      14,
      287
    );
  }

  return doc;
}
