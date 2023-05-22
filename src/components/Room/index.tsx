import { useAuth } from '~/providers/AuthProvider';
import Board from '../Board';
import History from '../History';
import Layout from '../Layout';
import { ChatRoom } from './ChatRoom';
import useGame, { roomState } from './useGame';
import { Move } from 'chess.js';
import Summary from '../Modal/Summary';
import { Content, Dialog } from '@radix-ui/react-dialog';

// const pieces = {
//   wK: () => <King width={14} color="white" />,
//   wQ: () => <Queen width={14} color="white" />,
//   wB: () => <Bishop width={14} color="white" />,
//   wN: () => <Knight width={14} color="white" />,
//   wR: () => <Rook width={14} color="white" />,
//   wP: () => <Pawn width={14} color="white" />,
//   bK: () => <King width={14} />,
//   bQ: () => <Queen width={14} />,
//   bB: () => <Bishop width={14} />,
//   bN: () => <Knight width={14} />,
//   bR: () => <Rook width={14} />,
//   bP: () => <Pawn width={14} />,
// };

const Room = () => {
  const { user } = useAuth();
  const room = roomState.useTrackedStore();
  const { isLoading, move } = useGame();

  const onChange = (_fen: string, m: Move) => {
    move(m.from, m.to);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Layout
        left={<ChatRoom />}
        center={
          <Board
            isWhite={room.isWhite}
            fen={room.fen}
            onChange={onChange}
            player={{
              rating: user?.rating,
              picture: user?.picture,
              username: user?.nickname,
              clockms: room.player_clockms,
            }}
            opponent={{
              rating: room.opponent?.rating,
              picture: room.opponent?.picture,
              username: room.opponent?.username,
              clockms: room.opponent_clockms,
            }}
          />
        }
        right={<History />}
      />
      <Dialog open={room.isOpen} onOpenChange={(open) => roomState.set.isOpen(open)}>
        <Content>
          <Summary
            isAborted={false}
            isDraw={false}
            isWinner={room.isWinner}
            rating={user?.rating || 0}
          />
        </Content>
      </Dialog>
    </>
  );
};

export default Room;
