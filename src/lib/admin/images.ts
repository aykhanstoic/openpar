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

/** null when no file was chosen. */
export async function processUpload(file: FormDataEntryValue | null, kind: ImageKind): Promise<{ data: Buffer; ext: "jpg" | "png" } | null> {
  if (!file || typeof file === "string" || file.size === 0) return null;
  if (file.size > MAX_UPLOAD_BYTES) throw new UploadError("This photo is too large (over 4 MB). Choose a smaller one.");

  const input = Buffer.from(await file.arrayBuffer());
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
