import { ICampaign } from '@/app/(private)/shared/types';
import { fetchApi } from '@/app/(private)/utils/api';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 404 });
  }
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get('jwt')?.value ?? '';

  const res = await fetchApi<ICampaign>(`/campaigns/${id}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  return Response.json(res);
}
