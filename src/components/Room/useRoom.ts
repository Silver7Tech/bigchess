import { useTrpcQuery } from '~/hooks/useTrpcQuery';
import { GameResponse } from '~/interfaces';
import { Ticket } from '~/store/lobby.store';
export function useGame(gameId?: string) {
  const { data, refetch } = useTrpcQuery<any, GameResponse>('game.byId', { gameId });

  function isInGame() {
    return !!data?.id;
  }
  return {
    data,
    isInGame,
    refetch,
  };
}
export function useTicket() {
  const { data, refetch } = useTrpcQuery<any, Ticket>('matcher.ticket', {});

  function isInQueue() {
    return !!data;
  }

  function isInGame() {
    return !!data?.game_id;
  }
  return {
    data,
    isInQueue,
    isInGame,
    refetch,
  };
}
