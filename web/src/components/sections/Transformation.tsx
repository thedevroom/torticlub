"use client";

import { FormatMark } from "@/components/brand/FormatMark";
import { formats, type FormatId } from "@/lib/tokens";
import { cn } from "@/lib/cn";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";

export function Transformation() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.33) setActiveIndex(0);
    else if (v < 0.66) setActiveIndex(1);
    else setActiveIndex(2);
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 3]);

  return (
    <section
      id="formatos"
      ref={ref}
      className="relative h-[280vh]"
      aria-labelledby="formats-heading"
    >
      <div className="sticky top-0 h-[100svh] flex flex-col items-center justify-center px-5 overflow-hidden">
        <div className="text-center mb-8 md:mb-12 max-w-xl">
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-primary-deep mb-3">
            Parte.
          </p>
          <h2
            id="formats-heading"
            className="text-3xl md:text-5xl font-bold tracking-tight text-ink"
          >
            Una tortilla.
            <br />
            Tres formas de compartirla.
          </h2>
        </div>

        <motion.div
          className="relative w-[min(78vw,340px)] aspect-square mb-10"
          style={{ rotate }}
        >
          <TortillaSplit progress={scrollYProgress} />
        </motion.div>

        <div className="w-full max-w-lg grid grid-cols-3 gap-3 md:gap-6">
          {formats.map((f, i) => (
            <FormatCard
              key={f.id}
              format={f.id}
              active={activeIndex === i}
              label={f.label}
              title={f.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TortillaSplit({ progress }: { progress: MotionValue<number> }) {
  const leftX = useTransform(progress, [0.15, 0.4], [0, -10]);
  const rightX = useTransform(progress, [0.15, 0.4], [0, 10]);
  const gap = useTransform(progress, [0.15, 0.4, 0.55], [0, 8, 10]);
  const duoOpacity = useTransform(progress, [0, 0.48, 0.58], [1, 1, 0]);
  const clubOpacity = useTransform(progress, [0.5, 0.62], [0, 1]);
  const spread = useTransform(progress, [0.55, 0.9], [0, 12]);

  const q0x = useTransform(spread, (v) => -v);
  const q0y = useTransform(spread, (v) => -v);
  const q1x = useTransform(spread, (v) => v);
  const q1y = useTransform(spread, (v) => -v);
  const q2x = useTransform(spread, (v) => -v);
  const q2y = useTransform(spread, (v) => v);
  const q3x = useTransform(spread, (v) => v);
  const q3y = useTransform(spread, (v) => v);

  const quarters = [
    { color: "#E8C547", x: q0x, y: q0y, round: "rounded-tl-full" },
    { color: "#D4A574", x: q1x, y: q1y, round: "rounded-tr-full" },
    { color: "#C45C3E", x: q2x, y: q2y, round: "rounded-bl-full" },
    { color: "#3D3429", x: q3x, y: q3y, round: "rounded-br-full" },
  ];

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-[8%] rounded-full bg-ink/[0.06] blur-2xl translate-y-6" />

      <motion.div
        className="absolute inset-0 flex"
        style={{ opacity: duoOpacity, gap }}
      >
        <motion.div
          className="flex-1 relative rounded-l-full overflow-hidden"
          style={{ x: leftX }}
        >
          <div
            className="absolute inset-0 rounded-l-full"
            style={{
              background:
                "radial-gradient(circle at 60% 40%, #F5D76E 0%, #E8B84A 55%, #C9952E 100%)",
            }}
          />
        </motion.div>
        <motion.div
          className="flex-1 relative rounded-r-full overflow-hidden"
          style={{ x: rightX }}
        >
          <div
            className="absolute inset-0 rounded-r-full"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, #E8C090 0%, #C45C3E 50%, #3D3429 100%)",
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1.5 p-0.5"
        style={{ opacity: clubOpacity }}
      >
        {quarters.map((q, i) => (
          <motion.div
            key={i}
            className={cn("relative overflow-hidden", q.round)}
            style={{
              x: q.x,
              y: q.y,
              background: `radial-gradient(circle at center, ${q.color}ee, ${q.color})`,
            }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 rounded-full border-2 border-ink/10 pointer-events-none" />
    </div>
  );
}

function FormatCard({
  format,
  active,
  label,
  title,
}: {
  format: FormatId;
  active: boolean;
  label: string;
  title: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center transition-all duration-500",
        active ? "opacity-100 translate-y-0" : "opacity-35 translate-y-1",
      )}
    >
      <FormatMark format={format} size={56} active={active} />
      <p className="mt-3 text-xs font-bold tracking-[0.15em] text-ink">{label}</p>
      <p className="mt-1 text-[0.7rem] md:text-xs text-ink/55 font-medium leading-snug max-w-[9rem]">
        {title}
      </p>
    </div>
  );
}
