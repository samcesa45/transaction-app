import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { LoginResponse } from '@/model/api';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const loginInputSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email({message: 'Invalid email address'}),
  password: z
    .string({ message: 'Password is required' })
    .min(8, {message:'Password must be atleast 8 characters.'}),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const login = ({
  data,
}: {
  data: LoginInput;
}): Promise<LoginResponse> => {
  const loginData = {
    ...data,
    email: data.email.toLowerCase(),
  };
  return api.post('/auth/login', loginData);
};

type UserLoginOptions = {
  mutationConfig?: MutationConfig<typeof login>;
};

export const useSignin = ({ mutationConfig }: UserLoginOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: login,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
