import { createStore } from '@udecode/zustood';
interface StateProps {
  currentTab: 'profile' | 'deposit' | 'settings';
}

const initialStateProps: StateProps = {
  currentTab: 'profile',
};

function getInitialState(): StateProps {
  return initialStateProps;
}
export const profileStore = createStore('profile')(getInitialState(), {
  devtools: {
    enabled: process.env.NODE_ENV === 'development',
  },
});
