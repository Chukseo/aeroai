import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#1c1917] flex framer-ambient-glow framer-grid-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-60 min-h-screen">
        <Topbar />
        <main className="flex-1 p-6 md:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
