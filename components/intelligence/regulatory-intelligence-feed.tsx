"use client";

import React, { useState } from "react";
import { ImpactAssessment } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChangeDetailModal } from "./change-detail-modal";
import { Sparkles, ArrowRight, RefreshCw, CheckCircle2 } from "lucide-react";

interface RegulatoryIntelligenceFeedProps {
  initialAssessments: ImpactAssessment[];
}

export function RegulatoryIntelligenceFeed({
  initialAssessments,
}: RegulatoryIntelligenceFeedProps) {
  const [assessments, setAssessments] = useState<ImpactAssessment[]>(initialAssessments);
  const [selectedAssessment, setSelectedAssessment] = useState<ImpactAssessment | null>(null);
  const [authorityFilter, setAuthorityFilter] = useState<string>("ALL");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedNotice, setSimulatedNotice] = useState<string | null>(null);

  const filtered = assessments.filter((a) => {
    if (authorityFilter === "ALL") return true;
    return a.regulation_change.authority === authorityFilter;
  });

  const criticalCount = assessments.filter((a) => a.overall_risk_level === "critical").length;
  const highCount = assessments.filter((a) => a.overall_risk_level === "high").length;
  const totalGaps = assessments.reduce((acc, curr) => acc + curr.affected_procedures.length, 0);

  const handleSimulateNewRule = async () => {
    setIsSimulating(true);
    await new Promise((r) => setTimeout(r, 800));

    const simulatedChange: ImpactAssessment = {
      id: `ia-sim-${Date.now()}`,
      change_id: `chg-sim-${Date.now()}`,
      organization_id: "org-skywings-aero",
      regulation_change: {
        id: `chg-sim-${Date.now()}`,
        regulation_code: "14 CFR § 120.115 (Emergency Amendment)",
        authority: "FAA",
        title: "Mandatory Electronic Chain of Custody for Safety-Sensitive Drug Testing",
        category: "Drug & Alcohol Policy",
        published_date: "Just now",
        effective_date: "Immediate (30-day compliance grace)",
        severity: "high",
        is_new_policy: true,
        summary_what_changed: "FAA mandates all Part 121, 135, and 145 certificate holders transition exclusively to Electronic Federal Drug Testing Custody and Control Forms (eCCF). Paper CCF forms are phased out.",
        old_version_text: "Paper or electronic custody and control forms may be utilized interchangeably.",
        new_version_text: "All safety-sensitive drug screening must utilize certified electronic custody and control forms (eCCF). Paper forms are prohibited except in documented telecommunications outages.",
        affected_operators: ["Part 121 Air Carriers", "Part 145 Repair Stations"],
        affected_departments: ["Human Resources", "Quality Assurance"],
      },
      overall_risk_level: "high",
      affected_procedures: [
        {
          document_id: "doc-hr-handbook",
          document_title: "Aviation Personnel HR Handbook & Just Culture Policy",
          section_ref: "Chapter 6.3 - CCF Protocol",
          current_internal_text: "Testing collectors may utilize standard 5-part carbon paper CCF forms or digital portals.",
          compliance_status: "outdated",
          draft_procedural_fix: `Chapter 6.3: "In compliance with 14 CFR § 120.115, all safety-sensitive drug and alcohol collections must be processed utilizing certified electronic Federal Drug Testing Custody and Control Forms (eCCF). Paper forms are restricted strictly to emergency communication blackouts."`,
          risk_implication: "Collection clinics rejecting manual paper tests; potential FAA inspection finding during annual Drug Abatement audit.",
        }
      ],
      executive_action_plan: [
        "Audit existing clinic collection agreements to confirm electronic eCCF readiness.",
        "Update HR Handbook Chapter 6.3 with draft electronic protocol."
      ],
      status: "pending_review",
      created_at: new Date().toISOString(),
    };

    setAssessments((prev) => [simulatedChange, ...prev]);
    setIsSimulating(false);
    setSimulatedNotice("New FAA Regulatory Release ingested! Instantaneously cross-mapped to HR Handbook Chapter 6.3.");
    setTimeout(() => setSimulatedNotice(null), 6000);
  };

  const severityDot = (sev: string) => {
    switch (sev) {
      case "critical":
        return "bg-brand-coral";
      case "high":
        return "bg-yellow-500";
      case "medium":
        return "bg-brand-amber";
      default:
        return "bg-brand-green";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <Card className="border-brand-border bg-brand-card">
          <CardContent className="p-3 sm:p-4">
            <p className="text-[10px] sm:text-[11px] text-brand-muted truncate">Active Updates</p>
            <p className="text-xl sm:text-2xl font-bold text-brand-heading">{assessments.length}</p>
            <p className="text-[9px] sm:text-[10px] text-brand-muted mt-0.5 truncate">FAA, EASA, DOT, ICAO</p>
          </CardContent>
        </Card>

        <Card className="border-brand-coral/30 bg-brand-card">
          <CardContent className="p-3 sm:p-4">
            <p className="text-[10px] sm:text-[11px] text-brand-muted truncate">Critical Items</p>
            <p className="text-xl sm:text-2xl font-bold text-brand-coral">{criticalCount}</p>
            <p className="text-[9px] sm:text-[10px] text-brand-coral/80 mt-0.5 truncate">FAR Part 117 Rest</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30 bg-brand-card">
          <CardContent className="p-3 sm:p-4">
            <p className="text-[10px] sm:text-[11px] text-brand-muted truncate">High Risk</p>
            <p className="text-xl sm:text-2xl font-bold text-yellow-500">{highCount}</p>
            <p className="text-[9px] sm:text-[10px] text-yellow-500/80 mt-0.5 truncate">Part 145 Retention</p>
          </CardContent>
        </Card>

        <Card className="border-brand-amber/30 bg-brand-card">
          <CardContent className="p-3 sm:p-4">
            <p className="text-[10px] sm:text-[11px] text-brand-muted truncate">Internal Gaps</p>
            <p className="text-xl sm:text-2xl font-bold text-brand-gold">{totalGaps}</p>
            <p className="text-[9px] sm:text-[10px] text-brand-muted mt-0.5 truncate">Draft fixes ready</p>
          </CardContent>
        </Card>
      </div>

      {/* Simulator Trigger & Live Feed Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center rounded-md border border-brand-border bg-brand-surface p-1 text-xs w-full sm:w-auto">
          {["ALL", "FAA", "EASA", "DOT"].map((auth) => (
            <button
              key={auth}
              onClick={() => setAuthorityFilter(auth)}
              className={`flex-1 sm:flex-initial rounded px-3 py-1 font-medium transition-colors ${
                authorityFilter === auth
                  ? "bg-brand-card text-brand-gold font-semibold"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              {auth === "ALL" ? "All Authorities" : auth}
            </button>
          ))}
        </div>

        <Button
          onClick={handleSimulateNewRule}
          disabled={isSimulating}
          variant="outline"
          size="sm"
          className="w-full sm:w-auto gap-1.5 text-xs text-brand-gold hover:text-white border-brand-amber/30 hover:bg-brand-amber/10"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="h-3 w-3 animate-spin" />
              <span>Ingesting & Cross-Mapping Rule...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3 w-3" />
              <span>Simulate Live FAA Rule Ingestion</span>
            </>
          )}
        </Button>
      </div>

      {/* Simulated Live Alert Toast */}
      {simulatedNotice && (
        <div className="rounded-lg bg-brand-green/10 border border-brand-green/30 p-3 text-xs text-brand-green flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{simulatedNotice}</span>
        </div>
      )}

      {/* Regulatory News Feed List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const chg = item.regulation_change;
          return (
            <div
              key={item.id}
              className="rounded-lg border border-brand-border bg-brand-surface p-5 space-y-3 hover:border-brand-border/80 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${severityDot(chg.severity)}`} />
                  <span className="font-mono text-xs font-bold text-brand-amber">{chg.authority}</span>
                  <span className="font-mono text-xs font-semibold text-brand-heading">{chg.regulation_code}</span>
                  <span className="text-brand-muted">·</span>
                  <span className="text-xs text-brand-muted">{chg.category}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-brand-muted font-mono">
                  <span>Published: {chg.published_date}</span>
                  <span>·</span>
                  <span className="text-brand-gold">Effective: {chg.effective_date}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-brand-heading">
                  {chg.title}
                </h3>
                <p className="mt-1 text-xs text-brand-text leading-relaxed">
                  {chg.summary_what_changed}
                </p>
              </div>

              {/* Cross-Mapping Impact Summary Box */}
              <div className="rounded-md bg-brand-card p-3 border border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-brand-muted font-medium">Who is affected:</span>
                    <span className="font-semibold text-brand-heading">{chg.affected_operators.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-brand-muted font-medium">Internal Impact:</span>
                    <span className="font-bold text-brand-coral">
                      {item.affected_procedures.length} Company Manual Procedures Non-Compliant
                    </span>
                    <span className="text-brand-muted">
                      ({item.affected_procedures.map((p) => p.document_title.split("-")[0].trim()).join(", ")})
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedAssessment(item)}
                  size="sm"
                  className="gap-1.5 shrink-0 w-full sm:w-auto"
                >
                  <span>Review Impact & Draft Fix</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail & Diff Modal */}
      <ChangeDetailModal
        assessment={selectedAssessment}
        isOpen={Boolean(selectedAssessment)}
        onClose={() => setSelectedAssessment(null)}
      />
    </div>
  );
}
