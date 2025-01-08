import { ICampaign } from '@/app/shared/types';
import { fetchApi } from '@/app/utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import CampaignForm from '../../forms/CampaignForm';

export default async function EditCampaigns({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const campaign = await fetchApi<ICampaign>(`/campaigns/${id}`);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card className="p-4">
        <CardHeader className="px-0">
          <CardTitle className="text-left">
            Edit Campaign (#{campaign.id})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CampaignForm data={campaign} />
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
