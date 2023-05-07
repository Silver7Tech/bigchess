import { forwardRef } from 'react';
import { CustomPieces, CustomSquareRenderer } from 'react-chessboard/dist/chessboard/types';
import { Bishop, King, Knight, Pawn, Queen, Rook } from '~/assets/icons';

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

export const Square: CustomSquareRenderer = forwardRef(({ children, style }, ref) => {
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
