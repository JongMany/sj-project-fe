export type ChatRoomDto = {
  success: boolean;
  threads: ChatRoomDetail[];
};
export type AssistantType = 'Funny' | 'Feedback' | 'Kind' | 'Default';
export type ChatRoomDetail = {
  threadId: string;
  type: AssistantType;
};
