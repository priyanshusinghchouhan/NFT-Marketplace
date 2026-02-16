import { api } from "./client";
import type { UserNFTsResponse } from "@/types/nft";

export async function getNFTsByOwner(wallet: string): Promise<UserNFTsResponse> {
  const { data } = await api.get<UserNFTsResponse>(`/users/${wallet}/nfts`);
  return data;
}
