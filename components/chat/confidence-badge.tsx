import React from "react";

export function ConfidenceBadge({ score = 0.95 }: { score?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-surface px-2 py-0.5 text-[10px] text-brand-muted border border-brand-border">
      {Math.round(score * 100)}% confidence · cited sources
    </span>
  );
}
