import { Session } from '~/providers/AuthProvider';

export interface ModeItem {
  fill?: string;
}

export type GameCategory = 'classical' | 'blitz' | 'rapid' | 'bullet';
export type GameMode = { increment: number | null; duration: number; category: GameCategory };
export type GameResponse = {
  id: string;
  fen: string;
  moves: { move: string; clockms: number }[];
  actions: string[];
  white: Session;
  black: Session;
  white_id: string;
  black_id: string;
  w_clockms: number;
  b_clockms: number;
  winner: string | null;
  status: 'pending' | 'started' | 'completed';
};

export type Move = { move: string; clockms: number };
export type Moves = Move[];
export type GameStatus = 'pending' | 'started' | 'completed';
export type PlayerSide = 'white' | 'black';
