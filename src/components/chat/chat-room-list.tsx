import { auth } from '@/auth';
import { CHATROOM_TYPE } from '@/constants/chat/room-type';
import { ChatRoomDto } from '@/models/chat/chat-room.dto';
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
  console.log(chatRooms);

  return (
    <main className="grid grid-cols-2 px-2 py-2 bg-white gap-x-10">
      {chatRooms?.map((room) => (
        <Link
          key={room.threadId}
          href={`/chat/${room.threadId}?type=${room.type}`}
          className="rounded-md border border-gray-200"
        >
          <div className="h-[60px] flex items-center justify-center">
            <p>{CHATROOM_TYPE[room.type]}</p>
          </div>
        </Link>
      ))}
    </main>
  );
};
