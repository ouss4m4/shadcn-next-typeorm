import { ICampaignsListState } from './types';

export const createUrlParamsFromObject = (
  params: ICampaignsListState,
): URLSearchParams => {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value);
  }
  return query;
};
