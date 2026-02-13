import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { NFTMarketplaceABI } from "@/abi/NFTMarketplace";
import { MARKETPLACE_CONTRACT_ADDRESS } from "@/constants/constants";
import { parseEther } from "viem";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useUpdateListingPrice() {
  const queryClient = useQueryClient();

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const [lastUpdatedId, setLastUpdatedId] = useState<number | null>(null);

  const updatePrice = (listingId: number, newPrice: string) => {
    if(!newPrice || Number(newPrice) <= 0) return;

    setLastUpdatedId(listingId);

    writeContract({
      address: MARKETPLACE_CONTRACT_ADDRESS,
      abi: NFTMarketplaceABI,
      functionName: "updateListingPrice",
      args: [BigInt(listingId), parseEther(newPrice)],
    });
  };

  console.log("before useUpdate useEffect");

    useEffect(() => {
      if(isSuccess && lastUpdatedId !== null) {
        setTimeout(() => {
          queryClient.invalidateQueries({
            queryKey:["listings"]
          })
        }, 1200);
      }
    }, [isSuccess, lastUpdatedId, queryClient])
  

  return {
    updatePrice,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}