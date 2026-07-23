"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";

/** Mobile sticky order bar — keeps conversion visible below the fold. */
export function HomeStickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="rounded-2xl border border-ink/10 bg-surface/95 backdrop-blur-xl shadow-product px-3 py-2.5 flex items-center gap-3">
        <div className="min-w-0 flex-1 pl-1">
          <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-ink/40">
            Barcelona
          </p>
          <p className="text-sm font-bold tracking-tight text-ink truncate">
            Pedir tortilla · desde 9,90 €
          </p>
        </div>
        <Link href="/pedir" className="shrink-0">
          <Button size="sm" className="h-11 px-5">
            Pedir
          </Button>
        </Link>
      </div>
    </div>
  );
}
