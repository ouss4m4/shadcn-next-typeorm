'use client';

import { ICampaignsListState } from '@/app/shared/types';
import AdvertiserSelect from '@/components/formDropDowns/AdvertiserSelect';
import CountrySelectSingle from '@/components/formDropDowns/CountrySelectSingle';
import DeviceSelect from '@/components/formDropDowns/DeviceSelect';
import LanderSelect from '@/components/formDropDowns/LanderSelect';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface ICampaignListFilter {
  advId?: string;
  status?: string;
  lander?: string;
  country?: string;
  device?: string;
}

export default function CampaignsFilter({
  state,
  onFiltersChange,
}: {
  state: ICampaignsListState;
  onFiltersChange: (data: Partial<ICampaignsListState>) => void;
}) {
  const form = useForm<ICampaignListFilter>({
    defaultValues: {
      status: state.status,
      advId: state.advId,
      lander: state.lander,
      country: state.country,
      device: state.device,
    },
  });

  const onSubmit = (data: ICampaignListFilter) => {
    onFiltersChange({ ...data, page: '1' });
  };

  const onReset = () => {
    // Reset the form values and clear the URL params
    form.reset();
    // Manually reset the dropdown values to reflect the form reset
    form.setValue('status', '');
    form.setValue('advId', '');
    form.setValue('lander', '');
    form.setValue('country', '');
    form.setValue('device', '');

    onFiltersChange({
      advId: '',
      country: '',
      lander: '',
      status: '',
      device: '',
      page: '1',
    });
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
        <DeviceSelect
          formControl={form.control}
          name="device"
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
