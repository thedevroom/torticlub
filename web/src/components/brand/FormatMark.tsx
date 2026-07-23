import { cn } from "@/lib/cn";
import type { FormatId } from "@/lib/tokens";

interface FormatMarkProps {
  format: FormatId;
  size?: number;
  className?: string;
  active?: boolean;
}

// re-export friendly for className on wrapper if needed

/** Visual system for SOLO / DUO / CLUB from brand book */
export function FormatMark({
  format,
  size = 64,
  className,
  active = false,
}: FormatMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <circle
        cx="32"
        cy="32"
        r="30"
        fill={active ? "#FFD23F" : "#F7F3E8"}
        stroke="#111111"
        strokeWidth="2"
      />
      {format === "solo" && (
        <circle cx="32" cy="32" r="28" fill="#FFD23F" />
      )}
      {format === "duo" && (
        <>
          <path d="M32 4 A28 28 0 0 0 32 60 Z" fill="#FFD23F" />
          <path d="M32 4 A28 28 0 0 1 32 60 Z" fill="#111111" />
        </>
      )}
      {format === "club" && (
        <>
          <path d="M32 32 L32 4 A28 28 0 0 1 60 32 Z" fill="#FFD23F" />
          <path d="M32 32 L60 32 A28 28 0 0 1 32 60 Z" fill="#111111" />
          <path d="M32 32 L32 60 A28 28 0 0 1 4 32 Z" fill="#FFD23F" />
          <path d="M32 32 L4 32 A28 28 0 0 1 32 4 Z" fill="#111111" />
        </>
      )}
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke="#111111"
        strokeWidth="2"
      />
    </svg>
  );
}
