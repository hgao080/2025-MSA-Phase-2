import { create } from 'zustand';
import type { MessageDto, ProjectConversation, MessageBroadcastDto } from '../Models/Message';
import { messageService } from '../Services/MessageService';
import { signalRService } from '../Services/SignalRService';
import toast from 'react-hot-toast';

interface MessageStore {
  // State
  conversations: ProjectConversation[];
  currentProjectId: number | null;
  messages: MessageDto[];
  isLoading: boolean;
  isConnected: boolean;
  
  // Actions
  initializeSignalR: () => Promise<void>;
  disconnectSignalR: () => Promise<void>;
  setCurrentProject: (projectId: number) => Promise<void>;
  loadMessages: (projectId: number, page?: number) => Promise<void>;
  sendMessage: (projectId: number, content: string) => Promise<void>;
  editMessage: (projectId: number, messageId: number, content: string) => Promise<void>;
  deleteMessage: (projectId: number, messageId: number) => Promise<void>;
  markAsRead: (projectId: number) => void;
  initializeConversations: (projects: { id: number; title: string; authorName: string }[]) => void;
  
  // Internal handlers
  handleReceiveMessage: (message: MessageBroadcastDto) => void;
  handleMessageEdited: (data: { MessageId: number; NewContent: string; EditedAt: string }) => void;
  handleMessageDeleted: (data: { MessageId: number }) => void;
}

