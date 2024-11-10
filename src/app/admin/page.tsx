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
  const allUser = await response.json();

  const users = allUser.slice(10);

  return (
    <div className="flex flex-col gap-y-2 px-4 py-8 text-black justify-center items-center">
      <h1 className="text-[22px] font-bold mb-10">Admin 페이지</h1>
      {/* {users.slice(10).map((user: any, idx: number) => { */}
      <div className="flex gap-x-20 mb-8">
        <article className="min-w-[200px]">
          <h3 className="text-[18px] font-bold">Group A</h3>
          {users
            .filter((user: any) => user.group === 'A')
            .map((user: any, idx: number) => {
              const encodedId = encodeByAES256(user.id);
              return (
                <div key={user.id} className="text-gray-500 mb-3">
                  <Link
                    href={`/admin/user?id1=${encodedId}&id2=${
                      'User ' + Number(idx + 1)
                    }`}
                  >
                    {idx + 1}. User {idx + 1}
                  </Link>
                </div>
              );
            })}
        </article>
        <article className="min-w-[200px]">
          <h3 className="text-[18px] font-bold">Group B</h3>
          {users
            .filter((user: any) => user.group === 'B')
            .map((user: any, idx: number) => {
              const encodedId = encodeByAES256(user.id);
              return (
                <div key={user.id} className="text-gray-500 mb-3">
                  <Link
                    href={`/admin/user?id1=${encodedId}&id2=${
                      'User ' + Number(idx + 1)
                    }`}
                  >
                    {idx + 1}. User {idx + 1}
                  </Link>
                </div>
              );
            })}
        </article>
      </div>
      <div className="flex gap-x-20">
        <article className="min-w-[200px]">
          <h3 className="text-[18px] font-bold">Group C</h3>
          {users
            .filter((user: any) => user.group === 'C')
            .map((user: any, idx: number) => {
              const encodedId = encodeByAES256(user.id);
              return (
                <div key={user.id} className="text-gray-500 mb-3">
                  <Link
                    href={`/admin/user?id1=${encodedId}&id2=${
                      'User ' + Number(idx + 1)
                    }`}
                  >
                    {idx + 1}. User {idx + 1}
                  </Link>
                </div>
              );
            })}
        </article>
        <article className="min-w-[200px]">
          <h3 className="text-[18px] font-bold">Group D</h3>
          {users
            .filter((user: any) => user.group === 'D')
            .map((user: any, idx: number) => {
              const encodedId = encodeByAES256(user.id);
              return (
                <div key={user.id} className="text-gray-500 mb-3">
                  <Link
                    href={`/admin/user?id1=${encodedId}&id2=${
                      'User ' + Number(idx + 1)
                    }`}
                  >
                    {idx + 1}. User {idx + 1}
                  </Link>
                </div>
              );
            })}
        </article>
      </div>
    </div>
  );
}

export default Page;
