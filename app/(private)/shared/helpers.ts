export const createUrlParamsFromObject = (params: {
  [key: string]: string;
}): URLSearchParams => {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value);
  }
  return query;
};
