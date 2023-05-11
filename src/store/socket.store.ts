import { createStore } from '@udecode/zustood';
interface StateProps {
  connected: boolean;
}

const initialStateProps: StateProps = {
  connected: false,
};

function getInitialState(): StateProps {
  return initialStateProps;
}
export const socketStore = createStore('socket')(getInitialState(), {
  devtools: {
    enabled: process.env.NODE_ENV === 'development',
  },
});
