import { mapValuesKey } from '@udecode/zustood';
import { authStore } from './auth.store';
import { lobbyStore } from './lobby.store';
import { socketStore } from './socket.store';

export const appStore = {
  auth: authStore,
  lobby: lobbyStore,
  socket: socketStore,
};

export const useStore = () => mapValuesKey('use', appStore);
export const useTrackedStore = () => mapValuesKey('useTracked', appStore);
export const store = mapValuesKey('store', appStore);
export const appActions = mapValuesKey('set', appStore);
