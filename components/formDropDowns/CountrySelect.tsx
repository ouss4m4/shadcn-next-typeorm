/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ICountry } from '@/app/types/api';
import { fetchApi } from '@/app/utils/api';
import React, { useEffect, useState } from 'react';
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

export default function CountrySelect({
  formControl,
  name = 'advertiserId',
}: {
  formControl: any;
  name: string;
}) {
  const [countries, setCountries] = useState<ICountry[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await fetchApi<ICountry[]>('/countries');
      setCountries(countries);
    };
    fetchCountries();
  }, []);

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Countries</FormLabel>
          <Select
            onValueChange={(val) => field.onChange(Number(val))}
            defaultValue={field.value?.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select countries" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.id.toString()}>
                  {country.niceName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Countries to target in your campaign
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

{
  /* <Select>
<SelectTrigger className="w-[280px]">
  <SelectValue placeholder="Select a timezone" />
</SelectTrigger>
<SelectContent>
    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem> 
</SelectContent>
</Select> */
}
