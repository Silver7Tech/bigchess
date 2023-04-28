import React from 'react'
import { createContext } from 'react'

export interface StateContextInterface{
    userState: boolean | undefined,
    gameMode: number | undefined,
    timeMode: number | undefined,
    setUserState: (state:boolean) => void,
    setGameMode: (state:number) => void,
    setTimeMode: (state:number) => void,
}
export const StateContext = createContext<StateContextInterface>({
    userState: undefined,
    gameMode: undefined,
    timeMode: undefined,
    setUserState: function (state: boolean): void {
        throw new Error('Function not implemented.')
    },
    setGameMode: function (state: number): void {
        throw new Error('Function not implemented.')
    },
    setTimeMode: function (state: number): void {
        throw new Error('Function not implemented.')
    }
})

export const StateContextProvider:React.FC<{children: React.ReactElement}>  = ({children}) => {
    const [userState, setUserState] = React.useState(false)
    const [gameMode, setGameMode] = React.useState(1)
    const [timeMode, setTimeMode] = React.useState(1)

    return(
        <StateContext.Provider value={{
            userState,
            gameMode,
            timeMode,
            setUserState,
            setGameMode,
            setTimeMode
        }}
        >
            {children}
        </StateContext.Provider>
    )
}

// export const useStateContext = () => {
//     const state = useContext
// }