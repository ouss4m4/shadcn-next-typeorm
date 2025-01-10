'use server';

import { campaignSchema } from '@/app/(private)/campaigns/forms/CampaignSchema';
import { fetchApi } from '@/app/(private)/utils/api';
import { z } from 'zod';

export async function editCampaignAction(
  unsafeData: z.infer<typeof campaignSchema>,
): Promise<{ error: boolean; message?: string } | undefined> {
  const { success, data } = campaignSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true };
  }
  try {
    await fetchApi(`/campaigns/${data.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
    return { error: true, message: 'Error submitting campaign' };
  }
}
