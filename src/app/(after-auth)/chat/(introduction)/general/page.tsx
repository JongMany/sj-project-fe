import { CreateChatButton } from '@/components/chat/create-chat-button';
import React from 'react';
import {ChatTypeIntroduction} from "@/components/chat/chat-type-introduction";

function Page() {

  return (
    <div className="bg-white px-8 py-6">
      <section className="mb-8 flex justify-center">
        <CreateChatButton type="Default" />
      </section>
      <ChatTypeIntroduction type="Default" introduction={<span>AI 에이전트와 대화를 나눠보세요</span>}/>
    </div>
  );
}

export default Page;
