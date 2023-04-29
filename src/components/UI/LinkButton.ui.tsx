import React from "react";
import { HashLink } from "react-router-hash-link";
import { forwardRef } from "react";

export interface LinkButtonProps{
    text: string,
    to: string
    actived?: boolean
}

export const LinkButton:React.FC<LinkButtonProps> = forwardRef(( { text, to, actived=false }: LinkButtonProps, ref) => {
    return(
        <HashLink 
            to={to} 
            className={`font-semibold leading-loose text-black ${actived && "underline text-purple-100"}`}>
            { text }
        </HashLink>
    )
})