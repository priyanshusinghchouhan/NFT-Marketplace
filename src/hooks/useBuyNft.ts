import { NFTMarketplaceABI } from "@/abi/NFTMarketplace";
import { MARKETPLACE_CONTRACT_ADDRESS } from "@/constants/constants";
import { parseEther } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export function useBuyNft() {
    const {data: hash, writeContract, isPending, error} = useWriteContract();

    const {isLoading: isConfirming, isSuccess} = useWaitForTransactionReceipt({
        hash,
    });

    const buyNft = (listingId: number, price: string) => {
        writeContract({
            address: MARKETPLACE_CONTRACT_ADDRESS,
            abi: NFTMarketplaceABI,
            functionName: "buyNft",
            args: [BigInt(listingId)],
            value: parseEther(price),
        });
    };

    return {
        buyNft,
        isPending,
        isConfirming,
        isSuccess,
        error,
        hash
    };
}