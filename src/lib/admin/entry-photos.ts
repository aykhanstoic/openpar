import { imageFields, imageValueOf, repoPathOfImage, type Collection } from "./collections";
import { isUploadPath, keptValue, newUploadPath, processKept, processUpload, UploadError, type Processed } from "./images";
import type { Change } from "./store";

/**
 * The photo part of saving an entry. For each photo field: a newly chosen
 * file is processed and added to the commit, "remove" clears the field, and
 * a photo the editor uploaded earlier is deleted when it is replaced or
 * removed, so old uploads do not pile up in the repo.
 *
 * Form fields per photo: `<name>` (current value, hidden), `<name>__file`,
 * `<name>__remove`, and `<name>__kept`: a photo chosen on a save that failed,
 * so it survives the error page.
 */
export type PhotoChoices = Record<string, Processed | "remove">;

/** Reads every photo field. Runs before validation, so a chosen photo is kept whatever fails. */
export async function readPhotos(c: Collection, form: FormData): Promise<{ choices: PhotoChoices; errors: Record<string, string> }> {
  const choices: PhotoChoices = {};
  const errors: Record<string, string> = {};
  for (const f of imageFields(c)) {
    const kind = f.kind ?? "photo";
    try {
      // A new file beats "remove", which beats a photo kept from a failed save.
      const picked =
        (await processUpload(form.get(`${f.name}__file`), kind)) ??
        (form.get(`${f.name}__remove`) ? "remove" : await processKept(form.get(`${f.name}__kept`), kind));
      if (picked) choices[f.name] = picked;
    } catch (e) {
      errors[f.name] = e instanceof UploadError ? e.message : "This photo could not be saved.";
    }
  }
  return { choices, errors };
}

/** The repo changes for the chosen photos; points `data` at the new files. */
export function photoChanges(c: Collection, choices: PhotoChoices, data: Record<string, unknown>, id: string): Change[] {
  const changes: Change[] = [];
  for (const f of imageFields(c)) {
    const choice = choices[f.name];
    if (!choice) continue;
    const current = typeof data[f.name] === "string" ? (data[f.name] as string) : "";
    const old = current && repoPathOfImage(current);
    if (old && isUploadPath(old)) changes.push({ path: old, content: null });
    if (choice === "remove") {
      data[f.name] = undefined;
    } else {
      const path = newUploadPath(c.id, id, choice.ext);
      changes.push({ path, content: choice.data });
      data[f.name] = imageValueOf(path);
    }
  }
  return changes;
}

/** Photos to carry back into the form after a failed save. */
export function keptPhotos(choices: PhotoChoices): Record<string, string> {
  return Object.fromEntries(Object.entries(choices).flatMap(([k, v]) => (v === "remove" ? [] : [[k, keptValue(v)]])));
}

/** Deleting an entry also deletes the photos the editor uploaded for it. */
export function photoDeletes(c: Collection, data: Record<string, unknown>): Change[] {
  return imageFields(c)
    .map((f) => (typeof data[f.name] === "string" ? repoPathOfImage(data[f.name] as string) : ""))
    .filter((p) => p && isUploadPath(p))
    .map((path) => ({ path, content: null }));
}
