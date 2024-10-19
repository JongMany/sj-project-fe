import { CreateChatButton } from '@/components/chat/create-chat-button';
import React from 'react';
import {userType} from "@/constants/user/user-type";
import Link from "next/link";
import {auth} from "@/auth";

async function Page() {
  const session = await auth();

  return (
    <div className="bg-white px-8 py-6">
      <section className="mb-8 flex justify-center">
        <CreateChatButton type="Funny" />
      </section>
      <section className="bg-gray-100 px-5 py-4 text-black text-[16px] rounded-md">
        <h4 className="mb-5 font-semibold">재미맨</h4>
        <p>
          {session?.user?.group &&
              userType[session?.user?.group].removeMemory && (
                  <Link href="/chat/setting">GPT 기억 수정하기</Link>
              )}
          <span>재미있는 대화를 나누며, 기분 전환하고 싶다면 대화를 시작해보세요</span>
        </p>
      </section>
    </div>
  );
}

export default Page;
