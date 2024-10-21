"use client";
import { CHATROOM_TYPE } from '@/constants/chat/room-type';
import {ChatRoomDetail, ChatRoomDto} from '@/models/chat/chat-room.dto';
import { encodeByAES256 } from '@/utils/encode';

import Link from 'next/link';
import {useEffect, useState} from "react";
import {getSession} from "next-auth/react";

export const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoomDetail[]>([]);


  useEffect(()=>{
    async function fetchData() {
      try {
        const session = await getSession();
        console.log('session', session)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gpt/threads`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        });
        const data: ChatRoomDto = await response.json();
        setChatRooms(data.threads);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="grid grid-cols-2 px-2 py-2 bg-white gap-x-10 gap-y-5">
      {chatRooms?.map((room) => {
        const threadId = room.threadId;
        const cipherThreadId = encodeByAES256(threadId);
        return (
          <Link
            key={cipherThreadId}
            href={`/chat/${cipherThreadId}?type=${room.type}`}
            className="rounded-md border bg-gray-200 text-gray-700"
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
