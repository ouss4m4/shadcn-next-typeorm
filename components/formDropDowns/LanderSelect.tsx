'use client';
import { ILander } from '@/app/(private)/shared/types';

import React, { useEffect, useState } from 'react';
import FormSelect from '../form-select';
import { Control } from 'react-hook-form';

export default function LanderSelect({
  formControl,
  name,
  clientId,
  status = '',
  showLabel = true,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<any>;
  name: string;
  clientId?: number;
  status?: string;
  showLabel?: boolean;
}) {
  const [landers, setLanders] = useState<ILander[]>([]);
  let url = `/api/landers?`;
  if (clientId) {
    url += `&advId=${clientId}`;
  }

  if (status) {
    url += `&status=${status}`;
  }
  useEffect(() => {
    const fetchLanders = async () => {
      const data: { data: ILander[] } = await fetch(url).then((res) =>
        res.json(),
      );
      setLanders(data.data);
    };

    fetchLanders();
  }, [url]); //

  return (
    <FormSelect
      formControl={formControl}
      name={name}
      placeHolder="Select a Lander"
      label="Landers"
      itemsList={landers}
      showLabel={showLabel}
    />
  );
}
