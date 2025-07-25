import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMessageStore } from '../Stores/MessageStore';
import { useUserProjectStore } from '../Stores/UserProjectStore';
import { useAuthStore } from '../Stores/AuthStore';
import type { ProjectConversation } from '../Models/Message';
import type { Project } from '../Models/Project';
import { 
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  PencilIcon,
  TrashIcon,
  InboxIcon
} from '@heroicons/react/24/outline';

export default function DashboardMessages() {
  const user = useAuthStore((state) => state.user);
  const { allUserProjects, fetchAllUserProjects } = useUserProjectStore();
  const {
    conversations,
    currentProjectId,
    messages,
    isLoading,
    initializeSignalR,
    disconnectSignalR,
    setCurrentProject,
    sendMessage,
    editMessage,
    deleteMessage,
    initializeConversations
  } = useMessageStore();

  const [newMessage, setNewMessage] = useState('');
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initialize on mount
  useEffect(() => {
    const initialize = async () => {
      await fetchAllUserProjects();
      await initializeSignalR();
    };
    
    initialize();

    return () => {
      disconnectSignalR();
    };
  }, [fetchAllUserProjects, initializeSignalR, disconnectSignalR]);

  // Initialize conversations when projects are loaded
  useEffect(() => {
    if (allUserProjects.length > 0) {
      initializeConversations(allUserProjects);
    }
  }, [allUserProjects, initializeConversations]);

  // Auto-scroll when messages change or current project changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, currentProjectId]);

  // Auto-scroll when switching conversations
  useEffect(() => {
    if (currentProjectId && messages.length > 0) {
      // Small delay to ensure DOM is updated
      setTimeout(scrollToBottom, 100);
    }
  }, [currentProjectId, messages.length]);

  // Get conversations with proper project titles
  const projectConversations: ProjectConversation[] = conversations.map((conversation) => {
    const project = allUserProjects.find(p => p.id === conversation.projectId);
    return {
      ...conversation,
      projectTitle: project ? project.title : conversation.projectTitle,
    };
  });

  const handleSelectConversation = async (projectId: number) => {
    await setCurrentProject(projectId);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentProjectId) return;

    await sendMessage(currentProjectId, newMessage);
    setNewMessage('');
  };

  const handleStartEdit = (messageId: number, content: string) => {
    setEditingMessageId(messageId);
    setEditingContent(content);
  };

  const handleSaveEdit = async () => {
    if (!editingMessageId || !currentProjectId || !editingContent.trim()) return;

    await editMessage(currentProjectId, editingMessageId, editingContent);
    setEditingMessageId(null);
    setEditingContent('');
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditingContent('');
  };

  const handleDeleteMessage = async (messageId: number) => {
    if (!currentProjectId) return;
    
    if (window.confirm('Are you sure you want to delete this message?')) {
      await deleteMessage(currentProjectId, messageId);
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      // Parse the ISO timestamp (should now always include 'Z' from backend)
      const date = new Date(dateString);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid date string received:', dateString);
        return 'Invalid date';
      }
      
      return date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting date:', error, 'Input:', dateString);
      return 'Invalid date';
    }
  };

  const currentProject = allUserProjects.find((p: Project) => p.id === currentProjectId);

  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-50 dark:from-gray-900 to-indigo-50/30 dark:to-indigo-950/30 min-h-screen">
      {/* Header */}
      <header className='flex-shrink-0 bg-white/80 dark:bg-gray-900/80 shadow-sm backdrop-blur-sm border-gray-200/60 dark:border-gray-700/60 border-b'>
        <div className='mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl'>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4'
          >
            <div className='flex items-center gap-4'>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg rounded-xl w-12 h-12"
              >
                <ChatBubbleLeftRightIcon className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className='bg-clip-text bg-gradient-to-r from-gray-900 dark:from-gray-100 to-gray-700 dark:to-gray-300 font-bold text-transparent text-2xl sm:text-3xl tracking-tight'>
                  Team Messages
                </h1>
                <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
                  Chat with your project teams
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 min-h-0">
        <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="gap-6 lg:gap-8 grid grid-cols-1 lg:grid-cols-3 h-full"
          >
            {/* Conversation List */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 dark:bg-gray-800/80 shadow-sm backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-xl h-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-50/50 dark:from-indigo-950/20 to-purple-50/50 dark:to-purple-950/20 px-4 py-4 border-gray-100/60 dark:border-gray-700/60 border-b">
                  <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100 text-lg">
                    <UserGroupIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Project Chats
                  </h2>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  {projectConversations.length > 0 ? (
                    <div className="space-y-1 p-2">
                      {projectConversations.map((conversation) => (
                        <motion.button
                          key={conversation.projectId}
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelectConversation(conversation.projectId)}
                          className={`w-full text-left p-4 rounded-lg transition-all duration-200 cursor-pointer ${
                            currentProjectId === conversation.projectId
                              ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-2 border-indigo-200 dark:border-indigo-700 shadow-sm'
                              : 'hover:bg-gray-50/80 dark:hover:bg-gray-700/50 border-2 border-transparent hover:shadow-sm'
                          }`}
                        >
                          <h3 className={`font-medium ${
                            currentProjectId === conversation.projectId ? 'text-indigo-900 dark:text-indigo-100' : 'text-gray-900 dark:text-gray-100'
                          }`}>
                            {conversation.projectTitle}
                          </h3>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center py-16 text-center">
                      <InboxIcon className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                      <p className="text-gray-500 dark:text-gray-400">No project chats available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Chat View */}
            <div className="lg:col-span-2 max-h-[60vh]">
              <div className="flex flex-col bg-white/80 dark:bg-gray-800/80 shadow-sm backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-xl h-full overflow-hidden">
                {currentProject ? (
                  <>
                    {/* Chat Header */}
                    <div className="flex-shrink-0 bg-gradient-to-r from-indigo-50/50 dark:from-indigo-950/20 to-purple-50/50 dark:to-purple-950/20 px-6 py-4 border-gray-100/60 dark:border-gray-700/60 border-b">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{currentProject.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Team Chat</p>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 space-y-4 p-4 overflow-y-auto">
                      {isLoading ? (
                        <div className="flex justify-center items-center py-8">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className='border-2 border-indigo-600 border-t-transparent rounded-full w-6 h-6'
                          />
                        </div>
                      ) : messages.length > 0 ? (
                        messages.slice().reverse().map((message) => {
                          const isOwn = message.senderId === user?.id;
                          const isEditing = editingMessageId === message.id;

                          return (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className="max-w-xs lg:max-w-md">
                                {!isOwn && (
                                  <p className="mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm">{message.senderName}</p>
                                )}
                                
                                <div className={`group relative p-3 rounded-lg shadow-sm ${
                                  isOwn 
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                                    : 'bg-white/80 dark:bg-gray-700/80 border border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100'
                                }`}>
                                  {isEditing ? (
                                    <div className="space-y-2">
                                      <textarea
                                        value={editingContent}
                                        onChange={(e) => setEditingContent(e.target.value)}
                                        className="bg-white dark:bg-gray-700 p-2 border border-gray-300 dark:border-gray-600 rounded w-full text-gray-900 dark:text-gray-100 text-sm resize-none"
                                        rows={2}
                                      />
                                      <div className="flex gap-2">
                                        <button
                                          onClick={handleSaveEdit}
                                          className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded font-medium text-white text-xs transition-colors cursor-pointer"
                                        >
                                          Save
                                        </button>
                                        <button
                                          onClick={handleCancelEdit}
                                          className="bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded font-medium text-white text-xs transition-colors cursor-pointer"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <p className="text-sm">{message.content}</p>
                                      {isOwn && (
                                        <div className="top-2 right-2 absolute flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <button
                                            onClick={() => handleStartEdit(message.id, message.content)}
                                            className="bg-white/20 hover:bg-white/30 p-1 rounded transition-colors cursor-pointer"
                                          >
                                            <PencilIcon className="w-3 h-3" />
                                          </button>
                                          <button
                                            onClick={() => handleDeleteMessage(message.id)}
                                            className="bg-white/20 hover:bg-white/30 p-1 rounded transition-colors cursor-pointer"
                                          >
                                            <TrashIcon className="w-3 h-3" />
                                          </button>
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                                
                                <p className={`mt-1 text-xs ${isOwn ? 'text-right' : 'text-left'} text-gray-500`}>
                                  {formatDateTime(message.sentAt)}
                                  {message.editedAt && <span className="ml-1">(edited)</span>}
                                </p>
                              </div>
                            </motion.div>
                          );
                        })
                      ) : (
                        <div className="flex flex-col justify-center items-center py-16 text-center">
                          <ChatBubbleLeftRightIcon className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                          <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
                        </div>
                      )}
                      {/* Auto-scroll target */}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="flex-shrink-0 bg-gradient-to-r from-gray-50/50 dark:from-gray-800/50 to-indigo-50/50 dark:to-indigo-900/30 p-4 border-gray-100/60 dark:border-gray-700/60 border-t">
                      <form onSubmit={handleSendMessage} className="flex gap-3">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-2 border border-gray-300/60 focus:border-indigo-500 dark:border-gray-600/60 dark:focus:border-indigo-400 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 text-gray-900 dark:placeholder:text-gray-400 dark:text-gray-100 placeholder:text-gray-500 transition-all duration-200"
                          maxLength={2000}
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          disabled={!newMessage.trim()}
                          className="inline-flex items-center bg-gradient-to-r from-indigo-600 hover:from-indigo-700 to-purple-600 hover:to-purple-700 disabled:opacity-50 shadow-lg hover:shadow-xl px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 font-medium text-white text-sm transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <PaperAirplaneIcon className="w-4 h-4" />
                        </motion.button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center py-16 text-center">
                    <ChatBubbleLeftRightIcon className="mx-auto mb-4 w-16 h-16 text-gray-300 dark:text-gray-600" />
                    <h3 className="mb-2 font-medium text-gray-900 dark:text-gray-100 text-lg">Select a Project Chat</h3>
                    <p className="text-gray-500 dark:text-gray-400">Choose a project to view and send messages</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
