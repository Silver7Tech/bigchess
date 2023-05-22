import { useAuth } from '~/providers/AuthProvider';
import Board from '../Board';
import Layout from '../Layout';
import { Option } from '../GameSelect';

export default function Lobby() {
  const { user } = useAuth();
  return (
    <Layout
      center={
        <Board
          disabled
          isWhite={true}
          player={{
            clockms: 0,
            rating: 0,
            username: user?.nickname || 'You',
            picture: user?.picture || '',
          }}
          opponent={{
            clockms: 0,
            rating: 0,
            username: 'Opponent',
            picture: '',
          }}
        />
      }
      right={<Option />}
    />
  );
}
