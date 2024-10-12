'use client';

import { ChatRoomDetail, ChatRoomDto } from '@/models/chat/chat-room.dto';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoomDetail[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const session = await getSession();

        const response = await fetch('http://localhost:8080/api/gpt/threads', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        });
        const data: ChatRoomDto = await response.json();
        if (data.success) {
          setChatRooms(data.threads);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <main>
      {chatRooms.map((room) => (
        <Link key={room.threadId} href={`/chat/${room.threadId}`}>
          <div>
            <p>{room.type}</p>
          </div>
        </Link>
      ))}
    </main>
  );
};
