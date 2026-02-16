export type ActivityType =
  | "LISTED"
  | "SOLD"
  | "CANCELLED"
  | "PRICE_UPDATED"
  | "TRANSFER"
  | "MINTED";

export interface Activity {
  id: string;
  type: ActivityType;
  wallet: string;
  txHash: string;
  createdAt: string;
}

export interface RecentActivityResponse {
  count: number;
  activities: Activity[];
}

