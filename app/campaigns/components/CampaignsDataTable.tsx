'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { CampaignsListResponse, ICampaign, ICountry } from '@/app/shared/types';
import { DataTable } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function CampaignsDataTable({
  data,
  rowsCount,
}: CampaignsListResponse) {
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
  const columns: ColumnDef<ICampaign>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
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
      header: 'Country',
      cell: renderCountriesCell,
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

  return <DataTable columns={columns} data={data} rowsCount={rowsCount} />;
}
