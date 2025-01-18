import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserPlus } from 'lucide-react';
import { IChat } from '@/interfaces/Chat';
import { IUserPopulated } from '@/interfaces/User';

interface SidebarProps {
  instructors: IUserPopulated[];
  chats: IChat[];
  onSelectChat: (chat: IChat) => void;
  onSelectInstructor: (instructorId: string) => void;
  selectedChatId: string | null;
  online: string[];
}

const ChatSidebar: React.FC<SidebarProps> = ({
  instructors,
  chats,
  onSelectChat,
  onSelectInstructor,
  selectedChatId,
  online,
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="px-6 h-16 flex items-center justify-between border-b border-zinc-200">
        <h2 className="text-lg font-semibold text-zinc-900">Messages</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-zinc-100">
              <UserPlus className="h-5 w-5 text-zinc-700" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>New Conversation</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {instructors.map((instructor) => (
              <DropdownMenuItem
                key={instructor._id}
                className="p-3 cursor-pointer"
                onClick={() =>
                  instructor.instructorId._id &&
                  onSelectInstructor(instructor.instructorId._id)
                }
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={instructor.profilePicture} />
                  <AvatarFallback className="bg-zinc-200 text-zinc-700">
                    {instructor.firstName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="font-medium text-zinc-900">
                    {instructor.firstName + ' ' + instructor.lastName}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
                <AvatarImage src={chat?.instructorId?.profilePicture} />
                <AvatarFallback className="bg-zinc-200 text-zinc-700">
                  {chat?.instructorId?.userId?.firstName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="font-medium">
                  {chat?.instructorId?.userId?.firstName +
                    ' ' +
                    chat?.instructorId?.userId?.lastName}
                </p>
                {chat?.instructorId?._id &&
                  online.includes(chat?.instructorId?._id) && (
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
