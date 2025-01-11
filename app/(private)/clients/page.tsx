import React from 'react';
import { IClient } from '../shared/types';
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
import { Button } from '@/components/ui/button';
import { headers } from 'next/headers';

export default async function ClientsList() {
  const incomingCookie = (await headers()).get('cookie') || '';

  const clients: IClient[] = await fetch(
    `${process.env.NEXT_URL}/api/clients`,
    {
      headers: {
        cookie: incomingCookie,
      },
    },
  )
    .then(async (res) => {
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || 'An error occurred');
      }
      return res.json();
    })
    .catch((err) => {
      console.error(err);
      return [];
    });

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex justify-between">
          <h1 className="text-lg">Clients List</h1>
          <Button asChild>
            <Link href="/clients/create">Create Client</Link>
          </Button>
        </div>

        <Table>
          <TableCaption>Clients List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>TYPE</TableHead>
              <TableHead>CONTACT MAIL</TableHead>
              <TableHead>ADDRESS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.id}</TableCell>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.type}</TableCell>
                <TableCell>{client.contactMail}</TableCell>
                <TableCell>{client.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
