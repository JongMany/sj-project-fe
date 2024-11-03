import React from 'react';
import {decodeByAES256} from '@/utils/encode';
import {CHATROOM_TYPE} from '@/constants/chat/room-type';
import {AssistantType} from '@/models/chat/chat-room.dto';
import {auth} from '@/auth';
import MemoryList from '@/components/memory/memory-list';
import {FaBrain} from 'react-icons/fa6';
import {MemoryType} from "@/models/memory/memory.model";

type Props = {
  params: {
    id: string;
  };
  searchParams: { type: AssistantType };
};

async function Page({params: {id}, searchParams: {type}}: Props) {
  const threadId = decodeByAES256(id);
  const session = await auth();

  const memories: MemoryType[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/memory/${threadId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
    cache: 'no-cache'
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Memory Fetch Error');
    }
    return response.json();
  }).then((data) => {
    if (data.success) {
      return data.memories;
    }
    return [];
  }).catch((error) => {
    console.error("Error", error);
    return [];
  });

  // const memoryListByGroup = groupMemoryList(memories);

  return (
      <div className="bg-white px-4 py-4 h-[calc(100dvh-50px)]">
        <div className="h-full flex flex-col justify-between gap-8">
          <h3 className="text-black font-semibold text-[18px] flex items-center gap-x-3">
            <span>{CHATROOM_TYPE[type]}이 알고 있는 {session?.user?.name} 님의 정보</span>
            <FaBrain/>
          </h3>
          <MemoryList memories={memories} type={type}/>
        </div>
      </div>
  );
}

// function groupMemoryList(memoryList: MemoryType[]) : Partial<GroupMemoryType> {
//   const result: Partial<GroupMemoryType> = {};
//   if(!memoryList) return {};
//   for (const memory of memoryList) {
//     const key = makeKey(memory.type);
//     if (!key) continue;
//     if(!result[key]) {
//       result[key] = {};
//     }
//     if(result[key]?.[memory.type]) {
//       result[key][memory.type] = [...result[key]?.[memory.type], memory];
//     } else {
//       result[key][memory.type] = [memory];
//     }
//
//   }
//   return result;
// }
//
// function makeKey(detailKey: ProfileDetailKey): keyof GroupMemoryType | null {
//   if (detailKey.startsWith("personal_info")) {
//     return "personal_info"
//   }
//   if (detailKey.startsWith("dislike_")) {
//     return "dislike";
//   } else if (detailKey.startsWith("like_")) {
//     return "like";
//   } else if (detailKey.startsWith("recent_updates")) {
//     return "recent_updates";
//   } else if (detailKey.startsWith("activities_")) {
//     return "activities";
//   } else {
//     return null;
//   }
// }

export default Page;
