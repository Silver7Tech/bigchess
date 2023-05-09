import { io } from 'socket.io-client';
import { Option } from '~/components/Room/Option';
import Board from '../Board';
import { useEffect } from 'react';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

export const socket = io(URL, {
  // transports: ['websocket'],
  autoConnect: false,
  path: '/ws',
  withCredentials: true,
  auth: {
    token: `Bearer ${localStorage.getItem('token')}`,
  },
});

const Room = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      console.log(socket.recovered); // true
    });
  }, []);
  return (
    <div className="room">
      <Board
        onChange={(_fen: string) => {
          socket.emit('move', _fen);
          // console.log(fen);
        }}
      />
      <Option />
    </div>
  );
};

export default Room;
