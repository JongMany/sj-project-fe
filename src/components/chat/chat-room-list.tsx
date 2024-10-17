import { auth } from '@/auth';
import { CHATROOM_TYPE } from '@/constants/chat/room-type';
import { ChatRoomDto } from '@/models/chat/chat-room.dto';
import { encodeByAES256 } from '@/utils/encode';

import Link from 'next/link';

export const ChatRoomList = async () => {
  async function fetchData() {
    try {
      const session = await auth();
      const response = await fetch('http://localhost:8080/api/gpt/threads', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });
      const data: ChatRoomDto = await response.json();
      return data.threads;
    } catch (error) {
      console.error(error);
    }
  }
  const chatRooms = (await fetchData()) || [];

  return (
    <main className="grid grid-cols-2 px-2 py-2 bg-white gap-x-10">
      {chatRooms?.map((room) => {
        const threadId = room.threadId;
        const cipherThreadId = encodeByAES256(threadId);
        return (
          <Link
            key={cipherThreadId}
            href={`/chat/${cipherThreadId}?type=${room.type}`}
            className="rounded-md border border-gray-200"
          >
            <div className="h-[60px] flex items-center justify-center">
              <p>{CHATROOM_TYPE[room.type]}</p>
            </div>
          </Link>
        );
      })}
    </main>
  );
};
