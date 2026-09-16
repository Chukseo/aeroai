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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={cn("relative z-50 w-full overflow-hidden rounded-lg border border-brand-border bg-brand-card p-6 shadow-2xl text-brand-text", maxWidth)}>
        <div className="flex items-start justify-between pb-3 border-b border-brand-border">
          <div>
            <h3 className="text-sm font-semibold text-brand-heading">{title}</h3>
            {description && <p className="mt-0.5 text-xs text-brand-muted">{description}</p>}
          </div>
          <button onClick={onClose} className="rounded p-1 text-brand-muted hover:bg-brand-hover hover:text-brand-text transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
