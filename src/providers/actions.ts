export interface SetPlayerStateAction {
  type: "SET_PLAYER_STATE";
  payload: boolean;
}

export interface SetGameModeAction {
  type: "SET_GAME_MODE";
  payload: number;
}

export interface SetTimeModeAction {
  type: "SET_TIME_MODE";
  payload: number;
}

export interface SetLoginStateAction {
  type: "SET_LOGIN_STATE";
  payload: boolean;
}

export type StateActions =
  | SetPlayerStateAction
  | SetGameModeAction
  | SetLoginStateAction
  | SetTimeModeAction;
