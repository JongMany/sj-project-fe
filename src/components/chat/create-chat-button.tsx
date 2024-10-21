'use client';

import { AssistantType } from '@/models/chat/chat-room.dto';
import { showToast } from '@/utils/show-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {encodeByAES256} from "@/utils/encode";


export const CreateChatButton = ({ type }: { type: AssistantType }) => {
  const session = useSession();
  const router = useRouter();

  const createRoomHandler = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL||''}/api/v1/gpt/thread`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.data?.user?.accessToken}`,
      },
      body: JSON.stringify({
        email: session.data?.user?.email,
        type: type,
      }),
      credentials: 'include',
    });
    if (!response.ok) {
      showToast('error', '채팅방을 만드는데 실패했습니다.');
      return;
    }
    const data = await response.json();
    const threadId = data.threadId;
    const cipherThreadId = encodeByAES256(threadId);
    router.push(`/chat/${cipherThreadId}?type=${type}`);
  };
  return (
    <button
      onClick={createRoomHandler}
      className="text-white bg-blue-500 w-[200px] h-[200px] rounded-full shadow-2xl shadow-black/80 text-[20px] tracking-widest"
    >
      Tap to Chat
    </button>
  );
};
