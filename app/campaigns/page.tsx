import Link from 'next/link';

import React from 'react';
import { fetchApi } from '../utils/api';
import { ICampaign } from '../types/types';
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
  const campaigns = await fetchApi<ICampaign[]>('/campaigns');
  console.log(campaigns);
  return (
    <>
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
                <TableCell>
                  <Link href={`/clients/${cmp.advertiser.id}`}>
                    {cmp.advertiser.name}
                  </Link>
                </TableCell>
                <TableCell className="font-medium">{cmp.name}</TableCell>
                <TableCell>
                  <Link href={`/landers/${cmp.lander.id}`}>
                    {cmp.lander.name}
                  </Link>
                </TableCell>
                <TableCell>{cmp.isActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
