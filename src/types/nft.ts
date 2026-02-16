export interface UserNFT {
  tokenId: string;
  contractAddress: string;
  tokenURI: string | null;
  listed: boolean;
  listingId?: string;
  price?: string;
}

export interface UserNFTsResponse {
  wallet: string;
  count: number;
  nfts: UserNFT[];
}
