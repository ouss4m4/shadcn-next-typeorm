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
import AdvertiserDropdown from '@/components/formDropDowns/AdvertiserDropdown';

export default function CreateCampaignForm() {
  const form = useForm<z.infer<typeof createCampaignSchema>>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      name: 'sample',
      landerId: 1,
      isActive: true,
      countries: [227],
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
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <AdvertiserDropdown formControl={form.control} name="advertiserId" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
