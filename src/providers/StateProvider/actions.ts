export interface SetPlayerStateAction {
  type: 'SET_LOGIN_STATE';
  payload: 'login' | 'validate' | 'logout' | undefined;
}

export interface SetGameModeAction {
  type: 'SET_GAME_MODE';
  payload: number;
}

export interface SetDetailModeAction {
  type: 'SET_DETAIL_MODE';
  payload: number;
}

export interface SetTimeModeAction {
  type: 'SET_TIME_MODE';
  payload: number;
}

export interface SetOpenModalAction {
  type: 'SET_MODAL_OPEN';
  payload: boolean;
}

export type StateActions =
  | SetPlayerStateAction
  | SetGameModeAction
  | SetTimeModeAction
  | SetDetailModeAction
  | SetOpenModalAction;
