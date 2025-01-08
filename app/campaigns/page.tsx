'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { fetchApi } from '../utils/api';
import {
  CampaignsListResponse,
  ICampaign,
  ICampaignsListState,
} from '../shared/types';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { createUrlParamsFromObject } from '../shared/helpers';
import CampaignsFilter from './components/CampaignsFilter';
import CampaignsDataTable from './components/CampaignsDataTable';

export default function CampaignsList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialState: ICampaignsListState = {
    advId: searchParams.get('advID') ?? '',
    country: searchParams.get('country') ?? '',
    lander: searchParams.get('lander') ?? '',
    page: searchParams.get('page') ?? '1',
    device: searchParams.get('device') ?? '',
    sortBy: searchParams.get('sortBy') ?? '',
    order: searchParams.get('order') ?? '',
    status: searchParams.get('status') ?? '',
  };
  const [state, setState] = useState<ICampaignsListState>(initialState);

  const [data, setData] = useState<{ rows: ICampaign[]; rowsCount: number }>({
    rows: [],
    rowsCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const params = createUrlParamsFromObject(state);
      const response = await fetchApi<CampaignsListResponse>(
        `/campaigns?${params.toString()}`,
      );
      setData({ rows: response.data, rowsCount: response.rowsCount });

      // Update URL
      router.push(`/campaigns?${params.toString()}`, { scroll: false });
    };

    fetchData();
  }, [state]);

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
          <CampaignsFilter
            state={state}
            onFiltersChange={(newState) => setState({ ...state, ...newState })}
          />
        </div>
        <CampaignsDataTable
          data={data.rows}
          rowsCount={data.rowsCount}
          state={state}
          onFiltersChange={(newState) => setState({ ...state, ...newState })}
        />
      </div>
    </>
  );
}
