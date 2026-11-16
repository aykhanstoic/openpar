/**
 * Turning an uploaded photo into the file stored in the repo.
 *
 * Every upload is re-encoded with sharp (already installed for Astro's image
 * pipeline): turned upright, shrunk to a sensible size, and written without
 * its metadata. That last part matters: phone photos carry the GPS location
 * where they were taken, and these are photos of young people.
 */

export type ImageKind = "photo" | "logo";

/** Vercel rejects request bodies over 4.5 MB; the form shrinks big photos before sending. */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export const ACCEPT = "image/jpeg,image/png,image/webp";

export class UploadError extends Error {}

function sniff(buf: Buffer): "jpg" | "png" | "webp" | null {
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.length > 12 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") return "webp";
  return null;
}

export type Processed = { data: Buffer; ext: "jpg" | "png" };

/** null when no file was chosen. */
export async function processUpload(file: FormDataEntryValue | null, kind: ImageKind): Promise<Processed | null> {
  if (!file || typeof file === "string" || file.size === 0) return null;
  if (file.size > MAX_UPLOAD_BYTES) throw new UploadError("This photo is too large (over 4 MB). Choose a smaller one.");
  return processBuffer(Buffer.from(await file.arrayBuffer()), kind);
}

/**
 * A photo processed on an earlier save that failed, sent back by the form as
 * a data: URL so the editor need not choose it again. It comes from the
 * browser, so it goes through the same checks as a fresh upload.
 */
export async function processKept(value: FormDataEntryValue | null, kind: ImageKind): Promise<Processed | null> {
  if (typeof value !== "string" || value === "") return null;
  const m = /^data:image\/(?:jpeg|png);base64,([A-Za-z0-9+/]+={0,2})$/.exec(value);
  if (!m || m[1].length > (MAX_UPLOAD_BYTES * 4) / 3) throw new UploadError("Choose the photo again.");
  return processBuffer(Buffer.from(m[1], "base64"), kind);
}

/** The form's hidden value for a processed photo; read back by processKept. */
export const keptValue = (p: Processed) =>
  `data:image/${p.ext === "png" ? "png" : "jpeg"};base64,${p.data.toString("base64")}`;

async function processBuffer(input: Buffer, kind: ImageKind): Promise<Processed> {
  if (!sniff(input)) throw new UploadError("This file is not a JPG, PNG or WebP photo.");

  const { default: sharp } = await import("sharp");
  try {
    let img = sharp(input, { failOn: "error" }).rotate();
    if (kind === "logo") {
      img = img.resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true });
      return { data: await img.png({ compressionLevel: 9 }).toBuffer(), ext: "png" };
    }
    img = img.resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true });
    return { data: await img.jpeg({ quality: 82, mozjpeg: true }).toBuffer(), ext: "jpg" };
  } catch (e) {
    console.error(e);
    throw new UploadError("This photo could not be read. Try saving it again as a JPG and upload that.");
  }
}

/** Uploaded files live here, one folder per kind of content. */
export const UPLOADS = "src/assets/uploads";

/** A path the editor created, so it may also delete it. */
export const isUploadPath = (repoPath: string) =>
  /^src\/assets\/uploads\/[a-z-]+\/[a-z0-9-]+\.(jpg|png)$/.test(repoPath);

export function newUploadPath(folder: string, base: string, ext: string): string {
  const rand = Math.random().toString(36).slice(2, 8);
  return `${UPLOADS}/${folder}/${base.slice(0, 50)}-${rand}.${ext}`;
}
