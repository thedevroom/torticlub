import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ReservarExperience } from "@/components/pages/ReservarExperience";

export const metadata: Metadata = {
  title: "Reservar para mañana",
  description:
    "Si hoy no queda stock, reserva tu tortilla TortiClub para mañana. Te guardamos mesa.",
};

export default function ReservarPage() {
  return (
    <PageShell headerSolid>
      <ReservarExperience />
    </PageShell>
  );
}
