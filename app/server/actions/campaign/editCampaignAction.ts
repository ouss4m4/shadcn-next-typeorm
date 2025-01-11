'use server';

import { campaignSchema } from '@/app/(private)/campaigns/forms/CampaignSchema';
import { fetchApi } from '@/app/(private)/utils/api';
import { cookies } from 'next/headers';
import { z } from 'zod';

export async function editCampaignAction(
  unsafeData: z.infer<typeof campaignSchema>,
): Promise<{ error: boolean; message?: string } | undefined> {
  const { success, data } = campaignSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true };
  }
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get('jwt')?.value ?? '';
  try {
    await fetchApi(`/campaigns/${data.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
  } catch (error) {
    console.log(error);
    return { error: true, message: 'Error submitting campaign' };
  }
}
