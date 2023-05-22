import { Move, Square } from 'chess.js';
import { CSSProperties } from 'react';
import { ChessboardProps } from 'react-chessboard/dist/chessboard/types';

export interface SanitizedChessboardProps
  extends Partial<
    Pick<
      ChessboardProps,
      | 'id'
      | 'position'
      | 'customSquare'
      | 'customPieces'
      | 'isDraggablePiece'
      | 'boardOrientation'
      | 'areArrowsAllowed'
      | 'animationDuration'
      | 'arePremovesAllowed'
      | 'arePiecesDraggable'
      | 'customSquareStyles'
      | 'customDarkSquareStyle'
      | 'customLightSquareStyle'
    >
  > {}

export type BoardProps = {
  fen?: string;
  isWhite?: boolean;
  player?: Player;
  opponent?: Player;
  disabled?: boolean;
  onChange?: (fen: string, move: Move, isGameOver: boolean) => void;
};

export type Player = Partial<{
  rating: number;
  picture: string;
  clockms: number;
  username: string;
}>;

export type BoardState = {
  possibleMoves: { [key in Square]?: CSSProperties };
  moveFrom: Square | '';
};
