'use client';

import {
  ChatMessage,
  ChatMessageDto,
  MessageContent,
} from '@/models/chat/message.dto';
import { showToast } from '@/utils/show-toast';
import { getSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FaRegStopCircle } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import {BeatLoader} from "react-spinners";

type Props = {
  threadId: string;
};
function ChatForm({ threadId }: Props) {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [response, setResponse] = useState<MessageContent[]>([]);
  const [value, setValue] = useState('');
  const [sendStatus, setIsSendStatus] = useState<'idle' | 'sending' | 'error'>(
    'idle',
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  // 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (response.length > 0) {
      scrollToBottom();
    }
  }, [response]);

  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/gpt/messages/${threadId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        },
      );
      const data: ChatMessageDto = await response.json();
      if (Array.isArray(data.messages)) {
        const messages: MessageContent[] = data.messages.map(
          (message: ChatMessage) => ({
            id: message.id,
            role: message.role,
            content: message.content,
          }),
        );
        setResponse(messages);
      }
    }
    fetchData();
  }, [threadId]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const keyPressHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await submitHandler();
    }
  };

  const submitHandler = async () => {
    try {
      setIsSendStatus('sending');
      setResponse((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'user',
          content: [{ text: { value: value, annotations: [] }, type: 'text' }],
        },
      ]);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/gpt/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: value,
          threadId: threadId,
          type,
        }),
      });
      if (!response.ok) {
        setIsSendStatus('error');
        showToast('error', '메시지 전송에 실패했습니다.');
        return;
      }
      const data = await response.json();
      const answer = data.messages[0][0];

      setResponse((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: [answer],
        },
      ]);
    } catch (error) {
      setIsSendStatus('error');
      showToast('error', '메시지 전송에 실패했습니다.');
      console.error(error);
    } finally {
      setValue('');
      setIsSendStatus('idle');
    }
  };

  // useEffect(() => {}, []);

  return (
    <div className="px-4 py-2 flex flex-col min-h-[calc(100dvh-80px)] h-[calc(100dvh-80px)] bg-gray-200">
      <div className="overflow-y-scroll px-4 h-full ">
        {response.map((message) => (
          <div
            key={message.id}
            className={`chat ${
              message.role === 'user' ? 'chat-end' : 'chat-start'
            } mb-2`}
          >
            <div className="chat-bubble bg-white text-black flex items-center text-[13px] shadow-lg">
               <p className="leading-5">{message.content[0].text.value}</p>
            </div>
          </div>
        ))}
        {sendStatus === 'sending' && (
          <div className="chat chat-start">
            <div className="chat-bubble bg-white text-black flex items-center shadow-lg">
              <p>
                <BeatLoader size={6} color='lightgray'  />
              </p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="m-4">
        <div className="flex gap-x-2 rounded-md py-1 w-full input !bg-white !border-gray-300 shadow-[0_35px_60px_-5px_rgba(0,0,0,0.5)] !text-black">
          <input
            type="text"
            disabled={sendStatus !== 'idle'}
            value={sendStatus === "sending" ? "" : value}
            onChange={onChangeHandler}
            onKeyDown={keyPressHandler}
            className="flex-1 text-black disabled:text-black disabled:bg-white"
            placeholder="Message"
          />
          <button disabled={sendStatus !== 'idle'}>
            {sendStatus === 'sending' ? (
              <FaRegStopCircle />
            ) : (
              <IoMdSend className="text-[20px]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatForm;
