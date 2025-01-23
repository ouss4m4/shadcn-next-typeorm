'use client';
import React from 'react';
import { ITrafficSource } from '../../shared/types';
import { StaticDataTable } from '@/components/static-data-table';
import { ColumnDef } from '@tanstack/react-table';
import StatusLabel from '@/components/ui/status-label';
import { TrafficSourceStatusMap } from '../../shared/enums';
import TrafficSourceTableActionsCell from './TrafficSourceDataTableActionsCell';

export default function TrafficSourceDataTable({
  data,
}: {
  data: ITrafficSource[];
}) {
  const columns: ColumnDef<ITrafficSource>[] = [
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
        console.log(row.original);
        const status = row.getValue<number>('status');
        console.log(status);
        return (
          <StatusLabel statusKey={status} statusMap={TrafficSourceStatusMap} />
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const trafficSource = row.original;

        return <TrafficSourceTableActionsCell trafficSource={trafficSource} />;
      },
    },
  ];

  return <StaticDataTable data={data} columns={columns} />;
}
