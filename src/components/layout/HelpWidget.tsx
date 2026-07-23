"use client";

import { social } from "@/lib/tokens";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "motion/react";
import { HelpCircle, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function IgIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Floating help panel — Instagram + FAQ; WhatsApp only if env URL is set. */
export function HelpWidget() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-5 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto w-[min(calc(100vw-2rem),300px)] rounded-3xl border border-ink/10 bg-surface shadow-product p-5"
          >
            <p className="text-xs font-bold tracking-[0.18em] text-ink/35 mb-3">
              AYUDA
            </p>
            <p className="text-sm font-semibold text-ink leading-snug mb-4">
              ¿Necesitas algo? Escríbenos o revisa el FAQ.
            </p>
            <div className="space-y-2">
              {social.whatsapp ? (
                <a
                  href={social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-ink/8 px-3 py-3 text-sm font-semibold hover:bg-ink/[0.03] transition-colors"
                >
                  <MessageCircle className="size-4 shrink-0" />
                  WhatsApp
                </a>
              ) : null}
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-ink/8 px-3 py-3 text-sm font-semibold hover:bg-ink/[0.03] transition-colors"
              >
                <IgIcon className="size-4 shrink-0" />
                {social.instagramHandle}
              </a>
              <Link
                href="/#faq"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-2xl border border-ink/8 px-3 py-3 text-sm font-semibold hover:bg-ink/[0.03] transition-colors"
              >
                <HelpCircle className="size-4 shrink-0" />
                Preguntas frecuentes
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "pointer-events-auto size-12 sm:size-14 rounded-full shadow-product flex items-center justify-center transition-colors",
          open ? "bg-ink text-surface" : "bg-primary text-ink",
        )}
        aria-expanded={open}
        aria-label={open ? "Cerrar ayuda" : "Abrir ayuda"}
      >
        {open ? (
          <X className="size-5" />
        ) : (
          <HelpCircle className="size-5 sm:size-6" />
        )}
      </button>
    </div>
  );
}
