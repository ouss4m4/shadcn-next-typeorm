'use client';

import { CellContext, ColumnDef } from '@tanstack/react-table';
import {
  ICampaign,
  ICampaignsListState,
  ICountry,
  IDevice,
} from '@/app/shared/types';
import { DataTable } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function CampaignsDataTable({
  data,
  rowsCount,
  state,
  onFiltersChange,
}: {
  data: ICampaign[];
  rowsCount: number;
  state: ICampaignsListState;
  onFiltersChange: (data: Partial<ICampaignsListState>) => void;
}) {
  const handleSortClick = (columnName: string) => {
    const sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
    if (state.sortColumn === columnName) {
      onFiltersChange({
        sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc',
      });
      return;
    }
    onFiltersChange({ sortColumn: columnName, sortDirection });
  };

  const onPageChange = (pageNumber: number) =>
    onFiltersChange({ page: pageNumber.toString() });

  const renderCountriesCell = ({
    row,
  }: CellContext<ICampaign, unknown>): React.JSX.Element => {
    const countries: ICountry[] = row.getValue('countries');
    if (countries.length == 1) {
      return <div>{countries[0].niceName}</div>;
    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div>{countries.length} countries</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Countries</DropdownMenuLabel>
          {countries.map((cnt) => (
            <DropdownMenuItem key={cnt.id + row.id}>
              {cnt.niceName}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderDevicesCell = ({
    row,
  }: CellContext<ICampaign, unknown>): React.JSX.Element => {
    const devices: IDevice[] = row.getValue('devices');
    if (devices.length == 1) {
      return <div>{devices[0].name}</div>;
    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div>{devices.length} devices</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Devices</DropdownMenuLabel>
          {devices.map((device) => (
            <DropdownMenuItem key={device.id + row.id}>
              {device.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const columns: ColumnDef<ICampaign>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
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
              className={`ml-2 h-4 w-4 ${state.sortColumn == 'name' ? 'text-primary' : ''}`}
            />
          </Button>
        );
      },
    },
    {
      accessorFn: (campaign) => campaign.advertiser.name,
      header: 'Advertiser',
    },
    {
      accessorFn: (campaign) => campaign.lander.name,
      header: 'Lander',
    },
    {
      id: 'countries',
      accessorFn: (campaign) => campaign.countries,
      header: 'Countries',
      cell: renderCountriesCell,
    },
    {
      id: 'devices',
      accessorFn: (campaign) => campaign.device,
      header: 'Devices',
      cell: renderDevicesCell,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status');
        return <div>{status == 1 ? 'Active' : 'Paused'}</div>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const campaign = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link
                  className="cursor-pointer"
                  href={`campaigns/${campaign.id}/edit`}
                >
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      rowsCount={rowsCount}
      onPageChange={onPageChange}
      pageNumber={state.page}
    />
  );
}
