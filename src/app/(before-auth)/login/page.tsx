import LoginForm from '@/components/auth/login/login-form';
import React from 'react';

export default function LoginPage() {
  return (
    <div className="flex justify-center">
      <section className="w-[280px] max-w-[400px] px-6 py-20">
        <h1 className="font-bold text-[18px] mb-5 text-black">로그인</h1>
        <LoginForm />
      </section>
    </div>
  );
}
