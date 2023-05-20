import { createStore } from '@udecode/zustood';
interface StateProps {
  gameId: string | null;
  moves: { move: string; clockms: number }[];
  fen: string;
  opponent: {
    username: string;
    rating: number;
    avatar: string;
  } | null;
  started: boolean;
  actions: string[];
  winner: string | null;
  clockms: {
    white: number;
    black: number;
  };
}

const initialStateProps: StateProps = {
  gameId: null,
  moves: [],
  fen: '',
  opponent: null,
  started: false,
  actions: [],
  winner: null,
  clockms: {
    white: 0,
    black: 0,
  },
};

function getInitialState(): StateProps {
  return initialStateProps;
}
export const gameStore = createStore('game')(getInitialState(), {
  devtools: {
    enabled: process.env.NODE_ENV === 'development',
  },
});
