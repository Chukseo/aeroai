import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const BULLETINS = [
  { authority: "FAA", code: "AD 2024-18-04", title: "CFM LEAP-1B HPT Stage 1 Disk Inspection", impact: "Mandatory", date: "2024-03-15" },
  { authority: "EASA", code: "NPA 2024-03", title: "Modernisation of Continuing Airworthiness (Part-CAMO)", impact: "Policy Revision", date: "2024-04-01" },
  { authority: "FAA", code: "AC 120-78B", title: "Electronic Signatures and Electronic Recordkeeping", impact: "Advisory", date: "2024-01-20" },
  { authority: "ICAO", code: "Doc 9859 Ed 5", title: "Safety Management Manual (SMM) 5th Edition Guidelines", impact: "Policy Revision", date: "2024-02-10" },
];

const authorityColor: Record<string, string> = {
  FAA: "text-blue-400",
  EASA: "text-brand-amber",
  ICAO: "text-brand-teal",
};

export function RegulatoryBulletin() {
  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <h3 className="text-sm font-semibold text-brand-heading">Regulatory Updates</h3>

        {BULLETINS.map((b, i) => (
          <div key={i} className="flex items-start justify-between gap-3 rounded-md bg-brand-surface p-3">
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2 text-xs">
                <span className={`font-semibold ${authorityColor[b.authority] || "text-brand-text"}`}>{b.authority}</span>
                <span className="font-mono font-medium text-brand-heading">{b.code}</span>
                <span className="text-brand-muted">· {b.date}</span>
              </div>
              <p className="text-[11px] text-brand-muted truncate">{b.title}</p>
            </div>
            <span className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-medium ${
              b.impact === "Mandatory" ? "bg-brand-coral/10 text-brand-coral border border-brand-coral/20" : "bg-brand-card text-brand-muted border border-brand-border"
            }`}>
              {b.impact}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
