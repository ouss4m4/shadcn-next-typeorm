'use server';

import { campaignSchema } from '@/app/(private)/campaigns/forms/CampaignSchema';
import { fetchApi } from '@/app/(private)/utils/api';
import { z } from 'zod';

export async function createCampaignAction(
  unsafeData: z.infer<typeof campaignSchema>,
  jwtToken: string,
): Promise<{ error: boolean; message?: string } | undefined> {
  const { success, data } = campaignSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true };
  }
  console.log('!!!!!!!!!!!', jwtToken);
  try {
    await fetchApi('/campaigns', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
  } catch (error) {
    console.log(error);
    return { error: true, message: 'Error submitting campaign' };
  }
}
