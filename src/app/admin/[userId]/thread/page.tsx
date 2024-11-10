import React from 'react';
import {MemoryType} from "@/models/memory/memory.model";
import {ChatMessage, MessageContent} from "@/models/chat/message.dto";

type Props = {
  params: {
    userId: string;
  },
  searchParams: {
    id: string;
  }
}
async function Page({params: {userId}, searchParams: {id}}: Props) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/gpt/admin/messages/${id}`);
  const data = await response.json();
  const messages = data.messages;

  if(!Array.isArray(messages)) {
    return <div>대화 내용이 없습니다.</div>
  }
  let prevMessage: ChatMessage;
  const messageItems: MessageContent[] = messages.map(
      (message: ChatMessage) => {
        const curMessageDate = new Date(message.created_at * 1000);
        const prevMessageDate = prevMessage && new Date(prevMessage?.created_at * 1000);
        prevMessage = message;

        return {
          id: message.id,
          role: message.role,
          content: message.content,
          createdAt: message.created_at * 1000,
          isDayFirstMessage: prevMessageDate ? prevMessageDate.toLocaleDateString() !== curMessageDate.toLocaleDateString() : true,
        };
      },
  );


  return (
      <div className={'bg-gray-200'}>
        <div className='h-[60px]'>{userId}</div>
        <div className={`px-4 max-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] overflow-y-scroll overflow-x-hidden`}>
          {
            messageItems.map((message) => (
                <React.Fragment key={`date-${message.id}`}>
                  {message.isDayFirstMessage && <div
                      className={"text-black text-[12px] flex justify-center my-3 py-1 bg-gray-300 rounded-md"}>
                    <span className={"text-center"}>{new Date(message.createdAt).toLocaleDateString()}</span>
                  </div>}

                  <div
                      key={`message-${message.id}`}
                      className={`chat ${
                          message.role === 'user' ? 'chat-end flex-row-reverse' : 'chat-start flex-row'
                      } mb-3 flex gap-1 items-end`}
                  >
                    <div
                        className="chat-bubble bg-white text-black flex items-center text-[13px] shadow-lg max-w-[60dvw]">
                      <p className="leading-5">{message.content[0].text.value}</p>
                    </div>
                    <div
                        className={`text-[8px] `}>{new Date(message.createdAt).toLocaleTimeString()}</div>
                  </div>
                </React.Fragment>
            ))
          }
        </div>
      </div>
  );
}

export default Page;