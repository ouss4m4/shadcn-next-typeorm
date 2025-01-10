'use server';

import { fetchApi } from '@/app/(private)/utils/api';
import { registerSchema } from '@/app/(public)/components/userSchema';
import { z } from 'zod';

export async function RegisterAction(
  unsafeData: z.infer<typeof registerSchema>,
): Promise<{ error: boolean; message?: string; name?: string } | undefined> {
  const { success, data } = registerSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true };
  }
  try {
    await fetchApi<void>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return { error: false };
  } catch (error) {
    console.log(error);
    let message = JSON.stringify(error);
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: true, message };
  }
}
