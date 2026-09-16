import { jsPDF } from "jspdf";
import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from "docx";
import { GeneratedDocument } from "@/types";

// ==============================================================================
// 1. PDF Exporter for Generated Documents
// ==============================================================================
export function generateDocumentPDF(doc: GeneratedDocument): jsPDF {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 25;

  // Header
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(15);
  pdf.setTextColor(30, 35, 45);
  pdf.text(doc.title, margin, yPos);
  yPos += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(110, 115, 125);
  pdf.text(`Jurisdiction: ${doc.jurisdiction_label} | Governing Law: ${doc.governing_law}`, margin, yPos);
  yPos += 5;
  pdf.text(`Effective Date: ${doc.effective_date} | Document ID: ${doc.id}`, margin, yPos);
  yPos += 7;

  // Horizontal divider
  pdf.setDrawColor(210, 215, 225);
  pdf.setLineWidth(0.5);
  pdf.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;

  // Body clauses
  doc.clauses.forEach((clause) => {
    // Check if new page is needed
    if (yPos > 260) {
      pdf.addPage();
      yPos = 25;
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(40, 45, 55);
    pdf.text(clause.title, margin, yPos);
    yPos += 5;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(60, 65, 75);

    const splitBody = pdf.splitTextToSize(clause.body, contentWidth);
    pdf.text(splitBody, margin, yPos);
    yPos += splitBody.length * 4.2 + 5;
  });

  // Signatures
  if (yPos > 240) {
    pdf.addPage();
    yPos = 25;
  }

  yPos += 5;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.text("SIGNATURES & ACKNOWLEDGMENT", margin, yPos);
  yPos += 12;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.text(`For and on behalf of ${doc.parties.employer_or_company}:`, margin, yPos);
  pdf.text(`Accepted by ${doc.parties.employee_or_counterparty}:`, margin + 85, yPos);
  yPos += 15;

  pdf.text("___________________________________", margin, yPos);
  pdf.text("___________________________________", margin + 85, yPos);
  yPos += 5;
  pdf.text("Authorized Signature & Stamp", margin, yPos);
  pdf.text("Signature & Date", margin + 85, yPos);

  return pdf;
}

// ==============================================================================
// 2. DOCX Exporter for Generated Documents
// ==============================================================================
export function generateDocumentDOCX(doc: GeneratedDocument): Document {
  const paragraphs: Paragraph[] = [];

  // Title
  paragraphs.push(
    new Paragraph({
      text: doc.title,
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 150 },
    })
  );

  // Metadata
  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Jurisdiction: `, bold: true }),
        new TextRun(`${doc.jurisdiction_label} | `),
        new TextRun({ text: `Governing Law: `, bold: true }),
        new TextRun(`${doc.governing_law}\n`),
        new TextRun({ text: `Effective Date: `, bold: true }),
        new TextRun(`${doc.effective_date}`),
      ],
      spacing: { after: 300 },
    })
  );

  // Clauses
  doc.clauses.forEach((clause) => {
    paragraphs.push(
      new Paragraph({
        text: clause.title,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );

    paragraphs.push(
      new Paragraph({
        text: clause.body,
        spacing: { after: 200 },
      })
    );
  });

  // Signatures
  paragraphs.push(
    new Paragraph({
      text: "SIGNATURES & EXECUTION",
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 150 },
    })
  );

  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun(`For: ${doc.parties.employer_or_company}\n`),
        new TextRun("Signature: _________________________________\n"),
        new TextRun("Date: _____________________________________\n\n"),
        new TextRun(`For: ${doc.parties.employee_or_counterparty}\n`),
        new TextRun("Signature: _________________________________\n"),
        new TextRun("Date: _____________________________________"),
      ],
      spacing: { after: 200 },
    })
  );

  return new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });
}
