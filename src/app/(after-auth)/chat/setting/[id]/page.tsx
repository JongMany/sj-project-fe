import React from 'react';
import { decodeByAES256 } from '@/utils/encode';
import { CHATROOM_TYPE } from '@/constants/chat/room-type';
import { AssistantType } from '@/models/chat/chat-room.dto';
import { auth } from '@/auth';
import MemoryList from '@/components/memory/memory-list';
import { FaBrain } from 'react-icons/fa6';

type Props = {
  params: {
    id: string;
  };
  searchParams: { type: AssistantType };
};

export type MemoryType = {
  id: string;
  userId: string;
  type: 'age' | 'favorite_color' | 'favorite_food' | 'hobby' | 'things_to_do' | 'things_done' | 'things_to_do_later';
  description: string;
}

async function Page({ params: { id }, searchParams: { type } }: Props) {
  const threadId = decodeByAES256(id);
  const session = await auth();

  const memories: MemoryType[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/memory/${threadId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Memory Fetch Error');
    }
    return response.json();
  }).then((data) => {
    if (data.success) {
      return data.memories;
    }
    return [];
  }).catch((error) => {
    console.error("Error", error);
    return [];
  });

  return (
    <div className="bg-white px-4 py-4 h-[calc(100dvh-50px)]">
      <div className="h-full flex flex-col justify-between gap-8">
        <h3 className="text-black font-semibold text-[18px] flex items-center gap-x-3">
          <span>{CHATROOM_TYPE[type]}이 알고 있는 {session?.user?.name} 님의 정보</span>
          <FaBrain />
        </h3>
        <MemoryList memories={memories} />
      </div>
    </div>
  );
}

export default Page;
