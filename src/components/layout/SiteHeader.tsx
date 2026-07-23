"use client";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/club", label: "Club" },
  { href: "/formatos", label: "Formatos" },
  { href: "/sabores", label: "Sabores" },
  { href: "/carta", label: "Carta" },
  { href: "/pedir", label: "Pedir" },
  { href: "/reservar", label: "Reservar" },
];

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const bg = solid || scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          bg
            ? "bg-surface/95 backdrop-blur-xl border-b border-ink/[0.06] shadow-[0_1px_0_rgba(17,17,17,0.04)]"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-14 sm:h-16 md:h-[4.5rem] max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-5 md:px-10">
          <Link
            href="/"
            aria-label="TortiClub inicio"
            className="relative z-50 shrink-0"
            onClick={() => setOpen(false)}
          >
            <Logo size="sm" eyesFollow={!open} />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8"
            aria-label="Principal"
          >
            {links.map((l) => {
              const active =
                pathname === l.href ||
                (l.href !== "/" && pathname?.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative text-[0.8125rem] font-semibold tracking-wide transition-colors py-1",
                    active ? "text-ink" : "text-ink/45 hover:text-ink",
                  )}
                >
                  {l.label}
                  {active && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
            <Link href="/pedir">
              <Button size="sm">Pedir</Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:hidden relative z-50">
            <Link href="/pedir" className="hidden sm:block">
              <Button size="sm">Pedir</Button>
            </Link>
            <button
              type="button"
              className="size-11 rounded-full border border-ink/10 flex items-center justify-center bg-surface/80"
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((v) => !v)}
            >
              <div className="flex flex-col gap-1.5 w-4">
                <span
                  className={cn(
                    "h-px w-full bg-ink transition-transform origin-center duration-300",
                    open && "translate-y-[3.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-px w-full bg-ink transition-transform origin-center duration-300",
                    open && "-translate-y-[3.5px] -rotate-45",
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-surface lg:hidden flex flex-col px-6 pt-24 pb-10 safe-area"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-1 flex-1" aria-label="Móvil">
              {links.map((l, i) => {
                const active = pathname === l.href;
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.35 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block py-3 text-[clamp(1.75rem,8vw,2.5rem)] font-bold tracking-tighter leading-none",
                        active ? "text-ink" : "text-ink/35",
                      )}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
                className="mt-6"
              >
                <Link href="/pedir" onClick={() => setOpen(false)}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Pedir ahora
                  </Button>
                </Link>
              </motion.div>
            </nav>
            <p className="text-sm text-ink/35 font-medium lowercase tracking-wide">
              solo barcelona · parte. comparte. repite.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
