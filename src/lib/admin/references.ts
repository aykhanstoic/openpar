import { COLLECTIONS, parseEntry, type Collection } from "./collections";
import { getStore } from "./store";

/** Choices for a collection's `reference` fields (e.g. a news post's related session). */
export async function referenceChoices(c: Collection) {
  const options: Record<string, { value: string; label: string }[]> = {};
  const ids: Record<string, string[]> = {};
  for (const f of c.fields) {
    if (f.type !== "reference" || !f.ref || options[f.ref]) continue;
    const store = getStore(COLLECTIONS[f.ref].folder);
    const files = store ? await store.list() : [];
    options[f.ref] = files
      .map((file) => {
        const d = parseEntry(file.content).data;
        return { value: file.id, label: String(d.title ?? d.name ?? file.id) };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
    ids[f.ref] = options[f.ref].map((o) => o.value);
  }
  return { options, ids };
}
