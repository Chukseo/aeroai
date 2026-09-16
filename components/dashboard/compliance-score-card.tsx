import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ComplianceScoreCardProps {
  score?: number;
  totalDocs?: number;
  openGaps?: number;
  highRiskCount?: number;
}

export function ComplianceScoreCard({
  score = 92.4,
  totalDocs = 48,
  openGaps = 4,
  highRiskCount = 1,
}: ComplianceScoreCardProps) {
  const items = [
    { label: "Compliance Score", value: `${score.toFixed(1)}%`, sub: "+2.8% since last cycle", accent: true },
    { label: "Indexed Manuals", value: String(totalDocs), sub: "All vectorized" },
    { label: "Open Gaps", value: String(openGaps), sub: "2 missing · 2 weak", warn: true },
    { label: "High Risk", value: String(highRiskCount), sub: "Record retention", danger: true },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card
          key={item.label}
          className={item.accent ? "border-brand-amber/20" : item.danger ? "border-brand-coral/20" : ""}
        >
          <CardContent className="p-5">
            <p className="text-xs text-brand-muted mb-1">{item.label}</p>
            <p className={`text-2xl font-bold tracking-tight ${
              item.accent ? "text-brand-gold" : item.danger ? "text-brand-coral" : item.warn ? "text-yellow-500" : "text-brand-heading"
            }`}>
              {item.value}
            </p>
            <p className="text-[11px] text-brand-muted mt-1">{item.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
