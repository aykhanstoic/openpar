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

/** Titles of entries whose `reference` fields point at this entry (e.g. news posts about a session). */
export async function referencedBy(c: Collection, id: string): Promise<string[]> {
  const titles: string[] = [];
  for (const other of Object.values(COLLECTIONS)) {
    const fields = other.fields.filter((f) => f.type === "reference" && f.ref === c.id);
    if (!fields.length) continue;
    const store = getStore(other.folder);
    for (const file of store ? await store.list() : []) {
      const d = parseEntry(file.content).data;
      if (fields.some((f) => String(d[f.name] ?? "") === id)) titles.push(String(d.title ?? d.name ?? file.id));
    }
  }
  return titles;
}
