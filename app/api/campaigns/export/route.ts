import { fetchApi } from '@/app/(private)/utils/api';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const params = new URLSearchParams(req.url.split('?')[1]);
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get('jwt')?.value ?? '';

  const blobResponse = await fetchApi(
    `/campaigns/exports?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    },
    'blob',
  );

  return new Response(blobResponse, {
    headers: {
      'Content-Disposition': 'attachment; filename="campaigns.csv"',
      'Content-Type': 'text/csv',
    },
  });
}
