/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Link from 'next/link';
import { encodeByAES256 } from '@/utils/encode';

async function Page() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/user`,
    {
      next: {
        revalidate: 300,
      },
    },
  );
  const users = await response.json();

  return (
    <div className="flex flex-col gap-y-2 px-4 py-8">
      {users.map((user: any, idx: number) => {
        const encodedPhoneNumber = encodeByAES256(user.phoneNumber);
        const encodedId = encodeByAES256(user.id);
        return (
          <div key={user.id} className="text-gray-500">
            <Link
              href={`/admin/user?id1=${encodedId}&id2=${encodedPhoneNumber}`}
            >
              {idx + 1}. {user.email.split('@')[0]}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Page;
