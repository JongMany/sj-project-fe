'use client';
import { useForm } from '@/hooks/common/useForm';
import { loginFormSchema } from '@/models/auth/login.schema';
import { showToast } from '@/utils/show-toast';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LoginForm() {
  const router = useRouter();
  const { form: loginForm, onChange: onChangeHandler } = useForm({
    email: '',
    password: '',
  });

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = loginFormSchema.safeParse(loginForm);
    if (!validationResult.success) {
      const errorMessages = validationResult.error.format();
      console.log(errorMessages); // Validation errors will be logged here
      showToast('error', <>로그인 오류</>);
      return;
    }

    const data = await signIn('credentials', {
      email: loginForm.email,
      password: loginForm.password,
      redirect: false,
    });
    if (data && data.error === 'CredentialsSignin') {
      showToast('error', <>로그인 정보가 정확하지 않습니다.</>);
    } else if (data && data.error === null) {
      router.replace('/');
    }
  };

  return (
    <form
      className="flex flex-col max-w-[400px] gap-3 px-8 py-4"
      onSubmit={loginHandler}
    >
      <input
        type="email"
        placeholder="이메일"
        id="email"
        name="email"
        onChange={onChangeHandler}
        value={loginForm.email}
      />
      <input
        type="password"
        placeholder="비밀번호"
        id="password"
        name="password"
        onChange={onChangeHandler}
        value={loginForm.password}
      />
      <div className="flex justify-between">
        <button type="submit">로그인</button>
        <Link href="/join">회원가입으로</Link>
      </div>
    </form>
  );
}
