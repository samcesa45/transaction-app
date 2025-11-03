import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { VerifyResponse } from '@/model/api';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const verifyResetInputSchema = z.object({
  userId: z.string(),
  otp: z.string().min(5, 'OTP must be at least 5 characters'),
});

export type VerifyRequestInput = z.infer<typeof verifyResetInputSchema>;

export function verifyTwoFactor({
  data,
}: {
  data: VerifyRequestInput;
}): Promise<VerifyResponse> {
  return api.post('/auth/verify-2fa', data);
}

type UseVerifyPasswordOptions = {
  mutationConfig?: MutationConfig<typeof verifyTwoFactor>;
};

export const useVerifyRequest = ({
  mutationConfig,
}: UseVerifyPasswordOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: verifyTwoFactor,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
    ...restConfig,
  });
};
