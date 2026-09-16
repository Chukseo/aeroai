"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-brand-border bg-brand-bg/80 px-6 backdrop-blur-sm">
      <div className="relative w-72">
        <input
          type="text"
          placeholder="Search manuals, regulations, HR policies..."
          className="h-8 w-full rounded-md border border-brand-border bg-brand-surface px-3 text-xs text-brand-text placeholder:text-brand-muted/60 focus:border-brand-amber/40 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Intelligence Alert Pill */}
        <Link
          href="/intelligence"
          className="flex items-center gap-1.5 rounded-full bg-brand-surface border border-brand-coral/30 px-3 py-1 text-xs hover:border-brand-coral/50 transition-colors"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-coral animate-pulse" />
          <span className="text-brand-coral font-medium">3 Regulatory Updates</span>
        </Link>

        <span className="text-xs text-brand-muted hidden sm:inline">
          Readiness: <span className="font-semibold text-brand-green">91%</span>
        </span>

        <Link href="/chat">
          <Button size="sm">Ask aeroAI</Button>
        </Link>
      </div>
    </header>
  );
}
