"use client";

import React, { useState } from "react";
import { AviationDocument } from "@/types";
import { formatDate, formatFileSize } from "@/lib/utils";
import { ChunkViewerModal } from "./chunk-viewer-modal";

interface DocumentTableProps {
  documents: AviationDocument[];
  onDeleteDocument?: (id: string) => void;
}

export function DocumentTable({
  documents,
  onDeleteDocument,
}: DocumentTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [selectedDocForChunks, setSelectedDocForChunks] = useState<AviationDocument | null>(null);

  const filtered = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.revision_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "ALL" || doc.document_type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search manuals, contracts, HR policies..."
          className="h-8 w-full sm:w-72 rounded-md border border-brand-border bg-brand-surface px-3 text-xs text-brand-text placeholder:text-brand-muted/60 focus:border-brand-amber/40 focus:outline-none"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="h-8 rounded-md border border-brand-border bg-brand-surface px-3 text-xs text-brand-muted focus:border-brand-amber/40 focus:outline-none"
        >
          <option value="ALL">All Categories</option>
          <option value="EMPLOYMENT_CONTRACT">Employee Contracts</option>
          <option value="HR_POLICY">HR & Just Culture Policies</option>
          <option value="GMM">Maintenance (GMM)</option>
          <option value="FOM">Flight Ops (FOM)</option>
          <option value="SMS">Safety (SMS)</option>
          <option value="SOP">SOPs</option>
          <option value="QUALITY_MANUAL">Quality Assurance</option>
        </select>
      </div>

      <div className="rounded-lg border border-brand-border bg-brand-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-brand-surface text-[11px] text-brand-muted border-b border-brand-border">
            <tr>
              <th className="py-3 px-4 font-medium">Document / Contract</th>
              <th className="py-3 px-4 font-medium">Category</th>
              <th className="py-3 px-4 font-medium">Revision / Ver</th>
              <th className="py-3 px-4 font-medium">Regulatory Scope</th>
              <th className="py-3 px-4 font-medium">Chunks</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border text-brand-text">
            {filtered.map((doc) => (
              <tr key={doc.id} className="hover:bg-brand-hover/40 transition-colors">
                <td className="py-3 px-4">
                  <span className="block font-medium text-brand-heading">{doc.title}</span>
                  <span className="text-[10px] text-brand-muted font-mono">
                    {formatFileSize(doc.file_size)} · Eff: {formatDate(doc.effective_date)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="rounded bg-brand-surface px-2 py-0.5 text-[10px] text-brand-muted border border-brand-border">
                    {doc.document_type.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-[11px] text-brand-muted">
                  {doc.revision_number}
                </td>
                <td className="py-3 px-4 text-brand-muted text-xs">
                  {doc.regulatory_source || "Civil Aviation Standard"}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => setSelectedDocForChunks(doc)}
                    className="rounded bg-brand-surface px-2 py-0.5 text-[11px] text-brand-amber border border-brand-border hover:border-brand-amber/30 transition-colors font-mono"
                  >
                    {doc.chunks_count} chunks
                  </button>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setSelectedDocForChunks(doc)}
                    className="text-xs text-brand-muted hover:text-brand-text mr-3 transition-colors"
                  >
                    View
                  </button>
                  {onDeleteDocument && (
                    <button
                      onClick={() => onDeleteDocument(doc.id)}
                      className="text-xs text-brand-coral hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ChunkViewerModal
        document={selectedDocForChunks}
        isOpen={Boolean(selectedDocForChunks)}
        onClose={() => setSelectedDocForChunks(null)}
      />
    </div>
  );
}
