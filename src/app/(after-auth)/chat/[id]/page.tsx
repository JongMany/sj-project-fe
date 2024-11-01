import ChatForm from '@/components/chat/chat-form';
import { decodeByAES256 } from '@/utils/encode';
import React from 'react';
import { FaBrain } from "react-icons/fa6";
import {auth} from "@/auth";
import {userType} from "@/constants/user/user-type";
import Link from "next/link";
import {AssistantType} from "@/models/chat/chat-room.dto";
import MemorySettingLink from "@/components/link/memory-setting-link";

type Props = {
  params: {
    id: string;
  };
  searchParams: { type: AssistantType };
};

// thread_7EzPEnRrfhLhos84u2aHEczb
export default async function ChatRoomPage({
  params: { id },
  searchParams: { type },
}: Props) {
  const threadId = decodeByAES256(id);
  const session = await auth();
  const userGroup = session?.user?.group as 'A'|'B'|'C'|'D';


  return (
    <div className="bg-white max-h-[calc(100dvh-50px)] h-[calc(100dvh-50px)] overflow-y-hidden flex flex-col">
      <div className="min-w-[360px] min-h-[30px] h-[30px] bg-gray-200 flex items-center ">
        <span className={"px-4 text-black"}>Type: {type}</span>
        {
          userType[userGroup]?.removeMemory && (
              <MemorySettingLink threadId={id} type={type}/>
              // <Link href={`/chat/setting/${id}?type=${type}`}>
              //   <FaBrain />
              // </Link>
            )

        }
      </div>
      <ChatForm threadId={threadId} />
    </div>
  );
}
