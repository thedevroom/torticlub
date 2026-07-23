"use client";

import { cn } from "@/lib/cn";
import { motion, type HTMLMotionProps } from "motion/react";
import { forwardRef } from "react";

type Variant = "primary" | "ink" | "ghost" | "quiet";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-ink hover:bg-primary-deep shadow-soft",
  ink: "bg-ink text-surface hover:bg-ink/90",
  ghost:
    "bg-transparent text-ink border border-ink/15 hover:border-ink/40 hover:bg-ink/[0.03]",
  quiet: "bg-transparent text-ink/70 hover:text-ink underline-offset-4 hover:underline",
};

const sizes = {
  sm: "h-10 px-4 text-sm gap-2",
  md: "h-12 px-6 text-base gap-2",
  lg: "h-14 px-8 text-base md:text-lg gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-semibold tracking-tight",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          "disabled:opacity-40 disabled:pointer-events-none transition-colors",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);
