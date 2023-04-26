import React from 'react'

export interface ImageProps{
    source: string,
    px?: number,
    py?: number,
    bg_color?: string ,
    text_color?: string ,
    className?: string,
}
export const Image: React.FC<ImageProps> = ({ source, px=10, py=5, bg_color='#ffffff', text_color='#000000', className='' }:ImageProps) =>{
    const classes = `${className}`
    return (
        <img 
            src={source}
            className={classes}
            style={{
                backgroundColor: bg_color,
                color: text_color,
                padding: `${py}px ${px}px`
            }} 
        />
            
    )
}