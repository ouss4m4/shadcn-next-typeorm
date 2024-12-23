export async function fetchApi<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const baseUrl = process.env.BASE_URL ?? 'https://api.bzouss.com';

  // Disable SSL certificate verification (development only)
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  console.log(baseUrl);
  // Set default headers if not already set
  const headers = {
    'Content-Type': 'application/json',
    ...(options?.headers || {}),
  };

  const response = await fetch(`${baseUrl}${url}`, { ...options, headers });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
