import { MARKETPLACE_CONTRACT_ADDRESS } from "../constants/constants";
import { NFTMarketplaceABI, ERC721_ABI } from "../abi/NFTMarketplace";
import { useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import { formatEther } from "viem";

export function useListing(listingId: number) {
  const [metadata, setMetadata] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);

  const { data: listingData, isLoading: isLoadingListing, refetch } = useReadContract({
    address: MARKETPLACE_CONTRACT_ADDRESS,
    abi: NFTMarketplaceABI,
    functionName: "getListing",
    args: [BigInt(listingId)],
  });

  const { data: tokenURI } = useReadContract({
    address: listingData?.[1] as `0x${string}`,
    abi: ERC721_ABI,
    functionName: "tokenURI",
    args: listingData ? [listingData[2]] : undefined,
    query: {
      enabled: !!listingData && listingData[4],
    },
  });

  useEffect(() => {
    if (!tokenURI) return;

    const fetchMetadata = async () => {
      setIsLoadingMetadata(true);
      try {
        const url = (tokenURI as string).replace(
          "ipfs://",
          "https://ipfs.io/ipfs/",
        );
        const response = await fetch(url);
        const data = await response.json();
        setMetadata(data);

        if (data.image) {
          const imgUrl = data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
          setImageUrl(imgUrl);
        }
      } catch (e) {
        console.log("Error fetching metadata: ", e);
      } finally {
        setIsLoadingMetadata(false);
      }
    };

    fetchMetadata();
  }, [tokenURI]);

  const isLoading = isLoadingListing || isLoadingMetadata;

  if (!listingData) {
    return {
      listing: null,
      isLoading,
    };
  }

  return {
    listing: {
      seller: listingData[0] as string,
      nftContract: listingData[1] as string,
      tokenId: listingData[2].toString(),
      price: formatEther(listingData[3]),
      active: listingData[4] as boolean,
      metadata,
      imageUrl,
      name: metadata?.name || `NFT #${listingData[2].toString()}`,
      collection: metadata?.collection || "Unknown Collection",
    },
    isLoading,
    refetch
  };
}
