"use client";

import { Navigation } from "../components/navigation";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="px-6 pt-28 pb-24">
        <div className="mx-auto max-w-3xl space-y-10">
          <header>
            <p className="text-sm uppercase tracking-wider text-neon">
              About
            </p>
            <h1 className="mt-2 text-3xl font-bold text-foreground">
              About this NFT marketplace
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              This app is a full-stack NFT marketplace on the Sepolia testnet,
              powered by a smart contract, an indexer backend, and this
              Next.js frontend.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              Get Sepolia test ETH
            </h2>
            <p className="text-sm text-muted-foreground">
              You&apos;ll need Sepolia ETH to mint, list, and buy NFTs. Use any
              of these faucets:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon hover:underline"
                >
                  sepoliafaucet.com
                </a>
              </li>
              <li>
                <a
                  href="https://console.optimism.io/faucet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon hover:underline"
                >
                  Superchain Sepolia faucet
                </a>
              </li>
              <li>
                <a
                  href="https://www.alchemy.com/faucets/ethereum-sepolia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon hover:underline"
                >
                  Alchemy Sepolia faucet
                </a>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              How it works
            </h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">
                  Smart contracts:
                </span>{" "}
                The marketplace contract (and NFT contract) live on Sepolia.
                They handle listing, buying, cancelling, and updating listing
                prices.
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Indexer backend:
                </span>{" "}
                A Node/Express service listens to on-chain events (mints,
                transfers, listings, sales) and writes them into a PostgreSQL
                database via Prisma.
              </p>
              <p>
                <span className="font-medium text-foreground">
                  REST API:
                </span>{" "}
                The frontend talks to the backend via endpoints like{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  /marketplace/listings
                </code>{" "}
                and{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  /users/:wallet/nfts
                </code>{" "}
                to fetch listings, user NFTs, and recent activity.
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Frontend:
                </span>{" "}
                This Next.js app uses wagmi, RainbowKit, and React Query to
                connect your wallet, call the contracts, and keep UI state in
                sync with the indexed data.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

