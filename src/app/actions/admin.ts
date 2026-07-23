"use server";

import {
  createAdminSession,
  destroyAdminSession,
  validateCredentials,
} from "@/lib/auth";
import { redirect } from "next/navigation";

export type LoginState = { error?: string } | null;

export async function adminLogin(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  // Artificial delay against brute force
  await new Promise((r) => setTimeout(r, 600));

  if (!validateCredentials(username, password)) {
    return { error: "Credenciales incorrectas." };
  }

  await createAdminSession();
  redirect("/admin");
}

export async function adminLogout() {
  await destroyAdminSession();
  redirect("/admin/login");
}
