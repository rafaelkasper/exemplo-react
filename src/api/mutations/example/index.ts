import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { saveTodo } from '@/api/services/example';
import { ErrorResponse } from '@/types';

export const useSaveTodo = (
  options?: UseMutationOptions<any, AxiosError<ErrorResponse>, any>
): UseMutationResult<any, AxiosError<ErrorResponse>, any> =>
  useMutation({ mutationFn: (request: any) => saveTodo(request), ...options });
