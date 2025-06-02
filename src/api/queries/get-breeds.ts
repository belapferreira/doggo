import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import api from '@/services/api';
import { Breed } from '@/types';
import { transformKeysToCamelCase } from '@/utils/transform-keys';
import { generateQueryParams } from '@/utils/generate-query-params';

type GetBreedsQueryResponse = Pick<Breed, 'id' | 'name'>[];

type GetBreedsQueryVariables = {
  page?: number;
  limit?: number;
};

const queryKey = 'GetBreeds';

export const GetBreeds = async (
  params?: GetBreedsQueryVariables,
): Promise<GetBreedsQueryResponse> => {
  const defaultParams = {
    page: 0,
    limit: 8,
  };

  const variables = { ...defaultParams, ...params };

  const { limit, page } = variables;

  const queryParams = generateQueryParams({
    limit,
    page,
  });

  const response = await api.get(`/breeds${queryParams}`);

  const breeds = transformKeysToCamelCase(response.data);

  return breeds;
};

export const useGetBreedsQuery = <
  TData = GetBreedsQueryResponse,
  TError = unknown,
>(
  variables?: GetBreedsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetBreedsQueryResponse, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      GetBreedsQueryResponse,
      TError,
      TData
    >['queryKey'];
  },
) => {
  return useQuery<GetBreedsQueryResponse, TError, TData>({
    queryKey: [queryKey, variables],
    queryFn: () => GetBreeds(variables),
    ...options,
  });
};

useGetBreedsQuery.getKey = (variables?: GetBreedsQueryResponse) => [
  queryKey,
  variables,
];

useGetBreedsQuery.fetcher = (variables?: GetBreedsQueryVariables) =>
  GetBreeds(variables);
