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
    <div className="flex flex-col flex-1 bg-zinc-50">
      {/* Chat Header */}
      <div className="flex items-center px-6 h-16 bg-white border-b border-zinc-200">
        <Avatar className="h-10 w-10">
          <AvatarImage src={instructor.profilePicture} />
          <AvatarFallback className="bg-zinc-200 text-zinc-700">
            {instructor.firstName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h2 className="font-semibold text-zinc-900">
            {instructor.firstName + ' ' + instructor.lastName}
          </h2>
          <p className="text-sm text-zinc-500">Instructor</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.senderId === currentUser._id
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div
                className={`
                  max-w-[75%] px-4 py-3 rounded-2xl
                  ${
                    message.senderId === currentUser._id
                      ? 'bg-black text-white'
                      : 'bg-white text-zinc-900 border border-zinc-200'
                  }
                `}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs mt-1 block opacity-70">
                  {message.createdAt &&
                    new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-zinc-200">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 h-12 bg-zinc-50 border-zinc-200 focus:ring-black"
          />
          <Button
            type="submit"
            className="h-12 px-6 bg-black hover:bg-zinc-800 text-white"
          >
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatSection;
