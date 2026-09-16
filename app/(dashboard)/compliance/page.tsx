"use client";

import React, { useState } from "react";
import { GapAnalysisSelector } from "@/components/gap-analysis/gap-analysis-selector";
import { ComparisonMatrix } from "@/components/gap-analysis/comparison-matrix";
import { ComplianceReview } from "@/types";

export default function ComplianceGapAnalysisPage() {
  const [review, setReview] = useState<ComplianceReview | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRunAnalysis = async (manualId: string, regCode: string) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/gap-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: manualId, regulationCode: regCode }),
      });

      if (!res.ok) throw new Error("Gap analysis failed");
      const data = await res.json();
      setReview(data.review);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Run default analysis on first mount if empty
  React.useEffect(() => {
    handleRunAnalysis("doc-gmm-ch7", "14 CFR § 145.109");
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          Compliance Gap Analysis Engine
        </h1>
        <p className="text-xs text-slate-400">
          Compare internal manuals against international civil aviation regulations to detect policy conflicts, missing controls, and audit risks
        </p>
      </div>

      <GapAnalysisSelector
        onRunAnalysis={handleRunAnalysis}
        isAnalyzing={isAnalyzing}
      />

      <ComparisonMatrix review={review} />
    </div>
  );
}
