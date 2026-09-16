"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Bell, Zap, ChevronRight } from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-stone-200 bg-white/90 backdrop-blur-md px-6 gap-4 shadow-sm">
      {/* Search */}
      <div className="relative w-64 lg:w-80 shrink-0">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search manuals, regulations, policies…"
          className="h-8 w-full rounded-lg border border-stone-200 bg-stone-50 pl-8 pr-3 text-xs text-stone-700 placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:outline-none transition-colors shadow-sm"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 rounded border border-stone-200 bg-white px-1.5 py-0.5 text-[10px] text-stone-400 font-mono shadow-sm">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Audit Readiness */}
        <div className="hidden lg:flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 shadow-sm">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-stone-500 font-medium">Audit Readiness</span>
          </div>
          <div className="h-3 w-px bg-stone-200" />
          <span className="text-[11px] font-bold text-emerald-600 tabular-nums">91%</span>
        </div>

        {/* Alert Pill */}
        <Link
          href="/intelligence"
          className="group flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-semibold text-red-600 hover:border-red-300 hover:bg-red-100 transition-all shadow-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
          </span>
          <span>3 Regulatory Alerts</span>
          <ChevronRight className="h-3 w-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {/* Bell */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-500 hover:bg-stone-50 hover:text-stone-800 transition-colors shadow-sm">
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
        </button>

        {/* Ask aeroAI */}
        <Link href="/chat">
          <Button
            size="sm"
            className="gap-1.5 bg-amber-600 text-white font-semibold hover:bg-amber-700 shadow-sm border-0 px-4"
          >
            <Zap className="h-3 w-3" />
            Ask aeroAI
          </Button>
        </Link>
      </div>
    </header>
  );
}
