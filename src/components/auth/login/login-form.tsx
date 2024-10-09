import Link from 'next/link';
import React from 'react';

export default function LoginForm() {
  return (
    <form className="flex flex-col max-w-[400px] gap-3 px-8 py-4">
      <input type="email" placeholder="이메일" />
      <input type="password" placeholder="비밀번호" />
      <div className="flex justify-between">
        <button type="submit">로그인</button>
        <Link href="/join">회원가입으로</Link>
      </div>
    </form>
  );
}
