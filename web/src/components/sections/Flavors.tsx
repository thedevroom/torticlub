"use client";

import { DotDivider } from "@/components/brand/DotDivider";
import { flavors } from "@/lib/tokens";
import { cn } from "@/lib/cn";
import { motion } from "motion/react";
import { useState } from "react";

export function Flavors() {
  const [active, setActive] = useState(flavors[0].id);
  const current = flavors.find((f) => f.id === active) ?? flavors[0];

  return (
    <section
      id="sabores"
      className="py-24 md:py-36 px-5"
      aria-labelledby="flavors-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-primary-deep mb-3">
            Comparte.
          </p>
          <h2
            id="flavors-heading"
            className="text-3xl md:text-5xl font-bold tracking-tight text-ink"
          >
            Pocos sabores.
            <br />
            Perfectos.
          </h2>
          <DotDivider className="mt-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Stage */}
          <div className="relative aspect-square max-w-md mx-auto w-full">
            <motion.div
              key={current.id}
              className="absolute inset-[10%] rounded-full shadow-product"
              style={{
                background: `radial-gradient(circle at 35% 30%, ${current.color}cc, ${current.color})`,
              }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute inset-0 rounded-full border border-ink/8 pointer-events-none" />
            <div className="absolute inset-[18%] rounded-full border border-dashed border-ink/10" />
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-surface/90 border border-ink/8 backdrop-blur-sm"
              key={`label-${current.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm font-bold tracking-tight text-ink">
                {current.name}
              </span>
            </motion.div>
          </div>

          {/* List */}
          <div className="flex flex-col gap-2">
            {flavors.map((f) => {
              const isActive = f.id === active;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActive(f.id)}
                  onMouseEnter={() => setActive(f.id)}
                  className={cn(
                    "group text-left rounded-2xl px-5 py-4 transition-all duration-300",
                    "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
                    isActive
                      ? "bg-ink text-surface border-ink shadow-soft"
                      : "bg-transparent text-ink border-ink/8 hover:border-ink/20",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="size-3 rounded-full shrink-0"
                      style={{
                        backgroundColor: f.color,
                        boxShadow: isActive
                          ? "0 0 0 2px rgba(247,243,232,0.35)"
                          : undefined,
                      }}
                    />
                    <div>
                      <p className="font-bold tracking-tight text-lg">{f.name}</p>
                      <p
                        className={cn(
                          "text-sm mt-0.5 font-medium leading-snug",
                          isActive ? "text-surface/70" : "text-ink/55",
                        )}
                      >
                        {f.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
