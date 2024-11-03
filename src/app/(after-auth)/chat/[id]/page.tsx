import ChatForm from '@/components/chat/chat-form';
import {decodeByAES256} from '@/utils/encode';
import React from 'react';
import {auth} from "@/auth";
import {userType} from "@/constants/user/user-type";
import {AssistantType} from "@/models/chat/chat-room.dto";
import MemorySettingLink from "@/components/link/memory-setting-link";
import FunctionCallingProvider from "@/components/providers/function-calling-provider";

type Props = {
  params: {
    id: string;
  };
  searchParams: { type: AssistantType };
};

export default async function ChatRoomPage({
                                             params: {id},
                                             searchParams: {type},
                                           }: Props) {
  const threadId = decodeByAES256(id);
  const session = await auth();
  const userGroup = session?.user?.group as 'A' | 'B' | 'C' | 'D';


  return (
      <div className="bg-white max-h-[calc(100dvh-50px)] h-[calc(100dvh-50px)] overflow-y-hidden flex flex-col">
        <FunctionCallingProvider>
          <div className="min-w-[360px] min-h-[30px] h-[30px] bg-gray-200 flex items-center ">
            <span className={"px-4 text-black"}>Type: {type}</span>
            {
                userType[userGroup]?.removeMemory && (
                    <MemorySettingLink threadId={threadId} type={type}/>
                )
            }
          </div>
          <ChatForm threadId={threadId}/>
        </FunctionCallingProvider>
      </div>
  );
}
