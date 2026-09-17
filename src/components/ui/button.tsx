import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap border text-xs font-bold uppercase tracking-[0.16em] transition-[transform,box-shadow,border-color,background-color,color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary px-6 text-primary-foreground shadow-[0_0_28px_var(--glow-primary)] hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_0_42px_var(--glow-primary)]",
        outline: "border-border bg-surface/50 px-6 text-foreground backdrop-blur-md hover:-translate-y-0.5 hover:border-primary hover:text-primary",
        ghost: "border-transparent bg-transparent px-3 text-muted-foreground hover:text-foreground",
        icon: "size-11 border-border bg-surface/70 p-0 text-foreground backdrop-blur-md hover:border-primary hover:text-primary",
      },
      size: { default: "h-12", sm: "h-10 px-4", lg: "h-14 px-7" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
