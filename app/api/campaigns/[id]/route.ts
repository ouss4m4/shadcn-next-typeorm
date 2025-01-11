import { ICampaign } from '@/app/(private)/shared/types';
import { fetchApi } from '@/app/(private)/utils/api';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

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
