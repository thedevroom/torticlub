"use client";

import { DotDivider } from "@/components/brand/DotDivider";
import { Eyes } from "@/components/brand/Eyes";
import { Mantra } from "@/components/brand/Mantra";
import { values } from "@/lib/tokens";
import { motion } from "motion/react";
import { Heart, Users, CircleDot } from "lucide-react";

const icons = {
  quality: CircleDot,
  people: Users,
  heart: Heart,
};

export function Club() {
  return (
    <section
      id="club"
      className="py-24 md:py-36 px-5 overflow-hidden"
      aria-labelledby="club-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] font-semibold text-primary-deep mb-3">
              El Club
            </p>
            <h2
              id="club-heading"
              className="text-3xl md:text-5xl font-bold tracking-tight text-ink leading-tight"
            >
              Esto es más que tortillas.
              <br />
              Esto es el Club.
            </h2>
            <DotDivider className="mt-8 justify-start" />
            <p className="mt-8 text-ink/60 font-medium leading-relaxed text-lg">
              No hacemos muchas tortillas. Hacemos la tortilla perfecta para
              que la disfrutes a tu manera.
            </p>
            <p className="mt-4 text-ink/60 font-medium leading-relaxed">
              Hablamos como amigos. Sin rodeos. Con humor. Sin postureo.
            </p>

            <div className="mt-10 grid gap-4">
              {values.map((v, i) => {
                const Icon = icons[v.icon];
                return (
                  <motion.div
                    key={v.id}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className="size-11 rounded-full border border-ink/10 flex items-center justify-center bg-surface">
                      <Icon className="size-4 text-ink" strokeWidth={2.2} />
                    </span>
                    <span className="font-semibold text-ink tracking-tight">
                      {v.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="relative flex items-center justify-center min-h-[320px]">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Eyes size={280} followCursor expression="happy" className="md:hidden" />
              <Eyes size={360} followCursor expression="happy" className="hidden md:block" />
            </motion.div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-8">
              <Mantra size="sm" case="lower" className="text-ink/50" />
            </div>
          </div>
        </div>

        {/* Quote card */}
        <motion.blockquote
          className="mt-20 md:mt-28 rounded-[2rem] bg-ink text-surface p-8 md:p-14 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -right-10 -top-10 opacity-20">
            <Eyes size={180} />
          </div>
          <p className="relative text-2xl md:text-4xl font-bold tracking-tight leading-snug max-w-2xl mx-auto">
            Las mejores conversaciones empiezan compartiendo comida.
          </p>
          <footer className="relative mt-6 text-sm font-medium text-primary tracking-wide">
            torticlub
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
