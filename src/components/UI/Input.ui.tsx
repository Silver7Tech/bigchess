import React from 'react'
export interface InputProps {
    className? : string,
    border?: string,
    rounded?: string,
    bg_color?:  string,
    text_color?: string,
    placeholder? : string,
    width?: string,
}
export const Input : React.FC<InputProps> = ({className = '', border = 'border', bg_color = 'ffffff', text_color = '#000000', rounded = 'rounded-md', width, placeholder}:InputProps) => {
    const classes = `${border} ${rounded} ${width} ${className} `
    return (
        <input
            className={classes}
            style={{
                backgroundColor: bg_color,
                color: text_color,
                padding: `4px 3px`
            }}
            placeholder={placeholder}
        />
        
    )
}