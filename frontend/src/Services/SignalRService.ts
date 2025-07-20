import * as signalR from '@microsoft/signalr';
import type { MessageBroadcastDto } from '../Models/Message';
import { getAuthToken } from './ApiClient';

export class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private backendUrl: string;

  constructor() {
    // Use the same base URL logic as your other services, updated to match backend port
    this.backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  }

  async connect(): Promise<void> {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      return; // Already connected
    }

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.backendUrl}/messageHub`, {
        accessTokenFactory: () => getAuthToken() || '' // Use JWT token for authentication
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    try {
      await this.connection.start();
      console.log('SignalR connected successfully');
    } catch (error) {
      console.error('Error connecting to SignalR:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
      console.log('SignalR disconnected');
    }
  }

  async joinProject(projectId: number): Promise<void> {
    if (!this.connection) {
      throw new Error('SignalR not connected');
    }
    
    try {
      await this.connection.invoke('JoinProject', projectId);
      console.log(`Joined project ${projectId}`);
    } catch (error) {
      console.error('Error joining project:', error);
      throw error;
    }
  }

  async leaveProject(projectId: number): Promise<void> {
    if (!this.connection) {
      return; // Already disconnected
    }
    
    try {
      await this.connection.invoke('LeaveProject', projectId);
      console.log(`Left project ${projectId}`);
    } catch (error) {
      console.error('Error leaving project:', error);
    }
  }

  async sendMessage(projectId: number, content: string): Promise<void> {
    if (!this.connection) {
      throw new Error('SignalR not connected');
    }
    
    try {
      await this.connection.invoke('SendMessageToProject', projectId, content);
    } catch (error) {
      console.error('Error sending message via SignalR:', error);
      throw error;
    }
  }

  onReceiveMessage(callback: (message: MessageBroadcastDto) => void): void {
    if (!this.connection) {
      throw new Error('SignalR not connected');
    }
    this.connection.on('ReceiveMessage', callback);
  }

  onMessageEdited(callback: (data: { MessageId: number; NewContent: string; EditedAt: string }) => void): void {
    if (!this.connection) {
      throw new Error('SignalR not connected');
    }
    this.connection.on('MessageEdited', callback);
  }

  onMessageDeleted(callback: (data: { MessageId: number }) => void): void {
    if (!this.connection) {
      throw new Error('SignalR not connected');
    }
    this.connection.on('MessageDeleted', callback);
  }

  off(eventName: string): void {
    if (this.connection) {
      this.connection.off(eventName);
    }
  }

  get connectionState(): signalR.HubConnectionState | null {
    return this.connection?.state || null;
  }

  isConnected(): boolean {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }
}

// Export singleton instance
export const signalRService = new SignalRService();
