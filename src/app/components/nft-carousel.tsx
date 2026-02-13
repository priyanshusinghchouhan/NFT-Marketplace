"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useListings } from "../../hooks/useListings";
import {FullMarketplaceListing} from "../../types/listing";
import { NFTDetailModal } from "./NFTDetailModal";
import { formatEther } from "viem";

const PLACEHOLDER_IMAGES = [
  "https://i.pinimg.com/1200x/e3/75/b5/e375b5bc3d3e2df39d59b7fcad7793bd.jpg",
  "https://i.pinimg.com/736x/e2/e7/13/e2e71377191de1ef3274cd1664730d27.jpg",
  "https://i.pinimg.com/736x/fd/b2/f3/fdb2f3b594d52a04de454be42a6ac69d.jpg",
  "https://i.pinimg.com/1200x/89/42/6b/89426b0cad23f00f762c6768b3292db0.jpg",
  "https://i.pinimg.com/1200x/51/f0/c1/51f0c1318f77d45ccf4d7a026282adaf.jpg",
  "https://i.pinimg.com/736x/72/a4/e1/72a4e1f16e86e8f7388d6b95d55bb715.jpg",
  "https://i.pinimg.com/1200x/21/93/4b/21934b0b34b3b55ab21c683a3677faf1.jpg",
  "https://i.pinimg.com/736x/97/f3/a0/97f3a02aacd095dab5ff6e61ea7c0962.jpg",
  "https://i.pinimg.com/736x/1c/d2/94/1cd294a16e0a84019f4d177aea4016b2.jpg",
  "https://i.pinimg.com/736x/9b/c0/4d/9bc04d5e3e74058aa0b5ad629a12db0c.jpg",
];

function CarouselCard({listing, }: {
  listing: FullMarketplaceListing;
}) {
  const [showDetail, setShowDetail] = useState(false);
  

  return (
    <>
      <div className="group shrink-0">
        <div className="cursor-pointer" onClick={() => setShowDetail(true)}>
          <div className="relative overflow-hidden rounded-3xl border border-border/30 bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-neon/40">
            <div className="relative h-64 w-64 overflow-hidden rounded-2xl">
              <img
                src={listing.image}
                alt={listing.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  {listing.collection}
                </p>
                <span className="text-xs text-neon">#{listing.tokenId}</span>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-semibold">{listing.name}</p>
                <span className="font-bold">{listing.price} ETH</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NFTDetailModal
        key={listing.id}
        listing={listing}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
}


export function NFTCarousel() {
  const { listings, isLoading, refetch } = useListings();
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <div className="px-6 py-24 text-center">Loading Marketplace...... </div>
    );
  }

  if ( !listings || listings.length === 0) {
    return (
      <div className="px-6 py-24 text-center">
        <p className="text-muted-foreground">
          No Listings yet. Be the first to list an NFT!
        </p>
      </div>
    );
  }

  return (
    <section className="relative px-6 py-24">
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-wider text-neon">
              Featured Collection
            </p>
            <h2 className="mt-2 text-3xl font-bold">Exclusive Bundle</h2>
          </div>

          <div className="hidden gap-2 sm:flex">
            <Button size="icon" onClick={() => scroll("left")}>
              <ChevronLeft />
            </Button>
            <Button size="icon" onClick={() => scroll("right")}>
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4">
          {listings.map((listing: any, index: number) => {
            const mappedListing: FullMarketplaceListing = {
              id: Number(listing.listingId),
              name: `NFT #${listing.tokenId}`,
              collection: `Marketplace Collection`,
              tokenId: listing.tokenId,
              price: formatEther(BigInt(listing.price)),
              image: PLACEHOLDER_IMAGES[Number(listing.listingId) % PLACEHOLDER_IMAGES.length],
              seller: listing.seller,
              nftContract: listing.nftContract,
            };

            return ( 
              <CarouselCard 
                key={listing.listingId}
                  listing={mappedListing}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
