'use client';

import { ICountry } from '@/app/shared/types';
import { fetchApi } from '@/app/utils/api';
import React, { useEffect, useState } from 'react';
import { Control } from 'react-hook-form';
import DropDown from '../drop-down';

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
    <DropDown
      formControl={formControl}
      name={name}
      showLabel={showLabel}
      itemsList={countries}
      label="Country"
      placeHolder="Select A Country"
    />
  );
}
