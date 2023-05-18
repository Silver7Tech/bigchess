import { HTMLProps } from "react";

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  text: string;
  px?: string;
  py?: string;
  icon?: React.ReactNode;
  icon_direction? : string;
  bg_color?: string;
  text_color?: string;
  className?: string;
  rounded?: string;
  border?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  disabled? : boolean;
}
export const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  px = "px-[10px]",
  py = "py-[5px]",
  width,
  height,
  border,
  bg_color = "bg-white",
  text_color = "text-black",
  rounded = "rounded-md",
  className = "",
  icon_direction = 'left',
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={`${px} ${py} ${rounded} ${border} ${className} ${bg_color} ${text_color} ${width} ${height} text-center`}
      onClick={onClick}
      disabled = {disabled}
    >
      {icon_direction === 'left' && icon && <div className="px-1">{icon}</div>}
      {text}
      {icon_direction === 'right' && icon && <div className="px-1">{icon}</div>}
    </button>
  );
};
