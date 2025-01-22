'use server';

import { createLanderSchema } from '@/app/(private)/landers/forms/CreateLanderSchema';
import { fetchApi } from '@/app/(private)/utils/api';
import { z } from 'zod';
import { cookies } from 'next/headers';

export async function createLanderAction(
  unsafeData: z.infer<typeof createLanderSchema>,
): Promise<{ error: boolean; message?: string } | undefined> {
  const { success, data } = createLanderSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true };
  }

  const cookieStore = await cookies();
  const jwtToken = cookieStore.get('jwt')?.value ?? '';

  try {
    await fetchApi('/landers', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Error submitting campaign' };
  }
}
