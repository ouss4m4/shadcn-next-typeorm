import { StatusMap } from './types';

export const CampaignStatusMap: StatusMap = {
  1: {
    text: 'Active',
    slug: 'active',
    color: '#37DC18',
  },
  2: {
    text: 'Inactive',
    slug: 'inactive',
    color: '#E9002F',
  },
  3: {
    text: 'Draft',
    slug: 'draft',
    color: '#808080',
  },
  4: {
    text: 'Paused',
    slug: 'paused',
    color: '#EF8F00',
  },
  5: {
    text: 'Spend Capped',
    slug: 'spend-capped',
    color: '#EF8F00',
  },
  6: {
    text: 'Click Capped',
    slug: 'click-capped',
    color: '#EF8F00',
  },
  0: {
    text: 'All',
    slug: 'all',
    color: '#00d2e7',
  },
};

export const LanderStatusMap: StatusMap = {
  1: {
    text: 'Active',
    slug: 'active',
    color: '#37DC18',
  },
  2: {
    text: 'Inactive',
    slug: 'inactive',
    color: '#E9002F',
  },
  0: {
    text: 'All',
    slug: 'all',
    color: '#00d2e7',
  },
};
