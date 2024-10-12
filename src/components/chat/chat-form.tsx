'use client';

import React, { ChangeEvent, useState } from 'react';

function ChatForm() {
  const [response, setResponse] = useState('');
  const [value, setValue] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitHandler();
    }
  };

  const submitHandler = async () => {
    console.log(value);
    /* const response = await fetch('http://localhost:8080/api/gpt/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: value,
        threadId: '1',
      }),
    }); */
  };

  return (
    <div className="px-4 py-2 flex flex-col h-full rounded">
      <div className="overflow-y-scroll flex-1 h-full px-4">
        <div className={'chat chat-start'}>
          <div className="chat-bubble">
            <p>메시지 1</p>
          </div>
        </div>
        <div className={'chat chat-end'}>
          <div className="chat-bubble">
            <p>메시지 2입니당~~</p>
          </div>
        </div>
      </div>
      <div className="rounded-md">
        <div className="m-4">
          <input
            type="text"
            value={value}
            onChange={onChangeHandler}
            onKeyDown={keyPressHandler}
            className="rounded-md py-1 px-2 w-full input "
            placeholder="Message"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatForm;
