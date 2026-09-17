"use client";

import React, { useState } from "react";
import { ImpactAssessment } from "@/types";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface ChangeDetailModalProps {
  assessment: ImpactAssessment | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ChangeDetailModal({
  assessment,
  isOpen,
  onClose,
}: ChangeDetailModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"cross_mapping" | "statutory_diff">("cross_mapping");

  if (!assessment) return null;

  const change = assessment.regulation_change;

  const handleCopyFix = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${change.authority} Regulatory Update: ${change.regulation_code}`}
      description={change.title}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1 text-xs">
        {/* Top Summary Banner */}
        <div className="rounded-lg border border-brand-border bg-brand-surface p-4 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-border pb-2">
            <div className="flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-[10px] font-semibold border uppercase ${severityBadge(change.severity)}`}>
                {change.severity} Impact
              </span>
              <span className="font-mono text-brand-muted">Published: {change.published_date}</span>
              <span className="text-brand-muted">·</span>
              <span className="font-mono text-brand-amber">Effective: {change.effective_date}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-brand-muted">
              <span>Affected Departments:</span>
              <span className="text-brand-text font-medium">{change.affected_departments.join(", ")}</span>
            </div>
          </div>

          <div className="pt-1">
            <span className="text-[11px] text-brand-muted font-medium uppercase tracking-wider block mb-1">
              What Changed in the Regulation:
            </span>
            <p className="text-brand-text leading-relaxed">
              {change.summary_what_changed}
            </p>
          </div>
        </div>

        {/* Tab switcher: Cross-Mapped Company Procedures vs Statutory Diff */}
        <div className="flex items-center border-b border-brand-border gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("cross_mapping")}
            className={`pb-2 px-3 text-xs font-semibold transition-colors border-b-2 whitespace-nowrap shrink-0 ${
              activeTab === "cross_mapping"
                ? "border-brand-amber text-brand-gold"
                : "border-transparent text-brand-muted hover:text-brand-text"
            }`}
          >
            Affected Procedures & Fixes ({assessment.affected_procedures.length})
          </button>
          <button
            onClick={() => setActiveTab("statutory_diff")}
            className={`pb-2 px-3 text-xs font-semibold transition-colors border-b-2 whitespace-nowrap shrink-0 ${
              activeTab === "statutory_diff"
                ? "border-brand-amber text-brand-gold"
                : "border-transparent text-brand-muted hover:text-brand-text"
            }`}
          >
            Statutory Version Diff (Old vs New)
          </button>
        </div>

        {/* TAB 1: Affected Procedures & The Draft Fix */}
        {activeTab === "cross_mapping" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[11px] text-brand-muted">
              <span>AeroCompliance AI cross-mapped this change against your internal manual database:</span>
              <span className="font-semibold text-brand-coral">
                {assessment.affected_procedures.length} Non-Compliant Procedures Found
              </span>
            </div>

            {assessment.affected_procedures.map((proc, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-brand-border bg-brand-surface p-4 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-brand-border pb-2">
                  <div>
                    <span className="text-[11px] text-brand-muted uppercase tracking-wider font-semibold block">
                      Target Company Document:
                    </span>
                    <h4 className="text-sm font-bold text-brand-heading">
                      {proc.document_title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-brand-card px-2 py-0.5 font-mono text-[11px] text-brand-gold border border-brand-border">
                      {proc.section_ref}
                    </span>
                    <span className="rounded bg-brand-coral/15 px-2 py-0.5 text-[10px] text-brand-coral border border-brand-coral/30 font-semibold uppercase">
                      {proc.compliance_status.replace("_", " ")}
                    </span>
                  </div>
                </div>

                {/* Current wording vs Risk */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded bg-brand-card p-3 border border-brand-border space-y-1">
                    <span className="text-[10px] font-semibold text-brand-coral uppercase tracking-wider block">
                      Current Outdated Internal Text:
                    </span>
                    <p className="font-mono text-[11px] text-brand-muted leading-relaxed whitespace-pre-wrap">
                      {proc.current_internal_text}
                    </p>
                  </div>

                  <div className="rounded bg-brand-card p-3 border border-brand-border space-y-1">
                    <span className="text-[10px] font-semibold text-yellow-500 uppercase tracking-wider block">
                      Regulatory Risk Implication:
                    </span>
                    <p className="text-[11px] text-brand-text leading-relaxed">
                      {proc.risk_implication}
                    </p>
                  </div>
                </div>

                {/* THE KILLER FEATURE: Ready-to-apply Draft Procedural Fix */}
                <div className="rounded-lg bg-brand-amber/10 border border-brand-amber/30 p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-brand-gold uppercase tracking-wider">
                      Draft Procedural Update (Ready to apply to manual):
                    </span>
                    <Button
                      onClick={() => handleCopyFix(proc.draft_procedural_fix, idx)}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs gap-1 text-brand-gold hover:text-white"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="h-3 w-3 text-brand-green" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy Draft Fix</span>
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="rounded bg-brand-bg p-3 border border-brand-border/80 font-mono text-[11px] text-brand-heading leading-relaxed">
                    {proc.draft_procedural_fix}
                  </div>
                </div>
              </div>
            ))}

            {/* Executive Action Plan */}
            <div className="rounded-lg border border-brand-border bg-brand-card p-4 space-y-2">
              <span className="text-xs font-semibold text-brand-heading block">
                Required Corrective Action Plan (CAPA)
              </span>
              <ul className="space-y-1 text-brand-muted">
                {assessment.executive_action_plan.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <span className="font-mono text-brand-amber text-xs font-bold">{sIdx + 1}.</span>
                    <span className="text-brand-text">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: Statutory Version Diff */}
        {activeTab === "statutory_diff" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-brand-coral/30 bg-brand-card p-4 space-y-2">
                <span className="text-xs font-semibold text-brand-coral block border-b border-brand-border pb-1">
                  Previous Regulation Version:
                </span>
                <div className="font-mono text-[11px] text-brand-muted leading-relaxed whitespace-pre-wrap">
                  {change.old_version_text}
                </div>
              </div>

              <div className="rounded-lg border border-brand-green/30 bg-brand-card p-4 space-y-2">
                <span className="text-xs font-semibold text-brand-green block border-b border-brand-border pb-1">
                  Updated Regulation Version (Mandatory):
                </span>
                <div className="font-mono text-[11px] text-brand-heading leading-relaxed whitespace-pre-wrap">
                  {change.new_version_text}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-brand-border">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button size="sm" onClick={onClose}>
            Mark Review in Progress
          </Button>
        </div>
      </div>
    </Modal>
  );
}
