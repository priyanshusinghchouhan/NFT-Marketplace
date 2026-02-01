import {useWriteContract,  useWaitForTransactionReceipt,useReadContract,useAccount,} from "wagmi";
import { MARKETPLACE_CONTRACT_ADDRESS } from "../constants/constants";
import { NFTMarketplaceABI, ERC721_ABI } from "../abi/NFTMarketplace";
import { parseEther } from "viem";


export function useListNFT(nftContract: `0x${string}` | null, tokenId: bigint | null) {
  const { address: owner } = useAccount();
  
  const { data: approvedAddress } = useReadContract({
    address: nftContract ?? undefined,
    abi: ERC721_ABI,
    functionName: "getApproved",
    args: tokenId ? [tokenId] : undefined,
    query: { enabled: !!nftContract && !!tokenId },
  });

  const { data: isApprovedForAll } = useReadContract({
    address: nftContract ?? undefined,
    abi: ERC721_ABI,
    functionName: "isApprovedForAll",
    args: owner ? [owner, MARKETPLACE_CONTRACT_ADDRESS] : undefined,
    query: { enabled: !!owner && !!nftContract },
  });

  const needsApproval =
    !!nftContract &&
    !!tokenId &&
    approvedAddress?.toLowerCase() !== MARKETPLACE_CONTRACT_ADDRESS.toLowerCase() &&
    !isApprovedForAll;

  const {
    writeContract: approve,
    data: approveHash,
    isPending: isApproving,
    error: approveError,
  } = useWriteContract();

  const { isLoading: isApproveConfirming, isSuccess: approveSuccess } =
    useWaitForTransactionReceipt({ hash: approveHash });

  const {
    writeContract: list,
    data: listHash,
    isPending: isListing,
    error: listError
  } = useWriteContract();

  const {
    isLoading: isListConfirming,
    isSuccess: listSuccess,
  } = useWaitForTransactionReceipt({ hash: listHash });

  const approveNFT = () => {
    if (!nftContract || !tokenId) return;

    approve({
      address: nftContract,
      abi: ERC721_ABI,
      functionName: "approve",
      args: [MARKETPLACE_CONTRACT_ADDRESS, tokenId],
    });
  };

  const listNFT = (priceEth: string) => {
    if (!nftContract || !tokenId) return;

    list({
      address: MARKETPLACE_CONTRACT_ADDRESS,
      abi: NFTMarketplaceABI,
      functionName: "listNft",
      args: [nftContract, tokenId, parseEther(priceEth)],
    });
  };

  return {
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
    listError
  };
}
