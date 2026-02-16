"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { useResolvedNFTImage } from "@/hooks/useResolvedNFTImage";
import type { UserNFT } from "@/types/nft";
import { formatEther } from "viem";
import { ListNFTModal } from "./ListNftModal";
import { NFTDetailModal } from "./NFTDetailModal";

interface OwnedNFTCardProps {
  nft: UserNFT;
}

export function OwnedNFTCard({ nft }: OwnedNFTCardProps) {
  const [listModalOpen, setListModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const { address } = useAccount();

  const { imageUrl, resolved } = useResolvedNFTImage(nft.tokenURI, {
    listingId: nft.listingId,
    tokenId: nft.tokenId,
  });

  const shortContract =
    nft.contractAddress.slice(0, 6) + "..." + nft.contractAddress.slice(-4);

  const listing = nft.listed && nft.listingId && nft.price && address
    ? {
        id: Number(nft.listingId),
        name: `NFT #${nft.tokenId}`,
        collection: "Marketplace Collection",
        tokenId: nft.tokenId,
        price: formatEther(BigInt(nft.price)),
        image: imageUrl || "",
        seller: address.toLowerCase(),
        nftContract: nft.contractAddress,
      }
    : null;

  return (
    <>
      <div className="group shrink-0">
        <div className="relative overflow-hidden rounded-3xl border border-border/30 bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-neon/40">
          <div className="relative h-64 w-64 overflow-hidden rounded-2xl">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={`NFT #${nft.tokenId}`}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
            )}
            {!resolved && (
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                Loading…
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">{shortContract}</p>
              <span className="text-xs text-neon">#{nft.tokenId}</span>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold">NFT #{nft.tokenId}</p>
              {nft.listed ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm">
                    <span className="text-muted-foreground">Listed</span>
                    <span className="font-medium text-neon">
                      {nft.price ? `${formatEther(BigInt(nft.price))} ETH` : "—"}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDetailModalOpen(true)}
                    className="w-full"
                  >
                    Manage listing
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setListModalOpen(true)}
                  className="w-full bg-neon text-background hover:bg-neon/90"
                >
                  List for sale
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ListNFTModal
        isOpen={listModalOpen}
        onClose={() => setListModalOpen(false)}
        initialContract={nft.contractAddress}
        initialTokenId={nft.tokenId}
      />

      {listing && (
        <NFTDetailModal
          listing={listing}
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
        />
      )}
    </>
  );
}
