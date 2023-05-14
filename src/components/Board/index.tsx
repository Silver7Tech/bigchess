import { Chess } from 'chess.js';
import { CSSProperties, useRef, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Square } from 'react-chessboard/dist/chessboard/types';

import { Square as CustomSquare, customPieces } from './Elements';
import { customDarkSquareStyle, customLightSquareStyle } from './styles';

export default function Board(_props: {
  width?: number;
  disabled?: boolean;
  onChange?: (fen: string) => void;
}) {
  const game = useRef(new Chess()).current;

  const [moveFrom, setMoveFrom] = useState<Square | ''>('');
  const [options, setOptions] = useState<{ [key in Square]?: CSSProperties }>({});
  // const [, setNewFen] = useState(game.fen());
  function getMoveOptions(square: Square) {
    const moves = game.moves({
      square,
      verbose: true,
    });

    if (moves.length === 0) return {};

    const newSquares: { [key in Square]?: CSSProperties } = {};

    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) && game.get(move.to).color !== game.get(square).color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%',
      };
      return move;
    });
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)',
    };
    return newSquares;
  }

  function onSquareClick(square: Square) {
    if (_props.disabled) return;
    if (moveFrom) {
      if (moveFrom === square) {
        setMoveFrom('');
        setOptions({});
        return;
      }

      const hasOption = options[square];

      if (hasOption) {
        game.move({
          from: moveFrom,
          to: square,
        });
        setMoveFrom('');
        setOptions({});
        _props.onChange?.(game.fen());
        return;
      } else if (game.get(square)) {
        setMoveFrom(square);
        setOptions(getMoveOptions(square));
      } else {
        setMoveFrom('');
        setOptions({});
      }
    }

    if (game.get(square)) {
      setMoveFrom(square);
      setOptions(getMoveOptions(square));
    }
  }
  return (
    <div
      className="board_container"
      style={{
        maxWidth: '80vh',
      }}
    >
      <Chessboard
        id={'board'}
        animationDuration={300}
        isDraggablePiece={(args) => {
          if (_props.disabled) return false;
          if (game.turn() === 'w' && args.piece.startsWith('w')) return true;
          else if (game.turn() === 'b' && args.piece.startsWith('b')) return true;
          return false;
        }}
        arePremovesAllowed={false}
        customPieces={customPieces}
        customSquare={CustomSquare}
        customDarkSquareStyle={customDarkSquareStyle}
        customLightSquareStyle={customLightSquareStyle}
        position={game.fen()}
        onSquareClick={onSquareClick}
        customSquareStyles={{
          ...options,
        }}
      />
    </div>
  );
}
