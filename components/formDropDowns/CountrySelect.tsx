/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ICountry } from '@/app/(private)/shared/types';
import { fetchApi } from '@/app/(private)/utils/api';

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
              onChange={(selected) => {
                const selectedOptions = [...selected]; // Ensure a copy to avoid side effects
                const allCountriesOption = '1'; // Assume '1' is the value for "All Countries"

                // If the last selected option is "All Countries"
                if (selectedOptions.at(-1)?.value === allCountriesOption) {
                  field.onChange([Number(allCountriesOption)]);
                  return;
                }

                // If "All Countries" was already selected and other countries are added
                if (
                  selectedOptions[0]?.value === allCountriesOption &&
                  selectedOptions.length > 1
                ) {
                  const filteredOptions = selectedOptions.filter(
                    (opt) => opt.value !== allCountriesOption,
                  );
                  field.onChange(
                    filteredOptions.map((opt) => Number(opt.value)),
                  );
                  return;
                }

                // General case: Map all selected options to numbers
                field.onChange(selectedOptions.map((opt) => Number(opt.value)));
              }}
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
