import { Square } from 'chess.js';
import cn from 'classnames';
import { Chessboard } from 'react-chessboard';
import { BsFillStopwatchFill } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { Bishop, King, Knight, Pawn, Queen, Rook } from '~/assets/icons';
import { useAuth } from '~/providers/AuthProvider';
import { Square as CustomSquare, customPieces } from '../Board/Elements';
import { customDarkSquareStyle, customLightSquareStyle } from '../Board/styles';
import History from '../History';
import { ChatRoom } from './ChatRoom';
import useGame, { roomState } from './useGame';

const pieces = {
  wK: () => <King width={14} color="white" />,
  wQ: () => <Queen width={14} color="white" />,
  wB: () => <Bishop width={14} color="white" />,
  wN: () => <Knight width={14} color="white" />,
  wR: () => <Rook width={14} color="white" />,
  wP: () => <Pawn width={14} color="white" />,
  bK: () => <King width={14} />,
  bQ: () => <Queen width={14} />,
  bB: () => <Bishop width={14} />,
  bN: () => <Knight width={14} />,
  bR: () => <Rook width={14} />,
  bP: () => <Pawn width={14} />,
};

function getPieceKey(piece: string, isWhite: boolean) {
  return isWhite ? `w${piece.toUpperCase()}` : `b${piece.toUpperCase()}`;
}
const PiecesCount = {
  k: 1,
  q: 1,
  b: 2,
  n: 2,
  r: 2,
  p: 8,
};

function getTakenFromFen(fen: string, isWhite: boolean) {
  const position = fen.split(' ')[0];
  const count: { [key: string]: number } = {
    p: 0,
    n: 0,
    b: 0,
    q: 0,
    r: 0,
    k: 0,
    P: 0,
    N: 0,
    B: 0,
    Q: 0,
    R: 0,
    K: 0,
  };

  for (let piece of position) {
    if (piece === '/') continue;
    if (isNaN(Number(piece))) {
      count[piece]++;
    }
  }

  return {
    p: PiecesCount.p - count[isWhite ? 'p' : 'P'],
    n: PiecesCount.n - count[isWhite ? 'n' : 'N'],
    b: PiecesCount.b - count[isWhite ? 'b' : 'B'],
    q: PiecesCount.q - count[isWhite ? 'q' : 'Q'],
    r: PiecesCount.r - count[isWhite ? 'r' : 'R'],
    k: PiecesCount.k - count[isWhite ? 'k' : 'K'],
  };
}

const PlayerInfo = (props: {
  picture: string;
  username: string;
  rating: number;
  color: 'white' | 'black';
}) => {
  return (
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
  );
};

const PlayerStatus = (props: {
  side: 'top' | 'bottom';
  picture: string;
  username: string;
  rating: number;
  timeLeft: number;
  color: 'white' | 'black';
}) => {
  const remaining = new Date(0);
  remaining.setMilliseconds(props.timeLeft);
  const timeString = remaining.toISOString().substring(14, 19);
  const fen = roomState.useTrackedStore().fen;
  const takenPieces = getTakenFromFen(fen, props.color === 'white');
  return (
    <div
      style={{ maxWidth: '70vh', width: '70vw', margin: '0 auto' }}
      className={cn('px-4 py-2 flex justify-between items-stretch border border-gray-200', {
        'rounded-t-md': props.side === 'top',
        'rounded-b-md': props.side === 'bottom',
      })}
    >
      <PlayerInfo
        color={props.color}
        picture={props.picture}
        rating={props.rating}
        username={props.username}
      />
      <div className="flex">
        {Object.entries(takenPieces).map(([piece, count]) => {
          const Piece = (pieces as any)[getPieceKey(piece, props.color !== 'white')];
          return new Array(count).fill(null).map((_, index) => <Piece key={`${piece}-${index}`} />);
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
  const room = roomState.useTrackedStore();
  const { isLoading, isTurn, isGameOver, move, deselectPiece, select, pieceAtSquare } = useGame();

  if (isLoading) return <div>Loading...</div>;

  function onSquareClick(square: Square) {
    if (isGameOver()) return;
    if (!isTurn()) return;
    const piece = pieceAtSquare(square);
    const isMove = room.moveFrom && room.moveFrom !== square && room.possibleMoves[square];
    const isSelect = !isMove && piece.color === room.side[0];
    const isDeselect = !isMove && !isSelect && room.moveFrom;

    if (isMove) move(room.moveFrom, square);
    else if (isDeselect) deselectPiece();
    else if (isSelect) select(square);
  }
  return (
    <div className="flex-1 py-8 justify-center w-full flex">
      <div className="grid room-grid-template items-center gap-10">
        <ChatRoom />
        <div>
          <PlayerStatus
            color={room.side === 'white' ? 'black' : 'white'}
            username={room.opponent?.username || 'Opponent'}
            timeLeft={room.opponent?.timeLeft || 0}
            picture={room.opponent?.picture || ''}
            rating={room.opponent?.rating || 800}
            side="top"
          />
          <div style={{ maxWidth: '70vh', width: '70vw', margin: '0 auto' }}>
            <Chessboard
              id={'board'}
              position={room.fen}
              animationDuration={300}
              arePremovesAllowed={false}
              customPieces={customPieces}
              customSquare={CustomSquare}
              boardOrientation={room.side}
              arePiecesDraggable={isTurn()}
              onSquareClick={onSquareClick}
              customSquareStyles={room.possibleMoves}
              customDarkSquareStyle={customDarkSquareStyle}
              customLightSquareStyle={customLightSquareStyle}
              isDraggablePiece={({ piece }) => {
                return piece.startsWith(room.side[0]) && isTurn() && !isGameOver();
              }}
            />
          </div>
          <PlayerStatus
            side="bottom"
            color={room.side}
            picture={user?.picture || ''}
            rating={user?.rating || 800}
            timeLeft={room.timeLeft}
            username={user?.nickname || ''}
          />
        </div>
        <History />
      </div>
    </div>
  );
};

export default Room;
