"use client";

import React from "react";
import Link from "next/link";
import { AuditReadinessGauge } from "@/components/dashboard/audit-readiness-gauge";
import { ComplianceScoreCard } from "@/components/dashboard/compliance-score-card";
import { RegulatoryBulletin } from "@/components/dashboard/regulatory-bulletin";
import { RiskHeatMap } from "@/components/dashboard/risk-heatmap";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="framer-card flex flex-col justify-between gap-4 rounded-lg p-4 sm:p-5 md:flex-row md:items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-coral" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
              Regulatory Intelligence Alert
            </span>
            <span className="rounded border border-brand-coral/25 bg-brand-coral/15 px-2 py-0.5 text-[10px] font-semibold text-brand-coral">
              1 Critical - 2 High
            </span>
          </div>
          <h2 className="text-sm font-bold text-brand-heading sm:text-base">
            New FAA & EASA rule changes impact 3 company procedures and contracts
          </h2>
          <p className="text-xs text-brand-muted">
            FAR Part 117, 14 CFR Section 145.163, and DOT Oral Fluid Testing require immediate manual updates.
          </p>
        </div>

        <Link href="/intelligence" className="shrink-0">
          <Button size="sm" className="w-full gap-1.5 sm:w-auto">
            <span>Review Impact & Draft Fixes</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      <div className="space-y-1">
        <h1 className="text-xl font-bold text-brand-heading">Compliance Overview</h1>
        <p className="text-sm text-brand-muted">
          FAA 14 CFR - EASA - ICAO - DOT: continuous monitoring across operations manuals, HR policies, and employee contracts
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Link href="/intelligence">
            <Button size="sm">Intelligence Feed</Button>
          </Link>
          <Link href="/generator">
            <Button variant="outline" size="sm">
              Doc Generator
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="outline" size="sm">
              Ask aeroAI
            </Button>
          </Link>
          <Link href="/compliance">
            <Button variant="outline" size="sm">
              Run Gap Analysis
            </Button>
          </Link>
          <Link href="/documents">
            <Button variant="ghost" size="sm">
              Upload Document
            </Button>
          </Link>
        </div>
      </div>

      <ComplianceScoreCard score={92.4} totalDocs={5} openGaps={4} highRiskCount={1} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AuditReadinessGauge readinessScore={88} targetAudit="FAA NASIP" />
        <RiskHeatMap />
      </div>

      <RegulatoryBulletin />
    </div>
  );
}
