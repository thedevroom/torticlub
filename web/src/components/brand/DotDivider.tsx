import { cn } from "@/lib/cn";

export function DotDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3", className)}
      aria-hidden
    >
      <span className="h-px w-10 md:w-16 bg-ink/25" />
      <span className="size-1.5 rounded-full bg-primary" />
      <span className="h-px w-10 md:w-16 bg-ink/25" />
    </div>
  );
}
