import { FC, HTMLProps } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ ...props }) => {
  return <input type="text" {...props} />;
};

export default Input;
