export interface ICampaign {
  id: number;
  name: string;
  advertiserId: number;
  advertiser: IAdvertiser;
  landerId: number;
  lander: ILander;
  countries: ICountry[];
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CampaignsListResponse = ICampaign[];

export enum ClientType {
  Publisher = 1,
  Advertiser = 2,
}

export interface IClient {
  id: number;
  name: string;
  type: ClientType;
  address: string;
  contactMail: string;
  financeMail: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// IPublisher is an IClient with a specific type
export interface IPublisher extends IClient {
  type: ClientType.Publisher;
}

// IAdvertiser is an IClient with a specific type
export interface IAdvertiser extends IClient {
  type: ClientType.Advertiser;
}

// Example of using a discriminated union
export type Client = IPublisher | IAdvertiser;

export interface ILander {
  id: number;
  name: string;
  url: string;
  clientId: number;
  client: Client;
  status: true;
  createdAt: Date;
}

export interface ICountry {
  id: number;
  iso: string;
  name: string;
  niceName: string;
}
