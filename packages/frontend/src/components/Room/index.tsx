import React from 'react'
import { Chessboard } from "react-chessboard";
import { Button, Input } from '../UI';
const Room: React.FC = () => {
    return (
        <div className='flex'>
            <div className='w-3/12'></div>
            <div className='w-4/12'>
                <Chessboard 
                    id="BasicBoard" 
                />
            </div>
            <div className='relative w-2/12 border border-sky-600 mx-2 bg-orange-100'>
                <p className='w-full px-4 bg-orange-300	'>
                    Chat
                </p>
                <div className='absolute w-full bottom-4 flex justify-between h-100 flex px-2 gap-2'>
                    <Input className='w-8/12 border-black h-[40px]'/>
                    <Button text='Send' bg_color='#d946ef' className= 'w-4/12 h-[40px]' />
                </div>
            </div>
            <div className='w-3/12'></div>

        </div>
    )
}

export default Room