export const useMessageStore = create<MessageStore>((set, get) => ({
  // Initial state
  conversations: [],
  currentProjectId: null,
  messages: [],
  isLoading: false,
  isConnected: false,

  // Initialize SignalR connection
  initializeSignalR: async () => {
    try {
      await signalRService.connect();
      
      // Set up event listeners
      signalRService.onReceiveMessage(get().handleReceiveMessage);
      signalRService.onMessageEdited(get().handleMessageEdited);
      signalRService.onMessageDeleted(get().handleMessageDeleted);
      
      set({ isConnected: true });
      toast.success('Connected to real-time messaging');
    } catch (error) {
      console.error('Failed to initialize SignalR:', error);
      toast.error('Failed to connect to real-time messaging');
      set({ isConnected: false });
    }
  },

  // Disconnect SignalR
  disconnectSignalR: async () => {
    try {
      // Clean up event listeners
      signalRService.off('ReceiveMessage');
      signalRService.off('MessageEdited');
      signalRService.off('MessageDeleted');
      
      await signalRService.disconnect();
      set({ isConnected: false });
    } catch (error) {
      console.error('Error disconnecting SignalR:', error);
    }
  },

  // Set current project and join SignalR group
  setCurrentProject: async (projectId: number) => {
    const { currentProjectId } = get();
    
    try {
      // Leave previous project if any
      if (currentProjectId && currentProjectId !== projectId && get().isConnected) {
        await signalRService.leaveProject(currentProjectId);
      }
      
      // Join new project
      if (get().isConnected) {
        await signalRService.joinProject(projectId);
      }
      
      set({ currentProjectId: projectId });
      
      // Load messages for this project
      await get().loadMessages(projectId);
    } catch (error) {
      console.error('Error setting current project:', error);
      toast.error('Failed to join project chat');
    }
  },

  // Load messages for a project
  loadMessages: async (projectId: number, page = 1) => {
    set({ isLoading: true });
    
    try {
      const newMessages = await messageService.getMessages(projectId, page, 50);
      
      set(state => ({
        messages: page === 1 ? newMessages : [...state.messages, ...newMessages],
        isLoading: false
      }));
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
      set({ isLoading: false });
    }
  },

  // Send a message
  sendMessage: async (projectId: number, content: string) => {
    if (!content.trim()) return;
    
    try {
      if (get().isConnected) {
        // Send via SignalR for instant delivery
        await signalRService.sendMessage(projectId, content);
      } else {
        // Fallback to REST API
        const newMessage = await messageService.sendMessage(projectId, content);
        get().handleReceiveMessage({
          messageId: newMessage.id,
          projectId: newMessage.projectId,
          senderId: newMessage.senderId,
          senderName: newMessage.senderName,
          content: newMessage.content,
          sentAt: newMessage.sentAt
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  },

  // Edit a message
  editMessage: async (projectId: number, messageId: number, content: string) => {
    try {
      const updatedMessage = await messageService.updateMessage(projectId, messageId, content);
      
      set(state => ({
        messages: state.messages.map(msg =>
          msg.id === messageId ? updatedMessage : msg
        )
      }));
      
      toast.success('Message updated');
    } catch (error) {
      console.error('Error editing message:', error);
      toast.error('Failed to edit message');
    }
  },

  // Delete a message
  deleteMessage: async (projectId: number, messageId: number) => {
    try {
      await messageService.deleteMessage(projectId, messageId);
      
      set(state => ({
        messages: state.messages.filter(msg => msg.id !== messageId)
      }));
      
      toast.success('Message deleted');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  },

  // Mark conversation as read
  markAsRead: (projectId: number) => {
    set(state => ({
      conversations: state.conversations.map(conv =>
        conv.projectId === projectId ? { ...conv, unreadCount: 0 } : conv
      )
    }));
  },

  // Initialize conversations from user projects
  initializeConversations: (projects: { id: number; title: string; authorName: string }[]) => {
    set(state => {
      const existingConvIds = new Set(state.conversations.map(conv => conv.projectId));
      const newConversations = projects
        .filter(project => !existingConvIds.has(project.id))
        .map(project => ({
          projectId: project.id,
          projectTitle: project.title,
          lastMessage: undefined,
          unreadCount: 0,
          participants: [project.authorName]
        }));

      return {
        conversations: [...state.conversations, ...newConversations]
      };
    });
  },

  // Handle incoming message from SignalR
  handleReceiveMessage: (message: MessageBroadcastDto) => {
    // Debug: Log the timestamp format received from SignalR
    console.log('SignalR message timestamp:', message.sentAt, 'Type:', typeof message.sentAt);
    
    const fullMessage: MessageDto = {
      id: message.messageId,
      projectId: message.projectId,
      senderId: message.senderId,
      senderName: message.senderName,
      senderEmail: '', // Not provided in broadcast
      content: message.content,
      sentAt: message.sentAt,
      editedAt: null,
      isDeleted: false
    };

    set(state => {
      // Check if conversation exists, if not create it
      const existingConvIndex = state.conversations.findIndex(conv => conv.projectId === message.projectId);
      const updatedConversations = [...state.conversations];

      if (existingConvIndex >= 0) {
        // Update existing conversation
        updatedConversations[existingConvIndex] = {
          ...updatedConversations[existingConvIndex],
          lastMessage: fullMessage,
          unreadCount: state.currentProjectId === message.projectId ? 0 : updatedConversations[existingConvIndex].unreadCount + 1
        };
      } else {
        // Create new conversation if it doesn't exist
        updatedConversations.push({
          projectId: message.projectId,
          projectTitle: `Project ${message.projectId}`, // Will be updated when projects load
          lastMessage: fullMessage,
          unreadCount: state.currentProjectId === message.projectId ? 0 : 1,
          participants: [message.senderName]
        });
      }

      return {
        messages: [fullMessage, ...state.messages],
        conversations: updatedConversations
      };
    });
  },

  // Handle message edit from SignalR
  handleMessageEdited: (data: { MessageId: number; NewContent: string; EditedAt: string }) => {
    set(state => ({
      messages: state.messages.map(msg =>
        msg.id === data.MessageId
          ? { ...msg, content: data.NewContent, editedAt: data.EditedAt }
          : msg
      )
    }));
  },

  // Handle message deletion from SignalR
  handleMessageDeleted: (data: { MessageId: number }) => {
    set(state => ({
      messages: state.messages.filter(msg => msg.id !== data.MessageId)
    }));
  }
}));
