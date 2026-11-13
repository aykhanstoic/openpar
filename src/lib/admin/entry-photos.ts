import { imageFields, imageValueOf, repoPathOfImage, type Collection } from "./collections";
import { isUploadPath, newUploadPath, processUpload, UploadError } from "./images";
import type { Change } from "./store";

/**
 * The photo part of saving an entry. For each photo field: a newly chosen
 * file is processed and added to the commit, "remove" clears the field, and
 * a photo the editor uploaded earlier is deleted when it is replaced or
 * removed, so old uploads do not pile up in the repo.
 *
 * Form fields per photo: `<name>` (current value, hidden), `<name>__file`
 * and `<name>__remove`.
 */
export async function preparePhotos(
  c: Collection,
  form: FormData,
  data: Record<string, unknown>,
  id: string,
): Promise<{ changes: Change[]; errors: Record<string, string> }> {
  const changes: Change[] = [];
  const errors: Record<string, string> = {};

  for (const f of imageFields(c)) {
    const current = typeof data[f.name] === "string" ? (data[f.name] as string) : "";
    const dropCurrent = () => {
      const old = current && repoPathOfImage(current);
      if (old && isUploadPath(old)) changes.push({ path: old, content: null });
    };

    let processed: Awaited<ReturnType<typeof processUpload>> = null;
    try {
      processed = await processUpload(form.get(`${f.name}__file`), f.kind ?? "photo");
    } catch (e) {
      errors[f.name] = e instanceof UploadError ? e.message : "This photo could not be saved.";
      continue;
    }

    if (processed) {
      const path = newUploadPath(c.id, id, processed.ext);
      changes.push({ path, content: processed.data });
      dropCurrent();
      data[f.name] = imageValueOf(path);
    } else if (form.get(`${f.name}__remove`)) {
      dropCurrent();
      data[f.name] = undefined;
    }
  }
  return { changes, errors };
}

/** Deleting an entry also deletes the photos the editor uploaded for it. */
export function photoDeletes(c: Collection, data: Record<string, unknown>): Change[] {
  return imageFields(c)
    .map((f) => (typeof data[f.name] === "string" ? repoPathOfImage(data[f.name] as string) : ""))
    .filter((p) => p && isUploadPath(p))
    .map((path) => ({ path, content: null }));
}
