import React from 'react';
import {auth} from "@/auth";

type Props = {
  threadId: string;
}

async function MemoryList({
                            threadId
                          }: Props) {
  const session = await auth();
  // TODO: Type!
  const memories: {data: Record<string, string>}[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/memory/${threadId}`, {
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

  return (
      <div className="overflow-scroll h-[80dvh] bg-gray-100 rounded-md">
        {memories.map((memory) => <div key={JSON.stringify(memory)}>
          {JSON.stringify(memory.data)}
        </div>)}
      </div>
  );
}

export default MemoryList;