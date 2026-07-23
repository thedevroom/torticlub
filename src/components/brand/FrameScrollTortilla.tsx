"use client";

import { formats } from "@/lib/tokens";
import { cn } from "@/lib/cn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const frames = [
  {
    id: "solo",
    label: "SOLO",
    title: "Una tortilla. Un sabor.",
    body: "El ritual empieza cuando eliges no compartir. Esta vez.",
    image: formats[0].image,
  },
  {
    id: "duo",
    label: "DUO",
    title: "Dos mitades. Dos sabores.",
    body: "Una línea. Dos conversaciones. La mesa se enciende.",
    image: formats[1].image,
  },
  {
    id: "club",
    label: "CLUB",
    title: "Cuatro cuartos. Cuatro sabores.",
    body: "La mesa completa. El Club, en una sola tortilla.",
    image: formats[2].image,
  },
];

/**
 * Frame-to-frame sticky scroll — GSAP ScrollTrigger + Lenis-friendly
 * (Lenis updates ScrollTrigger via root scroller when present)
 */
export function FrameScrollTortilla({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const imgs = framesRef.current.filter(Boolean) as HTMLDivElement[];
      const labels = labelsRef.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(imgs, { opacity: 0, scale: 1.04 });
      gsap.set(imgs[0], { opacity: 1, scale: 1 });
      gsap.set(labels, { opacity: 0.25, y: 8 });
      gsap.set(labels[0], { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      // Frame 0 → 1
      tl.to(imgs[0], { opacity: 0, scale: 0.96, duration: 1, ease: "none" }, 0.8)
        .to(imgs[1], { opacity: 1, scale: 1, duration: 1, ease: "none" }, 0.8)
        .to(labels[0], { opacity: 0.25, y: -6, duration: 0.6, ease: "none" }, 0.8)
        .to(labels[1], { opacity: 1, y: 0, duration: 0.6, ease: "none" }, 0.8);

      // Frame 1 → 2
      tl.to(imgs[1], { opacity: 0, scale: 0.96, duration: 1, ease: "none" }, 2)
        .to(imgs[2], { opacity: 1, scale: 1, duration: 1, ease: "none" }, 2)
        .to(labels[1], { opacity: 0.25, y: -6, duration: 0.6, ease: "none" }, 2)
        .to(labels[2], { opacity: 1, y: 0, duration: 0.6, ease: "none" }, 2);

      // Refresh after Lenis mounts
      const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
      return () => window.clearTimeout(t);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={cn("relative h-[320vh]", className)}
      aria-label="Transformación de la tortilla"
    >
      <div className="sticky top-0 h-[100svh] flex flex-col items-center justify-center px-5 overflow-hidden">
        {/* Soft ambient wash instead of flat black */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-[#F3EDE0] to-surface" />
        <div className="absolute inset-0 opacity-[0.35] pointer-events-none bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,210,63,0.18),transparent_55%)]" />

        <div className="relative z-10 w-full max-w-[1400px] grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-8 md:space-y-10">
            {frames.map((f, i) => (
              <div
                key={f.id}
                ref={(el) => {
                  labelsRef.current[i] = el;
                }}
                className="max-w-md"
              >
                <p className="text-xs font-bold tracking-[0.28em] text-primary-deep mb-3">
                  {f.label}
                </p>
                <h3
                  className="font-bold tracking-tighter text-ink leading-[0.95]"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
                >
                  {f.title}
                </h3>
                <p className="mt-3 text-ink/50 font-medium leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>

          <div
            ref={stageRef}
            className="order-1 lg:order-2 relative mx-auto w-[min(88vw,480px)] aspect-square"
          >
            {frames.map((f, i) => (
              <div
                key={f.id}
                ref={(el) => {
                  framesRef.current[i] = el;
                }}
                className="absolute inset-0"
              >
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  className="object-contain drop-shadow-[0_32px_60px_rgba(17,17,17,0.18)]"
                  sizes="480px"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 mt-8 text-[0.65rem] uppercase tracking-[0.25em] font-semibold text-ink/30">
          Scroll para partir
        </p>
      </div>
    </section>
  );
}
