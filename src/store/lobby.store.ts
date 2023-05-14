import { createStore } from '@udecode/zustood';
interface StateProps {
  limit: number;
  inc: number;
  category: 'blitz' | 'rapid' | 'classical' | 'bullet';
  isInGame: boolean;
}

const initialStateProps: StateProps = {
  isInGame: false,
  limit: 0,
  inc: 0,
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
