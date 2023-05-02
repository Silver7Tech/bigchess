import React, { useContext, useReducer } from "react";
import { createContext } from "react";
import { StateActions } from "./actions";
import { StateActionsInterface, StateContextInterface } from "./interfaces";

export const StateContext = createContext<{
  state: StateContextInterface;
  actions: StateActionsInterface;
} | null>(null);

export const reducer = (state: StateContextInterface, action: StateActions) => {
  switch (action.type) {
    case "SET_PLAYER_STATE":
      return {
        ...state,
        userState: action.payload,
      };
    case "SET_LOGIN_STATE":
      return {
        ...state,
        loginState: action.payload,
      };
    case "SET_GAME_MODE":
      return {
        ...state,
        gameMode: action.payload,
      };
    case "SET_TIME_MODE":
      return {
        ...state,
        timeMode: action.payload,
      };
  }
};

export const StateContextProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    userState: false,
    loginState: false,
    gameMode: 0,
    timeMode: 0,
  });

  return (
    <StateContext.Provider
      value={{
        state,
        actions: {
          setUserState: (state: boolean) =>
            dispatch({ type: "SET_PLAYER_STATE", payload: state }),
          setLoginState: (state: boolean) =>
            dispatch({ type: "SET_LOGIN_STATE", payload: state }),
          setGameMode: (state: number) =>
            dispatch({ type: "SET_GAME_MODE", payload: state }),
          setTimeMode: (state: number) =>
            dispatch({ type: "SET_TIME_MODE", payload: state }),
        },
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(StateContext);

  if (!context)
    throw new Error("useAppState must be used within a StateContextProvider");

  return context;
};
