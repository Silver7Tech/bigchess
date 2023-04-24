import React from 'react'

export interface ButtonProps{
    text: string,
    px?: number,
    py?: number,
    bg_color?: string ,
    text_color?: string ,
    className?: string,
    rounded? : string,
    onClick?: () => void 
}
export const Button: React.FC<ButtonProps> = ({ text, px=10, py=5, bg_color='#ffffff', text_color='#000000', rounded='rounded-md', className='', onClick }:ButtonProps) =>{
    const classes = `${rounded} ${className}`
    return (
        <button 
            className={classes}
            style={{
                backgroundColor: bg_color,
                color: text_color,
                padding: `${py}px ${px}px`
            }} 
            onClick={onClick}>
            { text }
        </button>
    )
}