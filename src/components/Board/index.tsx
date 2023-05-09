import { Chess } from 'chess.js';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Square } from 'react-chessboard/dist/chessboard/types';
import { socket } from '../Room';
import { Square as CustomSquare, customPieces } from './Elements';
import { customDarkSquareStyle, customLightSquareStyle } from './styles';

export default function Board(_props: { width?: number; onChange: (fen: string) => void }) {
  const game = useRef(new Chess()).current;
  const [moveFrom, setMoveFrom] = useState<Square | ''>('');
  const [options, setOptions] = useState<{ [key in Square]?: CSSProperties }>({});
  const [newFen, setNewFen] = useState(game.fen());
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
        _props.onChange(game.fen());
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

  useEffect(() => {
    socket.on('move', (fen: string) => {
      game.load(fen);
      setNewFen(fen);
    });
  }, []);
  return (
    <div className="flex select-none">
      <Chessboard
        id={'board'}
        boardWidth={650}
        animationDuration={200}
        isDraggablePiece={(args) => {
          if (game.turn() === 'w' && args.piece.startsWith('w')) return true;
          else if (game.turn() === 'b' && args.piece.startsWith('b')) return true;
          return false;
        }}
        arePremovesAllowed={false}
        customPieces={customPieces}
        customSquare={CustomSquare}
        customDarkSquareStyle={customDarkSquareStyle}
        customLightSquareStyle={customLightSquareStyle}
        position={newFen}
        onSquareClick={onSquareClick}
        customSquareStyles={{
          ...options,
        }}
      />
    </div>
  );
}
