/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { IDevice } from '@/app/(private)/shared/types';
import { fetchApi } from '@/app/(private)/utils/api';
import { useEffect, useState } from 'react';
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Checkbox } from '../ui/checkbox';

export default function DeviceSelectCheckBox({
  formControl,
  name,
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
    <FormField
      control={formControl}
      name={name}
      render={() => (
        <FormItem>
          {showLabel && (
            <div className="mb-4">
              <FormLabel className="text-base">Device Target</FormLabel>
            </div>
          )}
          <div className="flex space-x-2">
            {devices.map((device) => (
              <FormField
                key={`device-${device.id}`}
                control={formControl}
                name="device"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={`item-${device.id}`}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.some(
                            (item: any) => item.id == device.id,
                          )}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([
                                  ...field.value,
                                  { id: device.id, name: device.name },
                                ])
                              : field.onChange(
                                  field.value?.filter(
                                    (item: { id: number; name: string }) =>
                                      item.id !== device.id,
                                  ),
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {device.name}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
