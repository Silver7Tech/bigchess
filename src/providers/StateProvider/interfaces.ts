export interface StateContextInterface {
  loginState?: 'login' | 'validate' | 'logout' | undefined;
  modalOpen: boolean;
  gameMode: number | undefined;
  detailMode: number | undefined;
  timeMode: number | undefined;
  tableData: Array<any>;
}

export interface StateActionsInterface {
  setLoginState: (state: StateContextInterface['loginState']) => void;
  setGameMode: (state: number) => void;
  setTimeMode: (state: number) => void;
  setTableData: (state: Array<any>) => void;
  setDetailMode: (state: number) => void;
  setOpenModal: (state: boolean) => void;
}
