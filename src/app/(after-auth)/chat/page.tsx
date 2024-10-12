import { ChatRoomList } from '@/components/chat/chat-room-list';
import { CreateChatButton } from '@/components/chat/create-chat-button';
import React from 'react';

function ChatMainPage() {
  return (
    <div>
      <h2>환영합니다</h2>
      <ChatRoomList />
      <div>
        <CreateChatButton />
      </div>
    </div>
  );
}

export default ChatMainPage;
