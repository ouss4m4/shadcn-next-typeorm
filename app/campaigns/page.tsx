import Link from 'next/link';

import React from 'react';
import { fetchApi } from '../utils/api';
import { ICampaign } from '../shared/types';

import CampaignsFilter from './components/CampaignsFilter';
import { formatSeachQuery } from '../shared/helpers';
import CampaignsTable from './components/CampaignsTable';

export default async function CampaignsList({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { advId = '', status = '' } = await searchParams;
  const params = formatSeachQuery({ advId, status });

  const campaigns = await fetchApi<ICampaign[]>(
    `/campaigns?${params.toString()}`,
  );

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex justify-between">
          <h1 className="text-lg">Campaigns List</h1>
          <Link href="/campaigns/create">Create Campaign</Link>
        </div>
        <div className="my-4">
          <CampaignsFilter />
        </div>
        <CampaignsTable campaigns={campaigns} />
      </div>
    </>
  );
}
