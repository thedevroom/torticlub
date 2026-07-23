"use client";

import { cn } from "@/lib/cn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCallback, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 60;
const FRAME_PATH = (i: number) =>
  `/brand/frames/seq/frame-${String(i).padStart(3, "0")}.png`;

/**
 * Professional 60-frame image sequence scrubbed by scroll @ 60fps intent.
 * Transparent PNGs, no square background plates.
 */
export function FrameSequence({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ i: 0 });
  const [ready, setReady] = useState(false);
  const [loadPct, setLoadPct] = useState(0);

  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img?.complete) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    // contain fit
    const scale = Math.min(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = FRAME_PATH(i);
      img.onload = () => {
        if (cancelled) return;
        loaded += 1;
        setLoadPct(Math.round((loaded / FRAME_COUNT) * 100));
        if (loaded === FRAME_COUNT) {
          imagesRef.current = imgs;
          setReady(true);
          draw(0);
        }
      };
      imgs[i] = img;
    }

    return () => {
      cancelled = true;
    };
  }, [draw]);

  useGSAP(
    () => {
      if (!ready || !sectionRef.current) return;

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.35,
        onUpdate: (self) => {
          const idx = Math.min(
            FRAME_COUNT - 1,
            Math.max(0, Math.round(self.progress * (FRAME_COUNT - 1))),
          );
          if (idx !== frameRef.current.i) {
            frameRef.current.i = idx;
            draw(idx);
          }
        },
      });

      const onResize = () => draw(frameRef.current.i);
      window.addEventListener("resize", onResize);
      ScrollTrigger.refresh();

      return () => {
        st.kill();
        window.removeEventListener("resize", onResize);
      };
    },
    { dependencies: [ready, draw], scope: sectionRef },
  );

  const labels = [
    { at: 0, text: "SOLO" },
    { at: 0.45, text: "DUO" },
    { at: 0.78, text: "CLUB" },
  ];

  return (
    <section
      ref={sectionRef}
      className={cn("relative h-[400vh]", className)}
      aria-label="Secuencia de la tortilla"
    >
      <div className="sticky top-0 h-[100svh] flex flex-col items-center justify-center bg-surface overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,210,63,0.14),transparent_55%)]" />

        <div className="relative z-10 w-full max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-12 gap-6 items-center h-full py-24">
          <div className="lg:col-span-4 order-2 lg:order-1">
            <p className="text-xs uppercase tracking-[0.28em] font-semibold text-primary-deep mb-4">
              60 frames · 60 fps
            </p>
            <h2
              className="font-bold tracking-tighter text-ink leading-[0.92]"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
            >
              Parte.
            </h2>
            <p className="mt-4 text-ink/50 font-medium leading-relaxed max-w-sm">
              Scroll para partir la tortilla. Secuencia fotográfica transparente
              — sin fondos cuadrados, sin ruido visual.
            </p>
            <div className="mt-8 flex gap-3">
              {labels.map((l) => (
                <span
                  key={l.text}
                  className="rounded-full border border-ink/10 px-3 py-1 text-[0.65rem] font-bold tracking-[0.18em] text-ink/45"
                >
                  {l.text}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2 relative">
            <div className="relative mx-auto w-full max-w-[min(92vw,640px)] aspect-square">
              {!ready && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-sm font-semibold text-ink/35">
                    Cargando secuencia… {loadPct}%
                  </p>
                </div>
              )}
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ imageRendering: "auto" }}
              />
            </div>
          </div>
        </div>

        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.6rem] uppercase tracking-[0.28em] font-semibold text-ink/25">
          scroll
        </p>
      </div>
    </section>
  );
}
