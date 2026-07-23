import type { Metadata } from "next";
import { FormatosExperience } from "@/components/pages/FormatosExperience";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Formatos — SOLO · DUO · CLUB",
  description:
    "Tres formas de compartir una tortilla. SOLO desde 9,90 €, DUO 12,90 €, CLUB 14,90 €.",
};

export default function FormatosPage() {
  return (
    <PageShell headerSolid>
      <FormatosExperience />
    </PageShell>
  );
}
