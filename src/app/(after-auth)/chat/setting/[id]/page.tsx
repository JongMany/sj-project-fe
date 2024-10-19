import React from 'react';
import {decodeByAES256} from "@/utils/encode";
import {CHATROOM_TYPE} from "@/constants/chat/room-type";
import {AssistantType} from "@/models/chat/chat-room.dto";
import {auth} from "@/auth";
import MemoryList from "@/components/memory/memory-list";

type Props = {
  params: {
    id: string;
  };
  searchParams: { type: AssistantType };
};

async function Page({params: {id}, searchParams: {type}}: Props) {
  const threadId = decodeByAES256(id);
  const session = await auth();

  return (
      <div className="bg-white px-4 py-4 h-[calc(100dvh-50px)]">
        <div className="h-full flex flex-col justify-between">
          <h3 className="text-black font-semibold text-[15px]">
            {CHATROOM_TYPE[type]}이 알고 있는 {session?.user?.name} 님의 정보
          </h3>
          <MemoryList threadId={threadId}/>
        </div>
      </div>
  );
}

export default Page;