"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Intelligence Feed", href: "/intelligence", badge: "3 New" },
  { name: "Doc Generator", href: "/generator", badge: "New" },
  { name: "aeroAI", href: "/chat" },
  { name: "Documents", href: "/documents" },
  { name: "Gap Analysis", href: "/compliance" },
  { name: "Audits", href: "/audits" },
  { name: "Regulations", href: "/regulations" },
  { name: "Reports", href: "/reports" },
  { name: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-brand-border bg-brand-bg">
      {/* Brand */}
      <div className="flex h-14 items-center px-5 border-b border-brand-border">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-md bg-brand-amber flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <span className="text-sm font-semibold text-brand-heading tracking-tight">
            AeroCompliance
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
                active
                  ? "bg-brand-amber/10 text-brand-gold font-semibold"
                  : "text-brand-muted hover:bg-brand-card hover:text-brand-text"
              )}
            >
              <span>{item.name}</span>
              {item.badge && (
                <span className={`rounded px-1.5 py-0.2 text-[10px] font-mono border ${
                  item.badge === "New" 
                    ? "bg-brand-amber/15 text-brand-gold border-brand-amber/25" 
                    : "bg-brand-coral/15 text-brand-coral border-brand-coral/20"
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-brand-border p-4">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-full bg-brand-card border border-brand-border text-xs font-semibold text-brand-amber flex items-center justify-center">
            JM
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-brand-text">J. Miller</p>
            <p className="truncate text-[11px] text-brand-muted">Compliance Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
