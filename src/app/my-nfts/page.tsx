"use client";

import { useAccount } from "wagmi";
import Link from "next/link";
import { Navigation } from "../components/navigation";
import { useUserNFTs } from "@/hooks/useUserNFTs";
import { OwnedNFTCard } from "../components/OwnedNFTCard";
import { Button } from "@/components/ui/button";

export default function MyNFTsPage() {
  const { address, isConnected } = useAccount();
  const { nfts, isLoading, refetch } = useUserNFTs(address);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="px-6 pt-28 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-wider text-neon">
              My Collections
            </p>
            <h1 className="mt-2 text-3xl font-bold">My NFTs</h1>
          </div>

          {!isConnected && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-card/40 py-24 text-center">
              <p className="text-muted-foreground">
                Connect your wallet to see your owned NFTs.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                NFTs are indexed from the chain and shown here.
              </p>
            </div>
          )}

          {isConnected && isLoading && (
            <div className="py-24 text-center text-muted-foreground">
              Loading your NFTs…
            </div>
          )}

          {isConnected && !isLoading && (!nfts || nfts.length === 0) && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-card/40 py-24 text-center">
              <p className="text-muted-foreground">You don’t own any NFTs yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Mint or receive NFTs on the supported network to see them here.
              </p>
              <Link href="/">
                <Button variant="outline" className="mt-4">
                  Browse marketplace
                </Button>
              </Link>
            </div>
          )}

          {isConnected && !isLoading && nfts && nfts.length > 0 && (
            <>
              <p className="mb-6 text-sm text-muted-foreground">
                {nfts.length} NFT{nfts.length !== 1 ? "s" : ""} in your wallet
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {nfts.map((nft) => (
                  <OwnedNFTCard
                    key={`${nft.contractAddress}-${nft.tokenId}`}
                    nft={nft}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
