/* eslint-disable @typescript-eslint/no-explicit-any */

export async function fetchApi<T = any>(
  url: string,
  options?: RequestInit,
  responseType?: 'json',
): Promise<T>;
export async function fetchApi(
  url: string,
  options?: RequestInit,
  responseType?: 'blob',
): Promise<Blob>;
export async function fetchApi<T = any>(
  url: string,
  options?: RequestInit,
  responseType: 'json' | 'blob' = 'json',
): Promise<T | Blob> {
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

  // Return the appropriate response type
  if (responseType === 'blob') {
    return response.blob(); // For binary responses like files
  }

  return response.json();
}
