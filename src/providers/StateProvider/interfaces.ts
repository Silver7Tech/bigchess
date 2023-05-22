export type RowData = {
  category: string,
  betAmount: number,
  time: string,
}
export interface StateContextInterface {
  loginState?: 'login' | 'validate' | 'logout' | undefined;
  modalOpen: boolean;
  gameMode: number | undefined;
  detailMode: number | undefined;
  timeMode: number | undefined;
  currentPage: number;
  tableData: Array<any>;
  rowData: RowData,
}

export interface StateActionsInterface {
  setLoginState: (state: StateContextInterface['loginState']) => void;
  setGameMode: (state: number) => void;
  setTimeMode: (state: number) => void;
  setTableData: (state: Array<any>) => void;
  setDetailMode: (state: number) => void;
  setOpenModal: (state: boolean) => void;
  setCurrentPage: (state: number) => void;
  setRowData: (state: RowData) => void;
}
