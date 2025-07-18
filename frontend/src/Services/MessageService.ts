import type { MessageDto, CreateMessageDto, EditMessageDto } from '../Models/Message';
import { apiRequest } from './apiClient';

export class MessageService {
  async getMessages(projectId: number, page = 1, pageSize = 50): Promise<MessageDto[]> {
    try {
      return await apiRequest<MessageDto[]>(
        `/projects/${projectId}/messages?page=${page}&pageSize=${pageSize}`,
        'GET'
      );
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('Failed to fetch messages');
    }
  }

  async sendMessage(projectId: number, content: string): Promise<MessageDto> {
    try {
      const createMessageDto: CreateMessageDto = { content };
      return await apiRequest<MessageDto>(
        `/projects/${projectId}/messages`,
        'POST',
        createMessageDto
      );
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  }

  async updateMessage(projectId: number, messageId: number, content: string): Promise<MessageDto> {
    try {
      const editMessageDto: EditMessageDto = { content };
      return await apiRequest<MessageDto>(
        `/projects/${projectId}/messages/${messageId}`,
        'PUT',
        editMessageDto
      );
    } catch (error) {
      console.error('Error updating message:', error);
      throw new Error('Failed to update message');
    }
  }

  async deleteMessage(projectId: number, messageId: number): Promise<void> {
    try {
      await apiRequest<void>(
        `/projects/${projectId}/messages/${messageId}`,
        'DELETE'
      );
    } catch (error) {
      console.error('Error deleting message:', error);
      throw new Error('Failed to delete message');
    }
  }
}

export const messageService = new MessageService();
