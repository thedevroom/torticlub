import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

/** HttpOnly session cookie for the admin panel. */
const COOKIE = "tc_admin_session";
const MAX_AGE = 60 * 60 * 12;

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s) {
    throw new Error("AUTH_SECRET is not configured");
  }
  return new TextEncoder().encode(s);
}

/** Issue a signed JWT and persist it as an httpOnly cookie. */
export async function createAdminSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());

  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroyAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

/** Returns true when the request carries a valid admin session. */
export async function verifyAdminSession(): Promise<boolean> {
  try {
    const jar = await cookies();
    const token = jar.get(COOKIE)?.value;
    if (!token) return false;
    await jwtVerify(token, secret());
    return true;
  } catch {
    return false;
  }
}

/**
 * Constant-time style credential check against env vars.
 * Values must never be hard-coded in source.
 */
export function validateCredentials(username: string, password: string) {
  const u = process.env.ADMIN_USERNAME ?? "";
  const p = process.env.ADMIN_PASSWORD ?? "";
  if (username.length !== u.length || password.length !== p.length) {
    return false;
  }
  let ok = true;
  for (let i = 0; i < u.length; i++) {
    if (username.charCodeAt(i) !== u.charCodeAt(i)) ok = false;
  }
  for (let i = 0; i < p.length; i++) {
    if (password.charCodeAt(i) !== p.charCodeAt(i)) ok = false;
  }
  return ok;
}

export { COOKIE as ADMIN_COOKIE };
