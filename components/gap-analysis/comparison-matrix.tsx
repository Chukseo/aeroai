"use client";

import React, { useState } from "react";
import { ComplianceReview } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateComplianceReportPDF } from "@/lib/exporters/pdf-generator";
import { generateComplianceReportDOCX } from "@/lib/exporters/docx-generator";

interface ComparisonMatrixProps {
  review: ComplianceReview | null;
}

export function ComparisonMatrix({ review }: ComparisonMatrixProps) {
  const [filterType, setFilterType] = useState<string>("ALL");
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingDOCX, setIsExportingDOCX] = useState(false);

  if (!review) return null;

  const handleDownloadPDF = () => {
    setIsExportingPDF(true);
    try {
      const doc = generateComplianceReportPDF(review);
      doc.save(`AeroCompliance-${review.target_regulation_code.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleDownloadDOCX = async () => {
    setIsExportingDOCX(true);
    try {
      const doc = generateComplianceReportDOCX(review);
      const { Packer } = await import("docx");
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `AeroCompliance-${review.target_regulation_code.replace(/[^a-zA-Z0-9]/g, "_")}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsExportingDOCX(false);
    }
  };

  const filteredFindings = review.findings.filter((f) => {
    if (filterType === "ALL") return true;
    return f.finding_type === filterType;
  });

  const compliantCount = review.findings.filter((f) => f.finding_type === "compliant").length;
  const riskCount = review.findings.filter((f) => f.finding_type === "potential_risk").length;
  const missingCount = review.findings.filter((f) => f.finding_type === "missing_control").length;
  const conflictCount = review.findings.filter((f) => f.finding_type === "policy_conflict").length;

  const severityBadge = (sev: string) => {
    switch (sev) {
      case "critical":
        return "bg-brand-coral/15 text-brand-coral border-brand-coral/30";
      case "high":
        return "bg-yellow-500/15 text-yellow-500 border-yellow-500/30";
      case "medium":
        return "bg-brand-amber/15 text-brand-gold border-brand-amber/30";
      default:
        return "bg-brand-green/15 text-brand-green border-brand-green/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Review summary banner */}
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-brand-muted">
                <span className="font-semibold text-brand-gold">{review.target_authority}</span>
                <span>·</span>
                <span className="font-mono text-brand-heading">{review.target_regulation_code}</span>
              </div>
              <h2 className="text-base font-bold text-brand-heading">
                {review.title}
              </h2>
              <p className="text-xs text-brand-muted max-w-2xl leading-relaxed">
                {review.summary}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="rounded-md border border-brand-border bg-brand-surface px-4 py-2.5 text-center">
                <p className="text-[10px] text-brand-muted uppercase tracking-wider">Score</p>
                <p className="text-xl font-bold text-brand-gold">{review.compliance_score.toFixed(1)}%</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <Button onClick={handleDownloadPDF} disabled={isExportingPDF} size="sm">
                  Download PDF
                </Button>
                <Button onClick={handleDownloadDOCX} disabled={isExportingDOCX} variant="outline" size="sm">
                  Export DOCX
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {[
          { key: "compliant", label: "Compliant", count: compliantCount },
          { key: "potential_risk", label: "Potential Risks", count: riskCount },
          { key: "missing_control", label: "Missing Controls", count: missingCount },
          { key: "policy_conflict", label: "Policy Conflicts", count: conflictCount },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterType(filterType === tab.key ? "ALL" : tab.key)}
            className={`flex items-center justify-between rounded-md border p-3 transition-colors ${
              filterType === tab.key
                ? "border-brand-amber/40 bg-brand-amber/10 text-brand-gold font-medium"
                : "border-brand-border bg-brand-surface text-brand-muted hover:text-brand-text"
            }`}
          >
            <span>{tab.label}</span>
            <span className="font-mono font-bold text-xs">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Findings List */}
      <div className="space-y-3">
        {filteredFindings.map((finding) => (
          <div
            key={finding.id}
            className="rounded-lg border border-brand-border bg-brand-surface p-4 text-xs space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-brand-border/60 pb-2">
              <div className="flex items-center gap-2">
                <span className={`rounded px-2 py-0.5 text-[10px] font-semibold border uppercase ${severityBadge(finding.severity)}`}>
                  {finding.severity}
                </span>
                <span className="font-semibold text-brand-heading text-sm">
                  {finding.title}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-brand-muted font-mono">
                <span>{finding.regulation_ref}</span>
                <span>·</span>
                <span>{finding.manual_section_ref}</span>
              </div>
            </div>

            <p className="text-brand-text leading-relaxed text-[12px]">
              {finding.description}
            </p>

            {finding.risk_implication && (
              <div className="rounded bg-brand-card p-2.5 border border-brand-border">
                <span className="text-[10px] text-brand-muted font-semibold block mb-0.5">Audit Risk</span>
                <p className="text-brand-muted text-[11px]">{finding.risk_implication}</p>
              </div>
            )}

            <div className="rounded bg-brand-amber/5 p-2.5 border border-brand-amber/20">
              <span className="text-[10px] text-brand-gold font-semibold block mb-0.5">Recommended Action (CAPA)</span>
              <p className="text-brand-text text-[11px]">{finding.recommended_action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
