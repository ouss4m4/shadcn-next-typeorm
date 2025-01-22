import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function SubSourcesList() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex justify-between">
          <h1 className="text-lg">Sub Sources</h1>
          <Button asChild>
            <Link href="/sub-sources/create">Create Sub Source</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
