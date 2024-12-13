/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ILander } from '@/app/types/api';
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
}: {
  formControl: any;
  name: any;
}) {
  const [landers, setLanders] = useState<ILander[]>([]);

  useEffect(() => {
    const fetchLanders = async () => {
      const data = await fetchApi<ILander[]>('/landers');
      setLanders(data);
    };

    fetchLanders();
  }, []); //

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
