import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function AuditReadinessGauge({
  readinessScore = 88,
  targetAudit = "FAA NASIP",
}: {
  readinessScore?: number;
  targetAudit?: string;
}) {
  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-brand-heading">Audit Readiness</h3>
            <p className="text-xs text-brand-muted">{targetAudit}</p>
          </div>
          <span className="text-xl font-bold text-brand-green">{readinessScore}%</span>
        </div>

        <Progress value={readinessScore} indicatorClassName="bg-brand-green" />

        <div className="grid grid-cols-3 gap-3 pt-1">
          {[
            { label: "Verified", value: "32 / 36" },
            { label: "Under Review", value: "3" },
            { label: "Days to Audit", value: "18" },
          ].map((m) => (
            <div key={m.label} className="text-center rounded-md bg-brand-surface p-2">
              <p className="text-xs font-semibold text-brand-heading">{m.value}</p>
              <p className="text-[10px] text-brand-muted mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
