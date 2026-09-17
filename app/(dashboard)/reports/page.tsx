"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateComplianceReportPDF } from "@/lib/exporters/pdf-generator";
import { generateComplianceReportDOCX } from "@/lib/exporters/docx-generator";
import { SAMPLE_INTERNAL_MANUALS } from "@/lib/aviation/sample-manuals";

export default function ReportsPage() {
  const [selectedDoc, setSelectedDoc] = useState("doc-gmm-ch7");
  const [selectedAuthority, setSelectedAuthority] = useState("FAA");
  const [isGenerating, setIsGenerating] = useState(false);

  const mockReview = {
    id: "rev-rep-1",
    org_id: "org-skywings-aero",
    title: "Comprehensive Aviation Compliance Audit Report",
    document_id: selectedDoc,
    document_title: "General Maintenance Manual (GMM) - Ch 7 Tooling",
    target_authority: selectedAuthority as any,
    target_regulation_code: "14 CFR § 145.109 / 145.219",
    compliance_score: 87.2,
    status: "completed" as const,
    summary: "Full compliance audit evaluation assessing internal tool calibration, recordkeeping, and maintenance release controls against international civil aviation requirements.",
    findings: [
      {
        id: "f-1",
        review_id: "rev-rep-1",
        regulation_ref: "14 CFR § 145.219(c)",
        manual_section_ref: "GMM Ch 7.2",
        finding_type: "policy_conflict" as const,
        severity: "critical" as const,
        title: "Calibration Record Retention Non-Compliance",
        description: "GMM Ch 7.2 specifies 12-month retention, violating statutory 2-year retention.",
        risk_implication: "Major FAA finding, potential civil penalty.",
        recommended_action: "Amend GMM Ch 7.2 to 24 months minimum.",
        status: "open" as const,
        created_at: new Date().toISOString(),
      },
      {
        id: "f-2",
        review_id: "rev-rep-1",
        regulation_ref: "14 CFR § 145.109(c)",
        manual_section_ref: "GMM Ch 7.2",
        finding_type: "missing_control" as const,
        severity: "high" as const,
        title: "Missing NIST Traceability Mandate",
        description: "Vendor calibration certificates lack explicit NIST traceability requirement.",
        risk_implication: "Challenge of airworthiness sign-offs.",
        recommended_action: "Add ANSI/NCSL Z540-1 or ISO 17025 clause.",
        status: "open" as const,
        created_at: new Date().toISOString(),
      },
    ],
    created_at: new Date().toISOString(),
  };

  const handleExportPDF = () => {
    setIsGenerating(true);
    try {
      const pdf = generateComplianceReportPDF(mockReview);
      pdf.save("AeroCompliance-Audit-Report.pdf");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportDOCX = async () => {
    setIsGenerating(true);
    try {
      const doc = generateComplianceReportDOCX(mockReview);
      const { Packer } = await import("docx");
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "AeroCompliance-Audit-Report.docx";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-brand-heading">
          Report Generator
        </h1>
        <p className="text-xs text-brand-muted">
          Export formal audit dossiers, findings matrices, and CAPA remediation packages
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-5 space-y-4 text-xs">
            <h3 className="text-sm font-semibold text-brand-heading">
              Report Parameters
            </h3>

            <div>
              <label className="block text-brand-muted mb-1 font-medium">
                Operational Manual
              </label>
              <select
                value={selectedDoc}
                onChange={(e) => setSelectedDoc(e.target.value)}
                className="w-full rounded-md border border-brand-border bg-brand-surface p-2 text-xs text-brand-text focus:border-brand-amber/40 focus:outline-none"
              >
                {SAMPLE_INTERNAL_MANUALS.map((m) => (
                  <option key={m.document.id} value={m.document.id}>
                    {m.document.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-brand-muted mb-1 font-medium">
                  Regulatory Standard
                </label>
                <select
                  value={selectedAuthority}
                  onChange={(e) => setSelectedAuthority(e.target.value)}
                  className="w-full rounded-md border border-brand-border bg-brand-surface p-2 text-xs text-brand-text focus:border-brand-amber/40 focus:outline-none"
                >
                  <option value="FAA">FAA (14 CFR)</option>
                  <option value="EASA">EASA Easy Access Rules</option>
                  <option value="ICAO">ICAO Annexes</option>
                </select>
              </div>

              <div>
                <label className="block text-brand-muted mb-1 font-medium">
                  Report Scope
                </label>
                <select className="w-full rounded-md border border-brand-border bg-brand-surface p-2 text-xs text-brand-text focus:border-brand-amber/40 focus:outline-none">
                  <option>Full Audit & CAPA Dossier</option>
                  <option>Executive Risk Summary</option>
                  <option>Gap Matrix Only</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <Button onClick={handleExportPDF} disabled={isGenerating} size="sm" className="w-full sm:w-auto">
                Download PDF
              </Button>
              <Button onClick={handleExportDOCX} disabled={isGenerating} variant="outline" size="sm" className="w-full sm:w-auto">
                Export DOCX
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3 text-xs">
            <h4 className="text-sm font-semibold text-brand-heading">Dossier Structure</h4>
            <ul className="text-brand-muted space-y-1.5 list-disc list-inside">
              <li>Executive Summary & Scope</li>
              <li>Compliance Score Breakdown</li>
              <li>Statutory Analysis Matrix</li>
              <li>Identified Gaps & Non-Compliances</li>
              <li>Corrective Action Plan (CAPA)</li>
              <li>Sign-Off & Audit Trail</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
