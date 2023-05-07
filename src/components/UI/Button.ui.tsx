import { HTMLProps, forwardRef } from 'react';

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  text: string;
  px?: string;
  py?: string;
  icon?: React.ReactNode;
  bg_color?: string;
  text_color?: string;
  className?: string;
  rounded?: string;
  border?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      icon,
      px = 'px-[10px]',
      py = 'py-[5px]',
      width,
      height,
      border,
      bg_color = 'bg-white',
      text_color = 'text-black',
      rounded = 'rounded-md',
      className = '',
      onClick,
    }: ButtonProps,
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={`${px} ${py} ${rounded} ${border} ${className} ${bg_color} ${text_color} ${width} ${height} text-center`}
        onClick={onClick}
      >
        {icon && <div className="px-1">{icon}</div>}
        {text}
      </button>
    );
  },
);
