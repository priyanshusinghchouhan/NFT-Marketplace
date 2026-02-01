import {MARKETPLACE_CONTRACT_ADDRESS} from "../constants/constants";
import {NFTMarketplaceABI, ERC721_ABI} from "../abi/NFTMarketplace";
import { useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import { formatEther } from "viem";

export function useListing(listingId: number) {
    const [metadata, setMetadata] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);

    const {data: listing, isLoading: isLoadingListing} = useReadContract({
        address: MARKETPLACE_CONTRACT_ADDRESS,
        abi: NFTMarketplaceABI,
        functionName: "getListing",
        args: [BigInt(listingId)]
    });

    const {data: tokenURI} = useReadContract({
        address: listing?.[1] as `0x${string}`,
        abi: ERC721_ABI,
        functionName: "tokenURI",
        args: listing ? [listing[2]] : undefined,
        query: {
            enabled: !!listing && listing[4]
        }
    });


    useEffect(() => {
        if(!tokenURI) return;

        const fetchMetadata = async() => {
            setIsLoadingMetadata(true);
            try {
                const url = (tokenURI as string).replace("ipfs://", "https://ipfs.io/ipfs/");
                const response = await fetch(url);
                const data = await response.json();
                setMetadata(data);

                if(data.image) {
                    const imgUrl = data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
                    setImageUrl(imgUrl);
                }
            } catch(e) {
                console.log("Error fetching metadata: ", e);
            } finally {
                setIsLoadingMetadata(false);
            }
        }

        fetchMetadata();
    }, [tokenURI]);


    if(!listing) return null;


    return {
        seller: listing[0] as string,
        nftContract: listing[1] as string,
        tokenId: listing[2].toString(),
        price: formatEther(listing[3]),
        active: listing[4] as boolean,
        metadata,
        imageUrl,
        name: metadata?.name || `NFT #${listing[2].toString()}`,
        collection: metadata?.collection || "Unknown Collection",
        isLoading: isLoadingListing || isLoadingMetadata
    };
}