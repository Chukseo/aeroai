import React from "react";
import { RegulatoryIntelligenceFeed } from "@/components/intelligence/regulatory-intelligence-feed";
import { getAllImpactAssessments } from "@/lib/aviation/regulatory-intelligence";

export const metadata = {
  title: "Regulatory Intelligence Feed - AeroCompliance AI",
  description: "Continuous monitoring of FAA, EASA, and ICAO regulatory updates, cross-mapped to internal manuals with ready-to-apply draft fixes.",
};

export default function IntelligencePage() {
  const assessments = getAllImpactAssessments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-brand-heading">
          Continuous Regulatory Intelligence
        </h1>
        <p className="text-xs text-brand-muted">
          Active surveillance across FAA, EASA, ICAO, and DOT rulemakings. Automatically identifies affected internal procedures and produces draft procedural updates.
        </p>
      </div>

      <RegulatoryIntelligenceFeed initialAssessments={assessments} />
    </div>
  );
}
