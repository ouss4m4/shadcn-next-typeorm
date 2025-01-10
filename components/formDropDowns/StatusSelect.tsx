import { StatusMap } from '@/app/(private)/shared/types';
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

import { Control } from 'react-hook-form';
import StatusLabel from '../ui/status-label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { CampaignStatusMap } from '@/app/(private)/shared/enums';

export default function StatusSelect({
  statusMap,
  formControl,
  name,
  showLabel = true,
  excludeStatus = [],
}: {
  statusMap: StatusMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<any>;
  name: string;
  showLabel?: boolean;
  excludeStatus?: number[];
}) {
  const items: { id: number; name: string }[] = Object.entries(statusMap)
    .filter((item) => !excludeStatus.includes(+item[0]))
    .map(([key, value]) => {
      return {
        id: Number(key),
        name: value.text,
      };
    });
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          {showLabel && <FormLabel>Status</FormLabel>}
          <Select
            onValueChange={(value) => field.onChange(Number(value))}
            value={field.value?.toString()}
            defaultValue="0"
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  <StatusLabel
                    statusMap={CampaignStatusMap}
                    statusKey={item.id}
                  />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
