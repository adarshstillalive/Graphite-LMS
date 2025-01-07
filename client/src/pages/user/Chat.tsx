import ChatSection from '@/components/user/profile/ChatSection';
import ChatSidebar from '@/components/user/profile/ChatSidebar';
import React, { useEffect, useState } from 'react';
import socket from '@/socket/socket';
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

const Chat: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [authorizedInstructors, setAuthorizedInstructors] = useState<
    IUserPopulated[]
  >([]);
  const [chatList, setChatList] = useState<IChat[]>([]);
  const [instructor, setInstructor] = useState<IUserPopulated | null>(null);

  const handleSelectChat = async (chat: IChat) => {
    if (!currentUser) return;
    setSelectedChat(chat);
    try {
      const response = await fetchUserMessage(chat._id);
      setMessages(response.data);
      const matchedInstructor = authorizedInstructors.find(
        (ins) => ins.instructorId._id === chat.instructorId._id
      );
      setInstructor(matchedInstructor || null);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
    socket.emit('joinRoom', {
      roomId: chat._id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
    });
  };

  useEffect(() => {
    const fetchInitials = async () => {
      try {
        const response = await fetchInitialChatData();
        setAuthorizedInstructors(response.data.instructors);
        setChatList(response.data.chatList);
      } catch (error) {
        console.error('Error fetching initial chat data:', error);
      }
    };
    fetchInitials();
  }, []);

  useEffect(() => {
    socket.on('recieveMessage', (payload: IMessage) => {
      if (!selectedChat) return;
      setMessages((prev) => [...prev, payload]);
    });

    return () => {
      socket.off('recieveMessage');
    };
  }, [selectedChat]);

  const handleSelectInstructor = async (instructorId: string) => {
    try {
      const matchedInstructor = authorizedInstructors.find(
        (ins) => ins._id === instructorId
      );
      if (matchedInstructor) {
        await setInstructorChat(instructorId);
        setInstructor(matchedInstructor);
      }
    } catch (error) {
      console.error('Error selecting instructor:', error);
    }
  };

  const handleSendMessage = (content: string) => {
    if (selectedChat && currentUser) {
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

      setMessages((prev) => [...prev, newMessage]);
    }
  };

  return (
    <div className="flex border -mb-24">
      <ChatSidebar
        instructors={authorizedInstructors}
        chats={chatList}
        onSelectChat={handleSelectChat}
        onSelectInstructor={handleSelectInstructor}
        selectedChatId={selectedChat?._id || null}
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
