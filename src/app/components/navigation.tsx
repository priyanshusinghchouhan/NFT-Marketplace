"use client";

import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ListNFTModal } from "../../app/components/ListNftModal";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";

const navLinks = [
  { label: "Learn", href: "#" },
  { label: "Collections", href: "#" },
  { label: "Creators", href: "#" },
  { label: "More", href: "#" },
];

export function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) setIsModalOpen(false);
  }, [isConnected]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-card/60 px-6 py-3 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon">
                <span className="text-sm font-bold text-background">N</span>
              </div>
              <span className="text-lg font-bold text-foreground">
                NFT Market
              </span>
            </div>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground hover:text-foreground">
              <Button
                onClick={() => setIsModalOpen(true)}
                disabled={!isConnected}
              >
                {isConnected ? "List NFT" : "Connect Wallet"}
              </Button>

              <div className="hidden md:block">
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <ListNFTModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
