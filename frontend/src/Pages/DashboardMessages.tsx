import { useEffect, useState } from 'react';
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
  ClockIcon,
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
    isConnected,
    initializeSignalR,
    disconnectSignalR,
    setCurrentProject,
    sendMessage,
    editMessage,
    deleteMessage,
    markAsRead
  } = useMessageStore();

  const [newMessage, setNewMessage] = useState('');
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');

  // Initialize on mount
  useEffect(() => {
    const initialize = async () => {
      await fetchAllUserProjects();
      await initializeSignalR();
    };
    
    initialize();

    // Cleanup on unmount
    return () => {
      disconnectSignalR();
    };
  }, [fetchAllUserProjects, initializeSignalR, disconnectSignalR]);

  // Create conversations from all user projects (created + joined)
  const projectConversations: ProjectConversation[] = allUserProjects.map((project) => {
    const existing = conversations.find(conv => conv.projectId === project.id);
    return existing || {
      projectId: project.id,
      projectTitle: project.title,
      lastMessage: undefined,
      unreadCount: 0,
      participants: [project.authorName] // Add more participants as needed
    };
  });

  const handleSelectConversation = async (projectId: number) => {
    await setCurrentProject(projectId);
    markAsRead(projectId);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  };

  const currentProject = allUserProjects.find((p: Project) => p.id === currentProjectId);

  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-50 to-indigo-50/30 min-h-screen">
      {/* Header */}
      <header className='flex-shrink-0 bg-white/80 shadow-sm backdrop-blur-sm border-gray-200/60 border-b'>
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
                <h1 className='bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 font-bold text-transparent text-2xl sm:text-3xl tracking-tight'>
                  Team Messages
                </h1>
                <p className="mt-1 text-gray-600 text-sm">
                  Chat with your project teams
                  {isConnected && (
                    <span className="inline-flex items-center gap-1 ml-2 text-green-600">
                      <span className="bg-green-500 rounded-full w-2 h-2"></span>
                      Connected
                    </span>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-0">
        <div className='mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl h-full'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="gap-6 grid grid-cols-1 lg:grid-cols-3 h-full"
          >
            {/* Conversation List */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow-sm border border-gray-200 rounded-xl h-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 px-4 py-4 border-gray-100 border-b">
                  <h2 className="flex items-center gap-2 font-semibold text-gray-900 text-lg">
                    <UserGroupIcon className="w-5 h-5 text-indigo-600" />
                    Project Chats
                  </h2>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  {projectConversations.length > 0 ? (
                    <div className="space-y-1 p-2">
                      {projectConversations.map((conversation) => (
                        <motion.button
                          key={conversation.projectId}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelectConversation(conversation.projectId)}
                          className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                            currentProjectId === conversation.projectId
                              ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200'
                              : 'hover:bg-gray-50 border-2 border-transparent'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className={`font-medium truncate mr-2 ${
                              currentProjectId === conversation.projectId ? 'text-indigo-900' : 'text-gray-900'
                            }`}>
                              {conversation.projectTitle}
                            </h3>
                            {conversation.unreadCount > 0 && (
                              <span className="inline-flex justify-center items-center bg-red-500 rounded-full min-w-5 h-5 font-medium text-white text-xs">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                          
                          {conversation.lastMessage ? (
                            <div className="text-gray-600 text-sm">
                              <p className="truncate">
                                <span className="font-medium">{conversation.lastMessage.senderName}:</span> {conversation.lastMessage.content}
                              </p>
                              <p className="flex items-center gap-1 mt-1 text-gray-500 text-xs">
                                <ClockIcon className="w-3 h-3" />
                                {formatDate(conversation.lastMessage.sentAt)}
                              </p>
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm">No messages yet</p>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center py-16 text-center">
                      <InboxIcon className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                      <p className="text-gray-500">No project chats available</p>
                      <p className="text-gray-400 text-sm">Join or create projects to start chatting</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Chat View */}
            <div className="lg:col-span-2">
              <div className="flex flex-col bg-white shadow-sm border border-gray-200 rounded-xl h-full overflow-hidden">
                {currentProject ? (
                  <>
                    {/* Chat Header */}
                    <div className="flex-shrink-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 px-6 py-4 border-gray-100 border-b">
                      <h3 className="font-semibold text-gray-900 text-lg">{currentProject.title}</h3>
                      <p className="text-gray-600 text-sm">Team Chat</p>
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
                              <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-2' : 'order-1'}`}>
                                {!isOwn && (
                                  <p className="mb-1 font-medium text-gray-700 text-sm">{message.senderName}</p>
                                )}
                                
                                <div className={`group relative p-3 rounded-lg ${
                                  isOwn 
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                                    : 'bg-gray-100 text-gray-900'
                                }`}>
                                  {isEditing ? (
                                    <div className="space-y-2">
                                      <textarea
                                        value={editingContent}
                                        onChange={(e) => setEditingContent(e.target.value)}
                                        className="bg-white p-2 border border-gray-300 rounded w-full text-gray-900 text-sm resize-none"
                                        rows={2}
                                      />
                                      <div className="flex gap-2">
                                        <button
                                          onClick={handleSaveEdit}
                                          className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded font-medium text-white text-xs transition-colors"
                                        >
                                          Save
                                        </button>
                                        <button
                                          onClick={handleCancelEdit}
                                          className="bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded font-medium text-white text-xs transition-colors"
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
                                            className="bg-white/20 hover:bg-white/30 p-1 rounded"
                                          >
                                            <PencilIcon className="w-3 h-3" />
                                          </button>
                                          <button
                                            onClick={() => handleDeleteMessage(message.id)}
                                            className="bg-white/20 hover:bg-white/30 p-1 rounded"
                                          >
                                            <TrashIcon className="w-3 h-3" />
                                          </button>
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                                
                                <p className={`mt-1 text-xs ${isOwn ? 'text-right' : 'text-left'} text-gray-500`}>
                                  {formatDate(message.sentAt)}
                                  {message.editedAt && <span className="ml-1">(edited)</span>}
                                </p>
                              </div>
                            </motion.div>
                          );
                        })
                      ) : (
                        <div className="flex flex-col justify-center items-center py-16 text-center">
                          <ChatBubbleLeftRightIcon className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                          <p className="text-gray-500">No messages yet</p>
                          <p className="text-gray-400 text-sm">Start the conversation!</p>
                        </div>
                      )}
                    </div>

                    {/* Message Input */}
                    <div className="flex-shrink-0 p-4 border-gray-100 border-t">
                      <form onSubmit={handleSendMessage} className="flex gap-3">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-2 border border-gray-300 focus:border-indigo-500 rounded-lg outline-none"
                          maxLength={2000}
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          disabled={!newMessage.trim()}
                          className="inline-flex items-center bg-gradient-to-r from-indigo-600 hover:from-indigo-700 to-purple-600 hover:to-purple-700 disabled:opacity-50 shadow-lg hover:shadow-xl px-4 py-2 rounded-lg font-medium text-white text-sm transition-all duration-200 disabled:cursor-not-allowed"
                        >
                          <PaperAirplaneIcon className="w-4 h-4" />
                        </motion.button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center py-16 text-center">
                    <ChatBubbleLeftRightIcon className="mx-auto mb-4 w-16 h-16 text-gray-300" />
                    <h3 className="mb-2 font-medium text-gray-900 text-lg">Select a Project Chat</h3>
                    <p className="text-gray-500">Choose a project from the list to view and send messages</p>
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
