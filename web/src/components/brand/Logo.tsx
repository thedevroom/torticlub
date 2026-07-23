import { cn } from "@/lib/cn";
import { Eyes } from "./Eyes";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  eyesFollow?: boolean;
}

const sizes = {
  sm: { text: "text-lg", eyes: 22, tag: "text-[0.55rem]" },
  md: { text: "text-2xl", eyes: 28, tag: "text-[0.65rem]" },
  lg: { text: "text-4xl md:text-5xl", eyes: 44, tag: "text-sm" },
  xl: { text: "text-5xl md:text-7xl", eyes: 64, tag: "text-base" },
};

export function Logo({
  className,
  showTagline = false,
  size = "md",
  eyesFollow = false,
}: LogoProps) {
  const s = sizes[size];

  return (
    <div className={cn("inline-flex flex-col items-center", className)}>
      <div className="inline-flex items-center gap-1.5">
        <span
          className={cn(
            "font-bold tracking-tight text-ink lowercase leading-none",
            s.text,
          )}
        >
          torticlub
        </span>
        <span className="relative inline-flex items-center">
          <Eyes size={s.eyes} followCursor={eyesFollow} expression="normal" />
          <sup className="absolute -right-2.5 -top-0.5 text-[0.45em] text-ink/70 font-medium">
            ®
          </sup>
        </span>
      </div>
      {showTagline && (
        <p
          className={cn(
            "mt-1.5 font-medium tracking-wide text-ink/80 lowercase",
            s.tag,
          )}
        >
          parte. comparte. repite.
        </p>
      )}
    </div>
  );
}
