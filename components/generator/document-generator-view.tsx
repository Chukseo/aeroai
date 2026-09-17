"use client";

import React, { useState } from "react";
import {
  GeneratedDocument,
  DocGenCategory,
  DocGenType,
  USAviationSector,
} from "@/types";
import { generateProfessionalDocument } from "@/lib/generator/document-engine";
import { generateDocumentPDF, generateDocumentDOCX } from "@/lib/exporters/docgen-exporters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Download,
  Copy,
  Check,
  ShieldCheck,
} from "lucide-react";

const US_AVIATION_EXAMPLE_PROMPTS = [
  "Generate a 14 CFR Part 121 First Officer Employment Agreement in the United States with an annual base salary of $145,000, FAR Part 117 flight/duty rest protections, DOT Part 40 drug testing consent, and PRD pre-employment screening authorization.",
  "Generate an Aircraft Maintenance Technician (A&P) Employment Contract for an FAA Part 145 Repair Station in Texas with an hourly rate of $48.50/hr, mandatory tool calibration accountability, and Part 120 random drug pool consent.",
  "Draft a Part 5 SMS Just Culture & Non-Punitive Employee Hazard Reporting Policy for a US Part 135 Air Carrier.",
  "Create an FAA Part 145 Vendor Maintenance & Calibration Services Agreement with NIST traceability and 14 CFR § 145.219 record retention requirements.",
  "Draft an FAA Certificated Flight Dispatcher Employment Contract with Part 65 certification mandates and operational control clauses.",
];

