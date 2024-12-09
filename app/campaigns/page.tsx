import AppTopBar from '@/components/app-topbar';
import Link from 'next/link';

import React from 'react';
import { fetchApi } from '../utils/api';
import { Campaign } from '../types/api';
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';

export default async function CampaignsList() {
  const campaigns = await fetchApi<Campaign[]>('/campaigns');

  return (
    <>
      <AppTopBar breadcrumbs={[{ title: 'Campaigns', link: '#' }]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex justify-between">
          <h1 className="text-lg">Campaigns List</h1>
          <Link href="/campaigns/create">Create Campaign</Link>
        </div>

        <Table>
          <TableCaption>Campaigns List.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>ADVERTISER</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>LANDER</TableHead>
              <TableHead>STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((cmp) => (
              <TableRow key={cmp.id}>
                <TableCell>{cmp.id}</TableCell>
                <TableCell>{cmp.advertiserId}</TableCell>
                <TableCell className="font-medium">{cmp.name}</TableCell>
                <TableCell>{cmp.landerId}</TableCell>
                <TableCell>{cmp.isActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
