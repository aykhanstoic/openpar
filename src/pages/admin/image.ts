import type { APIRoute } from "astro";
import { isLoggedIn } from "../../lib/admin/auth";
import { getStore } from "../../lib/admin/store";

export const prerender = false;

/**
 * GET /admin/image?p=src/assets/uploads/board/x.jpg — a photo straight from
 * the repo, for the previews in /admin. Uploaded photos only reach the public
 * site after the next rebuild, so the editor cannot point at their public URL.
 */
const ALLOWED = /^src\/assets\/[A-Za-z0-9/_.-]+\.(jpe?g|png|webp)$/i;
const TYPES: Record<string, string> = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };

export const GET: APIRoute = async ({ url, cookies }) => {
  if (!isLoggedIn(cookies)) return new Response("Forbidden", { status: 403 });
  const p = url.searchParams.get("p") ?? "";
  if (!ALLOWED.test(p) || p.split("/").some((seg) => seg === "" || seg === "." || seg === "..")) {
    return new Response("Not found", { status: 404 });
  }
  const store = getStore({ dir: "src/assets", ext: "json" });
  const data = store ? await store.readRaw(p) : null;
  if (!data) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(data), {
    headers: {
      "Content-Type": TYPES[p.split(".").pop()!.toLowerCase()],
      "Cache-Control": "private, max-age=300",
      "X-Content-Type-Options": "nosniff",
    },
  });
};
