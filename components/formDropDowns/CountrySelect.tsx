/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ICountry } from '@/app/types/types';
import { fetchApi } from '@/app/utils/api';

import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import MultipleSelector, { Option } from '../ui/MultipleSelector';

export default function CountrySelect({
  formControl,
  name = 'advertiserId',
}: {
  formControl: any;
  name: string;
}) {
  const [countries, setCountries] = useState<Option[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const countries: ICountry[] = await fetchApi<ICountry[]>('/countries');

      const options: Option[] = countries.map((country) => {
        return {
          value: country.id.toString(),
          label: country.niceName,
        };
      });

      setCountries(options);
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
          <FormControl>
            <MultipleSelector
              {...field}
              // Transform the field value (number[]) to Option[]
              value={countries.filter((option) =>
                field.value?.includes(Number(option.value)),
              )}
              // Transform the selected Option[] back to number[] for the form state
              onChange={(selected) =>
                field.onChange(selected.map((opt: Option) => Number(opt.value)))
              }
              options={countries}
              placeholder="Select countries ..."
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />
          </FormControl>
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
