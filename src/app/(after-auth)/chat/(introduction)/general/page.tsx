import { auth } from '@/auth';
import { CreateChatButton } from '@/components/chat/create-chat-button';
import { userType } from '@/constants/user/user-type';
import Link from 'next/link';
import React from 'react';

async function Page() {
  const session = await auth();

  return (
    <div className="bg-white px-8 py-6">
      <section className="mb-8 flex justify-center">
        <CreateChatButton type="Default" />
      </section>
      <section className="bg-gray-100 px-5 py-4 text-black text-[16px] rounded-md">
        <h4 className="mb-5 font-semibold">기본맨</h4>
        <p>
          {session?.user?.group &&
            userType[session?.user?.group].removeMemory && (
              <Link href="/setting">GPT 기억 수정하기</Link>
            )}
          <span>AI Assistant와 대화를 나눠보세요</span>
        </p>
      </section>
    </div>
  );
}

export default Page;
