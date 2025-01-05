/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ILander } from '@/app/types/types';
import { fetchApi } from '@/app/utils/api';

import React, { useEffect, useState } from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';

export default function LanderSelect({
  formControl,
  name,
  clientId = undefined,
  status = '',
}: {
  formControl: any;
  name: string;
  clientId?: number;
  status: string;
}) {
  const [landers, setLanders] = useState<ILander[]>([]);
  let url = `/landers?`;
  if (clientId) {
    url += `&clientId=${clientId}`;
  }

  if (status) {
    url += `&status=${status}`;
  }
  useEffect(() => {
    const fetchLanders = async () => {
      const data = await fetchApi<ILander[]>(url);
      setLanders(data);
    };

    fetchLanders();
  }, [url]); //

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Lander</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(Number(value))}
            defaultValue={field.value?.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a Lander" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {landers.map((lander) => (
                <SelectItem key={lander.id} value={lander.id.toString()}>
                  {lander.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>Select a Lander</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
