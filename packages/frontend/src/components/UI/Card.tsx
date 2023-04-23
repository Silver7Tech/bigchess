import React from 'react'
import { Button } from '.'
import { useNavigate } from 'react-router-dom'

export interface CardProps{
    text: string,
    button?: string
}

export const Card: React.FC<CardProps>  = ({ text, button='Button' }: CardProps) =>{
    const navigate = useNavigate()
    const gotoRoom = () => {     
        navigate('/room')
    }
    return(
        <div className='relative min-w-[400px] min-h-[500px] bg-cyan-300'>
            <div className='absolute flex w-full top-52 justify-center'>
                <p className='text-2xl'>{text}</p>
            </div>
            <div className='absolute flex w-full bottom-12 justify-center'>
                <Button
                    text={button}
                    bg_color='#000000'
                    text_color='#ffffff'
                    onClick={gotoRoom}
                />
            </div>
            
        </div>
    )
}