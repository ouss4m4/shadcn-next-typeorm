'use client';

import { ICountry } from '@/app/(private)/shared/types';
import { fetchApi } from '@/app/(private)/utils/api';
import React, { useEffect, useState } from 'react';
import { Control } from 'react-hook-form';
import FormSelect from '../form-select';

export default function CountrySelectSingle({
  formControl,
  name = 'advertiserId',
  showLabel = true,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<any>;
  name: string;
  showLabel?: boolean;
}) {
  const [countries, setCountries] = useState<ICountry[]>([]);
  useEffect(() => {
    const fetchCounries = async () => {
      const data = await fetchApi<ICountry[]>('/countries');
      console.log(data);
      setCountries(data);
    };
    fetchCounries();
  }, []);
  return (
    <FormSelect
      formControl={formControl}
      name={name}
      showLabel={showLabel}
      itemsList={countries}
      label="Country"
      placeHolder="Select A Country"
    />
  );
}
