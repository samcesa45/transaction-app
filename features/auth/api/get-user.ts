import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { User } from '@/model/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getUser = (): Promise<User> => {
  return api.get('/auth/get-profile');
};

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });
};

type UseUserOptions = {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export const useUser = ({ queryConfig = {} }: UseUserOptions = {}) => {
  return useQuery({
    ...getUserQueryOptions(),
    retry: (failureCount, error: any) => {
      // Don't retry on 401 (let interceptor handle it)
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
    ...queryConfig,
  });
};
