"use client";

import React, { useState } from "react";
import { DocumentTable } from "@/components/documents/document-table";
import { DocumentUploadModal } from "@/components/documents/document-upload-modal";
import { Button } from "@/components/ui/button";
import { SAMPLE_INTERNAL_MANUALS } from "@/lib/aviation/sample-manuals";
import { AviationDocument } from "@/types";
import { Upload, FileText, Database, Plus } from "lucide-react";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<AviationDocument[]>(
    SAMPLE_INTERNAL_MANUALS.map((s) => s.document)
  );
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleUploadSuccess = (newDoc: AviationDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Aviation Document Management
          </h1>
          <p className="text-xs text-slate-400">
            Upload, chunk, embed, and index company operations manuals into Supabase pgvector
          </p>
        </div>

        <Button
          onClick={() => setIsUploadOpen(true)}
          variant="aviation"
          size="sm"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>Upload New Manual</span>
        </Button>
      </div>

      {/* Document Table */}
      <DocumentTable
        documents={documents}
        onDeleteDocument={handleDelete}
      />

      {/* Upload Modal */}
      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
