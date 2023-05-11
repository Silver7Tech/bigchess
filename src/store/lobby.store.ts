import { createStore } from '@udecode/zustood';
interface StateProps {
  modeId: string;
  category: 'blitz' | 'rapid' | 'classical' | 'bullet';
  isInGame: boolean;
}

const initialStateProps: StateProps = {
  isInGame: false,
  modeId: '',
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
