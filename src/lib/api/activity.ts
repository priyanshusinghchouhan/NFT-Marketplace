import { api } from "./client";
import type { RecentActivityResponse } from "@/types/activity";

export async function getRecentActivity(options?: {
  wallet?: string;
  limit?: number;
}): Promise<RecentActivityResponse> {
  const params = new URLSearchParams();

  if (options?.wallet) {
    params.set("wallet", options.wallet);
  }
  if (options?.limit !== undefined) {
    params.set("limit", String(options.limit));
  }

  const query = params.toString();
  const { data } = await api.get<RecentActivityResponse>(
    `/activity/recent${query ? `?${query}` : ""}`,
  );

  return data;
}

