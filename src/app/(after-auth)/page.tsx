// 'use client';
// import { useSession } from 'next-auth/react';

import { auth } from '@/auth';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();
  const name = session?.user?.name;
  const group = session?.user?.group;
  return (
    <div className="bg-white px-2 py-4">
      <span>{name}님, 안녕하세요!</span>
      <span>속한 그룹 - {group}</span>
      <section>
        <Link
          href="/chat/create"
          className="text-black font-semibold text-[16px]"
        >
          에이전트 선택하기
        </Link>
      </section>
    </div>
  );
}
