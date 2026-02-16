import { useQuery } from "@tanstack/react-query";
import { getNFTsByOwner } from "@/lib/api/users";

export function useUserNFTs(wallet: string | undefined) {
  const query = useQuery({
    queryKey: ["user-nfts", wallet],
    queryFn: () => getNFTsByOwner(wallet!),
    enabled: !!wallet,
  });

  return {
    nfts: query.data?.nfts ?? [],
    count: query.data?.count ?? 0,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
