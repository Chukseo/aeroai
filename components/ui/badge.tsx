import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-brand-amber/20 bg-brand-amber/10 text-brand-gold",
        secondary: "border-brand-border bg-brand-card text-brand-muted",
        destructive: "border-brand-coral/20 bg-brand-coral/10 text-brand-coral",
        warning: "border-yellow-600/20 bg-yellow-600/10 text-yellow-500",
        success: "border-brand-green/20 bg-brand-green/10 text-brand-green",
        outline: "text-brand-muted border-brand-border",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
