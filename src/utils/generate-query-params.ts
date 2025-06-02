type QueryParams = {
  [key: string]: string | number | boolean | undefined | null;
};

export const generateQueryParams = (params: QueryParams) => {
  const queryString = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join('&');

  return queryString ? `?${queryString}` : '';
};
