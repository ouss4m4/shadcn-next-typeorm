export async function fetchApi<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const baseUrl =
    process.env.NODE_ENV == 'production'
      ? 'https://api.bzouss.com'
      : 'http://localhost:3001';

  // Set default headers if not already set
  const headers = {
    'Content-Type': 'application/json',
    ...(options?.headers || {}),
  };

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(JSON.stringify(errorBody));
  }

  return response.json();
}
