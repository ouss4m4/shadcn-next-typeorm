import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import CreateClientForm from '../forms/ClientForm.create';

export default function CreateClient() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card className="p-4">
        <CardHeader className="px-0">
          <CardTitle className="text-left">Create Client</CardTitle>
        </CardHeader>
        <CreateClientForm />
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
