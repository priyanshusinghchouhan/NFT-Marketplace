/**
 * Resolves tokenURI to an image URL.
 * - If tokenURI is a direct image URL (http/https/ipfs image), return it (with ipfs gateway).
 * - If tokenURI returns JSON metadata with "image" or "image_url", fetch and return that URL.
 * - Otherwise returns null (caller can use placeholder).
 */
export async function resolveTokenURIToImage(tokenURI: string | null | undefined): Promise<string | null> {
  if (!tokenURI || typeof tokenURI !== "string") return null;

  const toFetch = tokenURI.startsWith("ipfs://")
    ? `https://ipfs.io/ipfs/${tokenURI.slice(7)}`
    : tokenURI;

  try {
    const res = await fetch(toFetch, { signal: AbortSignal.timeout(8000) });
    const contentType = res.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const json = await res.json();
      const image = json.image ?? json.image_url ?? json.animation_url;
      if (typeof image === "string") {
        return image.startsWith("ipfs://")
          ? `https://ipfs.io/ipfs/${image.slice(7)}`
          : image;
      }
      return null;
    }

    if (contentType.startsWith("image/")) {
      return toFetch;
    }

    return null;
  } catch {
    return null;
  }
}
