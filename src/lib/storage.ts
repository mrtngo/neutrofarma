/**
 * Uploads a product image to Vercel Blob via the /api/upload route.
 * Returns the public URL.
 */
export async function uploadProductImage(
  file: File,
  onProgress?: (pct: number) => void
): Promise<string> {
  // Fake progress since fetch doesn't expose upload progress
  onProgress?.(10);

  const form = new FormData();
  form.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: form,
  });

  onProgress?.(90);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Upload failed");
  }

  const { url } = await res.json();
  onProgress?.(100);
  return url;
}
