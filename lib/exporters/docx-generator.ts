import { Document, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import { ComplianceReview } from "@/types";

export function generateComplianceReportDOCX(review: ComplianceReview): Document {
  return new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "AEROCOMPLIANCE AI",
            heading: HeadingLevel.TITLE,
            spacing: { after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "OFFICIAL AVIATION REGULATORY COMPLIANCE AUDIT REPORT",
                bold: true,
                size: 24,
                color: "0A1628",
              }),
            ],
            spacing: { after: 240 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Report Title: ", bold: true }),
              new TextRun(review.title),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Target Regulation: ", bold: true }),
              new TextRun(`${review.target_authority} - ${review.target_regulation_code}`),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Document Audited: ", bold: true }),
              new TextRun(review.document_title),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Compliance Score: ", bold: true }),
              new TextRun(`${review.compliance_score.toFixed(1)}%`),
            ],
            spacing: { after: 300 },
          }),
          new Paragraph({
            text: "1. Executive Summary",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 120 },
          }),
          new Paragraph({
            text: review.summary,
            spacing: { after: 300 },
          }),
          new Paragraph({
            text: "2. Findings and Corrective Action Plan (CAPA)",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 160 },
          }),
          ...review.findings.map(
            (finding) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: `[${finding.severity.toUpperCase()}] ${finding.title}\n`,
                    bold: true,
                    size: 22,
                  }),
                  new TextRun({
                    text: `Regulation: ${finding.regulation_ref} | Manual: ${finding.manual_section_ref}\n`,
                    italics: true,
                    size: 18,
                  }),
                  new TextRun({
                    text: `${finding.description}\n`,
                    size: 20,
                  }),
                  new TextRun({
                    text: `Corrective Action (CAPA): ${finding.recommended_action}\n\n`,
                    bold: true,
                    color: "0EA5E9",
                    size: 20,
                  }),
                ],
                spacing: { after: 200 },
              })
          ),
        ],
      },
    ],
  });
}
