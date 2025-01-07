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
}

const ChatSidebar: React.FC<SidebarProps> = ({
  instructors,
  chats,
  onSelectChat,
  onSelectInstructor,
  selectedChatId,
}) => {
  return (
    <div className="w-64 border-r bg-gray-300 border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between">
        <h2 className="text-lg font-semibold">Chats</h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus: outline-none">
            <UserPlus />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[16rem]">
            <DropdownMenuLabel>Instructors</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {instructors.map((instructor) => (
              <DropdownMenuItem
                className="h-12 cursor-pointer"
                key={instructor._id}
                onClick={() => onSelectInstructor(instructor._id)}
              >
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage
                    src={instructor.profilePicture}
                    alt={instructor.firstName}
                  />
                  <AvatarFallback>
                    {instructor.firstName && instructor.firstName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="font-medium">
                    {instructor.firstName + ' ' + instructor.lastName}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ScrollArea className="h-[calc(80vh-60px)]">
        {chats.length > 0 &&
          chats.map((contact) => (
            <Button
              key={contact._id}
              variant="ghost"
              className={`w-full justify-start px-4 py-8 ${
                selectedChatId === contact._id ? 'bg-gray-100' : ''
              }`}
              onClick={() => onSelectChat(contact)}
            >
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage
                  src={contact?.instructorId?.profilePicture}
                  alt={contact?.instructorId?.userId.firstName}
                />
                <AvatarFallback>
                  {contact?.instructorId?.userId?.firstName &&
                    contact?.instructorId?.userId?.firstName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="font-medium">
                  {contact?.instructorId?.userId?.firstName +
                    ' ' +
                    contact?.instructorId?.userId?.lastName}
                </span>
                <span className="text-xs text-gray-500 capitalize">
                  {/* {contact.role} */}
                </span>
              </div>
            </Button>
          ))}
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
