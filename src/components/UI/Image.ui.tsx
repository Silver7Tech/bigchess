export interface ImageProps {
  source: string | undefined;
  bg_color?: string;
  className?: string;
  width?: string;
  height?: string;
  alt?: string;
  onClick?: () => void;
}
export const Image: React.FC<ImageProps> = ({ source, className = '', alt = '', onClick}: ImageProps) => {
  const classes = `${className}`;
  return <img src={source} className={classes} alt={alt} onClick= {onClick} />;
};
