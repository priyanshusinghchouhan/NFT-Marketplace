import { NFTMarketplaceABI } from "@/abi/NFTMarketplace";
import { MARKETPLACE_CONTRACT_ADDRESS } from "@/constants/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export function useBuyNft() {
    const queryClient = useQueryClient();

    const {data: hash, writeContract, isPending, error} = useWriteContract();

    const {isLoading: isConfirming, isSuccess} = useWaitForTransactionReceipt({
        hash,
    });

    const [lastListingId, setLastListingId] = useState<number | null>(null);

    const buyNft = (listingId: number, price: string) => {
        setLastListingId(listingId);

        writeContract({
            address: MARKETPLACE_CONTRACT_ADDRESS,
            abi: NFTMarketplaceABI,
            functionName: "buyNft",
            args: [BigInt(listingId)],
            value: parseEther(price),
        });
    };
    
    useEffect(() => {
        if(isSuccess && lastListingId !== null) {
            setTimeout(() => {
                queryClient.invalidateQueries({
                    queryKey: ["listings"]
                });
            }, 1200);
        }
    },[isSuccess, lastListingId, queryClient])

    return {
        buyNft,
        isPending,
        isConfirming,
        isSuccess,
        error,
        hash
    };
}