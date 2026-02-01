"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const floatingCards = [
  { id: 1, image: "https://wallpapercave.com/wp/wp15409393.jpg", rotation: -12, x: 0, y: 0, z: 3 },
  { id: 2, image: "https://i.pinimg.com/736x/33/71/0b/33710b273ed1e486862440e0446dfc18.jpg", rotation: 8, x: 80, y: 60, z: 2 },
  { id: 3, image: "https://wallpapercave.com/wp/wp15409393.jpg", rotation: -5, x: 40, y: 140, z: 1 },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-glow-purple/30 via-background to-background" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-glow-blue/20 via-transparent to-transparent" />

      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-glow-purple/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-glow-blue/20 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="max-w-2xl">
            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              Trade{" "}
              <span className="bg-linear-to-r from-neon to-[#9eff00] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(200,255,100,0.5)]">
                NFTs
              </span>{" "}
               Directly On-Chain.
            </h1>

            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Buy, list, and manage NFTs through a fully on-chain marketplace.
              No custodians. No middlemen. Just smart contracts.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="group rounded-full bg-neon px-8 text-lg font-semibold text-background shadow-[0_0_30px_rgba(200,255,100,0.4)] transition-all hover:bg-neon/90 hover:shadow-[0_0_40px_rgba(200,255,100,0.6)]"
              >
                Explore
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-border/50 px-8 text-lg font-semibold text-foreground backdrop-blur-sm transition-all hover:border-neon/50 hover:bg-neon/10 bg-transparent"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-8 border-t border-border/30 pt-8">
              <div>
                <p className="text-3xl font-bold text-foreground">On-chain</p>
                <p className="text-sm text-muted-foreground">Marketplace</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">Wallet-based</p>
                <p className="text-sm text-muted-foreground">Trading</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">Sepolia</p>
                <p className="text-sm text-muted-foreground">Testnet</p>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block min-h-105">
            <div className="absolute left-4 top-20 h-12 w-12 animate-bounce rounded-full bg-linear-to-br from-neon/80 to-neon/40 shadow-[0_0_20px_rgba(200,255,100,0.5)]" style={{ animationDuration: "3s" }} />
            <div className="absolute bottom-32 right-8 h-8 w-8 animate-bounce rounded-full bg-linear-to-br from-glow-purple/80 to-glow-blue/60 shadow-[0_0_15px_rgba(139,92,246,0.5)]" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
            <div className="absolute right-32 top-8 h-6 w-6 animate-bounce rounded-full bg-linear-to-br from-glow-blue/80 to-glow-purple/60 shadow-[0_0_12px_rgba(99,102,241,0.5)]" style={{ animationDuration: "2s", animationDelay: "1s" }} />

            {floatingCards.map((card, index) => (
              <div
                key={card.id}
                className="absolute transition-transform duration-500 hover:scale-105"
                style={{
                  left: `${card.x}px`,
                  top: `${card.y}px`,
                  zIndex: card.z,
                  transform: `rotate(${card.rotation}deg)`,
                }}
              >
                <div className="group relative overflow-hidden rounded-3xl border border-border/30 bg-card/80 p-3 shadow-2xl backdrop-blur-sm transition-all hover:border-neon/30 hover:shadow-[0_0_40px_rgba(200,255,100,0.2)]">
                  <div className="relative h-56 w-48 overflow-hidden rounded-2xl">
                    <Image
                      src={card.image || "/placeholder.svg"}
                      alt={`NFT Character ${card.id}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-3 px-1">
                    <p className="text-xs text-muted-foreground">Chocotoycute</p>
                    <div className="mt-1 flex items-center justify-between">
                      <p className="font-semibold text-foreground">#{100 + index}</p>
                      <p className="text-sm font-medium text-neon">{(0.5 + index * 0.2).toFixed(1)} ETH</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
