import React from 'react';
import { fetchApi } from '../utils/api';
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

export default async function ClientsList() {
  const clients = await fetchApi<IClient[]>('/clients');

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex justify-between">
          <h1 className="text-lg">Clients List</h1>
          <Link href="/clients/create">Create Client</Link>
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
