"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Radio,
  FileCode2,
  Sparkles,
  Files,
  Scale,
  ClipboardCheck,
  BookOpenCheck,
  BarChart3,
  SlidersHorizontal,
  Plane,
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
    items: [
      { name: "Settings", href: "/settings", icon: SlidersHorizontal },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-stone-200 bg-white shadow-sm">
      {/* Brand */}
      <div className="flex h-16 items-center px-5 border-b border-stone-200">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_2px_8px_rgba(217,119,6,0.3)] transition-transform group-hover:scale-105">
            <Plane className="h-4 w-4 text-white transform -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-tight text-stone-900">
                aero<span className="text-amber-600">AI</span>
              </span>
              <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700 border border-amber-200">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-stone-400 font-medium tracking-wide">
              FAA Compliance Suite
            </p>
          </div>
        </Link>
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.group} className="space-y-0.5">
            <p className="px-3 pb-1 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
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
                      ? "bg-amber-50 text-amber-700 border border-amber-200/80 shadow-sm"
                      : "text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        active ? "text-amber-600" : "text-stone-400 group-hover:text-stone-600"
                      )}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[9px] font-semibold border",
                        item.badge.includes("New")
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-red-50 text-red-600 border-red-200"
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

      {/* Status */}
      <div className="px-3 pb-2">
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-semibold text-stone-700">FAA 14 CFR Live</span>
            </div>
            <span className="text-[9px] font-mono text-stone-400">Groq LPU</span>
          </div>
          <p className="mt-1 text-[9px] text-stone-400">Auto-synced with Federal Register</p>
        </div>
      </div>

      {/* User Footer */}
      <div className="border-t border-stone-200 p-3">
        <div className="flex items-center gap-2.5 rounded-lg p-1.5 transition-colors hover:bg-stone-100">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 border border-amber-200 text-xs font-bold text-amber-700">
            JM
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-stone-800">J. Miller</p>
            <p className="truncate text-[10px] text-stone-400">SkyWings Airlines · Part 121</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
