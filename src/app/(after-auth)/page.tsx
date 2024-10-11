// 'use client';
// import { useSession } from 'next-auth/react';

import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  const name = session?.user?.name;
  const group = session?.user?.group;
  return (
    <div className="bg-white px-2 py-4">
      <span>{name}님, 안녕하세요!</span>
      <span>속한 그룹 - {group}</span>
    </div>
  );
}
