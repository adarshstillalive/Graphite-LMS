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
    <div className="w-64 border-r bg-gray-300 border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between">
        <h2 className="text-lg font-semibold">Chats</h2>
        {/* <DropdownMenu>
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
        </DropdownMenu> */}
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
                  src={contact?.userId?.profilePicture}
                  alt={contact?.userId.firstName}
                />
                <AvatarFallback>
                  {contact?.userId?.firstName && contact?.userId?.firstName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="font-medium">
                  {contact?.userId?.firstName + ' ' + contact?.userId?.lastName}
                </span>
                {online.some((c) => c === contact?.userId?._id) && (
                  <span className="text-green-500">Online</span>
                )}
              </div>
            </Button>
          ))}
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
