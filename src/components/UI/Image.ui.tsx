export interface ImageProps {
  source: string;
  bg_color?: string;
  className?: string;
  width?: string;
  height?: string;
  alt?: string;
}
export const Image: React.FC<ImageProps> = ({ source, className = '', alt = '' }: ImageProps) => {
  const classes = `${className}`;
  return <img src={source} className={classes} alt={alt} />;
};
