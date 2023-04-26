import React from 'react'

export interface ButtonProps{
    text: string,
    px?: string,
    py?: string,
    bg_color?: string ,
    text_color?: string ,
    className?: string,
    rounded? : string,
    onClick?: () => void 
}
export const Button: React.FC<ButtonProps> = ({ text, px='px-[10px]', py='py-[5px]', bg_color='bg-white', text_color='text-black', rounded='rounded-md', className='', onClick }:ButtonProps) =>{
    return (
        <button 
            className={`${px} ${py} ${rounded} ${className} ${bg_color} ${text_color}`} onClick={onClick}>
            { text }
        </button>
    )
}