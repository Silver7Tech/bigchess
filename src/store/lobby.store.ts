import { createStore } from '@udecode/zustood';
export type Ticket = {
  id: string;
  session_id: string;
  game_id?: string;
  time_control: { limit: number; increment: number };
};
interface StateProps {
  limit: number;
  inc: number;
  category: 'blitz' | 'rapid' | 'classical' | 'bullet';
  ticket: Ticket | null;
}

const initialStateProps: StateProps = {
  inc: 0,
  limit: 0,
  ticket: null,
  category: 'bullet',
};

function getInitialState(): StateProps {
  return initialStateProps;
}
export const lobbyStore = createStore('lobby')(getInitialState(), {
  devtools: {
    enabled: process.env.NODE_ENV === 'development',
  },
});
