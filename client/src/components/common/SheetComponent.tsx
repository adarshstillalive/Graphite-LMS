import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { PanelRightClose } from 'lucide-react';
import { useNotification } from '@/context/notificationContext';
import { useState } from 'react';

export function SheetComponent() {
  const { notifications } = useNotification();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <PanelRightClose
          className="right-0 top-20 z-50 fixed bg-gray-600 text-gray-200 rounded-s-sm p-2 transition-all duration-300 ease-in-out hover:bg-gray-700 hover:scale-110 hover:text-white"
          size={36}
          strokeWidth={0.5}
        />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-4">
          <SheetTitle>Notifications & Uploads</SheetTitle>
        </SheetHeader>
        <SheetDescription asChild>
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div className="bg-gray-100 p-4 rounded-md" key={notification.id}>
                {notification.content}
              </div>
            ))}
          </div>
        </SheetDescription>
        <SheetFooter>
          <SheetClose asChild>{/* Footer content if needed */}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
