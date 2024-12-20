'use client';
import React from 'react';
import {FaBrain} from "react-icons/fa6";
import Link from "next/link";
import {AssistantType} from "@/models/chat/chat-room.dto";
import {getSession} from "next-auth/react";
import {useFunctionCallingContext} from "@/components/providers";
import { GiSparkles } from "react-icons/gi";
import {decodeByAES256} from "@/utils/encode";


type Props = {
  encodedThreadId: string;
  type: AssistantType;
}

function MemorySettingLink({encodedThreadId, type}: Props) {
  const threadId = decodeByAES256(encodedThreadId);
  const {data, changeIsNewFunctionCalling} = useFunctionCallingContext();
  return (
      <Link href={`/chat/setting/${encodedThreadId}?type=${type}`} onClick={async () => {
        const session = await getSession();
        changeIsNewFunctionCalling(threadId, false);
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/event/memory-view`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          body: JSON.stringify({
            type
          })
        })
      }}>
        <span className='flex items-start relative'>
          <FaBrain/>
          {data[threadId] && <GiSparkles
              className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-[35px] text-yellow-400 opacity-80'/>}
          </span>
      </Link>
  );
}

export default MemorySettingLink;