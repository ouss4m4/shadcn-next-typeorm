export async function fetchApi<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const baseUrl = process.env.BASE_URL ?? 'http://localhost:3001';
  const response = await fetch(`${baseUrl}${url}`, options);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
