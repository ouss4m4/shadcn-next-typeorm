'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientSchema } from './CreateClientSchema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function CreateClientForm() {
  const form = useForm<z.infer<typeof createClientSchema>>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: '',
      address: '',
      contactMail: '',
      financeMail: '',
      type: 1,
      isActive: false,
    },
  });

  const onSubmit = (data: z.infer<typeof createClientSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <Input placeholder="Client Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
