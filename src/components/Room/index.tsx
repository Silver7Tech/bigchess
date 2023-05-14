import { Chessboard } from 'react-chessboard';
import { BsFillStopwatchFill } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { useAuth } from '~/providers/AuthProvider';
import { Square, customPieces } from '../Board/Elements';
import { customDarkSquareStyle, customLightSquareStyle } from '../Board/styles';
import History from '../History';
import { ChatRoom } from './ChatRoom';
import { Bishop, King, Knight, Pawn, Queen, Rook } from '~/assets/icons';
import cn from 'classnames';
const pieces = {
  wK: <King width={14} color="white" />,
  wQ: <Queen width={14} color="white" />,
  wB: <Bishop width={14} color="white" />,
  wN: <Knight width={14} color="white" />,
  wR: <Rook width={14} color="white" />,
  wP: <Pawn width={14} color="white" />,
  bK: <King width={14} />,
  bQ: <Queen width={14} />,
  bB: <Bishop width={14} />,
  bN: <Knight width={14} />,
  bR: <Rook width={14} />,
  bP: <Pawn width={14} />,
};
const PlayerStatus = (props: {
  side: 'top' | 'bottom';
  picture: string;
  username: string;
  rating: number;
  timeLeft: number;
  taken: string[];
  color: 'w' | 'b';
}) => {
  const remaining = new Date(0);
  remaining.setMilliseconds(props.timeLeft);
  const timeString = remaining.toISOString().substring(14, 19);
  return (
    <div
      style={{ maxWidth: '70vh', width: '70vw', margin: '0 auto' }}
      className={cn('px-4 py-2 flex justify-between items-stretch border border-gray-200', {
        'rounded-t-md': props.side === 'top',
        'rounded-b-md': props.side === 'bottom',
      })}
    >
      <div className="flex items-center">
        {props.picture ? (
          <img src={props.picture} alt="" className="w-6 rounded-full mr-2" />
        ) : (
          <div className="w-6 h-6 rounded-full mr-2 bg-gray-200 flex items-center justify-center">
            <FiUser className="h-4 w-4" />
          </div>
        )}
        <p>
          {props.username} ({props.rating})
        </p>
      </div>
      <div className="flex">
        {['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'].map((piece) => {
          return pieces[`${props.color}${piece.toUpperCase()}` as keyof typeof pieces];
        })}
      </div>
      <div className="flex items-center border border-gray-200 rounded-md px-2 py-1">
        <BsFillStopwatchFill className="text-blue-100 mr-2" />
        <p className="">{timeString}</p>
      </div>
    </div>
  );
};

const Room = () => {
  const { user } = useAuth();
  return (
    <div className="flex-1 py-8 justify-center w-full flex">
      <div className="grid room-grid-template items-center gap-10">
        <ChatRoom />
        <div>
          <PlayerStatus
            side="top"
            color="w"
            picture=""
            rating={800}
            taken={[]}
            timeLeft={180000}
            username="Opponent"
          />
          <div style={{ maxWidth: '70vh', width: '70vw', margin: '0 auto' }}>
            <Chessboard
              id={'board'}
              animationDuration={300}
              isDraggablePiece={() => false}
              arePremovesAllowed={false}
              customPieces={customPieces}
              customSquare={Square}
              customDarkSquareStyle={customDarkSquareStyle}
              customLightSquareStyle={customLightSquareStyle}
            />
          </div>
          <PlayerStatus
            side="bottom"
            color="b"
            picture={user?.picture || ''}
            rating={800}
            taken={[]}
            timeLeft={180000}
            username={user?.nickname || ''}
          />
        </div>
        <History />
      </div>
    </div>
  );
};

export default Room;
