import { IAdvertiser } from '@/app/(private)/shared/types';
import { fetchApi } from '@/app/(private)/utils/api';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const params = new URLSearchParams(req.url.split('?')[1]);
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get('jwt')?.value ?? '';

    const res = await fetchApi<IAdvertiser[]>(`/clients?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return NextResponse.json(res);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message ?? 'An error occurred' },
      { status: 500 },
    );
  }
}
