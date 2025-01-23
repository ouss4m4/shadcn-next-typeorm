'use client';
import React from 'react';
import { StaticDataTable } from '@/components/static-data-table';
import { ColumnDef } from '@tanstack/react-table';
import StatusLabel from '@/components/ui/status-label';
import { PlacementStatusMap } from '../../shared/enums';
import PlacementTableActionsCell from './PlacementDataTableActionsCell';
import { IPlacement } from '../../shared/types';

export default function PlacementDataTable({ data }: { data: IPlacement[] }) {
  const columns: ColumnDef<IPlacement>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Publisher',
      accessorFn: (ts) => ts.publisher.name,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.getValue<number>('status');
        return (
          <StatusLabel statusKey={status} statusMap={PlacementStatusMap} />
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const placement = row.original;

        return <PlacementTableActionsCell placement={placement} />;
      },
    },
  ];

  return <StaticDataTable data={data} columns={columns} />;
}
