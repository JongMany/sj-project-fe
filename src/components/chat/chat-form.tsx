'use client';

import {
  ChatMessage,
  ChatMessageDto,
  MessageContent,
} from '@/models/chat/message.dto';
import {showToast} from '@/utils/show-toast';
import {getSession} from 'next-auth/react';
import {useSearchParams} from 'next/navigation';
import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {FaRegStopCircle} from 'react-icons/fa';
import {IoMdSend} from 'react-icons/io';
import {BeatLoader} from 'react-spinners';
import {useFunctionCallingContext} from "@/components/providers";

type Props = {
  threadId: string;
};

function ChatForm({threadId}: Props) {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState<MessageContent[]>([]);
  const [value, setValue] = useState('');
  const [sendStatus, setIsSendStatus] = useState<'idle' | 'sending' | 'error'>(
      'idle',
  );
  const {changeIsNewFunctionCalling} = useFunctionCallingContext();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  // 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };

  useEffect(() => {
    if (response.length > 0) {
      scrollToBottom();
    }
  }, [response]);

  useEffect(() => {

    async function fetchData() {
      try {
        setIsLoading(true);
        const session = await getSession();
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/gpt/messages/${threadId}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.user?.accessToken}`,
              },
            },
        );
        const data: ChatMessageDto = await response.json();
        // if(!data.success) return;

        if (Array.isArray(data.messages)) {
          let prevMessage: ChatMessage;
          const messages: MessageContent[] = data.messages.map(
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

          setResponse(messages);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
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
      const prevMessage = response.at(-1);
      const prevMessageDate = prevMessage && new Date(prevMessage.createdAt).toLocaleDateString();
      const current = Date.now();
      const currentDate = new Date(current).toLocaleDateString();
      setResponse((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'user',
          content: [{text: {value: value, annotations: []}, type: 'text'}],
          createdAt: current,
          isDayFirstMessage: prevMessageDate ? prevMessageDate !== currentDate : true,
        },
      ]);
      const session = await getSession();
      const answerResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/gpt/message`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
            body: JSON.stringify({
              message: value,
              threadId: threadId,
              type,
              group: session?.user.group,
            }),
          },
      );
      if (!answerResponse.ok) {
        setIsSendStatus('error');
        showToast('error', '메시지 전송에 실패했습니다.');
        return;
      }
      const data = await answerResponse.json();
      const answer = data.messages[0][0];
      const userMessageDate = currentDate;
      const answerSendTime = Date.now();
      const answerSendDate = new Date(answerSendTime).toLocaleDateString();

      if(data?.isFunctionCalling) {
        changeIsNewFunctionCalling(threadId, data.isFunctionCalling)
      }

      setResponse((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: [answer],
          createdAt: Date.now(),
          isDayFirstMessage: userMessageDate !== answerSendDate,
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

  return (
      <div className="px-4 py-2 flex flex-col min-h-[calc(100dvh-80px)] h-[calc(100dvh-80px)] bg-gray-200">
        <div className="overflow-y-scroll px-4 h-full ">
          {response.map((message) => (
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
          ))}
          {sendStatus === 'sending' && (
              <div className="chat chat-start">
                <div className="chat-bubble bg-white text-black flex items-center shadow-lg">
                  <p>
                    <BeatLoader size={6} color="lightgray"/>
                  </p>
                </div>
              </div>
          )}
          <div ref={messagesEndRef}/>
        </div>
        <div className="m-4">
          <div
              className="flex gap-x-2 rounded-md py-1 w-full input !bg-white !border-gray-300 shadow-[0_35px_60px_-5px_rgba(0,0,0,0.5)] !text-black">
            <input
                type="text"
                disabled={sendStatus !== 'idle'}
                value={sendStatus === 'sending' ? '' : value}
                onChange={onChangeHandler}
                onKeyDown={keyPressHandler}
                className="flex-1 text-black disabled:text-black disabled:bg-white"
                placeholder="Message"
            />
            <button disabled={sendStatus !== 'idle' || isLoading}>
              {sendStatus === 'sending' ? (
                  <FaRegStopCircle/>
              ) : (
                  <IoMdSend className="text-[20px]" onClick={async ()=>{
                    await submitHandler();
                  }}/>
              )}
            </button>
          </div>
        </div>
      </div>
  );
}

export default ChatForm;
