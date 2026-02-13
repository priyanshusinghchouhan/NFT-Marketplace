"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useCancelListing } from "@/hooks/useCancelListing";
import { useUpdateListingPrice } from "../../hooks/useUpdateListingPrice";
import { useBuyNft } from "../../hooks/useBuyNft";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type ActionType = "buy" | "cancel" | "update" | null;

interface NFTDetailModalProps {
  listing: {
    id: number;
    name: string;
    collection: string;
    tokenId: string;
    price: string;
    image: string;
    seller: string;
    nftContract: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function NFTDetailModal({
  listing,
  isOpen,
  onClose,
}: NFTDetailModalProps) {
  const { address } = useAccount();

  const buy = useBuyNft();
  const cancel = useCancelListing();
  const update = useUpdateListingPrice();

  const [newPrice, setNewPrice] = useState("");
  const [showPriceUpdate, setShowPriceUpdate] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionType>(null);

  const isSeller = address?.toLowerCase() === listing.seller.toLowerCase();
  
  useEffect(() => {
    if (buy.isSuccess || cancel.isSuccess || update.isSuccess) {
      onClose();
    }
  }, [
    buy.isSuccess,
    cancel.isSuccess,
    update.isSuccess,
    onClose,
  ]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl border border-border/30 bg-card p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-muted rounded"
        >
          <X size={16} />
        </button>

        <div className="grid gap-8 md:grid-cols-2">
          <img
            src={listing.image}
            alt={listing.name}
            className="rounded-2xl border border-border/30"
          />

          <div>
            <h2 className="text-3xl font-bold mb-2">{listing.name}</h2>
            <p className="text-muted-foreground mb-6">{listing.collection}</p>

            <div className="mb-6">
              <span className="text-3xl font-bold">{listing.price} ETH</span>
            </div>

            {!isSeller ? (
              <Button
                size="lg"
                className="w-full bg-neon text-background"
                disabled={buy.isPending || buy.isConfirming}
                onClick={() => {
                  setActiveAction("buy");
                  buy.buyNft(listing.id, listing.price);
                }}
              >
                {buy.isPending && "Confirm in wallet..."}
                {buy.isConfirming && "Processing..."}
                {buy.isSuccess && "Purchased ✓"}
                {!buy.isPending &&
                  !buy.isConfirming &&
                  !buy.isSuccess &&
                  "Buy Now"}
              </Button>
            ) : (
              <div className="space-y-3">
                {/* Cancel */}
                <Button
                  variant="outline"
                  className="w-full border-red-500 text-red-500"
                  disabled={cancel.isPending || cancel.isConfirming}
                  onClick={() => {
                    setActiveAction("cancel");
                    cancel.cancelListing(listing.id);
                  }}
                >
                  {cancel.isPending && "Confirm..."}
                  {cancel.isConfirming && "Cancelling..."}
                  {cancel.isSuccess && "Cancelled ✓"}
                  {!cancel.isPending &&
                    !cancel.isConfirming &&
                    !cancel.isSuccess &&
                    "Cancel Listing"}
                </Button>

                {!showPriceUpdate ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowPriceUpdate(true)}
                  >
                    Update Price
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="New price in ETH"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full rounded border px-3 py-2"
                    />
                    <Button
                      className="w-full bg-neon text-background"
                      disabled={
                        !newPrice || update.isPending || update.isConfirming
                      }
                      onClick={() => {
                        setActiveAction("update");
                        update.updatePrice(listing.id, newPrice);
                      }}
                    >
                      {update.isPending && "Confirm..."}
                      {update.isConfirming && "Updating..."}
                      {update.isSuccess && "Updated ✓"}
                      {!update.isPending &&
                        !update.isConfirming &&
                        !update.isSuccess &&
                        "Update Price"}
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setShowPriceUpdate(false);
                        setNewPrice("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            )}

            {(buy.isSuccess || cancel.isSuccess || update.isSuccess) && (
              <div className="mt-4 rounded bg-neon/10 border border-neon/30 p-3">
                <p className="text-sm text-neon font-medium">
                  {activeAction === "buy" &&
                    "Purchase successful. NFT is now yours."}
                  {activeAction === "cancel" &&
                    "Listing cancelled successfully."}
                  {activeAction === "update" && "Price updated successfully."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
