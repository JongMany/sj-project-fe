export type ChatRoomDto = {
  success: boolean;
  threads: ChatRoomDetail[];
};
export type ChatRoomDetail = {
  threadId: string;
  type: 'Funny' | 'Feedback' | 'Kind' | 'Default';
};
