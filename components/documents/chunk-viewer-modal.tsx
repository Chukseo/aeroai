"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";
import { AviationDocument, DocumentChunk } from "@/types";
import { SAMPLE_INTERNAL_MANUALS } from "@/lib/aviation/sample-manuals";

interface ChunkViewerModalProps {
  document: AviationDocument | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ChunkViewerModal({
  document,
  isOpen,
  onClose,
}: ChunkViewerModalProps) {
  if (!document) return null;

  const sampleMatch = SAMPLE_INTERNAL_MANUALS.find(
    (s) => s.document.id === document.id || s.document.title === document.title
  );
  const chunks: DocumentChunk[] = sampleMatch
    ? sampleMatch.chunks
    : [
        {
          id: `${document.id}-c0`,
          document_id: document.id,
          org_id: document.org_id,
          chunk_index: 0,
          section_title: "Chapter 1 - Scope & Procedures",
          content: `${document.title}: Establishes operating procedures and internal controls conforming to civil aviation standards.`,
        },
      ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={document.title}
      description={`${document.document_type} · ${document.revision_number} · ${chunks.length} pgvector chunks`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
        {chunks.map((chunk, idx) => (
          <div
            key={chunk.id || idx}
            className="rounded-lg border border-brand-border bg-brand-surface p-3.5 space-y-2 text-xs"
          >
            <div className="flex items-center justify-between border-b border-brand-border pb-2">
              <span className="font-semibold text-brand-gold">
                {chunk.section_title}
              </span>
              <span className="text-[10px] font-mono text-brand-muted">
                Chunk #{chunk.chunk_index}
              </span>
            </div>

            <p className="font-mono text-brand-text text-[11px] leading-relaxed whitespace-pre-wrap">
              {chunk.content}
            </p>

            <div className="pt-1 flex items-center justify-between text-[10px] text-brand-muted">
              <span>~{Math.round(chunk.content.split(" ").length * 1.3)} tokens</span>
              <span className="font-mono text-brand-green">Indexed in pgvector</span>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
