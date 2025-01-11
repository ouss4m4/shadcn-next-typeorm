'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAdvertiser } from '@/app/(private)/shared/types';
import React, { useEffect, useState } from 'react';
import { Control } from 'react-hook-form';
import FormSelect from '../form-select';

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
      const data: IAdvertiser[] = await fetch('/api/clients?type=2').then(
        (res) => res.json(),
      );
      setAdvertisers(data);
    };
    fetchAdvertisers();
  }, []);

  return (
    <FormSelect
      formControl={formControl}
      name={name}
      placeHolder="Select an Advertiser"
      label="Advertiser"
      itemsList={advertisers}
      showLabel={showLabel}
    />
  );
}
