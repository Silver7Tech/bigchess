import { Image } from '.'

export interface CardProps{
    text: string,
    image?: string,
    to : (param: string) => void,
}

export const Card: React.FC<CardProps>  = ({ text, image, to }: CardProps) =>{
    return(
        <button className='flex flex-col items-center justify-center w-[280px] h-[280px] border-[1px] rounded-[27.617px] bg-gradient-to-r from-white-200 from-0%  to-white-300 to-100% shadow-2xl' onClick={() => to("play")}>
            <div className='p-5 rounded-[27.617px] shadow-xl border-[#b4c7d880] border-[0.41844px] bg-card'>
                <Image source={image}/>
            </div>
            <span className='font-bold mt-10 text-2xl'>{text}</span>
        </button>
    )
}
