'use client';

import { CellContext, ColumnDef } from '@tanstack/react-table';
import {
  ICampaign,
  ICampaignsListState,
  ICountry,
  IDevice,
} from '@/app/(private)/shared/types';
import { DataTable } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import StatusLabel from '@/components/ui/status-label';
import { CampaignStatusMap } from '@/app/(private)/shared/enums';
import CampaignDataTableActionsCell from './CampaignDataTableActionsCell';

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
      id: 'advertiser',
      accessorFn: (campaign) => campaign.advertiser.name,
      header: () => {
        return (
          <Button
            variant="ghost"
            onClick={() => handleSortClick('advertiser')}
            className="px-0"
          >
            Advertiser
            <ArrowUpDown
              className={`ml-2 h-4 w-4 ${state.sortBy == 'advertiser' ? 'text-primary' : ''}`}
            />
          </Button>
        );
      },
    },
    {
      id: 'lander',
      accessorFn: (campaign) => campaign.lander.name,
      header: () => {
        return (
          <Button
            variant="ghost"
            onClick={() => handleSortClick('lander')}
            className="px-0"
          >
            Lander
            <ArrowUpDown
              className={`ml-2 h-4 w-4 ${state.sortBy == 'lander' ? 'text-primary' : ''}`}
            />
          </Button>
        );
      },
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
        const status = row.getValue<number>('status');
        return <StatusLabel statusKey={status} statusMap={CampaignStatusMap} />;
      },
    },
    {
      id: 'time',
      accessorFn: (campaign) => campaign,
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
        const campaign = row.original;

        return <CampaignDataTableActionsCell campaign={campaign} />;
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
