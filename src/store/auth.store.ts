import { createStore } from '@udecode/zustood';
import { Session } from '~/providers/AuthProvider';
interface StateProps {
  user: Session | null;
  isModalOpen: boolean;
  step: 'login' | 'validate';
}

const initialStateProps: StateProps = {
  step: 'login',
  user: null,
  isModalOpen: false,
};

function getInitialState(): StateProps {
  return initialStateProps;
}
export const authStore = createStore('auth')(getInitialState(), {
  devtools: {
    enabled: process.env.NODE_ENV === 'development',
  },
});
