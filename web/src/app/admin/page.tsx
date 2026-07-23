import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { verifyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Panel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await verifyAdminSession())) redirect("/admin/login");
  return <AdminDashboard />;
}
