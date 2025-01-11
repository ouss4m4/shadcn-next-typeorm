'use server';
import { createClientSchema } from '@/app/(private)/clients/forms/CreateClientSchema';
import { fetchApi } from '@/app/(private)/utils/api';
import { z } from 'zod';

export async function createClientAction(
  unsafeData: z.infer<typeof createClientSchema>,
): Promise<{ error: boolean; message?: string } | undefined> {
  const { success, data } = createClientSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true };
  }
  try {
    await fetchApi('/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Error submitting campaign' };
  }
}
