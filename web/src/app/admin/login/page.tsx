import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Eyes } from "@/components/brand/Eyes";
import { verifyAdminSession } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await verifyAdminSession()) {
    redirect("/admin");
  }

  return (
    <div className="min-h-[100svh] grid lg:grid-cols-2">
      <div className="relative hidden lg:block bg-ink overflow-hidden">
        <Image
          src="/brand/tortilla-club.jpg"
          alt=""
          fill
          className="object-cover opacity-60"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,210,63,0.25),transparent_50%)]" />
        <div className="absolute bottom-12 left-12 right-12 text-surface">
          <Eyes size={56} />
          <p
            className="mt-8 font-bold tracking-tighter lowercase leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
          >
            torticlub
          </p>
          <p className="mt-3 text-surface/45 font-medium">
            parte. comparte. repite.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-16 bg-surface">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-10 lg:hidden">
            <Eyes size={56} />
            <p className="mt-4 text-xl font-bold tracking-tight lowercase">
              torticlub
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-ink/35 mb-3">
            Administración
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-ink mb-8">
            Acceso privado
          </h1>
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
