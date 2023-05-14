import { PropsWithChildren, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { SocketContext } from './context';

export default function SocketProvider({ children }: PropsWithChildren) {
  const socket = useRef(
    io({
      autoConnect: true,
      path: '/ws',
      withCredentials: true,
      auth: {
        token: `Bearer ${localStorage.getItem('token')}`,
      },
    }),
  ).current;

  useEffect(() => {
    socket.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      // eslint-disable-next-line no-console
      console.log(socket.recovered); // true
    });
    return () => {};
  });
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
