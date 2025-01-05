'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAdvertiser } from '@/app/shared/types';
import { fetchApi } from '@/app/utils/api';
import React, { useEffect, useState } from 'react';
import { Control } from 'react-hook-form';
import DropDown from '../drop-down';

export default function AdvertiserSelect({
  formControl,
  name = 'advertiserId',
  showLabel = true,
}: {
  formControl: Control<any>;
  name: string;
  showLabel?: boolean;
}) {
  const [advertisers, setAdvertisers] = useState<IAdvertiser[]>([]);
  useEffect(() => {
    const fetchAdvertisers = async () => {
      const data = await fetchApi<IAdvertiser[]>('/clients?type=2');
      console.log(data);
      setAdvertisers(data);
    };
    fetchAdvertisers();
  }, []);

  return (
    <DropDown
      formControl={formControl}
      name={name}
      placeHolder="Select an Advertiser"
      label="Advertiser"
      itemsList={advertisers}
      showLabel={showLabel}
    />
  );
}
