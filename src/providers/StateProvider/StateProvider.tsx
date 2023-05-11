import { useContext, useReducer } from 'react';
import { createContext } from 'react';
import { StateActions } from './actions';
import { StateActionsInterface, StateContextInterface } from './interfaces';

export const StateContext = createContext<{
  state: StateContextInterface;
  actions: StateActionsInterface;
} | null>(null);

export const reducer = (
  state: StateContextInterface,
  action: StateActions,
): StateContextInterface => {
  switch (action.type) {
    case 'SET_LOGIN_STATE':
      return {
        ...state,
        loginState: action.payload,
      };
    case 'SET_MODAL_OPEN':
      return {
        ...state,
        modalOpen: action.payload,
      };
    case 'SET_GAME_MODE':
      return {
        ...state,
        gameMode: action.payload,
      };
    case 'SET_TIME_MODE':
      return {
        ...state,
        timeMode: action.payload,
      };
    case 'SET_DETAIL_MODE':
      return {
        ...state,
        detailMode: action.payload,
      };
  }
};

export const StateContextProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    modalOpen: false,
    loginState: 'login',
    gameMode: 0,
    timeMode: 0,
    detailMode: 0,
  });

  return (
    <StateContext.Provider
      value={{
        state,
        actions: {
          setLoginState: (state) => dispatch({ type: 'SET_LOGIN_STATE', payload: state }),
          setGameMode: (state) => dispatch({ type: 'SET_GAME_MODE', payload: state }),
          setTimeMode: (state) => dispatch({ type: 'SET_TIME_MODE', payload: state }),
          setDetailMode: (state) => dispatch({ type: 'SET_DETAIL_MODE', payload: state }),
          setOpenModal: (state) => dispatch({ type: 'SET_MODAL_OPEN', payload: state }),
        },
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(StateContext);

  if (!context) throw new Error('useAppState must be used within a StateContextProvider');

  return context;
};
