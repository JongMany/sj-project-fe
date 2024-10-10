import { z } from 'zod';

export const joinFormSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    passwordConfirm: z.string(),
    name: z.string().min(1, { message: 'Name is required' }),
    phoneNumber: z
      .string()
      .regex(/^\d+$/, { message: 'Phone number must contain only digits' }),
    group: z.enum(['A', 'B', 'C', 'D'], { message: 'Invalid group selection' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  });
