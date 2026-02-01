"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMarketplaceListings } from "../../hooks/useMarketplaceListings";
import { useListing } from "../../hooks/useListings";
import { MOCK_LISTINGS, USE_MOCK_DATA } from "../../mocks/mockListings";
import {FullMarketplaceListing,MarketplaceListing} from "../../types/listing";
import { NFTDetailModal } from "./NFTDetailModal";

const PLACEHOLDER_IMAGES = [
  "https://i.pinimg.com/1200x/e3/75/b5/e375b5bc3d3e2df39d59b7fcad7793bd.jpg",
  "https://i.pinimg.com/736x/e2/e7/13/e2e71377191de1ef3274cd1664730d27.jpg",
  "https://i.pinimg.com/736x/fd/b2/f3/fdb2f3b594d52a04de454be42a6ac69d.jpg",
  "https://i.pinimg.com/1200x/89/42/6b/89426b0cad23f00f762c6768b3292db0.jpg",
  "https://i.pinimg.com/1200x/51/f0/c1/51f0c1318f77d45ccf4d7a026282adaf.jpg",
  "https://i.pinimg.com/736x/72/a4/e1/72a4e1f16e86e8f7388d6b95d55bb715.jpg",
  "https://i.pinimg.com/1200x/21/93/4b/21934b0b34b3b55ab21c683a3677faf1.jpg"
];

function CarouselCard({listing, onActionComplete, }: {
  listing: FullMarketplaceListing;
  onActionComplete: () => void;
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
        onActionComplete={onActionComplete}
      />
    </>
  );
}

function RealListingCard({
  listingId,
  onActionComplete,
}: {
  listingId: number;
  onActionComplete: () => void;
}) {
  const { listing, isLoading, refetch } = useListing(listingId);
  const placeholderImage = PLACEHOLDER_IMAGES[listingId % PLACEHOLDER_IMAGES.length];

  if (isLoading)
    return (
      <div className="px-6 py-24 text-center">Loading Your NFT's...... </div>
    );

  if (!listing || !listing.active) return null;

  const mappedListing: FullMarketplaceListing = {
    id: listingId,
    name: listing.name,
    collection: listing.collection,
    tokenId: listing.tokenId,
    price: listing.price,
    image: listing.imageUrl || placeholderImage,
    seller: listing.seller,
    nftContract: listing.nftContract,
  };

  return (
    <CarouselCard
      key={`${listingId}-${listing.price}-${listing.active}`}
      listing={mappedListing}
      onActionComplete={() => {
        refetch();
        onActionComplete();
      }}
    />
  );
}

export function NFTCarousel() {
  const {
    totalListings,
    isLoading,
    refetch: refetchListings,
  } = useMarketplaceListings();

  const scrollRef = useRef<HTMLDivElement>(null);
  const listingIds = Array.from(
    { length: Number(totalListings) },
    (_, i) => i
  );


  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  function adaptMockToFullListing(
    mock: MarketplaceListing,
  ): FullMarketplaceListing {
    return {
      ...mock,
      seller: "0x0000000000000000000000000000000000000000",
      nftContract: "0x0000000000000000000000000000000000000000",
    };
  }

  if (isLoading) {
    return (
      <div className="px-6 py-24 text-center">Loading Marketplace...... </div>
    );
  }

  if (totalListings == 0) {
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
          {USE_MOCK_DATA
            ? MOCK_LISTINGS.map((listing) => (
                <CarouselCard
                  key={listing.id}
                  listing={adaptMockToFullListing(listing)}
                  onActionComplete={refetchListings}
                />
              ))
            : listingIds.map((id) => (
                <RealListingCard
                  key={id}
                  listingId={id}
                  onActionComplete={refetchListings}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
