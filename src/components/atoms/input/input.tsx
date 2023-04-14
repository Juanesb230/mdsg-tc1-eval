import { FC } from "react";
import "./input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ ...props }) => {
  return <input type="text" {...props} className="input" />;
};

export default Input;
