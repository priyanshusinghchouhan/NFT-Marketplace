import {MARKETPLACE_CONTRACT_ADDRESS} from "../constants/constants";
import {NFTMarketplaceABI} from "../abi/NFTMarketplace";
import { useReadContract } from "wagmi";

export function useMarketplaceListings() {
    const {data: totalListings, isLoading} = useReadContract({
        address: MARKETPLACE_CONTRACT_ADDRESS,
        abi: NFTMarketplaceABI,
        functionName: "getTotalListings"
    });

    return {
        totalListings : totalListings ? Number(totalListings) : 0,
        isLoading
    }
}