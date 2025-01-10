'use server';

import { ILoginResponse } from '@/app/(private)/shared/types';
import { fetchApi } from '@/app/(private)/utils/api';
import { loginSchema } from '@/app/(public)/components/userSchema';
import { z } from 'zod';
import { cookies } from 'next/headers';

export async function LoginAction(
  unsafeData: z.infer<typeof loginSchema>,
): Promise<{ error: boolean; message?: string; name?: string } | undefined> {
  const { success, data } = loginSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true };
  }
  try {
    const result = await fetchApi<ILoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    (await cookies()).set('token', result.jwt, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    return { error: false, name: result.name };
  } catch (error) {
    console.log(error);
    let message = JSON.stringify(error);
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: true, message };
  }
}
