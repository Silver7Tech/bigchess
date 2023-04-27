import React from 'react'

export interface TimeItemProps{
    time: React.ReactNode,
    activated?: boolean
}

export const TimeItem: React.FC<TimeItemProps> = ({ time, activated }: TimeItemProps) => {
    return(
        <div className= {`w-[64px] h-[64px] rounded-md flex items-center justify-center border cursor-pointer ${activated ? 'bg-red-100' : 'bg-white'}`}>
            { time }
        </div>
    )
}