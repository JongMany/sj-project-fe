/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type Props = {
  params: { userId: string };
  searchParams: { id: string; id2: string };
};

async function Page({ params: { userId }, searchParams: { id, id2 } }: Props) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/event/admin/${id}`,
  );
  const data = await response.json();
  const logs = data.logs;
  const memoryEventLogs = logs.memoryEventLogs;
  const chatEventLogs = logs.chatEventLogs;

  return (
    <div className="px-4 py-8 text-black flex flex-col gap-y-2">
      <div className="text-[16px] font-bold">
        {userId} / {id2}
      </div>
      <section className="flex gap-x-3 h-[70vh]">
        {/*Memory*/}

        <article className="flex-1">
          <div className="text-[18px] font-bold">메모리 로그</div>
          <div className="h-full overflow-y-scroll">
            {memoryEventLogs.length > 0 ? (
              memoryEventLogs.map((log: any) => (
                <div key={log.id} className="flex gap-x-2 mb-1">
                  <span className="w-[60px]">{log.eventType}</span>
                  <span className="w-[80px]">{log.agentType}</span>
                  <span>{log.createdAt}</span>
                </div>
              ))
            ) : (
              <div>메모리 로그가 없습니다.</div>
            )}
          </div>
        </article>
        {/*Chat*/}
        <article className="flex-1">
          <div className="text-[18px] font-bold">채팅 로그</div>
          <div className="h-full overflow-y-scroll">
            {chatEventLogs.length > 0 ? (
              chatEventLogs.map((log: any) => (
                <div key={log.id} className="flex gap-x-2 mb-1">
                  <span className="w-[50px]">{log.eventType}</span>
                  <span className="w-[80px]">{log.agentType}</span>
                  <span>{log.createdAt}</span>
                </div>
              ))
            ) : (
              <div>채팅 로그가 없습니다.</div>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}

export default Page;
