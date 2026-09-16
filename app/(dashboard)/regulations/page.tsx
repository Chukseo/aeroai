"use client";

import React, { useState } from "react";
import { SEEDED_REGULATIONS } from "@/lib/aviation/seeded-regulations";
import { Card } from "@/components/ui/card";

export default function RegulationsPage() {
  const [selectedAuthority, setSelectedAuthority] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRegId, setExpandedRegId] = useState<string | null>("reg-faa-145-109");

  const filtered = SEEDED_REGULATIONS.filter((reg) => {
    const matchesAuth = selectedAuthority === "ALL" || reg.authority === selectedAuthority;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      reg.code.toLowerCase().includes(q) ||
      reg.title.toLowerCase().includes(q) ||
      reg.summary.toLowerCase().includes(q) ||
      reg.tags.some((t) => t.toLowerCase().includes(q));
    return matchesAuth && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-brand-heading">
            Regulatory Knowledge Base
          </h1>
          <p className="text-xs text-brand-muted">
            Civil aviation standards across FAA 14 CFR, EASA Easy Access Rules, and ICAO Annexes
          </p>
        </div>

        <div className="flex items-center rounded-md border border-brand-border bg-brand-surface p-1 text-xs">
          {["ALL", "FAA", "EASA", "ICAO"].map((auth) => (
            <button
              key={auth}
              onClick={() => setSelectedAuthority(auth)}
              className={`rounded px-3 py-1 font-medium transition-colors ${
                selectedAuthority === auth
                  ? "bg-brand-card text-brand-gold font-semibold"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              {auth === "ALL" ? "All" : auth}
            </button>
          ))}
        </div>
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search regulations (e.g. '145.109', 'calibration', 'SMS')..."
        className="h-8 w-full rounded-md border border-brand-border bg-brand-surface px-3 text-xs text-brand-text placeholder:text-brand-muted/60 focus:border-brand-amber/40 focus:outline-none"
      />

      <div className="space-y-3">
        {filtered.map((reg) => {
          const isExpanded = expandedRegId === reg.id;
          return (
            <Card
              key={reg.id}
              className="overflow-hidden cursor-pointer hover:border-brand-border/80 transition-colors"
            >
              <div
                onClick={() => setExpandedRegId(isExpanded ? null : reg.id)}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-brand-amber font-mono">{reg.authority}</span>
                    <span className="font-mono font-medium text-brand-heading">{reg.code}</span>
                    <span className="text-brand-muted">· {reg.category}</span>
                  </div>
                  <h3 className="font-medium text-brand-heading text-xs">
                    {reg.title}
                  </h3>
                  <p className="text-xs text-brand-muted max-w-2xl">
                    {reg.summary}
                  </p>
                </div>

                <span className="text-xs text-brand-muted self-end sm:self-center shrink-0">
                  {isExpanded ? "Collapse" : "Expand"}
                </span>
              </div>

              {isExpanded && (
                <div className="p-4 pt-0 border-t border-brand-border bg-brand-surface text-xs space-y-2">
                  <span className="text-[10px] text-brand-muted font-medium uppercase tracking-wider block pt-2">
                    Official Statutory Text
                  </span>
                  <div className="rounded bg-brand-card p-3 border border-brand-border font-mono text-brand-text text-[11px] leading-relaxed whitespace-pre-wrap">
                    {reg.content}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
