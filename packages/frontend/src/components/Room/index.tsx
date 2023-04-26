import React, { useState } from 'react'
import { Chessboard } from "react-chessboard";
import { Button, Input } from '../UI';
import { ChatRoom } from './ChatRoom';
import { Option } from './Option';
const Room: React.FC = () => {
    const [ isPlaying, setIsPlaying ] = useState(true)    
    return (
        <div className='grid grid-cols-12 place-content-center'>
            <div className={isPlaying ? 'col-span-2' : 'col-span-3'}/>
            {
                isPlaying &&
                    <ChatRoom/>

            }
           
            <div className='col-span-4'>
                <Chessboard 
                    id="BasicBoard" 
                    customDarkSquareStyle={{ backgroundColor: "#B7C0D8" }}
                    customLightSquareStyle={{ backgroundColor: "#E8EDF9" }}
                />
            </div>
            <Option/>
            <div className={isPlaying ? 'col-span-2' : 'col-span-3'}/>
           

        </div>
    )
}

export default Room