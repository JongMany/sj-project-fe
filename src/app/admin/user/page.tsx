import React from 'react';
import { decodeByAES256 } from '@/utils/encode';
import Link from 'next/link';

type Props = {
  searchParams: {
    id1: string;
    id2: string;
  };
};
async function Page({ searchParams: { id1 } }: Props) {
  const encodedId = decodeByAES256(id1);
  // const phoneNumber = decodeByAES256(id2);
  // const slicedId = phoneNumber.slice(5, 9);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/user/privacy/${encodedId}`,
  );
  const data = await response.json();

  return (
    <div>
      <div>
        <div>User 정보</div>
        <div>ID: {data.id}</div>
        <div>Group: {data.group}</div>
      </div>
      <div>
        <div>사용 중인 스레드</div>
        <div className="flex flex-col">
          {data?.threads?.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data?.threads?.map((thread: any) => (
              <div key={thread.threadId} className="flex gap-x-3">
                <div className={'min-w-[80px]'}>{thread.type}</div>
                <Link href={`/admin/${encodedId}/thread?id=${thread.threadId}`}>
                  대화 내용 보기
                </Link>
              </div>
            ))
          ) : (
            <div>사용 중인 스레드가 없습니다</div>
          )}
        </div>
        <Link href={`/admin/${encodedId}/logs?id=${encodedId}`}>
          사용자 로그 보기
        </Link>
      </div>
    </div>
  );
}

export default Page;
