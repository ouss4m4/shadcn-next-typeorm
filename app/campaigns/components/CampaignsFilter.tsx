'use client';

import AdvertiserSelect from '@/components/formDropDowns/AdvertiserSelect';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

export interface ICampaignListFilter {
  advId: string;
  status: string;
}

export default function CampaignsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<ICampaignListFilter>({
    defaultValues: {
      status: '',
      advId: '',
    },
  });

  const onSubmit = (data: ICampaignListFilter) => {
    const params = new URLSearchParams(searchParams?.toString());

    // Update or add query parameters
    if (data.advId) params.set('advId', data.advId);
    else params.delete('advId');

    if (data.status) params.set('status', data.status);
    else params.delete('status');

    // Navigate with updated query params
    router.push(`/campaigns?${params.toString()}`);
  };

  const onReset = () => {
    // Reset the form values and clear the URL params
    form.reset();
    router.push('/campaigns');
  };
  return (
    <Form {...form}>
      <form
        onChange={form.handleSubmit(onSubmit)}
        className="flex items-center space-x-2"
      >
        <AdvertiserSelect
          formControl={form.control}
          name="advId"
          showLabel={false}
        />

        <Button
          variant="outline"
          type="button"
          className="hover:bg-primary hover:text-secondary"
          onClick={onReset}
        >
          Reset
        </Button>
      </form>
    </Form>
  );
}
