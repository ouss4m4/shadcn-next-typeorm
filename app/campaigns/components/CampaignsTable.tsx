import { ICampaign } from '@/app/shared/types';
import React from 'react';
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import Link from 'next/link';

export default function CampaignsTable({
  campaigns,
}: {
  campaigns: ICampaign[];
}) {
  return (
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
              <Link href={`/landers/${cmp.lander.id}`}>{cmp.lander.name}</Link>
            </TableCell>
            <TableCell>{cmp.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
