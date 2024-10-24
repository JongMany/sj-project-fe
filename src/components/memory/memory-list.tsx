import React from 'react';
import {auth} from "@/auth";

type Props = {
  threadId: string;
}

type MemoryType = {
  id: string;
  userId: string;
  type: 'age' | 'favorite_color' | 'favorite_food' | 'hobby' | 'things_to_do' | 'things_done' | 'things_to_do_later';
  description: string;
}

async function MemoryList({
                            threadId
                          }: Props) {
  const session = await auth();
  // TODO: Type!
  const memories: MemoryType[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL||''}/api/v1/memory/${threadId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
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

  console.log(memories)
  return (
      <div className="overflow-scroll h-[80dvh] bg-gray-100 rounded-md text-black flex-1">
        {memories.map((memory) => <div key={memory.id}>
          <span>{memory.type}</span>
          <span>{memory.description}</span>
        </div>)}
      </div>
  );
}

export default MemoryList;