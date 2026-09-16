"use client";

import React from "react";
import Link from "next/link";
import { ComplianceScoreCard } from "@/components/dashboard/compliance-score-card";
import { AuditReadinessGauge } from "@/components/dashboard/audit-readiness-gauge";
import { RiskHeatMap } from "@/components/dashboard/risk-heatmap";
import { RegulatoryBulletin } from "@/components/dashboard/regulatory-bulletin";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Regulatory Intelligence Alert Banner */}
      <div className="rounded-lg border border-brand-amber/30 bg-brand-surface p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-coral animate-pulse" />
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
              Regulatory Intelligence Alert
            </span>
            <span className="rounded bg-brand-coral/15 px-2 py-0.5 text-[10px] text-brand-coral border border-brand-coral/25 font-semibold">
              1 Critical · 2 High
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-brand-heading">
            New FAA & EASA rule changes impact 3 company procedures and contracts
          </h2>
          <p className="text-xs text-brand-muted">
            FAR Part 117 (Crew Rest & Sleep Buffer), 14 CFR § 145.163 (36-Month Training Retention), and DOT Oral Fluid Testing require immediate manual updates.
          </p>
        </div>

        <Link href="/intelligence" className="shrink-0">
          <Button size="sm" className="gap-1.5 w-full sm:w-auto">
            <span>Review Impact & Draft Fixes</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      {/* Main Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-brand-heading">Compliance Overview</h1>
        <p className="text-sm text-brand-muted">
          FAA 14 CFR · EASA · ICAO · DOT — continuous monitoring across operations manuals, HR policies, and employee contracts
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Link href="/intelligence"><Button size="sm">Intelligence Feed</Button></Link>
          <Link href="/generator"><Button variant="outline" size="sm" className="border-brand-amber/30 text-brand-gold hover:bg-brand-amber/10">Doc Generator</Button></Link>
          <Link href="/chat"><Button variant="outline" size="sm">Ask aeroAI</Button></Link>
          <Link href="/compliance"><Button variant="outline" size="sm">Run Gap Analysis</Button></Link>
          <Link href="/documents"><Button variant="ghost" size="sm">Upload Document</Button></Link>
        </div>
      </div>

      <ComplianceScoreCard score={92.4} totalDocs={5} openGaps={4} highRiskCount={1} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AuditReadinessGauge readinessScore={88} targetAudit="FAA NASIP" />
        <RiskHeatMap />
      </div>

      <RegulatoryBulletin />
    </div>
  );
}
