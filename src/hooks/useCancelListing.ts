import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { NFTMarketplaceABI } from "@/abi/NFTMarketplace";
import { MARKETPLACE_CONTRACT_ADDRESS } from "@/constants/constants";


export function useCancelListing() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const cancelListing = (listingId: number) => {
    if(listingId < 0) return;
    
    writeContract({
      address: MARKETPLACE_CONTRACT_ADDRESS,
      abi: NFTMarketplaceABI,
      functionName: "cancelListing",
      args: [BigInt(listingId)],
    });
  };

  return {
    cancelListing,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}