export function DocumentGeneratorView() {
  const [promptInput, setPromptInput] = useState(US_AVIATION_EXAMPLE_PROMPTS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "clauses" | "compliance">("preview");
  const [copied, setCopied] = useState(false);

  // Form State for fine-tuning
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [category, setCategory] = useState<DocGenCategory>("employment_recruitment");
  const [docType, setDocType] = useState<DocGenType>("pilot_employment_contract");
  const [jurisdiction, setJurisdiction] = useState<USAviationSector>("FAA_PART_121");
  const [companyName, setCompanyName] = useState("AeroSky Global Air Operations & MRO, LLC");
  const [counterpartyName, setCounterpartyName] = useState("Captain Robert Vance");
  const [jobTitle, setJobTitle] = useState("First Officer (Boeing 737 / Airbus A320)");
  const [compensation, setCompensation] = useState("$145,000 per year");
  const [probation, setProbation] = useState("6 months");
  const [noticePeriod, setNoticePeriod] = useState("30 days");

  // Initial Generated Document (Pre-loaded with US Aviation Part 121 First Officer Agreement)
  const [doc, setDoc] = useState<GeneratedDocument>(() =>
    generateProfessionalDocument({
      prompt: US_AVIATION_EXAMPLE_PROMPTS[0],
      jurisdiction: "FAA_PART_121",
      company_name: "AeroSky Global Air Operations & MRO, LLC",
      counterparty_name: "Captain Robert Vance",
      job_title: "First Officer (Boeing 737 / Airbus A320)",
      compensation: "$145,000 per year",
      probation_period: "6 months",
      notice_period: "30 days",
    })
  );

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch("/api/generate-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptInput,
          category: showAdvanced ? category : undefined,
          doc_type: showAdvanced ? docType : undefined,
          jurisdiction: showAdvanced ? jurisdiction : undefined,
          company_name: companyName,
          counterparty_name: counterpartyName,
          job_title: showAdvanced ? jobTitle : undefined,
          compensation: showAdvanced ? compensation : undefined,
          probation_period: showAdvanced ? probation : undefined,
          notice_period: showAdvanced ? noticePeriod : undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.document) {
          setDoc(data.document);
        }
      } else {
        const fallback = generateProfessionalDocument({
          prompt: promptInput,
          jurisdiction: showAdvanced ? jurisdiction : undefined,
          company_name: companyName,
          counterparty_name: counterpartyName,
        });
        setDoc(fallback);
      }
    } catch {
      const fallback = generateProfessionalDocument({
        prompt: promptInput,
        jurisdiction: showAdvanced ? jurisdiction : undefined,
        company_name: companyName,
        counterparty_name: counterpartyName,
      });
      setDoc(fallback);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = () => {
    if (!doc) return;
    navigator.clipboard.writeText(doc.full_content_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    if (!doc) return;
    const pdf = generateDocumentPDF(doc);
    const fileName = `${doc.title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.pdf`;
    pdf.save(fileName);
  };

  const handleDownloadDOCX = async () => {
    if (!doc) return;
    const docxDoc = generateDocumentDOCX(doc);
    const { Packer } = await import("docx");
    const blob = await Packer.toBlob(docxDoc);
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${doc.title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.docx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Natural Language Prompt Box */}
      <Card className="border-brand-amber/30 bg-brand-surface">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-gold" />
              <h2 className="text-sm font-semibold text-brand-heading">
                US Aviation Document Synthesis Prompt
              </h2>
            </div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs text-brand-amber hover:underline font-medium"
            >
              {showAdvanced ? "Hide Fine-Tuning Fields" : "Show Fine-Tuning Fields"}
            </button>
          </div>

          <form onSubmit={handleGenerate} className="space-y-3">
            <div className="relative">
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Describe the US aviation document you want to generate (e.g. Part 121 pilot agreement, Part 145 mechanic contract, salary in USD, FAR Part 117 rest, DOT drug testing, PRD consent)..."
                rows={3}
                className="w-full rounded-md border border-brand-border bg-brand-card p-3 text-xs text-brand-text placeholder:text-brand-muted/60 focus:border-brand-amber/40 focus:outline-none leading-relaxed"
              />
            </div>

            {/* Quick Example Prompt Chips (US Aviation Standard) */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-brand-muted uppercase tracking-wider block font-semibold">
                US Aviation Quick-Start Prompts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {US_AVIATION_EXAMPLE_PROMPTS.map((ex, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setPromptInput(ex);
                    }}
                    className="truncate max-w-full rounded bg-brand-card border border-brand-border px-2.5 py-1 text-[11px] text-brand-muted hover:text-brand-gold hover:border-brand-amber/40 transition-colors text-left"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Form Fields (Optional) */}
            {showAdvanced && (
              <div className="pt-3 border-t border-brand-border/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-medium text-brand-muted mb-1">
                    Document Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DocGenCategory)}
                    className="h-8 w-full rounded border border-brand-border bg-brand-card px-2 text-xs text-brand-text focus:outline-none"
                  >
                    <option value="employment_recruitment">Flight Crew & Maintenance Employment</option>
                    <option value="employee_lifecycle">Personnel Lifecycle & Disciplinary</option>
                    <option value="policies_governance">FAA Operational & SMS Policies</option>
                    <option value="business_operations">Part 145 Vendor & Maintenance SOPs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-brand-muted mb-1">
                    Document Type
                  </label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as DocGenType)}
                    className="h-8 w-full rounded border border-brand-border bg-brand-card px-2 text-xs text-brand-text focus:outline-none"
                  >
                    <option value="pilot_employment_contract">Part 121 / 135 Pilot Agreement</option>
                    <option value="mechanic_ap_contract">Part 145 A&P Mechanic Contract</option>
                    <option value="dispatcher_contract">Part 65 Flight Dispatcher Agreement</option>
                    <option value="just_culture_policy">Part 5 SMS Just Culture Policy</option>
                    <option value="dot_drug_alcohol_policy">DOT 49 CFR Part 40 / Part 120 Drug Plan</option>
                    <option value="fatigue_risk_management_policy">FAR Part 117 Fatigue Policy</option>
                    <option value="vendor_agreement">Part 145 Calibration / Vendor Contract</option>
                    <option value="pip">Aviation Personnel PIP</option>
                    <option value="warning_letter">FAA Non-Compliance Warning Letter</option>
                    <option value="nda">Aerospace OEM Proprietary NDA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-brand-muted mb-1">
                    US Aviation Regulatory Sector
                  </label>
                  <select
                    value={jurisdiction}
                    onChange={(e) => setJurisdiction(e.target.value as USAviationSector)}
                    className="h-8 w-full rounded border border-brand-border bg-brand-card px-2 text-xs text-brand-text focus:outline-none"
                  >
                    <option value="FAA_PART_121">US Commercial Air Carrier (14 CFR Part 121)</option>
                    <option value="FAA_PART_135">US Commuter & On-Demand (14 CFR Part 135)</option>
                    <option value="FAA_PART_145">US Certificated Repair Station (14 CFR Part 145)</option>
                    <option value="FAA_PART_91">US Corporate Flight Operations (14 CFR Part 91)</option>
                    <option value="US_AEROSPACE">US Aerospace & Defense Manufacturing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-brand-muted mb-1">
                    Compensation (USD)
                  </label>
                  <Input
                    value={compensation}
                    onChange={(e) => setCompensation(e.target.value)}
                    placeholder="e.g. $145,000 / year or $48.50 / hr"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-brand-muted">
                Generates complete documents tailored to FAA 14 CFR, DOT Part 40, and US labor standards.
              </span>
              <Button type="submit" disabled={isGenerating} size="sm" className="gap-1.5 px-5">
                {isGenerating ? "Synthesizing Aviation Document..." : "Generate US Aviation Document"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Generated Document Workspace */}
      <div className="space-y-4">
        {/* Workspace Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-brand-border pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 md:pb-0 w-full md:w-auto">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors shrink-0 ${
                activeTab === "preview"
                  ? "bg-brand-amber/15 text-brand-gold border border-brand-amber/30"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              Document Preview
            </button>
            <button
              onClick={() => setActiveTab("clauses")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors shrink-0 ${
                activeTab === "clauses"
                  ? "bg-brand-amber/15 text-brand-gold border border-brand-amber/30"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              Statutory Clauses ({doc.clauses.length})
            </button>
            <button
              onClick={() => setActiveTab("compliance")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors shrink-0 ${
                activeTab === "compliance"
                  ? "bg-brand-amber/15 text-brand-gold border border-brand-amber/30"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              Regulatory Verification
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <Button
              onClick={handleCopyText}
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-initial gap-1.5 text-xs h-8"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-brand-green" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </Button>

            <Button
              onClick={handleDownloadDOCX}
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-initial gap-1.5 text-xs h-8 text-brand-gold border-brand-amber/30 hover:bg-brand-amber/10"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Word (.docx)</span>
            </Button>

            <Button
              onClick={handleDownloadPDF}
              size="sm"
              className="flex-1 sm:flex-initial gap-1.5 text-xs h-8"
            >
              <Download className="h-3.5 w-3.5" />
              <span>PDF</span>
            </Button>
          </div>
        </div>

        {/* TAB 1: Complete Formatted Document Preview */}
        {activeTab === "preview" && (
          <div className="rounded-lg border border-brand-border bg-brand-surface p-4 sm:p-6 md:p-8 space-y-6 text-xs text-brand-text shadow-xl max-w-4xl mx-auto">
            {/* Document Header */}
            <div className="text-center space-y-2 border-b border-brand-border pb-6">
              <h1 className="text-lg sm:text-xl font-bold text-brand-heading tracking-wide">
                {doc.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-brand-muted">
                <span>Aviation Sector: <strong className="text-brand-gold">{doc.jurisdiction_label}</strong></span>
                <span>·</span>
                <span>Governing Law: <strong className="text-brand-text">{doc.governing_law}</strong></span>
                <span>·</span>
                <span>Date: <strong className="font-mono text-brand-text">{doc.effective_date}</strong></span>
              </div>
            </div>

            {/* Document Clauses */}
            <div className="space-y-5">
              {doc.clauses.map((clause) => (
                <div key={clause.id} className="space-y-1.5">
                  <h3 className="text-xs font-bold text-brand-heading uppercase tracking-wider">
                    {clause.title}
                  </h3>
                  <p className="font-mono text-[11px] text-brand-text leading-relaxed whitespace-pre-wrap">
                    {clause.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Execution / Signature Section */}
            <div className="pt-8 border-t border-brand-border space-y-6">
              <h4 className="text-xs font-bold text-brand-heading uppercase tracking-wider">
                SIGNATURES & EXECUTION
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="space-y-3">
                  <p className="font-semibold text-brand-heading">
                    For: {doc.parties.employer_or_company}
                  </p>
                  <div className="h-10 border-b border-dashed border-brand-border/80 flex items-end text-brand-muted text-[10px]">
                    Authorized Officer Signature
                  </div>
                  <p className="text-[11px] text-brand-muted">Title: Director of Operations / Accountable Executive</p>
                  <p className="text-[11px] text-brand-muted font-mono">Date: {doc.effective_date}</p>
                </div>

                <div className="space-y-3">
                  <p className="font-semibold text-brand-heading">
                    Accepted by: {doc.parties.employee_or_counterparty}
                  </p>
                  <div className="h-10 border-b border-dashed border-brand-border/80 flex items-end text-brand-muted text-[10px]">
                    Signature
                  </div>
                  <p className="text-[11px] text-brand-muted">Designation: {doc.variables.job_title}</p>
                  <p className="text-[11px] text-brand-muted font-mono">Date: {doc.effective_date}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Clause Library View */}
        {activeTab === "clauses" && (
          <div className="space-y-3">
            {doc.clauses.map((c) => (
              <Card key={c.id} className="border-brand-border bg-brand-surface">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between border-b border-brand-border pb-2">
                    <span className="font-bold text-brand-heading text-xs">
                      {c.title}
                    </span>
                    <span className="rounded bg-brand-card px-2 py-0.5 text-[10px] text-brand-gold uppercase border border-brand-border font-mono">
                      {c.category}
                    </span>
                  </div>
                  <p className="font-mono text-brand-text text-[11px] leading-relaxed whitespace-pre-wrap">
                    {c.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* TAB 3: Compliance & Statutory Verification */}
        {activeTab === "compliance" && (
          <Card className="border-brand-border bg-brand-surface">
            <CardContent className="p-5 space-y-4 text-xs">
              <div className="flex items-center gap-2 text-brand-gold font-semibold text-sm">
                <ShieldCheck className="h-4 w-4" />
                <span>FAA & DOT Regulatory Verification — {doc.jurisdiction_label}</span>
              </div>

              <div className="rounded-md bg-brand-card p-4 border border-brand-border space-y-2">
                <span className="text-[11px] text-brand-muted font-semibold uppercase tracking-wider block">
                  Mandatory US Aviation Regulations Checked:
                </span>
                <ul className="space-y-1.5 text-brand-text list-disc list-inside">
                  {doc.compliance_notes.map((note, idx) => (
                    <li key={idx} className="leading-relaxed text-[11px]">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-md bg-brand-amber/10 p-3.5 border border-brand-amber/20 text-brand-text text-[11px]">
                <strong className="text-brand-gold block mb-0.5">FAA Flight Standards Alignment:</strong>
                All generated aviation agreements and operational policies are pre-aligned with FAA Flight Standards Information System (FSIMS / Order 8900.1), National Transportation Safety Board (NTSB) standards, and Department of Transportation (DOT) workplace regulations.
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
