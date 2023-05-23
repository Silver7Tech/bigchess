import { Bullet, Blitz, Rapid, Standard } from '../UI/SVG_ICONS/index';

export interface StarProps {
    text: string;
    score: number; 
}
const Icons = (props: { SVG: string }) => {
    switch (props.SVG) {
        case 'bullet':
        return <Bullet fill="#0151FF"/>;
        case 'blitz':
        return <Blitz fill="#0151FF" />;
        case 'rapid':
        return <Rapid fill="#0151FF" />;
        case 'standard':
        return <Standard fill="#0151FF" />;
        default:
        return null;
    }
};
export const Star:React.FC<StarProps> = ({ text, score} : StarProps) => {
    return(
        <div className="flex flex-col border border-gray-200 shadow-5xl w-[138px] h-36 rounded-3xl items-center justify-center gap-3">
            <div className='rounded-full bg-[#CEECFF] w-[40px] h-[40px] flex items-center justify-center'><Icons SVG={text}/></div>
            <p className="text-xs text-[#667085]">{text.charAt(0).toUpperCase() + text.substring(1)}</p>
            <p className="font-bold text-base">{score}</p>
        </div>
    )
}