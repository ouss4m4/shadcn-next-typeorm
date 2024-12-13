export interface ICampaign {
  id: number;
  name: string;
  advertiserId: number;
  landerId: number;
  isActive: true;
  createdAt: Date;
  updatedAt: Date;
}

export type CampaignsListResponse = ICampaign[];

export enum ClientType {
  Publisher = 1,
  Advertiser = 2,
}

export interface IAdvertiser {
  id: number;
  name: string;
  type: ClientType;
  address: string;
  contactMail: string;
  financeMail: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILander {
  id: number;
  name: string;
  url: string;
  clientId: number;
  isActive: true;
  createdAt: Date;
}

export interface ICountry {
  id: number;
  iso: string;
  name: string;
  niceName: string;
}
