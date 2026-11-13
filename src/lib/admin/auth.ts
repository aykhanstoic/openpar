import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { AstroCookies } from "astro";
import { getSecret } from "astro:env/server";

/**
 * Shared-password login for /admin.
 *
 * One password (ADMIN_PASSWORD) for every editor. A correct password sets a
 * signed, HttpOnly cookie that lasts SESSION_HOURS. The signature covers the
 * expiry and a hash of the current password, so changing the password in
 * Vercel logs everyone out at once — that is how access is revoked.
 */

const COOKIE = "eyp_admin";
const SESSION_HOURS = 8;
export const MIN_PASSWORD_LENGTH = 12;
const MIN_SECRET_LENGTH = 32;

const sha256 = (s: string) => createHash("sha256").update(s).digest();

export type AuthConfig =
  | { ok: true; password: string; secret: string }
  | { ok: false; problem: string };

export function authConfig(): AuthConfig {
  const password = getSecret("ADMIN_PASSWORD") ?? "";
  const secret = getSecret("ADMIN_SESSION_SECRET") ?? "";
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { ok: false, problem: `ADMIN_PASSWORD is not set or shorter than ${MIN_PASSWORD_LENGTH} characters.` };
  }
  if (secret.length < MIN_SECRET_LENGTH) {
    return { ok: false, problem: `ADMIN_SESSION_SECRET is not set or shorter than ${MIN_SECRET_LENGTH} characters.` };
  }
  return { ok: true, password, secret };
}

function sign(secret: string, password: string, expires: number): string {
  return createHmac("sha256", secret)
    .update(`${expires}|`)
    .update(sha256(password))
    .digest("base64url");
}

/** Constant-time comparison; hashing first makes the lengths equal. */
function same(a: string, b: string): boolean {
  return timingSafeEqual(sha256(a), sha256(b));
}

export function isLoggedIn(cookies: AstroCookies): boolean {
  const cfg = authConfig();
  if (!cfg.ok) return false;
  const value = cookies.get(COOKIE)?.value ?? "";
  const [exp, sig] = value.split(".");
  const expires = Number(exp);
  if (!Number.isFinite(expires) || expires < Date.now() || !sig) return false;
  return same(sig, sign(cfg.secret, cfg.password, expires));
}

/* ------------------------------------------------------------ rate limit */
/*
 * Five wrong passwords per address per 15 minutes. This lives in the memory
 * of one function instance, so it slows guessing down but is not a hard
 * guarantee: Vercel may run several instances. A long password is the real
 * defence, which is why short ones are refused above.
 */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const failures = new Map<string, { count: number; since: number }>();

function blocked(ip: string): boolean {
  const f = failures.get(ip);
  if (!f) return false;
  if (Date.now() - f.since > WINDOW_MS) {
    failures.delete(ip);
    return false;
  }
  return f.count >= MAX_FAILURES;
}

function recordFailure(ip: string) {
  const f = failures.get(ip);
  if (!f || Date.now() - f.since > WINDOW_MS) failures.set(ip, { count: 1, since: Date.now() });
  else f.count += 1;
}

export type LoginResult = "ok" | "wrong" | "blocked" | "unconfigured";

export async function logIn(cookies: AstroCookies, password: string, ip: string, secure: boolean): Promise<LoginResult> {
  const cfg = authConfig();
  if (!cfg.ok) return "unconfigured";
  if (blocked(ip)) return "blocked";
  if (!same(password, cfg.password)) {
    recordFailure(ip);
    await new Promise((r) => setTimeout(r, 800));
    return blocked(ip) ? "blocked" : "wrong";
  }
  failures.delete(ip);
  const expires = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  cookies.set(COOKIE, `${expires}.${sign(cfg.secret, cfg.password, expires)}`, {
    path: "/admin",
    httpOnly: true,
    sameSite: "strict",
    secure,
    expires: new Date(expires),
  });
  return "ok";
}

export function logOut(cookies: AstroCookies) {
  cookies.delete(COOKIE, { path: "/admin" });
}

/** Form posts must come from this site. Astro also checks this; belt and braces. */
export function sameOrigin(request: Request, url: URL): boolean {
  return request.headers.get("origin") === url.origin;
}
