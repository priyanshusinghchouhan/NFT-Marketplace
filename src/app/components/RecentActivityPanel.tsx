"use client";

import { useAccount } from "wagmi";
import { useRecentActivity } from "@/hooks/useRecentActivity";

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function RecentActivityPanel() {
  const { address } = useAccount();
  const { activities, isLoading, error } = useRecentActivity(undefined, 8);

  return (
    <div className="rounded-2xl border border-border/40 bg-card/70 p-4 backdrop-blur-sm">
      <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>

      {isLoading && (
        <p className="mt-3 text-sm text-muted-foreground">
          Loading recent activity...
        </p>
      )}

      {!isLoading && error && (
        <p className="mt-3 text-sm text-muted-foreground">
          Couldn&apos;t load recent activity.
        </p>
      )}

      {!isLoading && !error && activities.length === 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          No recent activity yet.
        </p>
      )}

      {!isLoading && !error && activities.length > 0 && (
        <ul className="mt-4 space-y-3 text-sm">
          {activities.map((a) => (
            <li
              key={a.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-border/30 bg-background/40 px-3 py-2"
            >
              <div className="space-y-0.5">
                <p className="font-medium text-foreground">
                  {a.type === "LISTED" && "Listed an NFT"}
                  {a.type === "SOLD" && "NFT sold"}
                  {a.type === "MINTED" && "Minted an NFT"}
                  {a.type === "TRANSFER" && "Transferred an NFT"}
                  {a.type === "CANCELLED" && "Cancelled a listing"}
                  {a.type === "PRICE_UPDATED" && "Updated listing price"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {shortenAddress(a.wallet)}
                </p>
              </div>

              <a
                href={`https://sepolia.etherscan.io/tx/${a.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-neon hover:underline"
              >
                View
              </a>
            </li>
          ))}
        </ul>
      )}

      {address && (
        <p className="mt-4 text-xs text-muted-foreground">
          Connected as <span className="font-mono">{shortenAddress(address)}</span>
        </p>
      )}
    </div>
  );
}

