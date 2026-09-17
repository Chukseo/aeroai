"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, ChevronRight, Menu, Plane, Search, Zap } from "lucide-react";
import { useSidebar } from "./sidebar-context";

export function Topbar() {
  const { toggle } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-2.5 border-b border-white/10 bg-black/72 px-3 sm:px-6 shadow-[0_16px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      {/* Left side: Mobile hamburger & Logo (on mobile), Search on desktop */}
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Hamburger Button (Mobile only) */}
        <button
          onClick={toggle}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.045] text-white/75 shadow-sm transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Mobile Brand Title */}
        <Link href="/dashboard" className="flex items-center gap-1.5 shrink-0 lg:hidden">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-black">
            <Plane className="h-3.5 w-3.5 -rotate-45" />
          </div>
          <span className="text-xs font-bold tracking-[0.14em] text-white hidden xs:inline">
            aero<span className="text-lime-200">AI</span>
          </span>
        </Link>

        {/* Search Input */}
        <div className="relative hidden sm:block w-48 md:w-64 lg:w-80 shrink-0">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/35" />
          <input
            type="text"
            placeholder="Search manuals, regulations..."
            className="h-8 w-full rounded-lg border border-white/10 bg-white/[0.045] pl-8 pr-3 text-xs text-white placeholder:text-white/32 shadow-sm transition-colors focus:border-lime-300/60 focus:bg-white/[0.07] focus:outline-none"
          />
          <kbd className="absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-white/10 bg-black px-1.5 py-0.5 font-mono text-[10px] text-white/35 shadow-sm lg:flex">
            Ctrl K
          </kbd>
        </div>
      </div>

      {/* Right side: Indicators, Alerts, Notifications, Ask aeroAI */}
      <div className="ml-auto flex items-center gap-1.5 sm:gap-3 shrink-0">
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
          className="group flex items-center gap-1.5 rounded-lg border border-rose-300/20 bg-rose-400/10 px-2 sm:px-3 py-1.5 text-[11px] font-semibold text-rose-200 shadow-sm transition-all hover:border-rose-300/35 hover:bg-rose-400/15"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-300" />
          </span>
          <span className="hidden sm:inline">3 Regulatory Alerts</span>
          <span className="sm:hidden">3 Alerts</span>
          <ChevronRight className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 hidden sm:inline" />
        </Link>

        <button
          className="relative hidden xs:flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.045] text-white/55 shadow-sm transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Notifications"
        >
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-lime-300" />
        </button>

        <Link href="/chat">
          <Button
            size="sm"
            className="gap-1 sm:gap-1.5 border-0 bg-white px-2.5 sm:px-4 text-xs font-semibold text-black shadow-sm hover:bg-lime-200"
          >
            <Zap className="h-3 w-3" />
            <span className="hidden sm:inline">Ask aeroAI</span>
            <span className="sm:hidden">Ask AI</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
