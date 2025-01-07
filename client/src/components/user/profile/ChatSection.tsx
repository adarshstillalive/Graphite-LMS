import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendHorizonal } from 'lucide-react';
import { IUser, IUserPopulated } from '@/interfaces/User';
import { IMessage } from '@/interfaces/Message';

interface ChatProps {
  currentUser: IUser;
  instructor: IUserPopulated;
  messages: IMessage[];
  onSendMessage: (content: string) => void;
}

const ChatSection: React.FC<ChatProps> = ({
  currentUser,
  instructor,
  messages,
  onSendMessage,
}) => {
  console.log('mes', messages);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-md">
      <div className="bg-gray-300 flex flex-row items-center space-x-4 p-4 border-b border-gray-200">
        <Avatar>
          <AvatarImage src={instructor.profilePicture} />
          <AvatarFallback>
            {instructor.firstName && instructor.firstName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">
            {instructor.firstName + ' ' + instructor.lastName}
          </h2>
          <p className="text-sm text-muted-foreground capitalize">
            {/* {otherUser} */}
          </p>
        </div>
      </div>
      <div className="h-[60vh] overflow-y-auto p-4">
        {messages.map((m, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              m?.senderId === currentUser._id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                m?.senderId === currentUser._id
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              <p>{m?.text}</p>
              <span className="text-xs opacity-70">
                {m?.createdAt && new Date(m?.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />{' '}
        {/* Ensure we always scroll to this point */}
      </div>
      <div className="bg-gray-300 p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow h-12 rounded-none bg-gray-100"
          />
          <Button type="submit" className="h-12 rounded-full">
            <SendHorizonal />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatSection;
