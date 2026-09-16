"use client";

import React, { useState } from "react";
import { Citation } from "@/types";
import { Modal } from "@/components/ui/modal";

export function CitationPopover({ citations }: { citations: Citation[] }) {
  const [selected, setSelected] = useState<Citation | null>(null);
  if (!citations?.length) return null;

  return (
    <>
      <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-brand-border">
        {citations.map((c, i) => (
          <button
            key={i}
            onClick={() => setSelected(c)}
            className="rounded border border-brand-border bg-brand-surface px-2 py-0.5 text-[11px] text-brand-amber hover:border-brand-amber/30 transition-colors"
          >
            {c.code_or_section}
          </button>
        ))}
      </div>

      {selected && (
        <Modal isOpen onClose={() => setSelected(null)} title={selected.code_or_section} description={selected.source_title}>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between rounded-md bg-brand-surface p-2">
              <span className="text-brand-muted">Source</span>
              <span className="text-brand-amber capitalize">{selected.source_type.replace("_", " ")}</span>
            </div>
            <div className="rounded-md bg-brand-surface p-3 border border-brand-border">
              <p className="whitespace-pre-wrap font-mono text-brand-text text-[11px] leading-relaxed">{selected.excerpt}</p>
            </div>
            <div className="flex justify-between text-brand-muted text-[11px]">
              <span>Relevance</span>
              <span className="font-semibold text-brand-green">{(selected.relevance_score * 100).toFixed(0)}%</span>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
