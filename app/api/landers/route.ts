import { LandersListReponse } from './../../(private)/shared/types';
import { fetchApi } from '@/app/(private)/utils/api';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const params = new URLSearchParams(req.url.split('?')[1]);
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get('jwt')?.value ?? '';

  const res = await fetchApi<LandersListReponse>(
    `/landers?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    },
  );
  return Response.json(res);
}
