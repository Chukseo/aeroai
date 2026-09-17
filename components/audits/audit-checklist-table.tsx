"use client";

import React, { useState } from "react";
import { AuditChecklistItem } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

const INITIAL_CHECKLIST: AuditChecklistItem[] = [
  {
    id: "chk-1",
    code: "NASIP-145-01",
    question: "Are all calibrated test equipment and precision tools traceable to NIST or recognized standards?",
    regulation_ref: "14 CFR § 145.109(c)",
    document_ref: "GMM Ch 7.1 & 7.2",
    status: "needs_review",
    notes: "Retention period in GMM 7.2 specifies 12 months rather than required 24 months.",
  },
  {
    id: "chk-2",
    code: "NASIP-145-02",
    question: "Does the repair station maintain a current roster of supervisory and inspection personnel?",
    regulation_ref: "14 CFR § 145.161",
    document_ref: "Quality Manual Sec 2",
    status: "compliant",
    notes: "Roster verified current with Part 65 A&P license numbers.",
  },
  {
    id: "chk-3",
    code: "NASIP-145-03",
    question: "Are incoming materials and raw parts inspected for airworthiness documentation (8130-3 / Form 1)?",
    regulation_ref: "14 CFR § 145.211(c)(2)",
    document_ref: "QAM Section 9.2",
    status: "compliant",
    notes: "Receiving inspection protocol actively enforces SUP quarantine.",
  },
  {
    id: "chk-4",
    code: "NASIP-145-04",
    question: "Are maintenance records, work orders, and airworthiness releases retained for a minimum of 2 years?",
    regulation_ref: "14 CFR § 145.219(c)",
    document_ref: "GMM Ch 7.2",
    status: "non_compliant",
    notes: "GMM 7.2 retention policy violates § 145.219(c); CAPA in progress.",
  },
  {
    id: "chk-5",
    code: "NASIP-145-05",
    question: "Is there a formal non-punitive employee hazard reporting system established under SMS?",
    regulation_ref: "14 CFR § 5.21(a)(4)",
    document_ref: "SMS Manual Ch 3.1",
    status: "compliant",
    notes: "Signed safety policy by Accountable Executive posted and operational.",
  },
  {
    id: "chk-6",
    code: "NASIP-145-06",
    question: "Are out-of-tolerance calibrated tools subject to 30-day lookback aircraft impact reviews?",
    regulation_ref: "14 CFR § 145.109(d)",
    document_ref: "GMM Ch 7.3",
    status: "compliant",
    notes: "48-hour QA notification and engineering assessment verified.",
  },
];

export function AuditChecklistTable() {
  const [items, setItems] = useState<AuditChecklistItem[]>(INITIAL_CHECKLIST);

  const handleStatusChange = (
    id: string,
    newStatus: "compliant" | "non_compliant" | "needs_review" | "not_applicable"
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const compliantCount = items.filter((i) => i.status === "compliant").length;
  const applicableCount = items.filter((i) => i.status !== "not_applicable").length;
  const readinessScore = Math.round((compliantCount / (applicableCount || 1)) * 100);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-brand-muted">
              <span>FAA Surveillance Framework</span>
              <span>·</span>
              <span className="text-brand-heading font-medium">14 CFR Part 145 / NASIP</span>
            </div>
            <h2 className="text-base font-bold text-brand-heading">
              Surveillance Audit Checklist
            </h2>
            <p className="text-xs text-brand-muted max-w-xl">
              Verification criteria aligned with FAA Flight Standards 8900.1 guidance and ICAO safety oversight standards.
            </p>
          </div>

          <div className="w-full md:w-auto rounded-md border border-brand-border bg-brand-surface px-5 py-3 text-center shrink-0">
            <span className="text-[10px] text-brand-muted uppercase tracking-wider block">Readiness</span>
            <span className="text-2xl font-bold text-brand-green">{readinessScore}%</span>
            <span className="text-[10px] text-brand-muted block mt-0.5">{compliantCount} of {applicableCount} verified</span>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-brand-border bg-brand-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-brand-surface text-[11px] text-brand-muted border-b border-brand-border">
              <tr>
                <th className="py-3 px-4 font-medium">Item</th>
                <th className="py-3 px-4 font-medium">Requirement</th>
                <th className="py-3 px-4 font-medium">Regulation</th>
                <th className="py-3 px-4 font-medium">Manual Ref</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Inspector Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-brand-text">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-brand-hover/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-brand-amber text-[11px]">
                    {item.code}
                  </td>
                  <td className="py-3 px-4 font-medium text-brand-heading max-w-sm">
                    {item.question}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-brand-muted">
                    {item.regulation_ref}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-brand-gold">
                    {item.document_ref || "—"}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(
                          item.id,
                          e.target.value as AuditChecklistItem["status"]
                        )
                      }
                      className="h-7 rounded border border-brand-border bg-brand-surface px-2 text-xs text-brand-text focus:outline-none"
                    >
                      <option value="compliant">Compliant</option>
                      <option value="non_compliant">Non-Compliant</option>
                      <option value="needs_review">Needs Review</option>
                      <option value="not_applicable">N/A</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-brand-muted text-[11px] max-w-xs">
                    {item.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
