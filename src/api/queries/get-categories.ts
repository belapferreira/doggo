import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import api from '@/services/api';
import { Category } from '@/types';
import { transformKeysToCamelCase } from '@/utils/transform-keys';
import { generateQueryParams } from '@/utils/generate-query-params';

type GetCategoriesQueryResponse = Category[];

type GetCategoriesQueryVariables = {
  page?: number;
  limit?: number;
};

const queryKey = 'GetCategories';

export const GetCategories = async (
  params?: GetCategoriesQueryVariables,
): Promise<GetCategoriesQueryResponse> => {
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

  const response = await api.get(`/categories${queryParams}`);

  const breeds = transformKeysToCamelCase(response.data);

  return breeds;
};

export const useGetCategoriesQuery = <
  TData = GetCategoriesQueryResponse,
  TError = unknown,
>(
  variables?: GetCategoriesQueryVariables,
  options?: Omit<
    UseQueryOptions<GetCategoriesQueryResponse, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      GetCategoriesQueryResponse,
      TError,
      TData
    >['queryKey'];
  },
) => {
  return useQuery<GetCategoriesQueryResponse, TError, TData>({
    queryKey: [queryKey, variables],
    queryFn: () => GetCategories(variables),
    ...options,
  });
};

useGetCategoriesQuery.getKey = (variables?: GetCategoriesQueryResponse) => [
  queryKey,
  variables,
];

useGetCategoriesQuery.fetcher = (variables?: GetCategoriesQueryVariables) =>
  GetCategories(variables);
