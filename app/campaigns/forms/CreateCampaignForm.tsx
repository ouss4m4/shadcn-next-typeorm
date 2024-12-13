'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCampaignSchema } from './CreateCampaignSchema';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createCampaignAction } from '@/app/server/actions/createCampaignAction';
import AdvertiserSelect from '@/components/formDropDowns/AdvertiserSelect';
import LanderSelect from '@/components/formDropDowns/LanderSelect';
import CountrySelect from '@/components/formDropDowns/CountrySelect';

export default function CreateCampaignForm() {
  const form = useForm<z.infer<typeof createCampaignSchema>>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      name: '',
      advertiserId: undefined, // Match the type expected in your schema
      landerId: undefined,
      countries: [],
      isActive: false,
    },
  });

  async function onSubmit(values: z.infer<typeof createCampaignSchema>) {
    const data = await createCampaignAction(values);
    if (data && data.error) {
      form.setError('root', { message: 'an error happened, please try again' });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {JSON.stringify(form.getValues('countries'))}
        {form.formState.errors.root && (
          <div className="text-sm text-destructive">
            {form.formState.errors.root.message}
          </div>
        )}
        {form.formState.errors && (
          <div className="text-sm text-destructive">
            {JSON.stringify(form.formState.errors)}
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
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <AdvertiserSelect formControl={form.control} name="advertiserId" />
        <LanderSelect formControl={form.control} name="landerId" />
        <CountrySelect formControl={form.control} name="countries" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
