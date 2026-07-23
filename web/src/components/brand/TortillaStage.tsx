"use client";

import { cn } from "@/lib/cn";
import { formats, type FormatId } from "@/lib/tokens";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

export type TortillaMode = "whole" | "duo" | "club";

const modeToFormat: Record<TortillaMode, FormatId> = {
  whole: "solo",
  duo: "duo",
  club: "club",
};

interface TortillaStageProps {
  mode?: TortillaMode;
  formatId?: FormatId;
  className?: string;
  size?: "md" | "lg" | "xl" | "hero";
  priority?: boolean;
}

const sizeMap = {
  md: "w-[240px] md:w-[300px]",
  lg: "w-[300px] md:w-[400px]",
  xl: "w-[min(86vw,460px)]",
  hero: "w-[min(92vw,560px)]",
};

/** Photoreal product stage — Grok Imagine assets */
export function TortillaStage({
  mode = "whole",
  formatId,
  className,
  size = "lg",
  priority = false,
}: TortillaStageProps) {
  const id = formatId ?? modeToFormat[mode];
  const src =
    formats.find((f) => f.id === id)?.image ?? "/brand/tortilla-solo.jpg";

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square",
        sizeMap[size],
        className,
      )}
    >
      <div className="absolute inset-[8%] top-[20%] rounded-full bg-ink/[0.08] blur-3xl translate-y-[8%]" />
      <AnimatePresence mode="wait">
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={src}
            alt={`Tortilla TortiClub formato ${id}`}
            fill
            className="object-contain drop-shadow-[0_28px_50px_rgba(17,17,17,0.16)]"
            sizes="(max-width: 768px) 90vw, 560px"
            priority={priority}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function FlavorImage({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-[1.5rem] bg-surface", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
      />
    </div>
  );
}
