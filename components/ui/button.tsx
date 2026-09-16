import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-amber disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default: "bg-brand-amber text-white hover:bg-brand-gold active:bg-brand-amber/90",
        destructive: "bg-brand-coral/15 text-brand-coral border border-brand-coral/20 hover:bg-brand-coral/25",
        outline: "border border-brand-border bg-brand-surface text-brand-text hover:bg-brand-hover",
        secondary: "bg-brand-card text-brand-text hover:bg-brand-hover",
        ghost: "text-brand-muted hover:bg-brand-card hover:text-brand-text",
        link: "text-brand-amber underline-offset-4 hover:underline",
        aviation: "bg-brand-amber text-white hover:bg-brand-gold active:bg-brand-amber/90",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);
Button.displayName = "Button";
export { Button, buttonVariants };
