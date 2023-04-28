import React, {useContext} from 'react'
import { StateContext } from '@/Provider';

export interface TimeItemProps{
    time: React.ReactNode,
    activated?: boolean, 
    time_mode: number
}

export const TimeItem: React.FC<TimeItemProps> = ({ time, activated, time_mode }: TimeItemProps) => {
    const {
        setTimeMode
    } = useContext(StateContext)
    return(
        <div className= {`w-[64px] h-[64px] rounded-md flex items-center justify-center border cursor-pointer ${activated ? 'bg-red-100' : 'bg-white'}`} onClick={() => setTimeMode(time_mode)}>
            { time }
        </div>
    )
}