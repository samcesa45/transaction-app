import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const logout = (refreshToken?: string) => {
  return api.post('/auth/logout', { refreshToken });
};

type UseLogoutOptions = {
  mutationConfig?: MutationConfig<typeof logout>;
};

export const useSignout = ({ mutationConfig }: UseLogoutOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    mutationFn: logout,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
    ...restConfig,
  });
};
