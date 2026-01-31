"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {useMarketplaceListings} from "../../hooks/useMarketplaceListings";

const nftItems = [
  { id: 1, image: "/nft-1.jpg", number: "#101", price: "0.45", collection: "Chocotoycute" },
  { id: 2, image: "/nft-2.jpg", number: "#102", price: "0.68", collection: "Chocotoycute" },
  { id: 3, image: "https://i.pinimg.com/736x/33/71/0b/33710b273ed1e486862440e0446dfc18.jpg", number: "#103", price: "0.52", collection: "Chocotoycute" },
  { id: 4, image: "/nft-4.jpg", number: "#104", price: "0.75", collection: "Chocotoycute" },
  { id: 5, image: "/nft-5.jpg", number: "#105", price: "0.89", collection: "Chocotoycute" },
  { id: 6, image: "/nft-6.jpg", number: "#106", price: "0.61", collection: "Chocotoycute" },
]

export function NFTCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const {totalListings} = useMarketplaceListings();

  console.log("totalListing: ", totalListings);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="relative px-6 py-24">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-glow-purple/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-neon">Featured Collection</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              Exclusive Bundle From Chocotoycute
            </h2>
          </div>

          {/* Navigation buttons */}
          <div className="hidden gap-2 sm:flex">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-border/50 backdrop-blur-sm transition-all hover:border-neon/50 hover:bg-neon/10 bg-transparent"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-border/50 backdrop-blur-sm transition-all hover:border-neon/50 hover:bg-neon/10 bg-transparent"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-6 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {nftItems.map((item) => (
            <div
              key={item.id}
              className="group flex-shrink-0"
            >
              <div className="relative overflow-hidden rounded-3xl border border-border/30 bg-card/60 p-4 backdrop-blur-sm transition-all duration-300 hover:border-neon/40 hover:bg-card/80 hover:shadow-[0_0_30px_rgba(200,255,100,0.15)]">
                {/* Image container */}
                <div className="relative h-64 w-64 overflow-hidden rounded-2xl">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={`NFT ${item.number}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <Button className="rounded-full bg-neon px-6 font-semibold text-background shadow-[0_0_20px_rgba(200,255,100,0.5)]">
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Card content */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{item.collection}</p>
                    <span className="rounded-full bg-neon/10 px-2 py-0.5 text-xs font-medium text-neon">
                      {item.number}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-foreground">Cute Character</p>
                    <div className="flex items-center gap-1">
                      <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                      </svg>
                      <span className="font-bold text-foreground">{item.price} ETH</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile navigation */}
        <div className="mt-6 flex justify-center gap-2 sm:hidden">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-border/50 bg-transparent"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-border/50 bg-transparent"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
