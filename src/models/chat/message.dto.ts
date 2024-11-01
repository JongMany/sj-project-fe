export type ChatMessageDto = {
  success: boolean;
  messages: ChatMessage[];

};

export type ChatMessage = {
  id: string;
  assistant_id: string;
  thread_id: string;
  run_id: string;
  role: 'assistant' | 'user';
  created_at: number; // TODO: Check type is string
  content: {
    text: {
      value: string;
      annotations: { [key: string]: string }[];
    };
    type: 'text';
  }[];
};

export type MessageContent = {
  id: string;
  role: 'assistant' | 'user';
  createdAt: number;
  content: {
    text: {
      value: string;
      annotations: { [key: string]: string }[];
    };
    type: 'text';
  }[];
  isDayFirstMessage: boolean;
};
