import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import React from 'react';
import CreateLanderForm from '../forms/CreateLanderForm';

export default function CreateLander() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4">
        <Card className="p-4">
          <CardHeader className="px-0">
            <CardTitle className="text-left">Create Lander</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateLanderForm />
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardHeader className="px-0">
            <CardTitle className="text-left">Preview</CardTitle>
          </CardHeader>
          <CardContent>Lander preview...</CardContent>
        </Card>
      </div>
    </>
  );
}
