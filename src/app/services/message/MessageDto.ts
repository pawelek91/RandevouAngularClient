export interface LastMessageDto {
  speakerId: number;
  speakerName: string;
  messageShortContent: string;
  messageDate: Date;
}

export interface MessageDto {
  messageId?: number;
  senderId?: number;
  receiverId?: number;
  content?: string;
  senderName?: string;
  receiverName?: string;
  sendDate?: Date;
  isRead?: boolean;
}

export interface RequestMessagesDto {
  firstUserId: number;
  secondUserId: number;
  fromDate?: Date;
  toDate?: Date;
}

