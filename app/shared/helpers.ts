export const formatSeachQuery = (params: {
  [key: string]: string;
}): URLSearchParams => {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) query.append(key, value);
  }
  return query;
};
