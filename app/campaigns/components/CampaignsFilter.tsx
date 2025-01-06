'use client';

import { formatSeachQuery } from '@/app/shared/helpers';
import AdvertiserSelect from '@/components/formDropDowns/AdvertiserSelect';
import CountrySelectSingle from '@/components/formDropDowns/CountrySelectSingle';
import LanderSelect from '@/components/formDropDowns/LanderSelect';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

export interface ICampaignListFilter {
  advId?: string;
  status?: string;
  lander?: string;
  country?: string;
}

export default function CampaignsFilter() {
  const router = useRouter();
  const params = useSearchParams();

  const form = useForm<ICampaignListFilter>({
    defaultValues: {
      status: params.get('status') ?? '',
      advId: params.get('advId') ?? '',
      lander: params.get('lander') ?? '',
      country: params.get('country') ?? '',
    },
  });

  const onSubmit = (data: ICampaignListFilter) => {
    const { advId = '', lander = '', status = '', country = '' } = data;
    const params = formatSeachQuery({ advId, status, lander, country });
    router.push(`/campaigns?${params.toString()}`);
  };

  const onReset = () => {
    // Reset the form values and clear the URL params
    form.reset();

    // Manually reset the dropdown values to reflect the form reset to children
    form.setValue('status', '');
    form.setValue('advId', '');
    form.setValue('lander', '');
    form.setValue('country', '');
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

        <LanderSelect
          formControl={form.control}
          name="lander"
          showLabel={false}
          clientId={Number(form.getValues().advId) ?? 0}
        />

        <CountrySelectSingle
          formControl={form.control}
          name="country"
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
