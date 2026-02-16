import { useState, useEffect } from "react";
import { resolveTokenURIToImage } from "@/lib/utils/resolveTokenURI";
import { PLACEHOLDER_IMAGES } from "@/constants/placeholders";

/**
 * Returns image URL for an owned NFT: resolved from tokenURI, or placeholder.
 * Placeholder uses tokenId only so the same NFT keeps the same image when listed/unlisted.
 */
export function useResolvedNFTImage(
  tokenURI: string | null | undefined,
  options: { listingId?: string; tokenId: string }
) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [resolved, setResolved] = useState(false);

  const { tokenId } = options;

  useEffect(() => {
    const placeholder =
      PLACEHOLDER_IMAGES[Number(tokenId) % PLACEHOLDER_IMAGES.length];

    if (!tokenURI) {
      setImageUrl(placeholder);
      setResolved(true);
      return;
    }

    let cancelled = false;
    setResolved(false);

    resolveTokenURIToImage(tokenURI).then((url) => {
      if (cancelled) return;
      if (url) {
        setImageUrl(url);
      } else {
        setImageUrl(placeholder);
      }
      setResolved(true);
    });

    return () => {
      cancelled = true;
    };
  }, [tokenURI, tokenId]);

  return { imageUrl, resolved };
}
