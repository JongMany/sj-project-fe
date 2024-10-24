import { z } from 'zod';

export const joinFormSchema = z
  .object({
    email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 8자리 이상이어야 합니다.' }),
    passwordConfirm: z.string(),
    name: z.string().min(2, { message: '이름은 2자리 이상이어야 합니다.' }),
    phoneNumber: z
      .string()
      .regex(/^\d+$/, { message: '올바른 전화번호 형식이어야 합니다.' }),
    group: z.enum(['A', 'B', 'C', 'D'], { message: '그룹은 A, B, C 또는 D 중 하나여야 합니다.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });
