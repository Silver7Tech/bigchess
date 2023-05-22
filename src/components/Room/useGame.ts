import { useQuery } from '@tanstack/react-query';
import { createStore } from '@udecode/zustood';
import { Chess, Square } from 'chess.js';
import { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { trpc } from '~/helpers/trpc';
import { GameResponse, GameStatus, Move, Moves } from '~/interfaces';
import { useAuth } from '~/providers/AuthProvider';
import { useSocket } from '~/providers/SocketProvider';
type MoveResponse = {
  fen: string;
  moves: Move[];
  w_clockms: number;
  b_clockms: number;
  winner: string;
};
type RoomState = {
  fen: string;
  moves: Moves;
  isWinner: boolean;
  isOpen: boolean;
  isWhite: boolean;
  status: GameStatus;
  player_clockms: number;
  opponent_clockms: number;
  opponent?: {
    rating?: number;
    picture?: string;
    username?: string;
  };
};
export const roomState = createStore('room')<RoomState>(
  {
    fen: '',
    isOpen: false,
    player_clockms: 0,
    moves: [] as Moves,
    opponent_clockms: 0,
    isWhite: true,
    status: 'pending' as GameStatus,
    isWinner: false,
    opponent: {
      username: '',
      picture: '',
      rating: 0,
    },
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
      const isWhite = data.white.uid === user?.uid;
      const opponent = isWhite ? data.black : data.white;
      chess.load(data.fen);
      const newState: Partial<RoomState> = {
        isWhite,
        fen: data.fen,
        moves: data.moves,
        status: data.status,
        isOpen: data.status === 'completed',
        isWinner: isWhite && data.winner === data.white_id,
        player_clockms: isWhite ? data.w_clockms : data.b_clockms,
        opponent_clockms: isWhite ? data.b_clockms : data.w_clockms,
      };

      opponent &&
        Object.assign(newState, {
          opponent_clockms: isWhite ? data.b_clockms : data.w_clockms,
          opponent: {
            username: opponent.nickname,
            picture: opponent.picture,
            rating: opponent.rating,
          },
        });
      roomState.set.mergeState({ ...(newState as any) });
    },
  });

  const move = useCallback(async (from: string, to: string) => {
    const move = chess.move({ from, to });
    if (!move) return;
    let result: MoveResponse | undefined;
    try {
      result = (await trpc.mutation('game.move', {
        move: move.san,
        gameId: params.gameId,
        clockms: roomState.get.player_clockms(),
      })) as MoveResponse;

      if (result) {
        roomState.set.mergeState({
          fen: result.fen,
          moves: result.moves,
          player_clockms: result.w_clockms,
          opponent_clockms: result.b_clockms,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const onGameUpdate = useCallback(({ fen, b_clockms, w_clockms, moves, winner }: MoveResponse) => {
    if (!game) return;
    chess.load(game.fen);
    const stateUpdate: Partial<RoomState> = {};
    const isWhite = game.white.uid === user?.uid;
    if (chess.isGameOver()) {
      stateUpdate.status = 'completed';
      stateUpdate.isWinner = isWhite && winner === game.white_id;
    }
    stateUpdate.moves = moves;
    stateUpdate.fen = fen;
    stateUpdate.player_clockms = isWhite ? w_clockms : b_clockms;
    stateUpdate.opponent_clockms = isWhite ? b_clockms : w_clockms;
    roomState.set.mergeState(stateUpdate);
  }, []);

  const resign = useCallback(() => {
    // socket.emit('game:resign', params.gameId);
  }, []);

  const draw = useCallback(() => {
    // socket.emit('game:draw', params.gameId);
  }, []);

  const pieceAtSquare = useCallback(
    (square: Square) => {
      return chess.get(square);
    },
    [chess],
  );

  useEffect(() => {
    if (!game?.id) return;
    socket.emit('game:join', { data: { gameId: params.gameId } });
    socket.on('opponent:found', refetch);
    socket.on('opponent:joined', refetch);
    socket.on('game:start', refetch);
    socket.on('game:update', onGameUpdate);
    socket.on('game:status', (status: GameStatus) => {
      roomState.set.mergeState({
        status,
      });
    });
  }, [game?.id]);
  return {
    move,
    draw,
    resign,
    isLoading,
    pieceAtSquare,
  };
}
