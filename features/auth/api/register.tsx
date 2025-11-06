import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { RegisterResponse } from '@/model/api';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const registerInputSchema = z.object({
firstName: z.string({message:'FirstName is required'}),
lastName: z.string({message:'LasttName is required'}).optional(),
middleName: z.string({message:'MiddleName is required'}).optional(),
phoneNumber: z.string({message:'Phone Number is required'}),
  email: z
    .string({ message: 'Email is required' })
    .email({message: 'Invalid email address'}),
  password: z
    .string({ message: 'Password is required' })
    .min(8, {message:'Password must be atleast 8 characters.'}),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

export const Register = ({
  data,
}: {
  data: RegisterInput;
}): Promise<RegisterResponse> => {
  const RegisterData = {
    ...data,
    email: data.email.toLowerCase(),
  };
  return api.post('/auth/register', RegisterData);
};

type UserRegisterOptions = {
  mutationConfig?: MutationConfig<typeof Register>;
};

export const useSignup = ({ mutationConfig }: UserRegisterOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: Register,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
