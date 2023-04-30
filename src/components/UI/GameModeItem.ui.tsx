export interface GameModeItemProps{
    text: string,
    icon?: React.ReactNode,
    activated?: boolean,
    to?: () => void
}

export const GameModeItem: React.FC<GameModeItemProps> = ({ text, icon, activated, to}: GameModeItemProps) => {
    return(
        <div className= {`flex flex-col justify-center w-[280px] h-[280px] rounded-md items-center  border cursor-pointer ${activated ? 'bg-red-100' : 'bg-white'}`} onClick={to}>
            {icon}
            <p className='font-bold text-2xl'>{text}</p>
        </div>
    )
}
