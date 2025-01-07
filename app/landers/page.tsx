import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import React from 'react';
import { fetchApi } from '../utils/api';
import { ILander } from '../shared/types';
import { Button } from '@/components/ui/button';

export default async function LandersList() {
  const landers = await fetchApi<ILander[]>('/landers');
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex justify-between">
          <h1 className="text-lg">Landers List</h1>
          <Button asChild>
            <Link href="/landers/create">Create Lander</Link>
          </Button>
        </div>

        <Table>
          <TableCaption>Landers List.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>CLIENT</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {landers.map((lander) => (
              <TableRow key={lander.id}>
                <TableCell>{lander.id}</TableCell>
                <TableCell className="font-medium">{lander.name}</TableCell>
                <TableCell>
                  <Link href={`clients/${lander.client.id}`}>
                    {lander.client.name}
                  </Link>
                </TableCell>
                <TableCell>{lander.url}</TableCell>
                <TableCell>{lander.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
