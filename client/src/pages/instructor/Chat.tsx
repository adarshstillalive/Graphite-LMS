import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IMessage } from '@/interfaces/Message';
import { IChat } from '@/interfaces/Chat';
import { IUser } from '@/interfaces/User';
import { fetchInitialChatData } from '@/services/instructor/profileService';
import ChatSidebar from '@/components/instructor/chat/ChatSidebar';
import ChatSection from '@/components/instructor/chat/ChatSection';
import { fetchUserMessage } from '@/services/user/profileService';
import { useToast } from '@/hooks/use-toast';
import { useWebSocket } from '@/context/webSocketContext';
import { Menu } from 'lucide-react';

const Chat: React.FC = () => {
  const socket = useWebSocket();
  const { toast } = useToast();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [chatList, setChatList] = useState<IChat[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [online, setOnline] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  // Initialize socket connection
  useEffect(() => {
    if (!socket || !currentUser?.instructorId) return;

    const handleConnect = () => {
      setIsConnected(true);
      socket.emit('userConnected', currentUser.instructorId);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    // If socket is already connected, emit userConnected
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, [socket, currentUser?.instructorId]);

  // Handle chat selection
  const handleSelectChat = async (chat: IChat) => {
    if (!currentUser || !socket) return;

    setSelectedChat(chat);
    try {
      const response = await fetchUserMessage(chat._id);
      setMessages(response.data);
      setUser(chat.userId || null);

      // Join the chat room
      socket.emit('joinRoom', {
        roomId: chat._id,
        userName: `${currentUser.firstName} ${currentUser.lastName}`,
      });
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      toast({
        variant: 'destructive',
        description: 'Failed to load chat messages',
      });
    }
  };

  // Fetch initial chat data
  useEffect(() => {
    const fetchInitials = async () => {
      try {
        const response = await fetchInitialChatData();
        setChatList(response.data);
      } catch (error) {
        toast({
          variant: 'destructive',
          description: 'Loading failed, Refresh the page',
        });
        console.error('Error fetching initial chat data:', error);
      }
    };
    fetchInitials();
  }, []);

  // Handle socket events
  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleReceiveMessage = (payload: IMessage) => {
      if (!selectedChat) return;
      setMessages((prev) => [...prev, payload]);
    };

    const handleOnlineUsers = (onlineUsers: string[]) => {
      setOnline(onlineUsers);
    };

    socket.on('receiveMessage', handleReceiveMessage);
    socket.on('updateOnlineUsers', handleOnlineUsers);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
      socket.off('updateOnlineUsers', handleOnlineUsers);
    };
  }, [socket, isConnected, selectedChat]);

  const handleSendMessage = (content: string) => {
    if (!selectedChat || !currentUser || !socket) return;

    const newMessage: IMessage = {
      chatId: selectedChat._id,
      senderId: currentUser.instructorId,
      text: content,
    };

    socket.emit('sendMessage', {
      roomId: selectedChat._id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      message: newMessage,
    });
  };

  return (
    <div className="flex -mb-24 bg-zinc-50">
      {/* Mobile Overlay */}
      {showMobileSidebar && (
        <div
          className="fixed inset-0 bg-black/30 z-10 lg:hidden"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-10
          w-80 bg-white border-r border-zinc-200
          transform transition-transform duration-200 ease-in-out
          ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <ChatSidebar
          chats={chatList}
          onSelectChat={(chat) => {
            handleSelectChat(chat);
            setShowMobileSidebar(false);
          }}
          selectedChatId={selectedChat?._id || null}
          online={online}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center px-4 h-16 border-b border-zinc-200 bg-white">
          <button
            onClick={() => setShowMobileSidebar(true)}
            className="p-2 hover:bg-zinc-100 rounded-md"
          >
            <Menu className="w-6 h-6 text-zinc-700" />
          </button>
        </div>

        {selectedChat && user && currentUser ? (
          <ChatSection
            currentUser={currentUser}
            user={user}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-zinc-200">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-zinc-700">
                Welcome to Messages
              </h3>
              <p className="text-zinc-500 mt-2">
                Select a student to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
