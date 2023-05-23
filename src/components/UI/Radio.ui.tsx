import { ReactNode } from "react";

interface RadioProps {
    text : string;
    value: string;
    checked?: string;
    icon: ReactNode;
    onClick : (param : string) => void;
}
export const Radio : React.FC<RadioProps> = ({text, value, checked, icon, onClick}: RadioProps) => {
    return (
        <button className="flex justify-between px-3 items-center h-12 w-[290px] text-xs border border-[#B4C7D8] rounded-md gap-2" onClick={() => onClick("param")}>
            <div className="flex items-center gap-2">
                <input type="radio" value = {value} checked={checked === value ? true : false} onChange={() => onClick("param")} className="scale-125 checked:bg-[#1DC9A0]"/>
                {text}
            </div>
            {icon}
        </button>
    )
} 