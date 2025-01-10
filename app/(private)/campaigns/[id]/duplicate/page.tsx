import { ICampaign } from '@/app/(private)/shared/types';
import { fetchApi } from '@/app/(private)/utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import CampaignForm from '../../forms/CampaignForm';
import { cookies } from 'next/headers';

export default async function CampaignDuplicate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt')?.value ?? '';
  const id = (await params).id;
  const source = await fetchApi<ICampaign>(`/campaigns/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  source.name = `${source.name} (Copy of #${id})`;
  delete source.id;
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card className="p-4">
        <CardHeader className="px-0">
          <CardTitle className="text-left">
            Duplicate Campaign (#{id})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CampaignForm data={source} />
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardHeader className="px-0">
          <CardTitle className="text-left">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eveniet
          eligendi sed voluptatum. Dolorum sunt dignissimos quas, repellat,
          voluptatum autem dolore aliquid sapiente distinctio explicabo quia
          commodi neque reprehenderit soluta.
        </CardContent>
      </Card>
    </div>
  );
}
