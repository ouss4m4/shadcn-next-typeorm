export interface ICampaign {
  id?: number;
  name: string;
  advertiserId: number;
  landerId: number;
  device: IDevice[];
  status: number;
  lander: ILander;
  advertiser: Client;
  countries: ICountry[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type CampaignsListResponse = { data: ICampaign[]; rowsCount: number };
export type LandersListReponse = { data: ILander[]; rowsCount: number };
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
  advertiser: Client;
  status: true;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
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
  device: string;
  status: string;
  page: string;
  sortBy: string;
  order: string;
  [key: string]: string;
}

export interface ILandersListState {
  advId: string;
  status: string;
  page: string;
  sortBy: string;
  order: string;
  [key: string]: string;
}

export type statusProps = {
  text: string;
  slug: string;
  color: string;
};

export type StatusMap = Record<number, statusProps>;

export interface StatusLabelProps<T extends StatusMap> {
  statusKey: keyof T;
  statusMap: T;
}

export interface ILoginResponse {
  jwt: string;
}

export interface IUserInfo {
  id: number;
  name: string;
  email: string;
  clientId: number;
  role: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITrafficSource {
  id: number;
  uuid: string;
  name: string;
  publisherId: number;
  publisher: Client;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPlacement {
  id: number;
  uuid: string;
  name: string;
  publisherId: number;
  publisher: Client;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}
