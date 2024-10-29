import {CreateChatButton} from '@/components/chat/create-chat-button';
import React from 'react';
import {ChatTypeIntroduction} from "@/components/chat/chat-type-introduction";

function Page() {
  return (
      <div className="bg-white px-8 py-6">
        <section className="mb-8 flex justify-center">
          <CreateChatButton type="Kind"/>
        </section>
        <ChatTypeIntroduction type="Kind" introduction={<p>대화를 나누며 기분을 안정시키고 싶다면 대화를 시작해보세요</p>}/>
      </div>
  );
}

export default Page;
