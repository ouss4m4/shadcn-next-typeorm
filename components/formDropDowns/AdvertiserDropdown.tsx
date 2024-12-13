'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAdvertiser } from '@/app/types/api';
import { fetchApi } from '@/app/utils/api';
import React, { useEffect, useState } from 'react';
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

/**
 *
 * @returns ShadCn Dropdown that loads its own clients list
 */
export default function AdvertiserDropdown({
  formControl,
  name = 'advertiserId',
}: {
  formControl: Control<any>;
  name: string;
}) {
  const [advertisers, setAdvertisers] = useState<IAdvertiser[]>([]);
  useEffect(() => {
    const fetchAdvertisers = async () => {
      const data = await fetchApi<IAdvertiser[]>('/clients?type=2');
      setAdvertisers(data);
    };
    fetchAdvertisers();
  }, []);

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Advertiser</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(Number(value))}
            defaultValue={field.value?.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an Advertiser" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {advertisers.map((advertiser) => (
                <SelectItem
                  key={advertiser.id}
                  value={advertiser.id.toString()}
                >
                  {advertiser.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>Select an advertiser</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
