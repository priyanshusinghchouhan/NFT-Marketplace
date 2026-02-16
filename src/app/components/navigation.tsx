"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "My Collections", href: "/my-nfts" },
  { label: "Recent Activity", href: "/recent-activity" },
  { label: "More", href: "/about" },
];

export function Navigation() {
  return (
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
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block text-sm font-medium text-muted-foreground hover:text-foreground">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}