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
  console.log(`${baseUrl}${url}`);
  const response = await fetch(`${baseUrl}${url}`, { ...options, headers });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
