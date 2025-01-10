import { LanderStatusMap } from '@/app/(private)/shared/enums';
import { ILandersListState } from '@/app/(private)/shared/types';
import AdvertiserSelect from '@/components/formDropDowns/AdvertiserSelect';
import StatusSelect from '@/components/formDropDowns/StatusSelect';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ILanderListFilter {
  advId: string;
  status: string;
}
export default function LandersFilter({
  state,
  onFiltersChange,
}: {
  state: ILandersListState;
  onFiltersChange: (data: Partial<ILandersListState>) => void;
}) {
  const form = useForm<ILanderListFilter>({
    defaultValues: {
      status: state.status,
      advId: state.advId,
    },
  });

  const onSubmit = (data: ILanderListFilter) => {
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
        <AdvertiserSelect
          formControl={form.control}
          name="advId"
          showLabel={false}
        />

        <StatusSelect
          statusMap={LanderStatusMap}
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
