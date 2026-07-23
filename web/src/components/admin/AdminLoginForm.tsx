"use client";

import { adminLogin, type LoginState } from "@/app/actions/admin";
import { useActionState } from "react";

export function AdminLoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    adminLogin,
    null,
  );

  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-ink/35 font-semibold">
          Usuario
        </span>
        <input
          name="username"
          type="text"
          autoComplete="username"
          required
          className="mt-2 w-full h-13 h-12 rounded-2xl bg-transparent border border-ink/12 px-4 text-ink placeholder:text-ink/25 focus:outline-none focus:border-ink transition-colors"
          placeholder="Usuario"
        />
      </label>
      <label className="block">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-ink/35 font-semibold">
          Contraseña
        </span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full h-12 rounded-2xl bg-transparent border border-ink/12 px-4 text-ink placeholder:text-ink/25 focus:outline-none focus:border-ink transition-colors"
          placeholder="••••••••"
        />
      </label>

      {state?.error && (
        <p className="text-sm text-red-600 font-medium" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full h-12 rounded-full bg-primary text-ink font-bold tracking-tight hover:bg-primary-deep transition-colors disabled:opacity-50 mt-2"
      >
        {pending ? "Verificando…" : "Entrar al panel"}
      </button>
    </form>
  );
}
