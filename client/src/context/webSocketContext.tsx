import React, { createContext, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { initializeSocket, disconnectSocket } from '@/socket/socket';

const WebSocketContext = createContext<Socket | null>(null);
const newSocket = initializeSocket();
export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(newSocket);

  useEffect(() => {
    // Initialize socket

    // Connect and store socket instance
    newSocket.connect();
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
        disconnectSocket();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const socket = useContext(WebSocketContext);
  if (!socket) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return socket;
};
