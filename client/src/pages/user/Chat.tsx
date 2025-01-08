import ChatSection from '@/components/user/profile/ChatSection';
import ChatSidebar from '@/components/user/profile/ChatSidebar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IMessage } from '@/interfaces/Message';
import { IChat } from '@/interfaces/Chat';
import {
  fetchInitialChatData,
  fetchUserMessage,
  setInstructorChat,
} from '@/services/user/profileService';
import { IUserPopulated } from '@/interfaces/User';
import { useToast } from '@/hooks/use-toast';
import { useWebSocket } from '@/context/webSocketContext';

const Chat: React.FC = () => {
  const socket = useWebSocket();
  const { toast } = useToast();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [authorizedInstructors, setAuthorizedInstructors] = useState<
    IUserPopulated[]
  >([]);
  const [chatList, setChatList] = useState<IChat[]>([]);
  const [instructor, setInstructor] = useState<IUserPopulated | null>(null);
  const [online, setOnline] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    if (!socket || !currentUser?._id) return;

    const handleConnect = () => {
      setIsConnected(true);
      socket.emit('userConnected', currentUser._id);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    // If already connected, emit userConnected
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, [socket, currentUser?._id]);

  // Handle chat selection
  const handleSelectChat = async (chat: IChat) => {
    if (!currentUser || !socket || !isConnected) return;

    setSelectedChat(chat);
    try {
      const response = await fetchUserMessage(chat._id);
      setMessages(response.data);

      const matchedInstructor = authorizedInstructors.find(
        (ins) => ins.instructorId._id === chat.instructorId._id
      );
      setInstructor(matchedInstructor || null);

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

  // Fetch initial data
  useEffect(() => {
    const fetchInitials = async () => {
      try {
        const response = await fetchInitialChatData();
        setAuthorizedInstructors(response.data.instructors);
        setChatList(response.data.chatList);
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

  // Handle instructor selection
  const handleSelectInstructor = async (instructorId: string) => {
    if (!isConnected) return;

    try {
      const matchedInstructor = authorizedInstructors.find(
        (ins) => ins.instructorId._id === instructorId
      );
      console.log(matchedInstructor, 'matched');

      if (matchedInstructor) {
        await setInstructorChat(instructorId);
        setInstructor(matchedInstructor);

        // Refetch chat list after setting up new instructor chat
        const response = await fetchInitialChatData();
        setChatList(response.data.chatList);
        const selected = response.data.chatList.find(
          (chat: IChat) => chat.instructorId._id === instructorId
        );
        handleSelectChat(selected);
      }
    } catch (error) {
      console.error('Error selecting instructor:', error);
      toast({
        variant: 'destructive',
        description: 'Failed to connect with instructor',
      });
    }
  };

  const handleSendMessage = (content: string) => {
    if (!selectedChat || !currentUser || !socket || !isConnected) return;

    const newMessage: IMessage = {
      chatId: selectedChat._id,
      senderId: currentUser._id,
      text: content,
    };

    socket.emit('sendMessage', {
      roomId: selectedChat._id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      message: newMessage,
    });
  };

  return (
    <div className="flex border -mb-24">
      <ChatSidebar
        instructors={authorizedInstructors}
        chats={chatList}
        onSelectChat={handleSelectChat}
        onSelectInstructor={handleSelectInstructor}
        selectedChatId={selectedChat?._id || null}
        online={online}
      />
      {selectedChat && instructor && currentUser ? (
        <div className="flex-1">
          <ChatSection
            currentUser={currentUser}
            instructor={instructor}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Select a contact to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
