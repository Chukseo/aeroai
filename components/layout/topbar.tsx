"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, ChevronRight, Search, Zap } from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-white/10 bg-black/72 px-6 shadow-[0_16px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="relative w-64 shrink-0 lg:w-80">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/35" />
        <input
          type="text"
          placeholder="Search manuals, regulations, policies..."
          className="h-8 w-full rounded-lg border border-white/10 bg-white/[0.045] pl-8 pr-3 text-xs text-white placeholder:text-white/32 shadow-sm transition-colors focus:border-lime-300/60 focus:bg-white/[0.07] focus:outline-none"
        />
        <kbd className="absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-white/10 bg-black px-1.5 py-0.5 font-mono text-[10px] text-white/35 shadow-sm sm:flex">
          Ctrl K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.045] px-3 py-1.5 shadow-sm lg:flex">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-lime-300" />
            <span className="text-[11px] font-medium text-white/50">Audit Readiness</span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <span className="tabular-nums text-[11px] font-bold text-lime-200">91%</span>
        </div>

        <Link
          href="/intelligence"
          className="group flex items-center gap-1.5 rounded-lg border border-rose-300/20 bg-rose-400/10 px-3 py-1.5 text-[11px] font-semibold text-rose-200 shadow-sm transition-all hover:border-rose-300/35 hover:bg-rose-400/15"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-300" />
          </span>
          <span>3 Regulatory Alerts</span>
          <ChevronRight className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.045] text-white/55 shadow-sm transition-colors hover:bg-white/10 hover:text-white">
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-lime-300" />
        </button>

        <Link href="/chat">
          <Button
            size="sm"
            className="gap-1.5 border-0 bg-white px-4 font-semibold text-black shadow-sm hover:bg-lime-200"
          >
            <Zap className="h-3 w-3" />
            Ask aeroAI
          </Button>
        </Link>
      </div>
    </header>
  );
}
