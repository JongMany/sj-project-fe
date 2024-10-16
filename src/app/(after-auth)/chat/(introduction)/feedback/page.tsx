import { CreateChatButton } from '@/components/chat/create-chat-button';
import React from 'react';

function Page() {
  return (
    <div className="bg-white px-8 py-6">
      <section className="mb-8 flex justify-center">
        <CreateChatButton type="Feedback" />
      </section>
      <section className="bg-gray-100 px-5 py-4 text-black text-[16px] rounded-md">
        <h4 className="mb-5 font-semibold">피드백맨</h4>
        <p>추가할 예정</p>
      </section>
    </div>
  );
}

export default Page;
