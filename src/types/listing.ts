export interface MarketplaceListing {
  id: number;
  name: string;
  collection: string;
  tokenId: string;
  price: string;
  image: string;
}

export interface FullMarketplaceListing {
  id: number;
  name: string;
  collection: string;
  tokenId: string;
  price: string;
  image: string;
  seller: string;
  nftContract: string;
}

