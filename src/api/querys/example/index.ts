import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getReposGithub, RepositoryDTO } from '@/api/services/example';
import { ErrorResponse } from '@/types';

// Arquivo com exemplo de query construída como hook para ser usada em diversos locais

export const useGetReposGithub = (
  options?: Omit<
    UseQueryOptions<
      RepositoryDTO | undefined,
      AxiosError<ErrorResponse>,
      RepositoryDTO,
      any[]
    >,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<RepositoryDTO | undefined, AxiosError<ErrorResponse>> => {
  return useQuery({
    queryKey: ['getReposGithub'],
    queryFn: () => getReposGithub(),
    ...options,
  });
};
