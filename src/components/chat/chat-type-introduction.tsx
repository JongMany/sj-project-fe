import {userType} from "@/constants/user/user-type";
import Link from "next/link";
import React from "react";
import {auth} from "@/auth";
import {FaBrain} from "react-icons/fa6";
import {AssistantType} from "@/models/chat/chat-room.dto";
import {CHATROOM_TYPE} from "@/constants/chat/room-type";
import {encodeByAES256} from "@/utils/encode";
import TooltipButton from "@/components/chat/tooltip-button/tooltip-button";


type Props = {
  type: AssistantType;
  introduction: React.ReactNode;
}
export async function ChatTypeIntroduction({type, introduction}: Props) {
  const session = await auth();
  const userGroup = session?.user.group as "A" | "B" | "C" | "D";
  const threadId = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gpt/thread/${type}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  }).then((res) => {
    if(!res.ok) {
      throw new Error("Cannot found threadId");
    }
    return res.json();
  }).then((data) => {
    if(data.threadId) {
      return encodeByAES256(data.threadId);
    } else {
      throw new Error("Cannot found threadId");
    }

  }).catch((error) => {
    console.log('ThreadId Not Found', error);
    return null; // 없으면 threadId를 null로
  });

  return (
      <section className="bg-gray-100 px-5 py-4 text-black text-[16px] rounded-md">
        <div className="flex justify-between">
          <h4 className="mb-5 font-semibold">{CHATROOM_TYPE[type]}</h4>
          {
              userType[userGroup].removeMemory && threadId ? (
                  <Link href={`/chat/setting/${threadId}?type=${type}`}>
                    <FaBrain/>
                  </Link>
              ) : <TooltipButton />
          }
        </div>
        {introduction}
      </section>
  )
}