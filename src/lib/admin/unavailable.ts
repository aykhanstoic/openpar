import type { AstroGlobal } from "astro";
import { StoreError } from "./store";

/** A load from GitHub failed: log the detail and show the editor the plain reason instead of a 500 page. */
export function unavailable(Astro: AstroGlobal, e: unknown): Promise<Response> {
  console.error(e);
  Astro.locals.loadError = e instanceof StoreError ? e.message : "Something went wrong loading this page.";
  return Astro.rewrite("/admin/unavailable");
}
