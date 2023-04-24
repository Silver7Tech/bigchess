import React from 'react'
export interface InputProps {
    className? : string,
    border?: string,
    rounded?: string,
    bg_color?:  string,
    text_color?: string,
}
export const Input : React.FC<InputProps> = ({className = '', border = 'border', bg_color = 'ffffff', text_color = '#000000',rounded = 'rounded-md'}:InputProps) => {
    const classes = `${border} ${className} ${rounded}`
    return (
        <input
            className={classes}
            style={{
                backgroundColor: bg_color,
                color: text_color,
                padding: `2px 3px`
            }}
        />
        
    )
}