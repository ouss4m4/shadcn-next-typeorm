import React from 'react';
import CreateCampaignForm from '../forms/CreateCampaignForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreateCampaign() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card className="p-4">
        <CardHeader className="px-0">
          <CardTitle className="text-left">Campaign Details</CardTitle>
        </CardHeader>
        <CreateCampaignForm />
        <CardContent></CardContent>
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
