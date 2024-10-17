import ChatForm from '@/components/chat/chat-form';
import { decodeByAES256 } from '@/utils/encode';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
  searchParams: { type: string };
};

// thread_7EzPEnRrfhLhos84u2aHEczb
export default function ChatRoomPage({
  params: { id },
  searchParams: { type },
}: Props) {
  const threadId = decodeByAES256(id);

  return (
    <div className="bg-white max-h-[calc(100dvh-50px)] h-[calc(100dvh-50px)] overflow-y-hidden flex flex-col">
      <div className="max-w-[360px] min-h-[30px] h-[30px] bg-gray-200 flex items-center ">
        <span className={"px-4 text-black"}>Type: {type}</span>
      </div>
      <ChatForm threadId={threadId} />
    </div>
  );
}
