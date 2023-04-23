import React from 'react'
import { Chessboard } from "react-chessboard";
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
                    <div className='w-8/12 border border-black h-[40px]'>
                    </div>
                    <div className='w-4/12 bg-fuchsia-500 h-[40px]'>

                    </div>
                </div>
            </div>
            <div className='w-3/12'></div>

        </div>
    )
}

export default Room