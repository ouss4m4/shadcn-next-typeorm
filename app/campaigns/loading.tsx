import AppTopBar from '@/components/app-topbar';
import React from 'react';

export default function loading() {
  return (
    <>
      <AppTopBar breadcrumbs={[{ title: 'Campaigns', link: '#' }]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="bg-muted w-full flex-1 animate-pulse rounded-lg p-4">
          Loading...
        </div>
      </div>
    </>
  );
}
