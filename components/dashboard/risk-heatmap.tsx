import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RISKS = [
  { area: "MRO Tooling", detail: "12-month calibration record retention vs 24-month rule", severity: "high" as const, ref: "§ 145.219(c)", status: "In Remediation" },
  { area: "Quality Assurance", detail: "Desktop audit interval lacks mandatory 24-month cap", severity: "medium" as const, ref: "§ 145.211(c)(1)", status: "Open" },
  { area: "SMS", detail: "High-risk mitigation requires Accountable Exec sign-off", severity: "low" as const, ref: "§ 5.21(a)(5)", status: "Compliant" },
  { area: "Flight Operations", detail: "MEL Category C 10-day extension procedure verified", severity: "low" as const, ref: "§ 121.628", status: "Compliant" },
];

const dotColor = { critical: "bg-brand-coral", high: "bg-yellow-500", medium: "bg-brand-amber", low: "bg-brand-green" };

export function RiskHeatMap() {
  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-brand-heading">Risk Overview</h3>
          <div className="flex gap-3 text-[10px] text-brand-muted">
            {(["high", "medium", "low"] as const).map((s) => (
              <span key={s} className="flex items-center gap-1 capitalize">
                <span className={`h-1.5 w-1.5 rounded-full ${dotColor[s]}`} /> {s}
              </span>
            ))}
          </div>
        </div>

        {RISKS.map((r, i) => (
          <div key={i} className="flex items-center justify-between gap-3 rounded-md bg-brand-surface p-3">
            <div className="flex items-start gap-2.5 min-w-0">
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotColor[r.severity]}`} />
              <div className="min-w-0">
                <p className="text-xs font-medium text-brand-heading">{r.area}</p>
                <p className="text-[11px] text-brand-muted truncate">{r.detail}</p>
                <span className="text-[11px] text-brand-amber font-mono">{r.ref}</span>
              </div>
            </div>
            <span className="shrink-0 rounded bg-brand-card px-2 py-0.5 text-[10px] text-brand-muted border border-brand-border">
              {r.status}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
