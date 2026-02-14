"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useListNFT } from "../../hooks/useListNft";
import { useMarketplaceListings } from "@/hooks/useMarketplaceListings";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ListNFTModal({ isOpen, onClose }: Props) {
  const [contract, setContract] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const [step, setStep] = useState<"input" | "approving" | "listing">("input");

  const nftContract =
    contract && contract.startsWith("0x") ? (contract as `0x${string}`) : null;

  const tokenIdBigInt = tokenId ? BigInt(tokenId) : null;

  const {
    needsApproval,
    approveNFT,
    listNFT,

    isApproving,
    isApproveConfirming,
    approveSuccess,
    approveError,

    isListing,
    isListConfirming,
    listSuccess,
    listError,
  } = useListNFT(nftContract, tokenIdBigInt);

  useEffect(() => {
    if (approveSuccess && step === "approving") {
      setStep("listing");
      listNFT(price);
    }
  }, [approveSuccess, step, price, listNFT]);

  useEffect(() => {
    if (approveError && step === "approving") {
      setStep("input");
    }
  }, [approveError, step]);

  useEffect(() => {
    if (listError && step === "listing") {
      setStep("input");
    }
  }, [listError, step]);

  useEffect(() => {
    if (listSuccess) {
      setTimeout(() => {
        reset();
        onClose();
      }, 1200);
    }
  }, [listSuccess, onClose]);

  const reset = () => {
    setContract("");
    setTokenId("");
    setPrice("");
    setStep("input");
  };

  const handleSubmit = () => {
    if (!nftContract || !tokenIdBigInt || !price) return;

    if (needsApproval) {
      setStep("approving");
      approveNFT();
    } else {
      setStep("listing");
      listNFT(price);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-muted rounded"
        >
          <X size={16} />
        </button>

        <h2 className="text-xl font-bold mb-4">List NFT</h2>

        <div className="space-y-4">
          <input
            placeholder="NFT contract address"
            value={contract}
            onChange={(e) => setContract(e.target.value)}
            disabled={step !== "input"}
            className="w-full rounded border px-3 py-2"
          />

          <input
            placeholder="Token ID"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            disabled={step !== "input"}
            className="w-full rounded border px-3 py-2"
          />

          <input
            placeholder="Price in ETH"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={step !== "input"}
            className="w-full rounded border px-3 py-2"
          />

          {step !== "input" && (
            <div className="text-sm text-neon">
              {step === "approving" && (
                <>
                  {isApproving && "Confirm approval in wallet…"}
                  {isApproveConfirming && "Approving marketplace…"}
                  {approveError && "Approval cancelled"}
                  {approveSuccess && "Approval confirmed"}
                </>
              )}
              {step === "listing" && (
                <>
                  {isListing && "Confirm listing in wallet…"}
                  {isListConfirming && "Listing NFT…"}
                  {listError && "Listing cancelled"}
                  {listSuccess && "NFT listed successfully"}
                </>
              )}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={step !== "input" || isApproving || isListing}
            className="w-full bg-neon text-background"
          >
            {needsApproval ? "Approve & List" : "List NFT"}
          </Button>
        </div>
      </div>
    </div>
  );
}
