"use client";

import { Eyes } from "@/components/brand/Eyes";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const MIN_MS = 900;

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"eyes" | "text" | "logo" | "exit">("eyes");

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setVisible(false);
      return;
    }

    const t1 = setTimeout(() => setPhase("text"), 500);
    const t2 = setTimeout(() => setPhase("logo"), 1000);
    const t3 = setTimeout(() => setPhase("exit"), MIN_MS);
    const t4 = setTimeout(() => setVisible(false), MIN_MS + 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Cargando TortiClub"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyes size={96} followCursor expression="normal" />
          </motion.div>

          <AnimatePresence mode="wait">
            {(phase === "text" || phase === "logo" || phase === "exit") && (
              <motion.p
                key="welcome"
                className="mt-8 text-sm md:text-base font-medium tracking-[0.18em] lowercase text-ink/80"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                barcelona.
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {(phase === "logo" || phase === "exit") && (
              <motion.p
                key="word"
                className="mt-4 text-2xl font-bold tracking-tight text-ink lowercase"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                torticlub
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
