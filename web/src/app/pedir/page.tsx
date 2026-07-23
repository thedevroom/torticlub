import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PedirExperience } from "@/components/pages/PedirExperience";

export const metadata: Metadata = {
  title: "Pedir",
  description:
    "Configura tu tortilla TortiClub. SOLO, DUO o CLUB. Recogida o envío en Barcelona.",
};

export default function PedirPage() {
  return (
    <PageShell headerSolid>
      <PedirExperience />
    </PageShell>
  );
}
