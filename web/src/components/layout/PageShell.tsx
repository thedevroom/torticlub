"use client";

import { HelpWidget } from "@/components/layout/HelpWidget";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import type { ReactNode } from "react";

export function PageShell({
  children,
  headerSolid = false,
  showFooter = true,
}: {
  children: ReactNode;
  headerSolid?: boolean;
  showFooter?: boolean;
}) {
  return (
    <SmoothScroll>
      <SiteHeader solid={headerSolid} />
      <main className="min-h-[100svh]">{children}</main>
      {showFooter && <SiteFooter />}
      <HelpWidget />
    </SmoothScroll>
  );
}
