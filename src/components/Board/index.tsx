import { Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { START_POSITION } from '~/assets/CONSTANTS';

import { createStore } from '@udecode/zustood';
import { Chess } from 'chess.js';
import { CSSProperties, useEffect, useRef } from 'react';
import { CustomSquare, PlayerStatus, customPieces } from './Elements';
import { BoardProps, BoardState, SanitizedChessboardProps } from './interfaces';
import { customDarkSquareStyle, customLightSquareStyle } from './styles';
import './styles.css';
import { Piece } from 'react-chessboard/dist/chessboard/types';

const DEFAULT_BOARD_PROPS: SanitizedChessboardProps = {
  id: 'board',
  animationDuration: 300,

  position: START_POSITION,
  boardOrientation: 'white',
  arePremovesAllowed: false,

  customSquare: CustomSquare,
  customPieces: customPieces,
  customDarkSquareStyle: customDarkSquareStyle,
  customLightSquareStyle: customLightSquareStyle,
};

export const boardStore = createStore('board')<BoardState>({
  moveFrom: '',
  possibleMoves: {},
});

export default function Board(props: BoardProps) {
  const chess = useRef(new Chess(props.fen || START_POSITION)).current;
  const board = boardStore.useTrackedStore();

  useEffect(() => {
    chess.load(props.fen || START_POSITION);
  }, [props.fen]);
  const isTurn = () => (props.isWhite ? chess.turn() === 'w' : chess.turn() === 'b');

  const isDisabled = () => props.disabled || !isTurn() || chess.isGameOver();

  function move(from: BoardState['moveFrom'], to: Square) {
    const move = chess.move({
      from,
      to,
      promotion: 'q',
    });
    if (!move) return;
    boardStore.set.moveFrom('');
    boardStore.set.possibleMoves({});
    props.onChange?.(chess.fen(), move, chess.isGameOver());
  }

  function setPossibleMoves(square: Square) {
    const moves = chess.moves({
      square,
      verbose: true,
    });

    if (moves.length === 0) return {};

    const newSquares: { [key in Square]?: CSSProperties } = {};

    moves.map((move) => {
      newSquares[move.to] = {
        background:
          chess.get(move.to) && chess.get(move.to).color !== chess.get(square).color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%',
      };
      return move;
    });
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)',
    };

    boardStore.set.possibleMoves(newSquares);
  }

  function deselect() {
    boardStore.set.moveFrom('');
    boardStore.set.possibleMoves({});
  }

  function select(square: Square) {
    boardStore.set.moveFrom(square);
    setPossibleMoves(square);
  }

  function onSquareClick(square: Square) {
    if (isDisabled()) return;
    const piece = chess.get(square);
    const isMove = board.moveFrom && board.moveFrom !== square && board.possibleMoves[square];
    const isSelect =
      !isMove &&
      ((piece.color === 'w' && props.isWhite) || (piece.color === 'b' && !props.isWhite));
    const isDeselect = !isMove && !isSelect && board.moveFrom;

    if (isMove) move(board.moveFrom, square);
    else if (isDeselect) deselect();
    else if (isSelect) select(square);
  }

  function onDragOverSquare(_square: Square) {
    return !isDisabled();
  }

  function onDrop(_sSquare: Square, _tSquare: Square, _piece: Piece) {
    return !isDisabled();
  }

  function onDragStart(_piece: Piece, _sourceSquare: Square) {
    return !isDisabled();
  }

  function isDraggablePiece() {
    return !isDisabled();
  }

  const lostPieces = {};
  const capturedPieces = {};

  return (
    <div>
      <PlayerStatus
        side="top"
        isWhite={!props.isWhite}
        rating={props.opponent?.rating || 0}
        picture={props.opponent?.picture || ''}
        timeLeft={props.opponent?.clockms || 0}
        takenPieces={lostPieces}
        username={props.opponent?.username || 'Opponent'}
      />
      <div className="board-container">
        <Chessboard
          {...DEFAULT_BOARD_PROPS}
          onPieceDrop={onDrop}
          onSquareClick={onSquareClick}
          onPieceDragBegin={onDragStart}
          onDragOverSquare={onDragOverSquare}
          isDraggablePiece={isDraggablePiece}
          customSquareStyles={board.possibleMoves}
          position={props.fen || START_POSITION}
          boardOrientation={props.isWhite ? 'white' : 'black'}
        />
      </div>
      <PlayerStatus
        side="bottom"
        rating={props.player?.rating || 0}
        picture={props.player?.picture || ''}
        timeLeft={props.player?.clockms || 0}
        isWhite={props.isWhite}
        takenPieces={capturedPieces}
        username={props.player?.username || 'You'}
      />
    </div>
  );
}
