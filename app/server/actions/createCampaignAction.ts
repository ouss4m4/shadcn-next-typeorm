'use server';

import { createCampaignSchema } from '@/app/campaigns/forms/CreateCampaignSchema';
import { fetchApi } from '@/app/utils/api';
import { z } from 'zod';

export async function createCampaignAction(
  unsafeData: z.infer<typeof createCampaignSchema>,
): Promise<{ error: boolean; message?: string } | undefined> {
  const { success, data } = createCampaignSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true };
  }
  try {
    await fetchApi('/campaigns', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
    return { error: true, message: 'Error submitting campaign' };
  }
}
