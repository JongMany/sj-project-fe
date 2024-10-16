import ChatForm from '@/components/chat/chat-form';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
  searchParams: { type: string };
};

export default function ChatRoomPage({
  params: { id },
  searchParams: { type },
}: Props) {
  return (
    <div className="bg-white h-[calc(100dvh-50px)]">
      <span>ChatRoom: {id}</span>
      <span>Type: {type}</span>
      <ChatForm threadId={id} />
    </div>
  );
}
