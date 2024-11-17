/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type Props = {
  params: { userId: string };
  searchParams: { id: string };
};

async function Page({ params: { userId }, searchParams: { id } }: Props) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/event/admin/${id}`,
  );
  const data = await response.json();
  const logs = data.logs;
  const memoryEventLogs = logs.memoryEventLogs;
  const chatEventLogs = logs.chatEventLogs;

  return (
    <div className={'text-black'}>
      <div>{userId}</div>
      <section className="flex gap-x-3 h-[70vh]">
        {/*Memory*/}

        <article className="flex-1">
          <div>메모리 수정 기록</div>
          <div className="h-full overflow-y-scroll">
            {memoryEventLogs.length &&
              memoryEventLogs.map((log: any) => (
                <div key={log.id} className={'flex gap-x-2'}>
                  <span>{log.eventType}</span>
                  <span>{log.agentType}</span>
                  <span>{log.createdAt}</span>
                </div>
              ))}
          </div>
        </article>
        {/*Chat*/}
        <article className="flex-1">
          <div>채팅 기록</div>
          <div className="h-full overflow-y-scroll">
            {chatEventLogs.length &&
              chatEventLogs.map((log: any) => (
                <div key={log.id} className={'flex gap-x-2'}>
                  <span>{log.eventType}</span>
                  <span>{log.agentType}</span>
                  <span>{log.createdAt}</span>
                </div>
              ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default Page;
