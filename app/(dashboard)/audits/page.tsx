import React from "react";
import { AuditChecklistTable } from "@/components/audits/audit-checklist-table";

export default function AuditsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          Audit Readiness & Surveillance Module
        </h1>
        <p className="text-xs text-slate-400">
          Prepare for FAA NASIP, EASA ACAM, and IOSA audits with automated checklist verification and risk tracking
        </p>
      </div>

      <AuditChecklistTable />
    </div>
  );
}
