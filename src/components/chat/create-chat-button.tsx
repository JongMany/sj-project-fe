'use client';

import { AssistantType } from '@/models/chat/chat-room.dto';
import { showToast } from '@/utils/show-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const CreateChatButton = ({ type }: { type: AssistantType }) => {
  const session = useSession();
  const router = useRouter();

  const createRoomHandler = async () => {
    const response = await fetch('http://localhost:8080/api/gpt/thread', {
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
    router.push(`/chat/${threadId}`);
  };
  return <button onClick={createRoomHandler}>Tap to Chat</button>;
};
