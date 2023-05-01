import { HTMLProps, forwardRef } from "react";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  error?: string;
  className?: string;
  border?: string;
  rounded?: string;
  bg_color?: string;
  text_color?: string;
  placeholder?: string;
  width?: string;
  height?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    error,
    type = "text",
    className = "",
    border = "border",
    bg_color = "ffffff",
    text_color = "#000000",
    rounded = "rounded-md",
    width,
    height,
    placeholder,
    ...rest
  } = props;
  const classes = `${border} ${rounded} ${width} ${height} ${className}`;
  return (
    <>
      <input
        ref={ref}
        {...rest}
        type={type}
        className={classes}
        style={{
          backgroundColor: bg_color,
          color: text_color,
          padding: `5px 9px`,
        }}
        placeholder={placeholder}
      />
      {error}
    </>
  );
});
