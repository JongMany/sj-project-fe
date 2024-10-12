'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const CreateChatButton = () => {
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
        type: 'Funny',
      }),
      credentials: 'include',
    });
    const data = await response.json();
    const threadId = data.threadId;
    router.push(`/chat/${threadId}`);
  };
  return <button onClick={createRoomHandler}>재미맨</button>;
};
