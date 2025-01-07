export interface ICampaign {
  id: number;
  name: string;
  advertiserId: number;
  landerId: number;
  device: IDevice[];
  status: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  lander: ILander;
  advertiser: Client;
  countries: ICountry[];
}

export type CampaignsListResponse = { data: ICampaign[]; rowsCount: number };

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

export interface IDevice {
  id: number;
  name: string;
  slug: string;
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

export interface ICampaignsListState {
  advId: string;
  lander: string;
  country: string;
  status: string;
  page: string;
  sortColumn: string;
  sortDirection: string;
}
