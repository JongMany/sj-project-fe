import { ChatRoomList } from '@/components/chat/chat-room-list';
import Link from 'next/link';
import React from 'react';

function ChatMainPage() {
  return (
    <div className="bg-white px-4 py-4">
      <section className="h-[400px] overflow-y-scroll">
        <h3 className="text-black font-semibold text-[16px]">채팅방 리스트</h3>
        <ChatRoomList />
      </section>
      <section>
        <Link
          href="/chat/create"
          className="text-black font-semibold text-[16px]"
        >
          채팅방 만들러가기
        </Link>
        {/* <CreateChatButton type="Funny" /> */}
      </section>
    </div>
  );
}

export default ChatMainPage;
