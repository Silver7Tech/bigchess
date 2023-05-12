export interface StateContextInterface {
  loginState?: 'login' | 'validate' | 'logout' | undefined;
  modalOpen: boolean;
  gameMode: number | undefined;
  detailMode: number | undefined;
  timeMode: number | undefined;
  isInGame: boolean;
}

export interface StateActionsInterface {
  setLoginState: (state: StateContextInterface['loginState']) => void;
  setGameMode: (state: number) => void;
  setTimeMode: (state: number) => void;
  setDetailMode: (state: number) => void;
  setIsInGame: (state: boolean) => void;
  setOpenModal: (state: boolean) => void;
}
