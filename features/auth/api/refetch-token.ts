import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const generateRefetchToken = (refreshToken?: string) => {
  return api.post('/auth/refresh', { refreshToken });
};

type UseRefetchTokenOptions = {
  mutationConfig?: MutationConfig<typeof generateRefetchToken>;
};

export const useRefetchToken = ({
  mutationConfig,
}: UseRefetchTokenOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    mutationFn: generateRefetchToken,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
