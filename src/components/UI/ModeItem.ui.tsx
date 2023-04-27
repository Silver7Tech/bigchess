import React,{useState} from 'react'

export interface ModeItemProps{
    SVG: React.ReactNode,
    // activated?: boolean,
    // onActivite?: () => object
}

export const ModeItem: React.FC<ModeItemProps> = ({ SVG }: ModeItemProps) => {
    const [activated, onActivate] = useState(false);
    return(
        <div className={`w-[64px] h-[64px] rounded-md flex items-center justify-center border ${activated? 'hover:bg-red-200' : 'hover:bg-gray-200'} cursor-pointer ${activated ? 'bg-red-100' : 'bg-white'}`} onClick={() => onActivate(!activated)}>
            { SVG }
        </div>
    )
}