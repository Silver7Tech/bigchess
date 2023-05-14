import { createContext, useContext } from 'react';
import { Socket, io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

export const socket = io(URL, {
  transports: ['websocket'],
  autoConnect: true,
  path: '/ws',
  withCredentials: true,
  auth: {
    token: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const SocketContext = createContext<Socket | null>(socket);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) throw new Error('useSocket must be used within a SocketProvider');
  return socket;
};
