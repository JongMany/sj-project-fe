'use client';
import React from 'react';
import {FaBrain} from "react-icons/fa6";
import Link from "next/link";
import {AssistantType} from "@/models/chat/chat-room.dto";
import {getSession} from "next-auth/react";

type Props = {
  threadId: string;
  type: AssistantType;
}
function MemorySettingLink({threadId, type}: Props) {
  return (
      <Link href={`/chat/setting/${threadId}?type=${type}`} onClick={async ()=>{
        const session = await getSession();
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
        <FaBrain />
      </Link>
  );
}

export default MemorySettingLink;