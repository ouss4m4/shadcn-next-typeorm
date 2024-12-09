export interface Campaign {
  id: number;
  name: string;
  advertiserId: number;
  landerId: number;
  isActive: true;
  createdAt: Date;
  updatedAt: Date;
}

export type CampaignsListResponse = Campaign[];
