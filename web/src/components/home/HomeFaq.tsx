"use client";

import { faqItems } from "@/lib/tokens";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { useState } from "react";

export function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-5 sm:px-6 md:px-10 lg:px-12 py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-[800px]">
        <Reveal className="text-center mb-14 md:mb-16">
          <p className="text-xs uppercase tracking-[0.28em] font-semibold text-primary-deep mb-4">
            FAQ
          </p>
          <h2
            className="font-bold tracking-tighter text-ink"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            Preguntas frecuentes
          </h2>
        </Reveal>

        <div className="space-y-2">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={0.04 * i}>
                <div
                  className={cn(
                    "rounded-2xl border transition-colors",
                    isOpen
                      ? "border-ink/15 bg-[#FBF8F1]"
                      : "border-ink/8 bg-surface",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left px-5 md:px-6 py-4 md:py-5 flex items-center justify-between gap-4"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold tracking-tight text-ink text-sm md:text-base pr-2">
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "size-8 shrink-0 rounded-full border border-ink/10 flex items-center justify-center text-lg font-light transition-transform",
                        isOpen && "rotate-45 bg-ink text-surface border-ink",
                      )}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 md:px-6 pb-5 text-sm md:text-base text-ink/55 font-medium leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
