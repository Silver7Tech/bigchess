import React from 'react'
export interface InputProps {
    type: string,
    className? : string,
    border?: string,
    rounded?: string,
    bg_color?:  string,
    text_color?: string,
    placeholder? : string,
    width?: string,
    height? : string,
}
export const Input : React.FC<InputProps> = ({type = 'text', className = '', border = 'border', bg_color = 'ffffff', text_color = '#000000', rounded = 'rounded-md', width, height, placeholder}:InputProps) => {
    const classes = `${border} ${rounded} ${width} ${height} ${className} `
    return (
        <input
            type={type}
            className={classes}
            style={{
                backgroundColor: bg_color,
                color: text_color,
                padding: `5px 9px`
            }}
            placeholder={placeholder}
        />
        
    )
}