import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import api from '@/services/api';
import { Image } from '@/types';
import { transformKeysToCamelCase } from '@/utils/transform-keys';
import { generateQueryParams } from '@/utils/generate-query-params';

type GetImagesQueryResponse = Image[];

type GetImagesQueryVariables = {
  page?: number;
  limit?: number;
  mimeType?: string | null;
  breedIds?: string | null;
  hasBreeds?: string | null;
  categoryIds?: string | null;
  size?: 'thumb' | 'small' | 'med' | 'full';
};

const queryKey = 'GetImages';

export const getImages = async (
  params?: GetImagesQueryVariables,
): Promise<GetImagesQueryResponse> => {
  const defaultParams = {
    page: 0,
    limit: 8,
    size: 'med',
    mimeType: 'jpg',
  };

  const variables = { ...defaultParams, ...params };

  const { limit, page, size, mimeType, breedIds, hasBreeds, categoryIds } =
    variables;

  const queryParams = generateQueryParams({
    limit,
    size,
    page,
    breed_ids: breedIds,
    mime_types: mimeType,
    has_breeds: hasBreeds,
    category_ids: categoryIds,
  });

  const response = await api.get(`/images/search${queryParams}`);

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
    queryKey: [queryKey, variables],
    queryFn: () => getImages(variables),
    ...options,
  });
};

useGetImagesQuery.getKey = (variables?: GetImagesQueryResponse) => [
  queryKey,
  variables,
];

useGetImagesQuery.fetcher = (variables?: GetImagesQueryVariables) =>
  getImages(variables);
