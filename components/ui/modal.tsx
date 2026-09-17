import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, description, children, maxWidth = "max-w-2xl" }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className={cn("relative z-50 w-full max-h-[92vh] flex flex-col overflow-hidden rounded-xl border border-brand-border bg-brand-card p-4 sm:p-6 shadow-2xl text-brand-text", maxWidth)}>
        <div className="flex items-start justify-between pb-3 border-b border-brand-border shrink-0">
          <div className="min-w-0 pr-2">
            <h3 className="text-sm font-semibold text-brand-heading truncate">{title}</h3>
            {description && <p className="mt-0.5 text-xs text-brand-muted line-clamp-2">{description}</p>}
          </div>
          <button onClick={onClose} className="rounded p-1 text-brand-muted hover:bg-brand-hover hover:text-brand-text transition-colors shrink-0" aria-label="Close modal">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 sm:mt-4 overflow-y-auto flex-1 min-h-0">{children}</div>
      </div>
    </div>
  );
}
