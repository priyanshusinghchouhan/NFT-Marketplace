import { useQuery } from "@tanstack/react-query";
import { getListings } from "@/lib/api/marketplace";

export function useListings(){
  const query = useQuery({
    queryKey: ["listings"],
    queryFn: getListings
  });

  return {
    listings: query.data?.listings ?? [],
    count: query.data?.count ?? 0,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }
}