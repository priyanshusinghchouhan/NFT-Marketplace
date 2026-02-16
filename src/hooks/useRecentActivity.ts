import { useQuery } from "@tanstack/react-query";
import { getRecentActivity } from "@/lib/api/activity";

export function useRecentActivity(wallet?: string, limit: number = 8) {
  const query = useQuery({
    queryKey: ["recent-activity", wallet, limit],
    queryFn: () => getRecentActivity({ wallet, limit }),
  });

  return {
    activities: query.data?.activities ?? [],
    count: query.data?.count ?? 0,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

