import { Navigation } from "../app/components/navigation"
import { HeroSection } from "../app/components/hero-section"
import { NFTCarousel } from "../app/components/nft-carousel"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <NFTCarousel />
      
      {/* Footer */}
      <footer className="border-t border-border/30 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon">
                <span className="text-sm font-bold text-background">N</span>
              </div>
              <span className="text-lg font-bold text-foreground">NFT Market</span>
            </div>
            
            <div className="flex gap-8">
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Support
              </a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2026 NFT Market. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
