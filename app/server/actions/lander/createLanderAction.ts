'use server';

import { createLanderSchema } from '@/app/(private)/landers/forms/CreateLanderSchema';
import { fetchApi } from '@/app/(private)/utils/api';
import { z } from 'zod';

export async function createLanderAction(
  unsafeData: z.infer<typeof createLanderSchema>,
): Promise<{ error: boolean; message?: string } | undefined> {
  const { success, data } = createLanderSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true };
  }
  try {
    await fetchApi('/landers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
    return { error: true, message: 'Error submitting campaign' };
  }
}
