import { createContext, useContext, useState } from 'react';

interface Notification {
  id: string;
  content: React.ReactNode;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (content: React.ReactNode) => string; // Returns the ID
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (content: React.ReactNode): string => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, content }]);
    return id;
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('Should inscribed in Provider');
  }
  return context;
};
