import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { NFTMarketplaceABI } from "@/abi/NFTMarketplace";
import { MARKETPLACE_CONTRACT_ADDRESS } from "@/constants/constants";
import { parseEther } from "viem";

export function useUpdateListingPrice() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const updatePrice = (listingId: number, newPrice: string) => {
    if(!newPrice || Number(newPrice) <= 0) return;

    writeContract({
      address: MARKETPLACE_CONTRACT_ADDRESS,
      abi: NFTMarketplaceABI,
      functionName: "updateListingPrice",
      args: [BigInt(listingId), parseEther(newPrice)],
    });
  };

  return {
    updatePrice,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}