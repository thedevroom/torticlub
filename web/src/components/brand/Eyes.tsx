"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export type EyesExpression =
  | "normal"
  | "happy"
  | "curious"
  | "lookLeft"
  | "lookRight";

interface EyesProps {
  size?: number | string;
  expression?: EyesExpression;
  followCursor?: boolean;
  className?: string;
  /** Decorative large crop peeking from edge */
  peek?: boolean;
}

export function Eyes({
  size = 80,
  expression = "normal",
  followCursor = false,
  className,
  peek = false,
}: EyesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (!followCursor) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      mx.set(Math.max(-1, Math.min(1, dx)) * 6);
      my.set(Math.max(-1, Math.min(1, dy)) * 4);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [followCursor, mx, my]);

  const pupilOffset = (() => {
    switch (expression) {
      case "lookLeft":
        return { x: -5, y: 0 };
      case "lookRight":
        return { x: 5, y: 0 };
      case "curious":
        return { x: 3, y: -2 };
      case "happy":
        return { x: 0, y: 2 };
      default:
        return { x: 0, y: 0 };
    }
  })();

  const dim = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      ref={ref}
      className={cn(
        "relative shrink-0 select-none",
        peek && "overflow-hidden",
        className,
      )}
      style={{ width: dim, height: dim }}
      aria-hidden
    >
      <div
        className="absolute inset-0 rounded-full bg-primary"
        style={peek ? { transform: "translate(28%, 0)" } : undefined}
      />
      <div
        className="absolute inset-0 flex items-center justify-center gap-[4%]"
        style={peek ? { transform: "translate(18%, 0)" } : undefined}
      >
        <Eye
          happy={expression === "happy"}
          pupilStyle={
            followCursor
              ? { x: sx, y: sy }
              : { x: pupilOffset.x, y: pupilOffset.y }
          }
          follow={followCursor}
        />
        <Eye
          happy={expression === "happy"}
          pupilStyle={
            followCursor
              ? { x: sx, y: sy }
              : { x: pupilOffset.x, y: pupilOffset.y }
          }
          follow={followCursor}
        />
      </div>
    </div>
  );
}

function Eye({
  happy,
  pupilStyle,
  follow,
}: {
  happy?: boolean;
  pupilStyle: { x: number | ReturnType<typeof useSpring>; y: number | ReturnType<typeof useSpring> };
  follow?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative bg-white rounded-[50%] shadow-sm",
        "w-[34%] h-[42%]",
      )}
      style={{
        borderRadius: happy ? "50% 50% 45% 45%" : "50%",
      }}
    >
      {follow ? (
        <motion.div
          className="absolute left-1/2 top-1/2 w-[48%] h-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
          style={{ x: pupilStyle.x as never, y: pupilStyle.y as never }}
        />
      ) : (
        <div
          className="absolute left-1/2 top-1/2 w-[48%] h-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
          style={{
            transform: `translate(calc(-50% + ${pupilStyle.x as number}px), calc(-50% + ${pupilStyle.y as number}px))`,
          }}
        />
      )}
    </div>
  );
}

/** Minimal line-art eyes for monochrome contexts */
export function EyesLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 28"
      className={cn("text-ink", className)}
      fill="none"
      aria-hidden
    >
      <ellipse cx="14" cy="14" rx="11" ry="13" stroke="currentColor" strokeWidth="2.2" />
      <ellipse cx="34" cy="14" rx="11" ry="13" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="14" cy="14" r="5" fill="currentColor" />
      <circle cx="34" cy="14" r="5" fill="currentColor" />
    </svg>
  );
}
