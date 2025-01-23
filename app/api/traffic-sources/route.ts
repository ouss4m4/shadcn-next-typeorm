import { ITrafficSource } from '@/app/(private)/shared/types';
import { fetchApi } from '@/app/(private)/utils/api';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get('jwt')?.value ?? '';

  const res = await fetchApi<ITrafficSource[]>(`/traffic-sources`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  return Response.json(res);
}
