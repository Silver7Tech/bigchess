export interface StateContextInterface {
  loginState?: 'login' | 'validate' | 'logout' | undefined;
  modalOpen: boolean;
  gameMode: number | undefined;
  timeMode: number | undefined;
}

export interface StateActionsInterface {
  setLoginState: (state: StateContextInterface['loginState']) => void;
  setGameMode: (state: number) => void;
  setTimeMode: (state: number) => void;
  setOpenModal: (state: boolean) => void;
}
