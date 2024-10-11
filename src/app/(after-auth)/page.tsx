// 'use client';
// import { useSession } from 'next-auth/react';

import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  const name = session?.user?.name;
  return <div>홈: {name}</div>;
}
