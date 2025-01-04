'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createLanderSchema } from './CreateLanderSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AdvertiserSelect from '@/components/formDropDowns/AdvertiserSelect';
import { createLanderAction } from '@/app/server/actions/createLanderAction';
import { redirect } from 'next/navigation';

export default function CreateLanderForm() {
  const form = useForm<z.infer<typeof createLanderSchema>>({
    resolver: zodResolver(createLanderSchema),
    defaultValues: {
      name: '',
      url: '',
      isActive: true,
    },
  });

  async function onSubmit(values: z.infer<typeof createLanderSchema>) {
    console.log(values);
    const data = await createLanderAction(values);
    if (data && data.error) {
      form.setError('root', { message: 'an error happened, please try again' });
    }
    redirect('/landers');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <AdvertiserSelect formControl={form.control} name="clientId" />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Lander Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">SAVE</Button>
      </form>
    </Form>
  );
}
