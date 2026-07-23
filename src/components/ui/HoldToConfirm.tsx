"use client";

import { cn } from "@/lib/cn";
import { useCallback, useRef, useState } from "react";

interface HoldToConfirmProps {
  onConfirm: () => void | Promise<void>;
  label?: string;
  durationMs?: number;
  disabled?: boolean;
  className?: string;
}

/**
 * Hold-to-confirm bar — press and hold until full to submit.
 */
export function HoldToConfirm({
  onConfirm,
  label = "Mantén pulsado para confirmar",
  durationMs = 1600,
  disabled = false,
  className,
}: HoldToConfirmProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const raf = useRef<number | null>(null);
  const start = useRef<number | null>(null);
  const holding = useRef(false);

  const stop = useCallback(() => {
    holding.current = false;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
    start.current = null;
    if (!done) setProgress(0);
  }, [done]);

  const tick = useCallback(
    (ts: number) => {
      if (!holding.current || disabled) return;
      if (start.current == null) start.current = ts;
      const p = Math.min(1, (ts - start.current) / durationMs);
      setProgress(p);
      if (p >= 1) {
        holding.current = false;
        setDone(true);
        setProgress(1);
        void onConfirm();
        return;
      }
      raf.current = requestAnimationFrame(tick);
    },
    [disabled, durationMs, onConfirm],
  );

  const begin = useCallback(() => {
    if (disabled || done) return;
    holding.current = true;
    start.current = null;
    raf.current = requestAnimationFrame(tick);
  }, [disabled, done, tick]);

  return (
    <button
      type="button"
      disabled={disabled || done}
      onPointerDown={begin}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onContextMenu={(e) => e.preventDefault()}
      className={cn(
        "relative w-full h-14 md:h-16 rounded-full overflow-hidden select-none touch-none",
        "bg-ink text-surface font-bold tracking-tight",
        "disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        className,
      )}
      aria-label={label}
    >
      <span
        className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-75 ease-linear"
        style={{ width: `${progress * 100}%` }}
        aria-hidden
      />
      <span className="relative z-10 mix-blend-difference">
        {done ? "Pedido enviado" : label}
      </span>
    </button>
  );
}
