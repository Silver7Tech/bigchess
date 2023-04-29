import React from 'react'
import { Chessboard } from "react-chessboard";
import { ChatRoom } from '@/components/Room/ChatRoom';
import { GamePool } from '@/components/Room/GamePool';
import { Option } from '@/components/Room/Option';
import { PlayingStatus } from '@/components/Room/PlayingStatus';

export interface RoomInterface {
    isPlaying : boolean
}

const Room: React.FC<RoomInterface> = ({isPlaying}: RoomInterface) => {
    // const [ isPlaying, setIsPlaying ] = useState(true)    
    return (
        <div>
            <div className='grid grid-cols-12 place-content-center gap-6'>
                <div className='col-span-2'/>
                {
                    isPlaying
                    ?
                    <ChatRoom/>
                    :
                    <GamePool/>

                }
                <div className='col-span-4'>
                    {
                        isPlaying
                        ?
                        <Chessboard 
                            id="BasicBoard" 
                            customDarkSquareStyle={{ backgroundColor: "#B7C0D8" }}
                            customLightSquareStyle={{ backgroundColor: "#E8EDF9" }}
                        />
                        :
                        <Chessboard 
                            id="BasicBoard" 
                            customDarkSquareStyle={{ backgroundColor: "#B7C0D8" }}
                            customLightSquareStyle={{ backgroundColor: "#E8EDF9" }}
                            arePiecesDraggable={false}
                        />    
                    }
                </div>
                <Option isPlaying = {isPlaying}/>
                <div className='col-span-3'/>
            </div>
            <div className='grid grid-cols-12 fixed bottom-4 w-full'>
                <div className='col-span-7'/>
                <div className='col-span-3 ml-auto mr-3' >
                    <PlayingStatus/>
                </div>
                <div className='col-span-2'/>
            </div>
        </div>
    )
}

export default Room