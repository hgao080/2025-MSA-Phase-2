export interface CreateMessageDto {
  content: string; // Max 2000 characters, required
}

export interface EditMessageDto {
  content: string; // Max 2000 characters, required
}

export interface MessageDto {
  id: number;
  projectId: number;
  senderId: string;
  senderName: string;
  senderEmail: string;
  content: string;
  sentAt: string; // ISO date string
  editedAt?: string | null; // ISO date string
  isDeleted: boolean;
}

export interface MessageBroadcastDto {
  messageId: number;
  projectId: number;
  senderId: string;
  senderName: string;
  content: string;
  sentAt: string; // ISO date string
}

export interface ProjectConversation {
  projectId: number;
  projectTitle: string;
  lastMessage?: MessageDto;
  unreadCount: number;
  participants: string[]; // Array of participant names
}
