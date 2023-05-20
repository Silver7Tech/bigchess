import { PropsWithChildren } from 'react';
import { io } from 'socket.io-client';
import { SocketContext } from './context';
const URL = process.env.NODE_ENV === 'production' ? window.location : 'http://localhost:3000';
const socket = io(URL, {
  autoConnect: true,
  path: '/ws',
  withCredentials: true,
  auth: {
    token: `Bearer ${localStorage.getItem('token')}`,
  },
});
export default function SocketProvider({ children }: PropsWithChildren) {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
