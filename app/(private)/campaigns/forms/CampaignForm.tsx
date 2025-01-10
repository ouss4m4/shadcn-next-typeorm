'use client';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { campaignSchema } from './CampaignSchema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AdvertiserSelect from '@/components/formDropDowns/AdvertiserSelect';
import LanderSelect from '@/components/formDropDowns/LanderSelect';
import CountrySelect from '@/components/formDropDowns/CountrySelect';
import { redirect } from 'next/navigation';
import DeviceSelectCheckBox from '@/components/formDropDowns/DeviceSelectCheckbox';
import { ICampaign } from '@/app/(private)/shared/types';
import { createCampaignAction } from '@/app/server/actions/campaign/createCampaignAction';
import { editCampaignAction } from '@/app/server/actions/campaign/editCampaignAction';
import StatusSelect from '@/components/formDropDowns/StatusSelect';
import { CampaignStatusMap } from '@/app/(private)/shared/enums';

export default function CampaignForm({ data }: { data?: ICampaign }) {
  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: data?.name ?? '',
      advertiserId: data?.advertiserId ?? undefined,
      landerId: data?.landerId ?? undefined,
      countries: data?.countries.map((cnt) => cnt.id) ?? [1], // array of ids
      device: data?.device ?? [],
      status: data?.status ?? 1,
    },
  });
  const advertiserId = useWatch({
    control: form.control,
    name: 'advertiserId',
  });

  async function onSubmit(values: z.infer<typeof campaignSchema>) {
    let response = null;
    if (data && data.id) {
      response = await editCampaignAction({ ...values, id: data.id });
    } else {
      response = await createCampaignAction(
        values,
        localStorage.getItem('jwt') ?? '',
      );
    }

    if (response && response.error) {
      form.setError('root', { message: 'an error happened, please try again' });
      return;
    }
    redirect('/campaigns');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {form.formState.errors.root && (
          <div className="text-sm text-destructive">
            {form.formState.errors.root.message}
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Campaign Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AdvertiserSelect formControl={form.control} name="advertiserId" />
        <LanderSelect
          formControl={form.control}
          name="landerId"
          clientId={advertiserId}
          status="1"
        />
        <CountrySelect formControl={form.control} name="countries" />
        <DeviceSelectCheckBox formControl={form.control} name="device" />
        <StatusSelect
          formControl={form.control}
          name="status"
          statusMap={CampaignStatusMap}
          excludeStatus={[0, 5, 6]}
        />
        {form.formState.isSubmitting ? (
          <Button disabled variant="outline" type="submit">
            Submiting...
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
}
