"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpenCheck,
  ClipboardCheck,
  FileCode2,
  Files,
  LayoutDashboard,
  Plane,
  Radio,
  Scale,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

interface NavGroup {
  group: string;
  items: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

const navGroups: NavGroup[] = [
  {
    group: "CORE INTELLIGENCE",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Intelligence Feed", href: "/intelligence", icon: Radio, badge: "3 New" },
      { name: "Doc Generator", href: "/generator", icon: FileCode2, badge: "New" },
      { name: "aeroAI Assistant", href: "/chat", icon: Sparkles },
    ],
  },
  {
    group: "COMPLIANCE & AUDIT",
    items: [
      { name: "Documents", href: "/documents", icon: Files },
      { name: "Gap Analysis", href: "/compliance", icon: Scale },
      { name: "Audit Readiness", href: "/audits", icon: ClipboardCheck },
      { name: "Regulations", href: "/regulations", icon: BookOpenCheck },
      { name: "Reports & Logs", href: "/reports", icon: BarChart3 },
    ],
  },
  {
    group: "WORKSPACE",
    items: [{ name: "Settings", href: "/settings", icon: SlidersHorizontal }],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-white/10 bg-black/82 shadow-[20px_0_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="flex h-16 items-center border-b border-white/10 px-5">
        <Link href="/dashboard" className="group flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black shadow-[0_0_28px_rgba(255,255,255,0.15)] transition-transform group-hover:scale-105">
            <Plane className="h-4 w-4 -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-[0.14em] text-white">
                aero<span className="text-lime-200">AI</span>
              </span>
              <span className="rounded-full bg-lime-300 px-1.5 py-0.5 text-[9px] font-bold text-black">
                PRO
              </span>
            </div>
            <p className="text-[10px] font-medium tracking-wide text-white/40">
              Aviation AI Suite
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.group} className="space-y-0.5">
            <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-white/30">
              {group.group}
            </p>
            {group.items.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all duration-150",
                    active
                      ? "border border-white bg-white text-black shadow-[0_10px_28px_rgba(255,255,255,0.08)]"
                      : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        active ? "text-black" : "text-white/34 group-hover:text-lime-200"
                      )}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[9px] font-semibold",
                        item.badge.includes("New")
                          ? "border-lime-300 bg-lime-300 text-black"
                          : "border-rose-300/20 bg-rose-400/12 text-rose-200"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="px-3 pb-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-300" />
              </span>
              <span className="text-[10px] font-semibold text-white/75">FAA 14 CFR Live</span>
            </div>
            <span className="font-mono text-[9px] text-white/35">AI RAG</span>
          </div>
          <p className="mt-1 text-[9px] text-white/35">Auto-synced with Federal Register</p>
        </div>
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-2.5 rounded-lg p-1.5 transition-colors hover:bg-white/[0.06]">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
            JM
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">J. Miller</p>
            <p className="truncate text-[10px] text-white/40">SkyWings Airlines - Part 121</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
