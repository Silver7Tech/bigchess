import { useQuery } from '@tanstack/react-query';
import { createStore } from '@udecode/zustood';
import { Chess, Square } from 'chess.js';
import { CSSProperties, useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { trpc } from '~/helpers/trpc';
import { GameResponse, GameStatus, Move, Moves } from '~/interfaces';
import { useAuth } from '~/providers/AuthProvider';
import { useSocket } from '~/providers/SocketProvider';
import { PlayerSide } from '../../interfaces';
type MoveResponse = { fen: string; moves: Move[]; w_clockms: number; b_clockms: number };
export const roomState = createStore('room')<{
  side: PlayerSide;
  status: GameStatus;
  moveFrom: string;
  possibleMoves: { [key in Square]?: CSSProperties };
  moves: Moves;
  fen: string;
  timeLeft: number;
  opponent?: {
    username?: string;
    picture?: string;
    rating?: number;
    timeLeft: number;
  };
  winner: string;
}>(
  {
    side: 'white' as PlayerSide,
    status: 'pending' as GameStatus,
    possibleMoves: {},
    moves: [] as Moves,
    moveFrom: '',
    fen: '',
    timeLeft: 0,
    opponent: {
      username: '',
      picture: '',
      rating: 0,
      timeLeft: 0,
    },
    winner: '',
  },
  {
    devtools: {
      enabled: process.env.NODE_ENV === 'development',
    },
  },
);
export default function useGame() {
  const { user } = useAuth();
  const socket = useSocket();
  const params = useParams<{ gameId: string }>();
  const chess = useRef(new Chess()).current;
  const {
    data: game,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['trpc', 'game.byId', params.gameId],
    queryFn: async () => {
      let result;
      try {
        result = await trpc.query('game.byId', { gameId: params.gameId });
      } catch (e) {
        console.error(e);
      }
      return result as GameResponse;
    },
    onSuccess(data) {
      const side = data.white.uid === user?.uid ? 'white' : 'black';
      const opponent = side === 'white' ? data.black : data.white;
      chess.load(data.fen);
      const newState = {
        side,
        status: data.status,
        moves: data.moves,
        fen: data.fen,
        timeLeft: side === 'white' ? data.w_clockms : data.b_clockms,
        opponent: {
          timeLeft: side === 'white' ? data.b_clockms : data.w_clockms,
        },
      };

      opponent &&
        Object.assign(newState, {
          opponent: {
            username: opponent.nickname,
            picture: opponent.picture,
            rating: opponent.rating,
            timeLeft: opponent.uid === data.black.uid ? data.b_clockms : data.w_clockms,
          },
        });
      roomState.set.mergeState({ ...(newState as any) });
    },
  });

  useEffect(() => {
    if (!game?.id) return;
    socket.emit('game:join', { data: { gameId: params.gameId } });
    socket.on('opponent:found', refetch);
    socket.on('opponent:joined', refetch);
    socket.on('game:start', refetch);
    socket.on('game:update', ({ fen, b_clockms, w_clockms, moves }: MoveResponse) => {
      roomState.set.mergeState({
        moveFrom: '',
        moves,
        fen,
        possibleMoves: {},
        timeLeft: game.white.uid === user?.uid ? w_clockms : b_clockms,
        opponent: {
          ...roomState.get.opponent?.(),
          timeLeft: game.white.uid === user?.uid ? b_clockms : w_clockms,
        },
      });
      chess.load(game.fen);
    });
    socket.on('game:status', (status: GameStatus) => {
      roomState.set.mergeState({
        status,
      });
    });
  }, [game?.id]);

  const move = useCallback(async (from: string, to: string) => {
    const move = chess.move({ from, to });
    if (!move) return;
    let result: MoveResponse | undefined;
    try {
      result = (await trpc.mutation('game.move', {
        move: move.san,
        gameId: params.gameId,
        clockms: roomState.get.timeLeft(),
      })) as MoveResponse;

      if (result) {
        roomState.set.mergeState({
          fen: result.fen,
          moveFrom: '',
          moves: result.moves,
          timeLeft: result.w_clockms,
          possibleMoves: {},
          opponent: {
            ...roomState.get.opponent?.(),
            timeLeft: result.b_clockms,
          },
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const resign = useCallback(() => {
    socket.emit('game:resign', params.gameId);
  }, []);

  const draw = useCallback(() => {
    socket.emit('game:draw', params.gameId);
  }, []);

  const isTurn = useCallback(() => {
    const { side, status } = roomState.store.getState();
    return side[0] === chess.turn() && status === 'started';
  }, []);

  const possibleMoves = useCallback((square: Square) => {
    return getMoveOptions(chess, square);
  }, []);

  const isGameOver = useCallback(() => {
    return chess.isCheckmate();
  }, []);

  const deselectPiece = useCallback(() => {
    roomState.set.mergeState({
      moveFrom: '',
      possibleMoves: {},
    });
  }, []);

  const select = useCallback(
    (square: Square) => {
      roomState.set.moveFrom(square);
      roomState.set.possibleMoves(getMoveOptions(chess, square));
    },
    [move, deselectPiece],
  );

  const pieceAtSquare = useCallback(
    (square: Square) => {
      return chess.get(square);
    },
    [chess],
  );
  return {
    move,
    draw,
    select,
    resign,
    isTurn,
    isLoading,
    isGameOver,
    possibleMoves,
    pieceAtSquare,
    deselectPiece,
  };
}

function getMoveOptions(game: Chess, square: Square) {
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
