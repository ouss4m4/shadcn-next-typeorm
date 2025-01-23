import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import TrafficSourceDataTable from './components/TrafficSourceDataTable';
import { headers } from 'next/headers';

export default async function TrafficSourcesList() {
  const incomingCookie = (await headers()).get('cookie') || '';

  const result = await fetch(`${process.env.NEXT_URL}/api/traffic-sources`, {
    headers: {
      cookie: incomingCookie,
    },
  })
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
          <h1 className="text-lg">Traffic Sources</h1>
          <Button asChild>
            <Link href="/traffic-sources/create">Create Traffic Source</Link>
          </Button>
        </div>

        <TrafficSourceDataTable data={result.data} />
      </div>
    </>
  );
}
