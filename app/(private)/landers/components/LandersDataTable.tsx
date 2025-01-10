import { LanderStatusMap } from '@/app/(private)/shared/enums';
import { ILander, ILandersListState } from '@/app/(private)/shared/types';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import StatusLabel from '@/components/ui/status-label';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import React from 'react';
import LanderDataTableActionsCell from './LanderDataTableActionsCell';

export default function LandersDataTable({
  data,
  rowsCount,
  state,
  onFiltersChange,
}: {
  data: ILander[];
  rowsCount: number;
  state: ILandersListState;
  onFiltersChange: (data: Partial<ILandersListState>) => void;
}) {
  const handleSortClick = (columnName: string) => {
    const sortDirection = state.order === 'asc' ? 'desc' : 'asc';
    if (state.sortBy === columnName) {
      onFiltersChange({
        order: state.order === 'asc' ? 'desc' : 'asc',
      });
      return;
    }
    onFiltersChange({ sortBy: columnName, order: sortDirection });
  };

  const onPageChange = (pageNumber: number) =>
    onFiltersChange({ page: pageNumber.toString() });

  const columns: ColumnDef<ILander>[] = [
    {
      accessorKey: 'id',
      header: () => {
        return (
          <Button
            variant="ghost"
            onClick={() => handleSortClick('id')}
            className="px-0"
          >
            ID
            <ArrowUpDown
              className={`ml-2 h-4 w-4 ${state.sortBy == 'id' ? 'text-primary' : ''}`}
            />
          </Button>
        );
      },
    },
    {
      accessorKey: 'name',
      header: () => {
        return (
          <Button
            variant="ghost"
            onClick={() => handleSortClick('name')}
            className="px-0"
          >
            Name
            <ArrowUpDown
              className={`ml-2 h-4 w-4 ${state.sortBy == 'name' ? 'text-primary' : ''}`}
            />
          </Button>
        );
      },
    },
    {
      header: 'Advertiser',
      accessorFn: (lander) => lander.advertiser.name,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue<number>('status');
        return <StatusLabel statusKey={status} statusMap={LanderStatusMap} />;
      },
    },
    {
      id: 'time',
      header: () => {
        return (
          <Button
            variant="ghost"
            onClick={() => handleSortClick('updatedAt')}
            className="px-0"
          >
            Date
            <ArrowUpDown
              className={`ml-2 h-4 w-4 ${state.sortBy == 'updatedAt' ? 'text-primary' : ''}`}
            />
          </Button>
        );
      },
      cell: ({ row }) => {
        const createdAt = row.original.createdAt;
        const updatedAt = row.original.updatedAt;

        return (
          <div className="flex flex-col">
            <span className="text-xs">
              {new Intl.DateTimeFormat('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              }).format(new Date(createdAt))}
            </span>
            <span className="text-xs italic">
              Updated:
              {new Intl.DateTimeFormat('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              }).format(new Date(updatedAt))}
            </span>
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const lander = row.original;

        return <LanderDataTableActionsCell lander={lander} />;
      },
    },
  ];
  return (
    <DataTable
      columns={columns}
      rowsCount={rowsCount}
      data={data}
      onPageChange={onPageChange}
      pageNumber={state.page}
    />
  );
}
