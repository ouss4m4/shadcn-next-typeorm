import Link from 'next/link';

import React from 'react';
import { fetchApi } from '../utils/api';
import { ICampaign } from '../shared/types';

import CampaignsFilter from './components/CampaignsFilter';
import { formatSeachQuery } from '../shared/helpers';
import { Button } from '@/components/ui/button';
import CampaignsDataTable from './components/CampaignsDataTable';

export default async function CampaignsList({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { advId = '', status = '', country = '' } = await searchParams;
  const params = formatSeachQuery({ advId, status, country });

  const campaigns = await fetchApi<ICampaign[]>(
    `/campaigns?${params.toString()}`,
  );

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex justify-between">
          <h1 className="text-lg">Campaigns List</h1>
          <Button asChild>
            <Link href="/campaigns/create">Create Campaign</Link>
          </Button>
        </div>
        <div className="my-4">
          <CampaignsFilter />
        </div>
        <CampaignsDataTable data={campaigns} />
      </div>
    </>
  );
}
