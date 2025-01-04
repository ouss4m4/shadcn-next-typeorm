export async function fetchApi<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const baseUrl = process.env.BASE_URL ?? 'https://api.bzouss.com';

  // Set default headers if not already set
  const headers = {
    'Content-Type': 'application/json',
    ...(options?.headers || {}),
  };
  console.log(`${baseUrl}${url}`);
  const response = await fetch(`${baseUrl}${url}`, { ...options, headers });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
