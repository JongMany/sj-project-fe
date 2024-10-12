import ChatForm from '@/components/chat/chat-form';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

export default function ChatRoomPage({ params: { id } }: Props) {
  return (
    <div className="bg-white h-[calc(100dvh-50px)]">
      <span>ChatRoom: {id}</span>
      <ChatForm threadId={id} />
    </div>
  );
}
