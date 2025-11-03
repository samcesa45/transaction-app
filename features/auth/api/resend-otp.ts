import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { VerifyResponse } from '@/model/api';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const resendOtpInputSchema = z.object({
  userId: z.string(),
});

export type ResendOtpInput = z.infer<typeof resendOtpInputSchema>;

export function resendOtp({ data }: { data: ResendOtpInput }) {
  return api.post('/auth/resend-otp', data);
}

type UseVerifyPasswordOptions = {
  mutationConfig?: MutationConfig<typeof resendOtp>;
};

export const useResendOtp = ({
  mutationConfig,
}: UseVerifyPasswordOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: resendOtp,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
    ...restConfig,
  });
};
