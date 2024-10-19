import { CreateChatButton } from '@/components/chat/create-chat-button';
import React from 'react';
import {ChatTypeIntroduction} from "@/components/chat/chat-type-introduction";

function Page() {
  return (
    <div className="bg-white px-8 py-6">
      <section className="mb-8 flex justify-center">
        <CreateChatButton type="Feedback" />
      </section>
      <ChatTypeIntroduction type="Feedback" introduction={<p>설명 추가 예정</p>}/>
    </div>
  );
}

export default Page;
