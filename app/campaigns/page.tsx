import AppTopBar from '@/components/app-topbar';
import Link from 'next/link';

import React from 'react';

export default function CampaignsList() {
  return (
    <>
      <AppTopBar breadcrumbs={[{ title: 'Campaigns', link: '#' }]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex justify-between">
          <h1 className="text-lg">Campaigns List</h1>
          <Link href="/campaigns/create">Create Campaign</Link>
        </div>
      </div>
    </>
  );
}
