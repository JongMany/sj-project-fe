import React from 'react';
import { decodeByAES256 } from '@/utils/encode';
import Link from 'next/link';

type Props = {
  searchParams: {
    id1: string;
    id2: string;
  };
};
async function Page({ searchParams: { id1, id2 } }: Props) {
  const encodedId = decodeByAES256(id1);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/user/privacy/${encodedId}`,
  );
  const data = await response.json();

  return (
    <div className="px-4 py-8 text-black">
      <div className="flex flex-col gap-y-2 mb-4">
        <div className="text-black text-[18px] font-bold">User 정보</div>
        <div className="flex">ID: {id2}</div>
        <div>Group: {data.group}</div>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="text-[18px] font-bold">사용 중인 스레드</div>
        <div className="flex flex-col">
          {data?.threads?.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data?.threads?.map((thread: any) => (
              <div key={thread.threadId} className="flex gap-x-3">
                <div className={'min-w-[80px]'}>{thread.type}</div>
                <Link
                  href={`/admin/${encodedId}/thread?id=${thread.threadId}`}
                  className="text-gray-500"
                >
                  대화 내용 보기
                </Link>
              </div>
            ))
          ) : (
            <div>사용 중인 스레드가 없습니다</div>
          )}
        </div>
        <Link
          href={`/admin/${encodedId}/logs?id=${encodedId}&id2=${id2}`}
          className="text-gray-500"
        >
          사용자 로그 보기
        </Link>
      </div>
    </div>
  );
}

export default Page;
