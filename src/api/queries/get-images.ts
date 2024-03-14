import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import api from '@/services/api';
import { Image } from '@/types';
import { transformKeysToCamelCase } from '@/utils/transformKeys';

type GetImagesQueryResponse = Image[];

type GetImagesQueryVariables = {
  page?: number;
  limit?: number;
  size?: 'thumb' | 'small' | 'med' | 'full';
  mimeType?: string;
};

export const getImages = async (
  params?: GetImagesQueryVariables,
): Promise<GetImagesQueryResponse> => {
  const defaultParams = {
    page: 0,
    limit: 12,
    size: 'med',
    mimeType: 'jpg',
  };

  const variables = { ...defaultParams, ...params };

  const { limit, page, size, mimeType } = variables;

  const response = await api.get(
    `/images/search?page=${page}&limit=${limit}&size=${size}&mime_types=${mimeType}`,
  );

  const images = transformKeysToCamelCase(response.data);

  return images;
};

export const useGetImagesQuery = <
  TData = GetImagesQueryResponse,
  TError = unknown,
>(
  variables?: GetImagesQueryVariables,
  options?: Omit<
    UseQueryOptions<GetImagesQueryResponse, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      GetImagesQueryResponse,
      TError,
      TData
    >['queryKey'];
  },
) => {
  return useQuery<GetImagesQueryResponse, TError, TData>({
    queryKey: ['GetImages', variables],
    queryFn: () => getImages(variables),
    ...options,
  });
};

useGetImagesQuery.getKey = (variables?: GetImagesQueryResponse) => [
  'GetImages',
  variables,
];

useGetImagesQuery.fetcher = (variables?: GetImagesQueryVariables) =>
  getImages(variables);
