"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMarketplaceListings } from "../../hooks/useMarketplaceListings";
import { useListing } from "../../hooks/useListings";
import {MOCK_LISTINGS} from "../../mocks/mockListings";

function CarouselCard({ listing }: { listing: MarketplaceListing }) {
  return (
    <div className="group shrink-0">
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
            <p className="text-sm text-muted-foreground">{listing.collection}</p>
            <span className="text-xs text-neon">#{listing.tokenId}</span>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-semibold">{listing.name}</p>
            <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                      </svg>
            <span className="font-bold">{listing.price} ETH</span>
          </div>

          <Button className="w-full bg-neon text-background">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}



export function NFTCarousel() {
  const {totalListings, isLoading} = useMarketplaceListings();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  if(isLoading) {
    return <div className="px-6 py-24 text-center">Loading Marketplace...... </div>
  }

  // if(totalListings == 0){
  //   return (
  //     <div className="px-6 py-24 text-center">
  //       <p className="text-muted-foreground">No Listings yet. Be the first to list an NFT!</p>
  //     </div>
  //   )
  // } 

  return (
    <section className="relative px-6 py-24">
      <div className="relative mx-auto max-w-7xl">

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-wider text-neon">
              Featured Collection
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              Exclusive Bundle
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {MOCK_LISTINGS.length} total listings
            </p>
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

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4"
        >
          {MOCK_LISTINGS.map((listing) => (
            <CarouselCard key={listing.id} listing={listing} />
          ))}
        </div>

      </div>
    </section>
  ); 
}
