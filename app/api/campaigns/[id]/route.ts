import { ICampaign } from '@/app/(private)/shared/types';
import { fetchApi } from '@/app/(private)/utils/api';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get('jwt')?.value ?? '';

  const res = await fetchApi<ICampaign>(`/campaigns/${id}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  return Response.json(res);
}
