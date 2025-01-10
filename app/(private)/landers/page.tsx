'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { fetchApi } from '../utils/api';
import {
  ILander,
  ILandersListState,
  LandersListReponse,
} from '../shared/types';
import { Button } from '@/components/ui/button';
import LandersDataTable from './components/LandersDataTable';
import { useRouter, useSearchParams } from 'next/navigation';
import { createUrlParamsFromObject } from '../shared/helpers';
import LandersFilter from './components/LandersFilter';

export default function LandersList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<{ rows: ILander[]; rowsCount: number }>({
    rows: [],
    rowsCount: 0,
  });
  const [listState, setListState] = useState<ILandersListState>({
    advId: searchParams.get('page') ?? '',
    page: searchParams.get('page') ?? '1',
    sortBy: searchParams.get('sortBy') ?? 'updatedAt',
    order: searchParams.get('order') ?? 'desc',
    status: searchParams.get('status') ?? '0',
  });

  useEffect(() => {
    const fetchLanders = async () => {
      const params = createUrlParamsFromObject(
        listState as Record<string, string>,
      );
      const result = await fetchApi<LandersListReponse>(
        `/landers?${params.toString()}`,
      );
      setData({ rows: result.data, rowsCount: result.rowsCount });
      // Update URL
      router.push(`/landers?${params.toString()}`, { scroll: false });
    };
    fetchLanders();
  }, [listState, router]);

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex justify-between">
          <h1 className="text-lg">Landers List</h1>
          <Button asChild>
            <Link href="/landers/create">Create Lander</Link>
          </Button>
        </div>
        <div className="my-4">
          <LandersFilter
            state={listState}
            onFiltersChange={(newState) =>
              setListState({ ...listState, ...newState } as ILandersListState)
            }
          />
        </div>
        <LandersDataTable
          data={data.rows}
          rowsCount={data.rowsCount}
          state={listState}
          onFiltersChange={(newState) =>
            setListState({ ...listState, ...newState } as ILandersListState)
          }
        />
      </div>
    </>
  );
}
