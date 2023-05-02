export interface StateContextInterface {
  userState: boolean | undefined;
  loginState: boolean | undefined;
  gameMode: number | undefined;
  timeMode: number | undefined;
}

export interface StateActionsInterface {
  setUserState: (state: boolean) => void;
  setLoginState: (state: boolean) => void;
  setGameMode: (state: number) => void;
  setTimeMode: (state: number) => void;
}
