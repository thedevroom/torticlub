"use client";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const links = [
  { href: "#club", label: "Club" },
  { href: "#formatos", label: "Formatos" },
  { href: "#sabores", label: "Sabores" },
  { href: "#pedir", label: "Pedir" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-surface/85 backdrop-blur-md border-b border-ink/5"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="relative z-50" aria-label="TortiClub inicio">
            <Logo size="sm" eyesFollow />
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Principal">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-ink/70 hover:text-ink transition-colors"
              >
                {l.label}
              </a>
            ))}
            <Button
              size="sm"
              onClick={() => {
                document.querySelector("#pedir")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Entrar al Club
            </Button>
          </nav>

          <button
            type="button"
            className="md:hidden relative z-50 size-11 rounded-full border border-ink/10 flex items-center justify-center"
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menú</span>
            <div className="flex flex-col gap-1.5 w-4">
              <span
                className={cn(
                  "h-px w-full bg-ink transition-transform origin-center",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-full bg-ink transition-transform origin-center",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-surface md:hidden flex flex-col justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col gap-6" aria-label="Móvil">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-4xl font-bold tracking-tight text-ink"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.35 }}
              >
                <Button
                  size="lg"
                  className="mt-4 w-full"
                  onClick={() => {
                    setOpen(false);
                    document.querySelector("#pedir")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Entrar al Club
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
