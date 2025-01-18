import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IChat } from '@/interfaces/Chat';

interface SidebarProps {
  chats: IChat[];
  onSelectChat: (chat: IChat) => void;
  selectedChatId: string | null;
  online: string[];
}

const ChatSidebar: React.FC<SidebarProps> = ({
  chats,
  onSelectChat,
  selectedChatId,
  online,
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="px-6 h-16 flex items-center border-b border-zinc-200">
        <h2 className="text-lg font-semibold text-zinc-900">Students</h2>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-3">
          {chats.map((chat) => (
            <Button
              key={chat._id}
              variant="ghost"
              className={`
                w-full px-3 py-3 h-auto flex items-center gap-3
                ${
                  selectedChatId === chat._id
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'text-zinc-700 hover:bg-zinc-50'
                }
              `}
              onClick={() => onSelectChat(chat)}
            >
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={chat?.userId?.profilePicture} />
                <AvatarFallback className="bg-zinc-200 text-zinc-700">
                  {chat?.userId?.firstName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="font-medium">
                  {chat?.userId?.firstName + ' ' + chat?.userId?.lastName}
                </p>
                {online.includes(chat?.userId?._id) && (
                  <p className="text-sm text-emerald-600">Online</p>
                )}
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
