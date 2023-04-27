import React from 'react'

export interface ButtonProps{
    text: string,
    px?: string,
    py?: string,
    icon? : React.ReactNode,
    bg_color?: string ,
    text_color?: string ,
    className?: string,
    rounded? : string,
    border?: string,
    onClick?: () => void 
}
export const Button: React.FC<ButtonProps> = ({ text, icon, px='px-[10px]', py='py-[5px]', border, bg_color='bg-white', text_color='text-black', rounded='rounded-md', className='', onClick }:ButtonProps) =>{
    return (
        <button className={`${px} ${py} ${rounded} ${border} ${className} ${bg_color} ${text_color} text-center`} onClick={onClick}>
            {
                icon && <div className='px-1'>{ icon }</div>
            }
            { text }
        </button>
        // <button type="button" class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">
    )
}