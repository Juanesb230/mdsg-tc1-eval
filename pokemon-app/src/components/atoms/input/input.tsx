import { FC, ChangeEvent } from "react";
import "./input.scss";

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const Input: FC<InputProps> = ({ placeholder, value, onChange, error }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`input__input ${error ? "input__input--error" : ""}`}
      />
      {error && <p className="input__error">{error}</p>}
    </div>
  );
};

export default Input;
