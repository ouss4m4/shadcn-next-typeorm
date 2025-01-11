'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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

  const [state, setState] = useState<ICampaignsListState>({
    advId: searchParams.get('advID') ?? '',
    country: searchParams.get('country') ?? '',
    lander: searchParams.get('lander') ?? '',
    page: searchParams.get('page') ?? '1',
    device: searchParams.get('device') ?? '',
    sortBy: searchParams.get('sortBy') ?? 'updatedAt',
    order: searchParams.get('order') ?? 'desc',
    status: searchParams.get('status') ?? '0',
  });

  const [data, setData] = useState<{ rows: ICampaign[]; rowsCount: number }>({
    rows: [],
    rowsCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const params = createUrlParamsFromObject(state as Record<string, string>);
      const response: CampaignsListResponse = await fetch(
        `/api/campaigns?${params.toString()}`,
      ).then((data) => data.json());

      setData({ rows: response.data, rowsCount: response.rowsCount });

      // Update URL
      router.push(`/campaigns?${params.toString()}`, { scroll: false });
    };

    fetchData();
  }, [state, router]);

  const handleExport = async () => {
    try {
      console.log('Querying export...');
      const params = createUrlParamsFromObject(state as Record<string, string>);
      params.delete('page');

      // Fetch the export file
      const resp = await fetch(`/api/campaigns/export`);
      if (!resp.ok) {
        throw new Error(`Export failed with status: ${resp.status}`);
      }

      // Create a Blob from the response
      const blob = await resp.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      // Set the download file name
      const contentDisposition = resp.headers.get('Content-Disposition');
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1]?.replace(/"/g, '') ||
          'download.csv'
        : 'download.csv';
      a.download = filename;

      // Trigger the download
      document.body.appendChild(a);
      a.click();

      // Cleanup
      a.remove();
      window.URL.revokeObjectURL(url);

      console.log('Export complete.');
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex justify-between">
          <h1 className="text-lg">Campaigns List</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              EXPORT
            </Button>
            <Button asChild>
              <Link href="/campaigns/create">Create Campaign</Link>
            </Button>
          </div>
        </div>
        <div className="my-4">
          <CampaignsFilter
            state={state}
            onFiltersChange={(newState) =>
              setState({ ...state, ...newState } as ICampaignsListState)
            }
          />
        </div>
        <CampaignsDataTable
          data={data.rows}
          rowsCount={data.rowsCount}
          state={state}
          onFiltersChange={(newState) =>
            setState({ ...state, ...newState } as ICampaignsListState)
          }
        />
      </div>
    </>
  );
}
