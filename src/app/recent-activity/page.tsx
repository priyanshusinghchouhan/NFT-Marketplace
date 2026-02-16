"use client";

import { Navigation } from "../components/navigation";
import { RecentActivityPanel } from "../components/RecentActivityPanel";

export default function RecentActivityPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="px-6 pt-28 pb-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-wider text-neon">
              Marketplace
            </p>
            <h1 className="mt-2 text-3xl font-bold">Recent Activity</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Latest mints, listings, sales, and transfers indexed from the
              marketplace contracts.
            </p>
          </div>

          <RecentActivityPanel />
        </div>
      </section>
    </main>
  );
}

