"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Bell, Zap, ChevronRight } from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/[0.06] bg-[#090b10]/80 backdrop-blur-xl px-6 gap-4">
      {/* Search */}
      <div className="relative w-64 lg:w-80 shrink-0">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Search manuals, regulations, policies…"
          className="h-8 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] pl-8 pr-3 text-xs text-zinc-300 placeholder:text-zinc-600 focus:border-amber-500/30 focus:bg-white/[0.04] focus:outline-none transition-colors"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 rounded border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-zinc-600 font-mono">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Compliance Readiness */}
        <div className="hidden lg:flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-zinc-400 font-medium">Audit Readiness</span>
          </div>
          <div className="h-3 w-px bg-white/[0.1]" />
          <span className="text-[11px] font-bold text-emerald-400 tabular-nums">91%</span>
        </div>

        {/* Regulatory Alert Pill */}
        <Link
          href="/intelligence"
          className="group flex items-center gap-1.5 rounded-lg border border-red-500/25 bg-red-500/[0.08] px-3 py-1.5 text-[11px] font-semibold text-red-400 hover:border-red-500/40 hover:bg-red-500/[0.12] transition-all"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
          </span>
          <span>3 Regulatory Alerts</span>
          <ChevronRight className="h-3 w-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {/* Bell */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200 transition-colors">
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
        </button>

        {/* Ask aeroAI CTA */}
        <Link href="/chat">
          <Button
            size="sm"
            className="gap-1.5 bg-gradient-to-r from-amber-500 to-amber-400 text-black font-semibold hover:from-amber-400 hover:to-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.25)] hover:shadow-[0_0_24px_rgba(245,158,11,0.35)] transition-all border-0 px-4"
          >
            <Zap className="h-3 w-3" />
            Ask aeroAI
          </Button>
        </Link>
      </div>
    </header>
  );
}
