import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { SidebarProvider } from "@/components/layout/sidebar-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-aero-ink text-brand-text flex framer-ambient-glow framer-grid-bg overflow-x-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col pl-0 lg:pl-60 min-h-screen min-w-0 w-full">
          <Topbar />
          <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto min-w-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
