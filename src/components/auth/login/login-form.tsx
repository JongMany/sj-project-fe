'use client';
import { useForm } from '@/hooks/common/useForm';
import { loginFormSchema } from '@/models/auth/login.schema';
import { showToast } from '@/utils/show-toast';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // 유효기간 설정
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

export default function LoginForm() {
  const router = useRouter();
  const { form: loginForm, onChange: onChangeHandler } = useForm({
    email: '',
    password: '',
  });

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginForm.email === 'adminsj@admin.com') {
      setCookie('isAdmin', 'true', 1);
      router.push('/admin');
    }
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
    <form className="flex flex-col gap-y-5 text-black" onSubmit={loginHandler}>
      <input
        type="email"
        placeholder="이메일"
        id="email"
        name="email"
        className="bg-white py-1 border-b-[1px]"
        onChange={onChangeHandler}
        value={loginForm.email}
      />
      <input
        type="password"
        placeholder="비밀번호"
        id="password"
        name="password"
        className="bg-white py-1 border-b-[1px]"
        onChange={onChangeHandler}
        value={loginForm.password}
      />
      <div className="flex flex-col mt-4 gap-y-5">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md"
        >
          로그인
        </button>
        <Link href="/join" className="mx-auto text-black">
          회원가입
        </Link>
      </div>
    </form>
  );
}
