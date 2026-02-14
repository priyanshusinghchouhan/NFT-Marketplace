import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { NFTMarketplaceABI } from "@/abi/NFTMarketplace";
import { MARKETPLACE_CONTRACT_ADDRESS } from "@/constants/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";


export function useCancelListing() {
  const queryClient = useQueryClient();

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const [lastCancelledId, setLastCancelledId] = useState<number | null>(null);

  const cancelListing = (listingId: number) => {
    if(listingId < 0) return;

    setLastCancelledId(listingId);

    writeContract({
      address: MARKETPLACE_CONTRACT_ADDRESS,
      abi: NFTMarketplaceABI,
      functionName: "cancelListing",
      args: [BigInt(listingId)],
    });
  };
  useEffect(() => {
    if(isSuccess && lastCancelledId !== null) {
      console.log("inside useEffect of cancelled listing");
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["listings"]
        })
      }, 1200);
    }
  }, [isSuccess, lastCancelledId, queryClient])

  return {
    cancelListing,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}