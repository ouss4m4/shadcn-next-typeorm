'use client';

import { CampaignStatusMap } from '@/app/(private)/shared/enums';
import { ICampaignsListState } from '@/app/(private)/shared/types';
import AdvertiserSelect from '@/components/formDropDowns/AdvertiserSelect';
import CountrySelectSingle from '@/components/formDropDowns/CountrySelectSingle';
import DeviceSelect from '@/components/formDropDowns/DeviceSelect';
import LanderSelect from '@/components/formDropDowns/LanderSelect';
import StatusSelect from '@/components/formDropDowns/StatusSelect';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useUserInfo } from '../../context/UserInfoContext';

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
  const userInfo = useUserInfo();
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
    onFiltersChange({ ...data, page: '1', sortBy: 'updatedAt', order: 'desc' });
  };

  const onReset = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onChange={form.handleSubmit(onSubmit)}
        className="flex items-center space-x-2"
      >
        {userInfo?.role == 'Admin' && (
          <AdvertiserSelect
            formControl={form.control}
            name="advId"
            showLabel={false}
          />
        )}

        <LanderSelect
          formControl={form.control}
          name="lander"
          showLabel={false}
          advertiserId={Number(form.getValues().advId) ?? 0}
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
        <StatusSelect
          statusMap={CampaignStatusMap}
          formControl={form.control}
          name="status"
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
