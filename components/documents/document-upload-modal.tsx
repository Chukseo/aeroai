"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DocumentType } from "@/types";

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newDoc: any) => void;
}

export function DocumentUploadModal({
  isOpen,
  onClose,
  onUploadSuccess,
}: DocumentUploadModalProps) {
  const [title, setTitle] = useState("");
  const [docType, setDocType] = useState<DocumentType>("GMM");
  const [revision, setRevision] = useState("Rev 1.0");
  const [regulatorySource, setRegulatorySource] = useState("14 CFR Part 145");
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      if (!title) setTitle(selected.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !title) return;

    setIsProcessing(true);
    setStep("Extracting manual/contract sections...");
    await new Promise((r) => setTimeout(r, 400));
    setStep("Generating 1,536-dim vector embeddings...");
    await new Promise((r) => setTimeout(r, 400));
    setStep("Storing chunks in pgvector...");
    await new Promise((r) => setTimeout(r, 400));

    const newDoc = {
      id: `doc-${Date.now()}`,
      org_id: "org-skywings-aero",
      title: title || (file ? file.name : "Company Document"),
      document_type: docType,
      file_path: file ? `/manuals/${file.name}` : "/manuals/uploaded.pdf",
      file_size: file ? file.size : 1420000,
      mime_type: file ? file.type : "application/pdf",
      revision_number: revision,
      effective_date: new Date().toISOString().split("T")[0],
      status: "indexed",
      chunks_count: 4,
      regulatory_source: regulatorySource,
      created_at: new Date().toISOString(),
    };

    onUploadSuccess(newDoc);
    onClose();
    setTitle("");
    setFile(null);
    setIsProcessing(false);
    setStep("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Aviation Document or Agreement"
      description="Upload operations manuals, employment agreements, or HR policies for vector indexing"
    >
      <form onSubmit={handleUpload} className="space-y-4 text-xs">
        <div className="rounded-lg border border-dashed border-brand-border bg-brand-surface p-6 text-center">
          <p className="text-xs font-medium text-brand-heading">
            {file ? file.name : "Select or drag manual, contract, or policy (PDF, DOCX, TXT)"}
          </p>
          <input
            type="file"
            accept=".pdf,.docx,.doc,.txt,.md"
            onChange={handleFileChange}
            className="mt-3 block w-full text-xs text-brand-muted file:mr-3 file:rounded file:border-0 file:bg-brand-card file:px-3 file:py-1 file:text-xs file:font-medium file:text-brand-text cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-brand-muted mb-1">
              Document / Agreement Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Flight Crew Employment Agreement"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-brand-muted mb-1">
              Category
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value as DocumentType)}
              className="h-9 w-full rounded-md border border-brand-border bg-brand-surface px-3 text-xs text-brand-text focus:border-brand-amber/40 focus:outline-none"
            >
              <option value="EMPLOYMENT_CONTRACT">Employment Contract (Pilot / A&P / Dispatcher)</option>
              <option value="HR_POLICY">HR Handbook & Just Culture Policy</option>
              <option value="DRUG_ALCOHOL_POLICY">Drug & Alcohol Plan (DOT Part 40 / 120)</option>
              <option value="FATIGUE_POLICY">Fatigue Risk Management Policy (Part 117)</option>
              <option value="GMM">General Maintenance Manual (GMM)</option>
              <option value="FOM">Flight Operations Manual (FOM)</option>
              <option value="SMS">Safety Management System (SMS)</option>
              <option value="SOP">Standard Operating Procedure</option>
              <option value="QUALITY_MANUAL">Quality Assurance Manual</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-brand-muted mb-1">
              Revision / Version
            </label>
            <Input
              value={revision}
              onChange={(e) => setRevision(e.target.value)}
              placeholder="e.g. Ver 2.0"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-brand-muted mb-1">
              Target Regulatory Standard
            </label>
            <Input
              value={regulatorySource}
              onChange={(e) => setRegulatorySource(e.target.value)}
              placeholder="e.g. 14 CFR Part 117 / Part 120 / Part 145"
            />
          </div>
        </div>

        {isProcessing && (
          <div className="rounded bg-brand-surface p-2.5 text-xs text-brand-gold">
            {step}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-brand-border">
          <Button type="button" variant="outline" onClick={onClose} disabled={isProcessing} size="sm">
            Cancel
          </Button>
          <Button type="submit" disabled={(!file && !title) || isProcessing} size="sm">
            {isProcessing ? "Processing..." : "Upload & Vectorize"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
