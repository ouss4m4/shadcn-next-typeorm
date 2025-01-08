'use client';

import { IDevice } from '@/app/shared/types';
import { fetchApi } from '@/app/utils/api';
import React, { useEffect, useState } from 'react';
import { Control } from 'react-hook-form';
import DropDown from '../drop-down';

export default function DeviceSelect({
  formControl,
  name = 'device',
  showLabel = true,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<any>;
  name: string;
  showLabel?: boolean;
}) {
  const [devices, setDevices] = useState<IDevice[]>([]);
  useEffect(() => {
    const fetchDevices = async () => {
      const data = await fetchApi<IDevice[]>('/devices');
      setDevices(data);
    };
    fetchDevices();
  }, []);

  return (
    <DropDown
      formControl={formControl}
      name={name}
      placeHolder="Select a Device"
      label="Device"
      itemsList={devices}
      showLabel={showLabel}
    />
  );
}
