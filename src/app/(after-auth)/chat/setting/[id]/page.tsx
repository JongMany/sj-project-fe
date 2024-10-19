import React from 'react';
import {decodeByAES256} from "@/utils/encode";
import {CHATROOM_TYPE} from "@/constants/chat/room-type";
import {AssistantType} from "@/models/chat/chat-room.dto";
import {auth} from "@/auth";

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
      <div className="bg-white px-4 py-4">
        <h3 className="text-black font-semibold text-[15px]">
          {CHATROOM_TYPE[type]}이 알고 있는 {session?.user?.name} 님의 정보
        </h3>


      </div>
  );
}

export default Page;