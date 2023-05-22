import cn from 'classnames';
import { forwardRef, useMemo } from 'react';
import { CustomPieces, CustomSquareRenderer } from 'react-chessboard/dist/chessboard/types';
import { BsFillStopwatchFill } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { Bishop, King, Knight, Pawn, Queen, Rook } from '~/assets/icons';
import { getFormatedTime } from './utils';
export type PiecesTypes = keyof CustomPieces;
export const customPieces: CustomPieces = {
  wB: ({ squareWidth }) => <Bishop width={squareWidth - 10} color="white" />,
  wN: ({ squareWidth }) => <Knight width={squareWidth - 10} color="white" />,
  wQ: ({ squareWidth }) => <Queen width={squareWidth - 10} color="white" />,
  wK: ({ squareWidth }) => <King width={squareWidth - 10} color="white" />,
  wP: ({ squareWidth }) => <Pawn width={squareWidth - 10} color="white" />,
  wR: ({ squareWidth }) => <Rook width={squareWidth - 10} color="white" />,
  bN: ({ squareWidth }) => <Knight width={squareWidth - 10} />,
  bB: ({ squareWidth }) => <Bishop width={squareWidth - 10} />,
  bQ: ({ squareWidth }) => <Queen width={squareWidth - 10} />,
  bK: ({ squareWidth }) => <King width={squareWidth - 10} />,
  bP: ({ squareWidth }) => <Pawn width={squareWidth - 10} />,
  bR: ({ squareWidth }) => <Rook width={squareWidth - 10} />,
};

export const customPiecesMap = new Map(Object.entries(customPieces));
function getPieceKey(piece: string, isWhite: boolean) {
  return isWhite ? `w${piece.toUpperCase()}` : `b${piece.toUpperCase()}`;
}
const PlayerInfo = (props: { picture: string; username: string; rating: number }) => {
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

type PlayerStatusProps = {
  side: 'top' | 'bottom';
  picture: string;
  username: string;
  rating: number;
  timeLeft: number;
  isWhite?: boolean;
  takenPieces: {
    [key: string]: number;
  };
};

export const PlayerStatus = (props: PlayerStatusProps) => {
  const takenPieces = useMemo(
    () =>
      props.takenPieces
        ? Object.entries(props.takenPieces).map(([piece, count]) => {
            const Piece = customPiecesMap.get(getPieceKey(piece, !props.isWhite));
            if (!Piece) return null;
            return new Array(count)
              .fill(null)
              .map((_, index) => (
                <Piece key={`${piece}-${index}`} squareWidth={14} isDragging={false} />
              ));
          })
        : [],
    [props.takenPieces],
  );
  return (
    <div
      style={{ /* maxWidth: '70vh', width: '70vw', */ margin: '0 auto' }}
      className={cn(
        'board_container px-4 py-2 flex justify-between items-stretch border border-gray-200',
        {
          'rounded-t-md': props.side === 'top',
          'rounded-b-md': props.side === 'bottom',
        },
      )}
    >
      <PlayerInfo picture={props.picture} rating={props.rating} username={props.username} />
      <div className="flex">{takenPieces}</div>
      <div className="flex items-center border border-gray-200 rounded-md px-2 py-1">
        <BsFillStopwatchFill className="text-blue-100 mr-2" />
        <p>{getFormatedTime(props.timeLeft)}</p>
      </div>
    </div>
  );
};

export const CustomSquare: CustomSquareRenderer = forwardRef(({ children, style }, ref) => {
  return (
    <div
      ref={ref}
      className="relative"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </div>
  );
});
