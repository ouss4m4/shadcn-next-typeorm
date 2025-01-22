'use server';
import { createClientSchema } from '@/app/(private)/clients/forms/CreateClientSchema';
import { fetchApi } from '@/app/(private)/utils/api';
import { cookies } from 'next/headers';
import { z } from 'zod';

export async function createClientAction(
  unsafeData: z.infer<typeof createClientSchema>,
): Promise<{ error: boolean; message?: string } | undefined> {
  const { success, data } = createClientSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true };
  }
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get('jwt')?.value ?? '';
  try {
    await fetchApi('/clients', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Error submitting campaign' };
  }
}
