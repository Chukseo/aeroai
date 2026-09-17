"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SAMPLE_INTERNAL_MANUALS } from "@/lib/aviation/sample-manuals";
import { SEEDED_REGULATIONS } from "@/lib/aviation/seeded-regulations";

interface GapAnalysisSelectorProps {
  onRunAnalysis: (manualId: string, regulationCode: string) => Promise<void>;
  isAnalyzing: boolean;
}

export function GapAnalysisSelector({
  onRunAnalysis,
  isAnalyzing,
}: GapAnalysisSelectorProps) {
  const [selectedDocId, setSelectedDocId] = useState("doc-gmm-ch7");
  const [selectedRegCode, setSelectedRegCode] = useState("14 CFR § 145.109");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRunAnalysis(selectedDocId, selectedRegCode);
  };

  return (
    <Card>
      <CardContent className="p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-brand-heading">
              Select Manual & Target Regulation
            </h3>
            <span className="text-xs text-brand-muted">Automated 5-Step Comparison</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 rounded-md border border-brand-border bg-brand-surface p-3.5">
              <label className="text-xs font-medium text-brand-muted block">
                Company Manual / Procedure
              </label>
              <select
                value={selectedDocId}
                onChange={(e) => setSelectedDocId(e.target.value)}
                className="w-full rounded border border-brand-border bg-brand-card p-2 text-xs text-brand-text focus:border-brand-amber/40 focus:outline-none"
              >
                {SAMPLE_INTERNAL_MANUALS.map((m) => (
                  <option key={m.document.id} value={m.document.id}>
                    {m.document.title} ({m.document.revision_number})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 rounded-md border border-brand-border bg-brand-surface p-3.5">
              <label className="text-xs font-medium text-brand-muted block">
                Civil Aviation Regulation
              </label>
              <select
                value={selectedRegCode}
                onChange={(e) => setSelectedRegCode(e.target.value)}
                className="w-full rounded border border-brand-border bg-brand-card p-2 text-xs text-brand-text focus:border-brand-amber/40 focus:outline-none"
              >
                {SEEDED_REGULATIONS.map((r) => (
                  <option key={r.id} value={r.code}>
                    {r.authority} · {r.code} - {r.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-brand-border">
            <p className="text-xs text-brand-muted">
              Identifies policy conflicts, missing mandatory controls, and weak phrasing.
            </p>
            <Button type="submit" disabled={isAnalyzing} size="sm" className="w-full sm:w-auto">
              {isAnalyzing ? "Comparing Sources..." : "Run Gap Analysis"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
