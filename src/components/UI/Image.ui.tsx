export interface ImageProps{
    source: string,
    bg_color?: string ,
    className?: string,
    width?: string,
    height?: string
}
export const Image: React.FC<ImageProps> = ({ source, className='' }:ImageProps) =>{
    const classes = `${className}`
    return (
        <img 
            src={source}
            className={classes}
        />
            
    )
}
