import { cn } from "@/lib/cn";

interface MantraProps {
  className?: string;
  stacked?: boolean;
  size?: "sm" | "md" | "lg" | "display";
  case?: "lower" | "upper" | "sentence";
}

const sizeMap = {
  sm: "text-sm md:text-base tracking-wide font-medium",
  md: "text-xl md:text-2xl font-semibold tracking-tight",
  lg: "text-3xl md:text-5xl font-bold tracking-tight leading-[0.95]",
  display:
    "text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]",
};

export function Mantra({
  className,
  stacked = false,
  size = "md",
  case: textCase = "sentence",
}: MantraProps) {
  const words =
    textCase === "upper"
      ? ["PARTE.", "COMPARTE.", "REPITE."]
      : textCase === "lower"
        ? ["parte.", "comparte.", "repite."]
        : ["Parte.", "Comparte.", "Repite."];

  if (stacked) {
    return (
      <p
        className={cn(
          "text-ink",
          sizeMap[size],
          className,
        )}
      >
        {words.map((w) => (
          <span key={w} className="block">
            {w}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p className={cn("text-ink", sizeMap[size], className)}>
      {words.join(" ")}
    </p>
  );
}
